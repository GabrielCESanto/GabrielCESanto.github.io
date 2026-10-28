# Como documentar back-end, engenharia e arquitetura de dados

Um dashboard se mostra com um print. Engenharia não: um pipeline bem feito é invisível quando
funciona. Quem avalia (recrutador técnico, gestor, banca) quer ver **como você pensa**. Esse
raciocínio aparece em quatro tipos de documento, cada um com um papel.

| Documento | Onde mora | Pergunta que responde | Quem lê |
|---|---|---|---|
| **Estudo de caso** | portfólio (`src/content/projetos/`) | Qual era o problema, o que você decidiu e o que mudou? | Recrutador, gestor (5 min) |
| **README do repositório** | raiz de cada repo | O que é, como funciona e como eu rodo? | Engenheiro que abre o código |
| **Documento de arquitetura** | `docs/ARQUITETURA.md` no repo | Como as peças se encaixam, e por quê? | Quem vai manter ou entrevistar |
| **Registro de decisão (ADR)** | `docs/decisoes/NNNN-titulo.md` | Por que X e não Y, e o que isso custou? | Você daqui a 1 ano, o time, a entrevista |

O portfólio é a vitrine e cada estudo de caso aponta para o repositório. O repositório traz o README e
a pasta `docs/`, com a profundidade técnica.

## 1. O que separa um documento sênior de um júnior

Os documentos de júnior listam tecnologias. Os de sênior mostram **trade-offs e evidência**:

1. **Alternativa descartada.** "Usei Parquet" é uma informação. "Usei Parquet + DuckDB-WASM em vez
   de uma API com Postgres porque o painel é público, não tem orçamento e o navegador lê só os blocos
   de que precisa" é uma decisão. Toda decisão relevante tem a coluna *Alternativa descartada*.
2. **Número de referência externo.** Como você sabe que o dado está certo? "18 de 20 edições batem
   exatamente com a tabela publicada no TCC" vale mais que "fiz validações".
3. **Limitações conhecidas.** Um pipeline sem limitações documentadas só não foi testado o bastante.
   Listar o que não funciona passa confiança, não fraqueza.
4. **Impacto em unidade de negócio:** horas por mês, reais, dias de atraso, nº de pessoas atendidas.
   "88% menos tempo" fica melhor como "de 6 h para 40 min por fechamento".
5. **Diagrama que mostra o fluxo**, não um amontoado de logos: fonte → camadas → validação →
   consumo, com o que roda onde e quando.

## 2. Como mostrar o trabalho da empresa sem expor a empresa

O pipeline com Prefect, MinIO e DuckDB é o seu maior diferencial e não pode ser publicado. Duas
peças resolvem:

**a) Estudo de caso anonimizado** (já criado como rascunho em `src/content/projetos/drogamais.md`).
Conta o problema, a arquitetura, as decisões, a gestão do time e o resultado em números, sem nomes de
sistemas internos, fornecedores, valores de venda ou prints com dados reais. Confirme com a empresa o
que pode ser dito.

**b) Repositório de referência público**, que recomendo como próximo projeto. Recrie a **mesma
arquitetura** com dados abertos:

```
pipeline-referencia/            (nome sugerido: lakehouse-local ou dados-abertos-cvm)
├── docker-compose.yml          Prefect server + worker, MinIO
├── flows/                      extração (API CVM/B3), bronze → prata → ouro em DuckDB
├── tests/                      pytest + testes de dados (contagens, unicidade, domínios)
├── docs/ARQUITETURA.md
├── docs/decisoes/0001-...md    ADRs
└── README.md
```

Ele mostra exatamente o que você faz no trabalho, roda com `docker compose up` e coincide com o
**mês 5 do seu plano** (pipeline medalhão com dados da CVM/B3). Depois, a mesma base migra para
Databricks no plano de cloud: o mesmo projeto conta a evolução local → nuvem.

## 3. Situação dos repositórios

Em 27/10/2026 ficaram **públicos** só o `duo-mariel`, o `zatti` (o site do cliente depende do
GitHub Pages gratuito, que exige repositório público) e o `GabrielCESanto.github.io` (este
portfólio). Os demais estão privados, e o portfólio conta esses projetos pelos estudos de caso, sem
link para o código.

| Repositório | Situação | Antes de tornar público de novo |
|---|---|---|
| `duo-mariel` | Público, README completo | Fixar no perfil |
| `sisu-lens` | Privado | Adicionar licença (MIT para o código) e publicar o site |
| `Project-Data-Siege` | Privado, sem README; o `cv_pipeline` não está versionado | Versionar o `cv_pipeline` (já tem README, ARQUITETURA e VALIDACAO), manter vídeos fora do git |
| `Problema_N-Cifras` | Privado, `README.txt` vazio | `README.md` com as 3 versões (sequencial, paralela, distribuída) e a tabela de tempos |
| `Analise-de-Inscritos---TCC` | Privado | README apontando para o SISU Lens |
| `repertorio-show`, `Conexao_solidaria` | Privados; os sites do GitHub Pages saíram do ar | Nada, a menos que queira os sites de volta |
| `Projeto_Mobile-BuildBuddy` | Privado e vazio | Pode ser apagado |

**Para quem pedir o código numa entrevista:** dá para conceder acesso de leitura a um repositório
privado (Settings → Collaborators) só para quem está avaliando, sem torná-lo público.

## 4. Modelos

- [`modelos/estudo-de-caso.md`](modelos/estudo-de-caso.md): para o portfólio
- [`modelos/README-projeto-dados.md`](modelos/README-projeto-dados.md): para a raiz de cada repo
- [`modelos/adr.md`](modelos/adr.md): um registro de decisão

## 5. Rotina

- **A cada projeto novo:** README antes do primeiro push público; estudo de caso quando houver
  resultado.
- **A cada decisão difícil:** um ADR de 10 linhas na hora. Escrever depois não funciona.
- **Revisão trimestral do plano:** atualizar métricas do portfólio e do currículo com os mesmos
  números.
