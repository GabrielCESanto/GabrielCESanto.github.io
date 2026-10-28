// Painéis do Power BI publicados com "Publicar na Web" (públicos, sem login).
// Vieram de https://sites.google.com/view/gabs-dashboards. Para incluir outro, copie o link
// "app.powerbi.com/view?r=..." de Arquivo > Inserir relatório > Publicar na Web.
import type { NomeIcone } from '../components/icones';

export type Dashboard = {
  id: string;
  titulo: string;
  contexto: string;
  descricao: string;
  destaques: string[];
  ferramenta: string;
  url: string;
  icones: NomeIcone[];
  projeto?: string; // slug do estudo de caso relacionado
};

export const dashboards: Dashboard[] = [
  {
    id: 'data-siege',
    titulo: 'Project Data Siege',
    contexto: 'Esports · projeto pessoal',
    descricao:
      'Desempenho de jogadores e equipes nos campeonatos nacionais de Rainbow Six Siege: mapas jogados, ranking de jogadores e comparação direta entre jogadores e times.',
    destaques: [
      'Operadores e mapas mais escolhidos',
      '% de vitórias por lado (ataque × defesa)',
      'K/D, KOST, KPR e plants por jogador',
      'Resultados das últimas partidas',
    ],
    ferramenta: 'Power BI · modelo estrela',
    url: 'https://app.powerbi.com/view?r=eyJrIjoiOTI4MzAxNWEtZWNhNS00ZGNmLWFjMzYtZDhiZmUzMjcyOTNjIiwidCI6IjJlNDg4MGU0LWI2NzYtNDAyOS1hNjM4LTBlNTFkYmMzMzYxYiJ9',
    icones: ['mira', 'barras', 'pizza'],
    projeto: 'data-siege',
  },
  {
    id: 'dre',
    titulo: 'DRE — Demonstrativo de Resultados',
    contexto: 'Finanças · contábil e gerencial',
    descricao:
      'Adaptação de um caso profissional para portfólio: receitas, custos, despesas e lucro líquido, com análise vertical e horizontal.',
    destaques: [
      'Receita bruta e líquida',
      'Lucro bruto e líquido',
      'Despesas, deduções e impostos',
      'Análise vertical e horizontal',
    ],
    ferramenta: 'Power BI · DAX',
    url: 'https://app.powerbi.com/view?r=eyJrIjoiOTg2ZTUyNzUtNjkyZS00OWY2LWFjODQtMDIzZWQ0N2VjNGQ0IiwidCI6IjJlNDg4MGU0LWI2NzYtNDAyOS1hNjM4LTBlNTFkYmMzMzYxYiJ9',
    icones: ['planilha', 'cifrao', 'linha'],
  },
  {
    id: 'despesas',
    titulo: 'Análise de Despesas',
    contexto: 'Finanças · controle de gastos',
    descricao:
      'Adaptação de um caso profissional para acompanhar gastos em detalhe, do faturamento até a subcategoria de despesa.',
    destaques: [
      'Despesas × faturamento',
      'Despesas por categoria e subcategoria',
      'Funil e cascata de despesas',
    ],
    ferramenta: 'Power BI · DAX',
    url: 'https://app.powerbi.com/view?r=eyJrIjoiNzg1OTRkNWEtZjZhYS00ZDE0LWJlNGUtZmYzNGMwZjg0NjgwIiwidCI6IjJlNDg4MGU0LWI2NzYtNDAyOS1hNjM4LTBlNTFkYmMzMzYxYiJ9',
    icones: ['funil', 'pizza', 'cifrao'],
  },
];

// BIs feitos como aplicação web (código próprio, sem Power BI).
export const paineisWeb = [
  {
    titulo: 'SISU Lens · TCC',
    descricao:
      'O Power BI do meu TCC reescrito como site: 51,2 milhões de inscrições do SISU (2014–2023) consultadas direto no navegador com DuckDB-WASM.',
    icones: ['formatura', 'barras', 'mapa'] as NomeIcone[],
    projeto: 'sisu-lens',
    ferramenta: 'React · ECharts · DuckDB-WASM · Parquet',
  },
];
