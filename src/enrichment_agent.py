import asyncio
import logging
from pathlib import Path
from typing import Dict, Any
import polars as pl
from src.infrastructure.fetchers.inep_api_fetcher import IbgeApiFetcher
from src.infrastructure.repositories.parquet_repository import ParquetStorageRepository
from src.config import settings

logger = logging.getLogger(__name__)

class EnrichmentAgent:
    """
    Agente Autônomo 2: EnrichmentAgent
    Adiciona contextualização macro e socioeconômica unindo o código do município (CO_MUNICIPIO)
    aos indicadores do IBGE (IDHM, PIB per capita, Região).
    """
    def __init__(self):
        self.ibge_fetcher = IbgeApiFetcher()
        self.repository = ParquetStorageRepository()

    def run(self,
            raw_path: Path = settings.DATA_RAW_DIR / "censo_escolas_raw.parquet",
            output_path: Path = settings.DATA_PROCESSED_DIR / "censo_enriquecido.parquet") -> Dict[str, Any]:
        logger.info("==================================================")
        logger.info("Acionando Agente 2: EnrichmentAgent")
        logger.info("==================================================")

        # 1. Carregar dados brutos das escolas
        df_schools = self.repository.load(raw_path)

        # 2. Extrair indicadores socioeconômicos do IBGE
        ibge_data = asyncio.run(self.ibge_fetcher.fetch_municipality_indicators())
        df_ibge = pl.DataFrame(ibge_data)

        # 3. Broadcast Join em memória (Polars) via CO_MUNICIPIO
        df_enriched = df_schools.join(
            df_ibge.select(["CO_MUNICIPIO", "NM_REGIAO", "IDHM", "PIB_PER_CAPITA"]),
            on="CO_MUNICIPIO",
            how="left"
        )

        # Preenchimento preventivo de valores default para municípios raros sem correspondência
        df_enriched = df_enriched.with_columns([
            pl.col("NM_REGIAO").fill_null("Sudeste"),
            pl.col("IDHM").fill_null(0.750),
            pl.col("PIB_PER_CAPITA").fill_null(35000.0)
        ])

        # 4. Salvar dataset enriquecido na camada Processed
        self.repository.save(df_enriched, output_path)

        metrics = {
            "total_enriched_schools": df_enriched.height,
            "columns_count": df_enriched.width,
            "output_path": str(output_path)
        }
        logger.info(f"Enriquecimento socioeconomico concluido: {df_enriched.height} registros processados.")
        return metrics

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    agent = EnrichmentAgent()
    metrics = agent.run()
    print("Métricas do Enriquecimento:", metrics)
