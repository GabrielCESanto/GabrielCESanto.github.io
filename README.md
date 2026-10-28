# Portfólio · Gabriel Carvalho

Site pessoal com estudos de caso de engenharia de dados, ciência de dados, BI e back-end.
Publicado em **https://gabrielcesanto.github.io** (GitHub Pages).

**Stack:** [Astro 5](https://astro.build) (gera HTML estático), Markdown para os estudos de caso,
Mermaid para os diagramas e GitHub Actions para publicar.

## Rodar localmente

Requer Node 20 ou mais novo.

```bash
npm install
npm run dev        # http://localhost:4321 (mostra também os rascunhos)
npm run build      # gera dist/ (sem os rascunhos)
npm run preview    # serve o dist/ para conferir antes de publicar
```

## Onde fica cada coisa

| Caminho | O que é |
|---|---|
| `src/content/projetos/*.md` | **Estudos de caso.** Um arquivo por projeto; o nome do arquivo vira a URL (`/projetos/<nome>`) |
| `src/data/dashboards.ts` | Painéis do Power BI (links "Publicar na Web") e BIs web |
| `src/data/perfil.ts` | Nome, cargo, frase e links (LinkedIn, GitHub, WhatsApp) |
| `src/pages/` | Páginas: início, projetos, dashboards, arquitetura, sobre |
| `src/pages/sobre.astro` | Experiência, formação e stack (edite a lista no topo do arquivo) |
| `src/components/icones.ts` | Ícones usados nas capas dos cards (campo `icones` de cada projeto) |
| `public/img/` | Foto e imagens usadas dentro dos estudos de caso (prefira `.webp` com até 1400 px) |
| `docs/` | Guia de documentação e modelos para os outros repositórios |
| `perfil/README.md` | README do perfil do GitHub (vai para o repositório `GabrielCESanto/GabrielCESanto`) |

## Adicionar um projeto

1. Copie [`docs/modelos/estudo-de-caso.md`](docs/modelos/estudo-de-caso.md) para
   `src/content/projetos/<nome-do-projeto>.md`.
2. Preencha o cabeçalho (`titulo`, `resumo`, `area`, `stack`, `metricas`, `icones`…). O esquema está em
   `src/content.config.ts` e o build acusa campo faltando ou com tipo errado.
3. Diagramas: escreva um bloco ` ```mermaid ` no texto. Prefira `flowchart TB` quando houver mais de
   5 caixas em sequência; `LR` largo fica pequeno demais.
4. Enquanto houver texto a completar, deixe `rascunho: true`: o projeto aparece no `npm run dev`
   com uma etiqueta vermelha e não vai para o site publicado.

## Adicionar um dashboard do Power BI

No Power BI Service: **Arquivo → Inserir relatório → Publicar na Web (público)** e copie o link
`https://app.powerbi.com/view?r=...`. Acrescente um item em `src/data/dashboards.ts`.

> "Publicar na Web" deixa o relatório **público para qualquer pessoa**. Use só com dados
> fictícios, abertos ou anonimizados, nunca com dados da empresa.

## Publicar

O workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) compila e publica a cada
push na `main`. Configuração única no GitHub: **Settings → Pages → Source: GitHub Actions**.
