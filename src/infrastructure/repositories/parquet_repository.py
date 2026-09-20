import logging
from pathlib import Path
from typing import Any, Union, List, Dict
import polars as pl

logger = logging.getLogger(__name__)

class ParquetStorageRepository:
    """
    Repositório de persistência colunar de alta performance utilizando Polars e compactação zstd.
    """
    def save(self, data: Union[List[Dict[str, Any]], pl.DataFrame], destination_path: Path) -> Path:
        destination_path.parent.mkdir(parents=True, exist_ok=True)
        
        if isinstance(data, list):
            df = pl.DataFrame(data)
        elif isinstance(data, pl.DataFrame):
            df = data
        else:
            df = pl.DataFrame(data)

        df.write_parquet(
            destination_path,
            compression="zstd",
            use_pyarrow=False
        )
        logger.info(f"Dados salvos com sucesso em formato Parquet colunar ({df.height} linhas, {df.width} colunas) -> {destination_path}")
        return destination_path

    def load(self, source_path: Path) -> pl.DataFrame:
        if not source_path.exists():
            raise FileNotFoundError(f"Arquivo de origem nao encontrado: {source_path}")
        df = pl.read_parquet(source_path)
        logger.info(f"Parquet carregado com sucesso de {source_path} ({df.height} linhas)")
        return df
