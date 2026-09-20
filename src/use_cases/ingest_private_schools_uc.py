import logging
import datetime
from pathlib import Path
from typing import Dict, Any
from src.domain.protocols.fetcher_protocol import DataFetcherProtocol
from src.domain.protocols.repository_protocol import StorageRepositoryProtocol
from src.config import settings

logger = logging.getLogger(__name__)

class IngestPrivateSchoolsUseCase:
    """
    Caso de Uso puro para Ingestão e Validação da Rede Privada de Ensino.
    Segue a Clean Architecture (depende exclusivamente de abstrações/protocols).
    """
    def __init__(self, fetcher: DataFetcherProtocol, repository: StorageRepositoryProtocol):
        self.fetcher = fetcher
        self.repository = repository

    async def execute(self, destination_path: Path = settings.DATA_RAW_DIR / "censo_escolas_raw.parquet") -> Dict[str, Any]:
        logger.info("Executando Caso de Uso: IngestPrivateSchoolsUseCase...")
        
        # 1. Extração via Fetcher desacoplado
        raw_schools = await self.fetcher.fetch_school_data(target_dependencia=settings.TARGET_DEPENDENCIA)
        
        # 2. Métricas de Integridade do Processo de Ingestão
        total_ingested = len(raw_schools)
        filtered_private = sum(1 for s in raw_schools if s.get("TP_DEPENDENCIA") == 4)
        null_count = sum(1 for s in raw_schools if s.get("CO_ENTIDADE") is None)
        coverage_rate = (filtered_private / total_ingested) if total_ingested > 0 else 0.0

        # 3. Persistência via Repositório colunar
        saved_path = self.repository.save(raw_schools, destination_path)

        metrics = {
            "total_records_ingested": total_ingested,
            "private_schools_filtered": filtered_private,
            "null_values_count": null_count,
            "coverage_rate": coverage_rate,
            "saved_path": str(saved_path),
            "timestamp": datetime.datetime.now().isoformat()
        }
        
        logger.info(f"Caso de uso de ingestao concluido com sucesso. Total de escolas privadas: {filtered_private}")
        return metrics
