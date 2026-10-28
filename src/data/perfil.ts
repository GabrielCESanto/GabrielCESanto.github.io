// Dados pessoais e links usados em várias páginas. Edite aqui, não nas páginas.
export const perfil = {
  nome: 'Gabriel Carvalho do Espírito Santo',
  nomeCurto: 'Gabriel Carvalho',
  cargo: 'Coordenador de Dados',
  frase:
    'Construo pipelines, modelos e painéis que transformam dados públicos e de negócio em decisão, do CSV bruto ao dashboard no ar.',
  foto: '/img/gabriel.webp',
  local: 'Londrina · PR',
  links: {
    github: 'https://github.com/GabrielCESanto',
    linkedin: 'https://www.linkedin.com/in/gabs-dados',
    whatsapp: 'https://wa.me/5543996316782',
  },
};

export const areas = {
  engenharia: { rotulo: 'Engenharia de dados', cor: 'var(--c-eng)' },
  ciencia: { rotulo: 'Ciência de dados', cor: 'var(--c-ds)' },
  bi: { rotulo: 'BI', cor: 'var(--c-bi)' },
  backend: { rotulo: 'Back-end', cor: 'var(--c-be)' },
  ia: { rotulo: 'IA aplicada', cor: 'var(--c-ia)' },
} as const;
