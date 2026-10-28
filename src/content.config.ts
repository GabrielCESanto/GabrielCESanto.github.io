import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { nomesIcones } from './components/icones';

// Cada arquivo em src/content/projetos/ é um estudo de caso.
// O modelo comentado está em docs/modelos/estudo-de-caso.md.
const projetos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projetos' }),
  schema: z.object({
    titulo: z.string(),
    resumo: z.string(),
    // Eixo principal do projeto: define o filtro e a cor da etiqueta.
    area: z.enum(['engenharia', 'ciencia', 'bi', 'backend', 'ia']),
    papel: z.string(),
    periodo: z.string(),
    stack: z.array(z.string()),
    metricas: z.array(z.object({ valor: z.string(), rotulo: z.string() })).default([]),
    links: z
      .object({ repo: z.string().url().optional(), site: z.string().url().optional() })
      .default({}),
    // Capa do card: 1 ícone principal + até 2 satélites (nomes em src/components/icones.ts).
    icones: z.array(z.enum(nomesIcones)).min(1).max(3),
    selo: z.string().optional(),
    ordem: z.number().default(99),
    destaque: z.boolean().default(false),
    // Rascunhos não entram no build: use enquanto o texto tiver campos a preencher.
    rascunho: z.boolean().default(false),
  }),
});

export const collections = { projetos };
