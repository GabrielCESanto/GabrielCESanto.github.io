---
titulo: Project Data Siege · Visão computacional
resumo: Estatísticas de esports extraídas de vídeo. Um pipeline de visão computacional lê o HUD das transmissões de Rainbow Six Siege, gera os eventos de cada round e alimenta um modelo estrela e um Power BI.
area: ciencia
papel: Autor (projeto pessoal)
periodo: 2024 – 2026
stack: [Python, OpenCV, PaddleOCR, yt-dlp, PostgreSQL, Modelagem dimensional, Power BI]
metricas:
  - { valor: '10 VODs', rotulo: 'partidas profissionais processadas' }
  - { valor: '29+', rotulo: 'casos de regressão' }
  - { valor: '2–5 fps', rotulo: 'amostragem adaptativa' }
  - { valor: '22 tabelas', rotulo: 'no modelo estrela' }
icones: [mira, video, barras]
ordem: 3
destaque: true
---

## Contexto

O cenário competitivo brasileiro de Rainbow Six Siege não tem uma base pública de estatísticas por
round: quem matou quem, com qual arma, quais operadores foram banidos, quais gadgets foram usados.
Esses dados existem só na tela, no HUD das transmissões.

O projeto começou como um Power BI alimentado à mão e evoluiu para um **pipeline de visão
computacional** que assiste ao VOD e extrai os eventos sozinho.

## Modelo de dados

O destino dos eventos é um **modelo estrela** (Kimball): fatos no grão de partida, mapa, round, kill e
desempenho do jogador por round, com dimensões de jogador, time, organização, operador, arma e mapa.
A `bridge_team_roster` guarda o histórico de escalação com `date_in`/`date_out`, uma dimensão que
muda com o tempo.

![Modelo entidade-relacionamento do Project Data Siege](/img/data-siege/mer.webp)

## Arquitetura do pipeline

```mermaid
flowchart TD
  V[VOD · MP4 ou URL] -->|yt-dlp| S[Amostrador de frames<br/>fps adaptativo, 1 seek]
  S --> P{Pipeline por frame}
  P -->|replay?| X[descarta]
  P --> RT[Round, timer e placar<br/>voto majoritário]
  P --> KF[Kill feed<br/>OCR + ícones de arma]
  P --> CD[Cards dos jogadores<br/>operador, K/D/A]
  P --> GD[Gadgets e bans<br/>template matching]
  RT & KF & CD & GD --> REG[Registro de eventos<br/>dedup + validação de roster]
  REG --> REL[Relatório round a round<br/>+ CSV de revisão]
  REG --> DB[(PostgreSQL<br/>modelo estrela)]
  DB --> BI[Power BI]
```

**Amostragem adaptativa.** Decodificar o vídeo inteiro a 30 fps é inviável, e uma taxa fixa baixa
perde kills. A taxa do próximo frame depende do estado do jogo:

| Situação | Taxa |
|---|---|
| Sem timer na tela, replay | 0,1 fps |
| Ação, de 2:59 a 1:00 | 2 fps |
| Ação, de 0:58 a 0:11 | 3 fps |
| Últimos 10 segundos | 5 fps |

Ao detectar a faixa "WON ROUND", o pipeline relê **todos** os frames dos 6 segundos anteriores: a kill
que fecha o round às vezes fica legível por só 3 frames.

## Visão computacional, peça por peça

Não existe API com os eventos da partida: tudo sai dos **pixels do HUD**. Cada elemento da tela tem
uma região de interesse calibrada e uma técnica própria, escolhida pelo tipo de informação:

| Elemento do HUD | Técnica | O problema que resolve |
|---|---|---|
| Timer, placar e nº do round | **OCR** (PaddleOCR em GPU) nos recortes + **voto majoritário** em janela deslizante | Uma leitura errada isolada não muda o estado; round só avança de 1 em 1 |
| Kill feed | OCR dos nomes, **template matching** do ícone da arma (pool filtrado pelo loadout do operador) e do marcador de headshot | ~116 armas com ícones parecidos; nomes conferidos contra a escalação para barrar kills fantasmas |
| Cards dos jogadores | Template matching do ícone do operador, restrito por lado (ataque/defesa) e pelos bans | Operador, K/D/A e portador do defuser; releitura em 4 momentos do round |
| Bans | Catálogo próprio de silhuetas + detecção do marcador "proibido" | O ícone de ban tem estilo diferente do card |
| Gadgets | **Janela deslizante** sobre a faixa de gadgets e classificação de cada *pip* em ativo, inativo ou destruído | Ordem e quantidade mudam a cada round; o painel da direita é espelhado |
| Replay | Brilho médio do frame **e** proporção de pixels brancos no centro (o "R" do replay) | A câmera de drone ao vivo escurece a tela quase como um replay (brilho 28,2 × 27,3) |
| Mapa | Localizações lidas nos cards viram votos contra uma tabela de *callouts* | Uma ou duas rodadas bastam para identificar o mapa |

**Generalizar entre transmissões.** Os templates capturados de uma transmissão correlacionavam mal
com outras (scores de 0,14 a 0,33 para a arma certa). A correção foi um catálogo com **várias amostras
por ícone**, cada uma confirmada no gabarito. Esse mesmo catálogo rotulado é o ponto de partida para
treinar um detector supervisionado.

## Qualidade: gabarito manual e regressão

A validação é feita contra um **gabarito**: assisto ao VOD, anoto o que aconteceu e comparo com o
relatório. Cada divergência vira uma investigação de causa raiz, uma correção e um **caso de
regressão** com o frame real como fixture. Alguns exemplos:

- **Tela de pausa técnica** fazia o placar ser lido sem timer. O voto majoritário derivava "round 8"
  no início da partida e travava. Correção: placar e round só valem quando o timer está legível no
  mesmo frame.
- **Câmera de drone ao vivo** escurece a tela como um replay. O pipeline baixava a amostragem e perdia
  uma kill. Correção: o detector de replay passou a exigir o ícone central do replay.
- **Nomes de OCR-lixo fossilizados** no corretor de roster deixavam passar kills fantasmas. Lição
  registrada: uma correção que só cobre a fonte *vazia* não cobre a fonte *corrompida*.

## Resultados

- 10 partidas profissionais processadas em lote (45 a 110 min por VOD, em GPU).
- Relatório round a round com kills, headshots, bans, gadgets e conciliação entre o card oficial e o
  kill feed.
- Dashboard em Power BI com ranking de jogadores (K/D, KOST, KPR), mapas e operadores mais escolhidos
  e vitórias por lado. [Ver o dashboard](/#data-siege).

## Próximos passos

- Trocar parte do template matching por **detecção supervisionada (YOLO)**, começando pelos gadgets,
  usando os gabaritos como dataset rotulado.
