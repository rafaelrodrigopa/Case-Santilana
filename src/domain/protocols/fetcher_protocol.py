from typing import Protocol, List, Dict, Any, Optional

class DataFetcherProtocol(Protocol):
    """
    Interface para extração assíncrona/síncrona de dados do Censo Escolar INEP.
    """
    async def fetch_school_data(self, target_dependencia: int = 4) -> List[Dict[str, Any]]:
        ...

class EconomicFetcherProtocol(Protocol):
    """
    Interface para extração de dados econômicos (IBGE).
    """
    async def fetch_municipality_indicators(self) -> List[Dict[str, Any]]:
        ...
