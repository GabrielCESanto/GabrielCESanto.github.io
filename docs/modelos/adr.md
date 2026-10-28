# NNNN · Título curto da decisão (no imperativo)

<!-- Salve como docs/decisoes/0001-usar-parquet-no-r2.md. Um arquivo por decisão; não edite
     decisões antigas: se mudar de ideia, crie uma nova que "substitui a 0001". -->

- **Data:** 2026-10-27
- **Status:** aceita · substituída por NNNN · descartada

## Contexto

O que está acontecendo e qual restrição força uma escolha. Volume, custo, prazo, equipe, LGPD.

## Opções consideradas

1. **Opção A:** prós / contras
2. **Opção B:** prós / contras
3. **Opção C:** prós / contras

## Decisão

Escolhemos **B** porque... (o critério que desempatou).

## Consequências

- O que ficou mais fácil.
- O que ficou mais difícil ou ficou como dívida.
- Quando reavaliar (ex.: "se passar de 1 TB" ou "se o site precisar de escrita").

---

## Exemplo real (SISU Lens)

**0001 · Ligar SISU e ENEM pela combinação das 5 notas**

- **Contexto:** o SISU traz onde a pessoa se inscreveu; o ENEM traz o perfil socioeconômico. O
  número de inscrição vem mascarado (LGPD) e não liga as duas bases.
- **Opções:** (1) nº de inscrição: não casa; (2) nome + data de nascimento: o ENEM não traz nome e
  seria um uso indevido de dado pessoal; (3) as 5 notas como chave composta: contínuas, quase
  nunca se repetem (16 combinações repetidas em 3,9 milhões no ENEM 2018).
- **Decisão:** opção 3, com as notas convertidas para inteiro (× 10) e combinações repetidas
  marcadas como `ambiguo`, sem perfil.
- **Consequências:** mais de 99,5% das inscrições ligadas em todas as edições. A junção linha a linha
  permite reidentificação, então a camada prata fica só local e o público vê apenas agregados com
  supressão de grupos menores que 5.
