import asyncio
import logging
from typing import Dict, Any
from src.infrastructure.fetchers.inep_api_fetcher import InepApiFetcher
from src.infrastructure.repositories.parquet_repository import ParquetStorageRepository
from src.use_cases.ingest_private_schools_uc import IngestPrivateSchoolsUseCase

logger = logging.getLogger(__name__)

class IngestionAgent:
    """
    Agente Autônomo 1: IngestionAgent
    Atua como Fachada (Facade Pattern) injetando as implementações concretas de infraestrutura no Caso de Uso.
    """
    def __init__(self):
        self.fetcher = InepApiFetcher()
        self.repository = ParquetStorageRepository()
        self.use_case = IngestPrivateSchoolsUseCase(fetcher=self.fetcher, repository=self.repository)

    def run(self) -> Dict[str, Any]:
        logger.info("==================================================")
        logger.info("Acionando Agente 1: IngestionAgent")
        logger.info("==================================================")
        return asyncio.run(self.use_case.execute())

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    agent = IngestionAgent()
    metrics = agent.run()
    print("Métricas da Ingestão:", metrics)
