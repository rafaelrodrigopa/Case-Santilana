"""
Orquestrador CLI Principal: Pipeline de Qualidade & Clusterização Santillana
Executa em batch a esteira ponta a ponta dos 4 Agentes Autônomos:
1. IngestionAgent (Clean Architecture / Ingestion UseCase)
2. EnrichmentAgent (IBGE Join)
3. ClusteringAgent (Machine Learning k=4 Selos)
4. SemanticPubAgent (Gold Layer / Star Schema / SQLite)
"""
import sys
import logging
from src.ingestion_agent import IngestionAgent
from src.enrichment_agent import EnrichmentAgent
from src.clustering_agent import ClusteringAgent
from src.semantic_pub_agent import SemanticPubAgent

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s - %(message)s"
)
logger = logging.getLogger("PipelineOrchestrator")

def main():
    logger.info("================================================================")
    logger.info("INICIANDO PIPELINE DE QUALIDADE & CLUSTERIZACAO SANTILLANA")
    logger.info("================================================================")

    # 1. Ingestão Segura em Arquitetura Limpa
    ingestion_agent = IngestionAgent()
    m1 = ingestion_agent.run()
    logger.info(f"-> Ingestao concluida: {m1['private_schools_filtered']} escolas privadas.")

    # 2. Enriquecimento Socioeconômico com IBGE
    enrichment_agent = EnrichmentAgent()
    m2 = enrichment_agent.run()
    logger.info(f"-> Enriquecimento concluido: {m2['total_enriched_schools']} escolas unificadas.")

    # 3. Modelagem Não Supervisionada ML & Segmentação dos Selos
    clustering_agent = ClusteringAgent()
    m3 = clustering_agent.run()
    logger.info(f"-> Clusterizacao concluida com Silhouette Score: {m3['silhouette_score']:.4f}")

    # 4. Publicação no Modelo Semântico Star Schema para Power BI
    semantic_agent = SemanticPubAgent()
    m4 = semantic_agent.run()
    logger.info(f"-> Publicacao semantica na camada Gold concluida em SQLite e Parquet!")

    logger.info("================================================================")
    logger.info("PIPELINE FINALIZADO COM SUCESSO! ABRIR O POWER BI PBIP.")
    logger.info("================================================================")

if __name__ == "__main__":
    main()
