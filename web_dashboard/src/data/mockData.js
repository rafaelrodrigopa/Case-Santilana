export const SELOS_INFO = {
  "Kepler": {
    nome: "Kepler",
    perfil: "Escolas populares / ticket acessível",
    cor: "#E74C3C",
    criterios: "Menor infraestrutura de TI, mensalidade acessível, IDH municipal médio/baixo",
    descricao: "Foco em democratização do ensino de qualidade e soluções com excelente custo-benefício."
  },
  "Uno": {
    nome: "Uno",
    perfil: "Escolas inovadoras e tecnológicas",
    cor: "#3498DB",
    criterios: "Alta densidade de computadores por aluno, lousas digitais, laboratório de informática e banda larga",
    descricao: "Foco em transformação digital, metodologias ativas e ecossistema de aprendizagem tecnológica."
  },
  "Farias Brito": {
    nome: "Farias Brito",
    perfil: "Alta performance acadêmica e foco em vestibulares/ENEM",
    cor: "#F1C40F",
    criterios: "Oferta de Ensino Médio, laboratório de ciências, alto volume de turmas preparatórias",
    descricao: "Foco em aprovação em vestibulares de alta concorrência e máximo rigor pedagógico."
  },
  "Compartilha": {
    nome: "Compartilha",
    perfil: "Alta autonomia pedagógica e formação docente",
    cor: "#2ECC71",
    criterios: "Escolas de grande porte, corpo docente pós-graduado/superior, biblioteca e salas de apoio",
    descricao: "Foco em formação continuada de educadores, gestão pedagógica e autonomia curricular."
  }
};

export const MOCK_ESCOLAS = [
  { id: 35000001, nome: "Colégio Dom Bosco 1", uf: "SP", municipio: "São Paulo", regiao: "Sudeste", selo: "Kepler", score: 82.4, alunos: 240, medio: 0, tech: 34.5, idhm: 0.805, acao: "Apresentar Selo Kepler: Expansão Acessível & Ticket Popular" },
  { id: 35000002, nome: "Instituto de Ensino Santa Cruz 2", uf: "SP", municipio: "Campinas", regiao: "Sudeste", selo: "Uno", score: 94.1, alunos: 580, medio: 1, tech: 88.2, idhm: 0.805, acao: "Apresentar Selo Uno: Inovação & Plataforma Tecnológica" },
  { id: 35000003, nome: "Escola Marista 3", uf: "RJ", municipio: "Rio de Janeiro", regiao: "Sudeste", selo: "Farias Brito", score: 91.8, alunos: 850, medio: 1, tech: 72.0, idhm: 0.799, acao: "Apresentar Selo Farias Brito: Rigor Acadêmico & ENEM" },
  { id: 35000004, nome: "Centro Educacional Santo Agostinho 4", uf: "MG", municipio: "Belo Horizonte", regiao: "Sudeste", selo: "Compartilha", score: 89.5, alunos: 1400, medio: 1, tech: 68.4, idhm: 0.810, acao: "Apresentar Selo Compartilha: Formação Docente & Apoio Gestão" },
  { id: 35000005, nome: "Liceu Objetivo 5", uf: "PR", municipio: "Curitiba", regiao: "Sul", selo: "Uno", score: 96.0, alunos: 620, medio: 1, tech: 92.1, idhm: 0.823, acao: "Apresentar Selo Uno: Inovação & Plataforma Tecnológica" },
  { id: 35000006, nome: "Academia Anchieta 6", uf: "RS", municipio: "Porto Alegre", regiao: "Sul", selo: "Farias Brito", score: 90.3, alunos: 920, medio: 1, tech: 74.8, idhm: 0.805, acao: "Apresentar Selo Farias Brito: Rigor Acadêmico & ENEM" },
  { id: 35000007, nome: "Colégio Progresso 7", uf: "BA", municipio: "Salvador", regiao: "Nordeste", selo: "Kepler", score: 79.2, alunos: 180, medio: 0, tech: 28.0, idhm: 0.759, acao: "Apresentar Selo Kepler: Expansão Acessível & Ticket Popular" },
  { id: 35000008, nome: "Instituto Integral 8", uf: "PE", municipio: "Recife", regiao: "Nordeste", selo: "Uno", score: 88.7, alunos: 490, medio: 1, tech: 84.5, idhm: 0.772, acao: "Apresentar Selo Uno: Inovação & Plataforma Tecnológica" },
  { id: 35000009, nome: "Escola Nossa Senhora 9", uf: "CE", municipio: "Fortaleza", regiao: "Nordeste", selo: "Farias Brito", score: 95.2, alunos: 1100, medio: 1, tech: 78.9, idhm: 0.754, acao: "Apresentar Selo Farias Brito: Rigor Acadêmico & ENEM" },
  { id: 35000010, nome: "Centro Educacional Alfa 10", uf: "DF", municipio: "Brasília", regiao: "Centro-Oeste", selo: "Compartilha", score: 93.0, alunos: 1650, medio: 1, tech: 76.2, idhm: 0.824, acao: "Apresentar Selo Compartilha: Formação Docente & Apoio Gestão" },
  { id: 35000011, nome: "Liceu Fênix 11", uf: "GO", municipio: "Goiânia", regiao: "Centro-Oeste", selo: "Kepler", score: 81.0, alunos: 210, medio: 0, tech: 31.0, idhm: 0.799, acao: "Apresentar Selo Kepler: Expansão Acessível & Ticket Popular" },
  { id: 35000012, nome: "Academia Vanguard 12", uf: "SC", municipio: "Florianópolis", regiao: "Sul", selo: "Uno", score: 92.4, alunos: 540, medio: 1, tech: 89.0, idhm: 0.847, acao: "Apresentar Selo Uno: Inovação & Plataforma Tecnológica" },
  { id: 35000013, nome: "Colégio Elite 13", uf: "SP", municipio: "São José dos Campos", regiao: "Sudeste", selo: "Farias Brito", score: 93.6, alunos: 780, medio: 1, tech: 75.0, idhm: 0.807, acao: "Apresentar Selo Farias Brito: Rigor Acadêmico & ENEM" },
  { id: 35000014, nome: "Instituto Exponencial 14", uf: "MG", municipio: "Uberlândia", regiao: "Sudeste", selo: "Compartilha", score: 87.9, alunos: 1250, medio: 1, tech: 69.1, idhm: 0.789, acao: "Apresentar Selo Compartilha: Formação Docente & Apoio Gestão" },
  { id: 35000015, nome: "Escola Saber 15", uf: "AM", municipio: "Manaus", regiao: "Norte", selo: "Kepler", score: 78.5, alunos: 290, medio: 0, tech: 29.5, idhm: 0.737, acao: "Apresentar Selo Kepler: Expansão Acessível & Ticket Popular" },
  { id: 35000016, nome: "Centro Futuro 16", uf: "PA", municipio: "Belém", regiao: "Norte", selo: "Uno", score: 86.3, alunos: 430, medio: 1, tech: 81.2, idhm: 0.746, acao: "Apresentar Selo Uno: Inovação & Plataforma Tecnológica" }
];
