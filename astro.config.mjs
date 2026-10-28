// @ts-check
import { defineConfig } from 'astro/config';

// Site de usuário do GitHub Pages (repositório GabrielCESanto.github.io): serve na raiz, sem `base`.
export default defineConfig({
  site: 'https://gabrielcesanto.github.io',
  trailingSlash: 'ignore',
  // O site virou página única; os endereços antigos levam à seção correspondente.
  redirects: {
    '/projetos': '/#projetos',
    '/dashboards': '/#dashboards',
    '/arquitetura': '/#arquitetura',
    '/sobre': '/#sobre',
  },
  markdown: {
    // Blocos ```mermaid saem crus e viram diagrama no navegador (ver Base.astro).
    syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
});
