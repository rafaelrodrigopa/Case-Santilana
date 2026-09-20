from dataclasses import dataclass
from typing import Optional

@dataclass(frozen=True)
class SchoolEntity:
    co_entidade: int
    no_entidade: str
    co_municipio: int
    no_municipio: str
    sg_uf: str
    tp_dependencia: int  # 4 = Privada
    tp_localizacao: int  # 1 = Urbana, 2 = Rural
    in_internet: int
    in_banda_larga: int
    qt_comp_aluno: float
    in_equip_lousa_digital: int
    in_laboratorio_informatica: int
    in_laboratorio_ciencias: int
    in_biblioteca_sala_leitura: int
    in_medio: int
    qt_salas_utilizadas: int
    qt_mat_bas: int # Total matriculas educacao basica
    prop_docentes_superior: float # Indicador qualificacao docente

@dataclass
class QualityMetricEntity:
    total_records_ingested: int
    private_schools_filtered: int
    null_values_count: int
    coverage_rate: float
    timestamp: str
