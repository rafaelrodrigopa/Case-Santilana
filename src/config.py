import os
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # Diretores e Caminhos
    BASE_DIR: Path = Path(__file__).resolve().parent.parent
    DATA_RAW_DIR: Path = BASE_DIR / "data" / "raw"
    DATA_PROCESSED_DIR: Path = BASE_DIR / "data" / "processed"
    DATA_GOLD_DIR: Path = BASE_DIR / "data" / "gold"

    # Endpoints de APIs Públicas
    INEP_API_BASE_URL: str = "https://api.inep.gov.br/censoEscolar"
    INEP_OPEN_DATA_URL: str = "https://dadosabertos.inep.gov.br/api/3/action/package_show?id=microdados-do-censo-escolar"
    IBGE_API_SERVICES_URL: str = "https://servicodados.ibge.gov.br/api/v1"

    # Configurações de Rede & Execução
    API_TIMEOUT_SECONDS: int = 60
    MAX_RETRIES: int = 5
    CHUNK_SIZE: int = 50_000
    TARGET_DEPENDENCIA: int = 4 # Rede Privada

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()

# Garantir existência dos diretórios de dados
settings.DATA_RAW_DIR.mkdir(parents=True, exist_ok=True)
settings.DATA_PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
settings.DATA_GOLD_DIR.mkdir(parents=True, exist_ok=True)
