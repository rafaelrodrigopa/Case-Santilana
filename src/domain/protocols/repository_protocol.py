from typing import Protocol, Any
from pathlib import Path

class StorageRepositoryProtocol(Protocol):
    """
    Interface para persistência desacoplada da camada física (Parquet / Database).
    """
    def save(self, data: Any, destination_path: Path) -> Path:
        ...

    def load(self, source_path: Path) -> Any:
        ...
