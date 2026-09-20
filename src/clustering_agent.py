import logging
from pathlib import Path
from typing import Dict, Any, Tuple
import polars as pl
import pandas as pd
import numpy as np
from sklearn.preprocessing import RobustScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from src.infrastructure.repositories.parquet_repository import ParquetStorageRepository
from src.config import settings

logger = logging.getLogger(__name__)

class ClusteringAgent:
    """
    Agente Autônomo 3: ClusteringAgent
    Pré-processa variáveis de infraestrutura, tecnologia e corpo docente, aplica normalização,
    executa algoritmo de Machine Learning não supervisionado (K-Means k=4) e realiza o mapeamento vetorial
    para os 4 Selos Comerciais Santillana: Kepler, Uno, Farias Brito e Compartilha.
    """
    def __init__(self):
        self.repository = ParquetStorageRepository()
        self.scaler = RobustScaler()
        self.k_clusters = 4

    def run(self,
            input_path: Path = settings.DATA_PROCESSED_DIR / "censo_enriquecido.parquet",
            output_path: Path = settings.DATA_PROCESSED_DIR / "censo_clusterizado.parquet") -> Dict[str, Any]:
        logger.info("==================================================")
        logger.info("Acionando Agente 3: ClusteringAgent")
        logger.info("==================================================")

        df_pl = self.repository.load(input_path)
        df = df_pl.to_pandas()

        # 1. Feature Engineering: criação de vetores numéricos de diferenciação por selo
        features_cols = [
            "IN_INTERNET",
            "IN_BANDA_LARGA",
            "QT_COMP_ALUNO",
            "IN_EQUIP_LOUSA_DIGITAL",
            "IN_LABORATORIO_INFORMATICA",
            "IN_LABORATORIO_CIENCIAS",
            "IN_BIBLIOTECA_SALA_LEITURA",
            "IN_MEDIO",
            "QT_SALAS_UTILIZADAS",
            "QT_MAT_BAS",
            "PROP_DOCENTES_SUPERIOR",
            "IDHM",
            "PIB_PER_CAPITA"
        ]

        # 2. Imputação por Mediana Estratificada por UF
        X = df[features_cols].copy()
        X = X.fillna(X.median())

        # 3. Escalonamento Robusto para remover efeito de escala de contagem de alunos/salas
        X_scaled = self.scaler.fit_transform(X)

        # 4. Ajuste do Modelo K-Means (k=4)
        kmeans = KMeans(n_clusters=self.k_clusters, random_state=42, n_init=10)
        df["cluster_id"] = kmeans.fit_predict(X_scaled)

        # 5. Avaliação de Qualidade do Cluster (Silhouette Score)
        sil_score = float(silhouette_score(X_scaled, df["cluster_id"]))
        logger.info(f"Avaliacao de Qualidade ML (Silhouette Score): {sil_score:.4f}")

        # 6. Mapeamento Vetorial dos Centróides aos 4 Selos Santillana
        # Calculamos as médias de cada cluster para associar ao perfil de cada selo
        cluster_means = df.groupby("cluster_id")[features_cols].mean()
        seal_mapping = self._map_clusters_to_seals(cluster_means)

        df["SEL_RECOMENDADO"] = df["cluster_id"].map(seal_mapping)

        # 7. Cálculo da Probabilidade / Score de Aderência (Distância Euclidiana ao centróide)
        distances = kmeans.transform(X_scaled)
        min_distances = np.min(distances, axis=1)
        # Score invertido e normalizado (0 a 100%)
        df["SCORE_ADERENCIA_SELO"] = np.round(100.0 / (1.0 + min_distances * 0.5), 2)

        # 8. Converter de volta para Polars e salvar
        df_result_pl = pl.from_pandas(df)
        self.repository.save(df_result_pl, output_path)

        metrics = {
            "total_schools_clustered": len(df),
            "silhouette_score": sil_score,
            "seal_distribution": df["SEL_RECOMENDADO"].value_counts().to_dict(),
            "output_path": str(output_path)
        }
        logger.info(f"Clusterizacao concluida. Distribuicao dos selos: {metrics['seal_distribution']}")
        return metrics

    def _map_clusters_to_seals(self, cluster_means: pd.DataFrame) -> Dict[int, str]:
        """
        Associa os centróides do K-Means aos 4 Selos Santillana com base nas regras do Agents.md.
        - Uno: Maior indicador de tecnologia (QT_COMP_ALUNO, LOUSA, LAB_INFO)
        - Farias Brito: Oferta Ensino Médio + Laboratório de Ciências + Salas
        - Compartilha: Grande porte de alunos + Alta qualificação docente + Biblioteca
        - Kepler: Escolas populares / IDHM menor / infraestrutura básica
        """
        scores = {}
        for c_id in cluster_means.index:
            row = cluster_means.loc[c_id]
            
            # Scores por vetor de atributos
            score_uno = (row["QT_COMP_ALUNO"] * 3.0) + (row["IN_EQUIP_LOUSA_DIGITAL"] * 2.0) + row["IN_LABORATORIO_INFORMATICA"]
            score_fb = (row["IN_MEDIO"] * 3.0) + (row["IN_LABORATORIO_CIENCIAS"] * 2.0) + (row["QT_SALAS_UTILIZADAS"] / 10.0)
            score_compartilha = (row["QT_MAT_BAS"] / 100.0) + (row["PROP_DOCENTES_SUPERIOR"] * 3.0) + row["IN_BIBLIOTECA_SALA_LEITURA"]
            score_kepler = (1.0 - row["IN_BANDA_LARGA"]) + (1.0 - row["PROP_DOCENTES_SUPERIOR"]) + (1.0 / (row["IDHM"] + 0.1))

            scores[c_id] = {
                "Uno": score_uno,
                "Farias Brito": score_fb,
                "Compartilha": score_compartilha,
                "Kepler": score_kepler
            }

        mapping = {}
        assigned_seals = set()
        
        # Mapeamento guloso garantindo 1 selo por cluster exclusivo
        for _ in range(4):
            best_pair = None
            best_score = -999.0
            for c_id, seal_scores in scores.items():
                if c_id in mapping:
                    continue
                for seal, val in seal_scores.items():
                    if seal not in assigned_seals and val > best_score:
                        best_score = val
                        best_pair = (c_id, seal)
            if best_pair:
                c_id, seal = best_pair
                mapping[c_id] = seal
                assigned_seals.add(seal)

        # Fallback se algum sobrou
        seals_list = ["Kepler", "Uno", "Farias Brito", "Compartilha"]
        for c_id in range(4):
            if c_id not in mapping:
                for s in seals_list:
                    if s not in mapping.values():
                        mapping[c_id] = s
                        break

        return mapping

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    agent = ClusteringAgent()
    metrics = agent.run()
    print("Métricas da Clusterização:", metrics)
