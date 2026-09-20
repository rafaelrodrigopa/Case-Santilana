# Arquitetura de Agentes Inteligentes: Pipeline de Clusterização Escolar (Sistemas Santillana)

Este documento define a especificação dos Agentes Autônomos responsáveis pela extração, enriquecimento socioeconômico, modelagem não supervisionada (clusterização) e carga do modelo dimensional consumido pelo Power BI (`.pbip`).

---

## 1. Visão Geral da Arquitetura de Agentes

[Web Open Data / INEP API / IBGE API]
│
▼
┌──────────────────┐
│  IngestionAgent  │ ◄── Rate-limiting, cache e sanitização
└────────┬─────────┘
│
▼
┌──────────────────┐
│ EnrichmentAgent  │ ◄── Joins espaciais e socioeconômicos (IBGE/PNAD)
└────────┬─────────┘
│
▼
┌──────────────────┐
│ ClusteringAgent  │ ◄── Feature engineering, PCA e K-Means/HDBSCAN
└────────┬─────────┘
│
▼
┌──────────────────┐
│ SemanticPubAgent │ ◄── Validação de esquema e update das tabelas do .pbip
└──────────────────┘

## 2. Mapeamento de Regras de Negócio & Features por Selo

Para clusterizar as escolas privadas e direcionar o selo comercial ideal, os agentes monitoram vetores de variáveis específicos:

| Selo Santillana | Perfil Alvo | Variáveis-Chave do Censo / IBGE |
| :--- | :--- | :--- |
| **Kepler** | Escolas populares / ticket acessível | `TP_LOCALIZACAO`, menor índice de infraestrutura (`IN_BANDA_LARGA = 0/1`), menor proporção de computadores/aluno, IDH municipal inferior/médio, mensalidade indireta estimada via renda do setor censitário (IBGE). |
| **Uno** | Escolas inovadoras e tecnológicas | `IN_INTERNET`, `IN_BANDA_LARGA`, `QT_COMP_ALUNO`, `IN_EQUIP_LOUSA_DIGITAL`, `IN_LABORATORIO_INFORMATICA`, dispositivos móveis para estudantes. |
| **Farias Brito** | Alta performance acadêmica e foco em vestibulares/ENEM | Oferta de Ensino Médio (`IN_MEDIO = 1`), `IN_LABORATORIO_CIENCIAS`, `QT_SALAS_UTILIZADAS`, taxas históricas de aprovação/rendimento, tamanho de turmas e jornada ampliada/integral. |
| **Compartilha** | Alta autonomia pedagógica e formação docente | Escolas de grande porte/rede, indicadores de qualificação docente (nível superior/pós-graduação), presença de coordenadores/orientadores dedicados, biblioteca/sala de leitura estruturada (`IN_BIBLIOTECA_SALA_LEITURA`). |

---

## 3. Especificação dos Agentes

### Agente 1: `IngestionAgent` (Extração & Ingestão Segura)
* **Objetivo:** Consumir os microdados do Censo Escolar (API/Datalake INEP) filtrando exclusivamente a rede privada (`TP_DEPENDENCIA = 4`).
* **Boas Práticas de Performance & Segurança:**
  * **Zero Hardcoded Secrets:** Chaves de API, tokens e endpoints são injetados exclusivamente via variáveis de ambiente (`.env` local ignorado no Git ou Key Vault/Secret Manager em produção).
  * **Paginação com Backoff Exponencial:** Consumo em chunks/batches assíncronos (`httpx` / `aiohttp`) com retry automático em caso de rate limit (HTTP 429/503).
  * **Cache Local Estruturado:** Armazenamento intermediário em formato colunar particionado (`Parquet` compactado com `zstd`) para evitar chamadas redundantes à API pública.

```python
# Configuração de Ambiente do IngestionAgent
import os
from pydantic_settings import BaseSettings

class IngestionSettings(BaseSettings):
    INEP_API_BASE_URL: str = "[https://api.inep.gov.br/censoEscolar](https://api.inep.gov.br/censoEscolar)" # Endpoint / Gateway
    API_TIMEOUT_SECONDS: int = 60
    MAX_RETRIES: int = 5
    CHUNK_SIZE: int = 50_000
    OUTPUT_RAW_PATH: str = "./data/raw"

    class Config:
        env_file = ".env"

Agente 2: EnrichmentAgent (Enriquecimento com Dados IBGE)
Objetivo: Adicionar granularidade macro e socioeconômica unindo o código do município (CO_MUNICIPIO) aos dados da API de Serviços do IBGE (PIB per capita, IDHM e malhas geográficas).

Boas Práticas:

Redução de cardinalidade: busca apenas dados municipais agregados e realiza broadcast join em memória.

Validação com Pydantic para descartar registros corrompidos ou municípios sem correspondência.

Agente 3: ClusteringAgent (Machine Learning & Segmentação)
Objetivo: Pré-processar dados, normalizar variáveis, reduzir dimensionalidade e categorizar as unidades em clusters correspondentes aos 4 selos.

Pipeline de Execução:

Filtragem de Atributos: Seleção de variáveis de tecnologia, equipe docente, infraestrutura física e porte.

Tratamento de Nulos & Imputação: Imputação por mediana estratificada por UF/Porte da escola.

Escalonamento: RobustScaler ou StandardScaler para remover viés de escala de contagem de equipamentos.

Algoritmo:

K-Means / Gaussian Mixture (k=4): Força o particionamento direto no número de selos para calibração supervisionada.

HDBSCAN (opcional para análise de ruído): Identifica outliers (escolas de elite atípicas ou escolas filantrópicas sem infraestrutura).

Mapeamento de Selo: Associação de cada cluster centróide ao selo de maior aderência vetorial (Selo_Recomendado: Kepler, Uno, Farias Brito, Compartilha) com cálculo de probabilidade/distância Euclidiana.

Agente 4: SemanticPubAgent (Interface com PBIP / Git)
Objetivo: Gerar o artefato analítico e atualizar o modelo semântico do Power BI sem quebrar versionamento do Git.

Diretrizes de Integração com o .pbip:

Exportação Analítica: Gera as tabelas finais de dimensões (d_escola, d_municipio, d_cluster_selo) e fatos (f_censo_metricas) em formato Parquet ou banco SQLite/DuckDB leve e otimizado.

Preservação de Metadados (TMDL / model.bim):

Não sobrescrever diretamente arquivos de definição semântica do Fabric/PBIP sem validação de esquema.

O modelo semântico aponta via Power Query (M) para a pasta consolidada (./data/gold/), garantindo que alterações no schema do Power BI continuem rastreáveis no Git (.tmdl em texto limpo).

4. Guia de Execução Segura
Instalação & Setup
Bash
# Criar ambiente virtual
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# Instalar dependências de produção
pip install httpx pandas polars scikit-learn pydantic pyarrow duckdb
Arquivo de Ambiente (.env.example)
Ini, TOML
# Segredos e Configurações (NUNCA commitar o .env)
INEP_API_TOKEN=seu_token_aqui_se_aplicavel
IBGE_API_URL=[https://servicodados.ibge.gov.br/api/v1](https://servicodados.ibge.gov.br/api/v1)
ENVIRONMENT=development
DATA_LAYER_GOLD=./data/gold/
Script Orquestrador (run_pipeline.py)
Python
"""
Orquestrador CLI para acionar a cadeia de agentes em batch.
"""
def main():
    print("1. [IngestionAgent] Baixando e filtrando escolas privadas...")
    # ingest_private_schools()

    print("2. [EnrichmentAgent] Integrando contexto econômico IBGE...")
    # enrich_with_ibge()

    print("3. [ClusteringAgent] Gerando scores e segmentação dos 4 selos...")
    # run_clustering()

    print("4. [SemanticPubAgent] Atualizando dados da camada Gold para o PBIP...")
    # publish_to_gold()
    print("Pipeline finalizado. Abra o arquivo .pbip no Power BI Desktop para atualizar.")

if __name__ == "__main__":
    main()

<ElicitationsGroup message="Para detalhar as próximas etapas do case:">
  <Elicitation label="Gerar o código completo em Python do ClusteringAgent" query="Gere o código Python completo do ClusteringAgent com a engenharia de features, normalização e o modelo de clusterização para os 4 selos Santillana."/>
  <Elicitation label="Estruturar as medidas DAX e o modelo dimensional do PBIP" query="Estruture o modelo dimensional (star schema) e as principais medidas DAX para o arquivo PBIP exibir a análise dos 4 selos Santillana."/>
</ElicitationsGroup>