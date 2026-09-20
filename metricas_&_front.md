Página 1: Visão Executiva & Segmentação de Mercado (TAM/SAM)
Objetivo: Oferecer um diagnóstico macro da distribuição das escolas privadas brasileiras e o tamanho de mercado endereçável para cada um dos quatro selos.

Topo (Filtros Globais & KPIs)
Barra Superior de Filtros: UF / Região, Faixa de Porte de Alunos, Município e Faixa de Renda/IDHM.

Linha de Cartões (KPIs Primários):

Total de Escolas Privadas: Volume total mapeado (Total Escolas).

Alunos Impactáveis: Soma da matrícula total estimada (Total Matrículas).

Share dos Selos (% Total): 4 micro-cartões em linha com a distribuição percentual de cada selo (Kepler %, Uno %, Farias Brito %, Compartilha %).

Score Médio de Aderência do Cluster: Medida de silhueta ou distância média ao centróide (Confiança do Match).

Corpo Central (2 Colunas)
Esquerda (Distribuição & Perfil dos Selos):

Gráfico de Donut / Barras Empilhadas: Escolas por Selo Recomendado, com cores padronizadas:

Kepler: Laranja / Terracota (mercado popular e expansão acessível).

Uno: Roxo / Azul Elétrico (tecnologia e inovação).

Farias Brito: Azul Marinho escuro (tradição, vestibulares e alto rigor acadêmico).

Compartilha: Verde Esmeralda (autonomia, formação e comunidade docente).

Gráfico de Dispersão (Scatter Plot): Eixo X: Índice Socioeconômico/IDHM do Município; Eixo Y: Score de Infraestrutura/Tecnologia; Tamanho da Bolha: Total de Alunos; Cor: Selo.

Direita (Distribuição Geográfica):

Mapa de Calor / Formas (Shape Map / Azure Map): Concentração de escolas privadas coloridas pelo selo dominante por município/microrregião, destacando polos de expansão para cada solução.

Página 2: Comparativo Multidimensional & Diagnóstico dos Clusters
Objetivo: Justificar tecnicamente o enquadramento de cada cluster, permitindo que a equipe pedagógica e de produtos entenda as características estruturais de cada grupo.

Grid Analítico (4 Quadrantes)
Quadrante 1 (Radar / Gráfico de Barras Clusterizadas): Vetores dos Selos

Comparativo das médias padronizadas (0 a 100) para cada cluster:

Índice Tech (Banda larga, computadores/aluno, lousa digital).

Índice Acadêmico/Médio (Salas de ciências, oferta EM, taxa de aprovação).

Índice Docente/Coordenação (Corpo docente superior/pós, presença de bibliotecas e coordenação).

Índice Renda/Acessibilidade (Nível socioeconômico da microrregião).

Quadrante 2: Oferta Tecnológica (Destaque Uno vs. Kepler)

Gráfico de colunas 100% empilhadas comparando a adoção de:

Internet Banda Larga.

Dispositivos para alunos.

Lousa / Equipamentos interativos.

Quadrante 3: Rigor Acadêmico & Ensino Médio (Destaque Farias Brito)

Gráfico de distribuição (Boxplot ou Barras) comparando:

Proporção de escolas com Ensino Médio ativo.

Média de laboratórios de ciências por unidade.

Quadrante 4: Autonomia & Estrutura Docente (Destaque Compartilha)

Gráfico de barras horizontais ordenadas por cluster mostrando:

Taxa de professores com formação continuada/superior.

Presença de coordenadores e equipes de apoio à gestão pedagógica.

Página 3: Direcionamento Comercial & Oportunidades (Prospects)
Objetivo: Ferramenta operacional para os consultores de expansão identificarem escolas específicas para abordagem.

Filtros Locais & Régua de Oportunidade
Filtro de Aderência: Sliders de distância mínima ao cluster (probabilidade de conversão alta/média).

Tabela Detalhada com Formatação Condicional:

Colunas: Nome da Escola, Município/UF, Selo Recomendado, Aderência (%), Total Alunos, Oferta EM (Sim/Não), Score Tech, Ação Sugerida.

Barras de dados internas para as métricas de score, facilitando a leitura rápida.

Painel Lateral de Drill-through / Tooltip Customizado:

Ao passar o mouse sobre a escola, exibe um cartão com:

Principais carências da escola (ex: baixa tecnologia → oportunidade de suporte da plataforma Uno; foco em aprovação sem material de ponta → proposta Farias Brito).

Contato / Endereço registrado no Censo.

Modelo de Medidas DAX Recomendadas
Snippet de código
// 1. Totalizadores
Total Escolas = COUNTROWS(d_escola)

Total Matriculas = SUM(f_censo_metricas[QT_MATRICULAS])

// 2. Distribuição Percentual de Escolas por Selo
% Escolas por Selo = 
DIVIDE(
    [Total Escolas],
    CALCULATE([Total Escolas], ALL(d_cluster_selo))
)

// 3. Índice Tecnológico Médio (Normalizado 0-100)
Indice Tech = 
AVERAGEX(
    f_censo_metricas,
    (f_censo_metricas[IN_BANDA_LARGA] * 0.3 + 
     f_censo_metricas[IN_EQUIP_LOUSA_DIGITAL] * 0.3 + 
     f_censo_metricas[SCORE_COMPUTADOR_ALUNO] * 0.4) * 100
)

// 4. Índice Acadêmico Médio (Foco Farias Brito)
Indice Academico = 
AVERAGEX(
    f_censo_metricas,
    (f_censo_metricas[IN_MEDIO] * 0.5 + 
     f_censo_metricas[IN_LABORATORIO_CIENCIAS] * 0.5) * 100
)