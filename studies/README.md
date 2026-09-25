# Estudos de certificação

Trilhas, notas, bancos de questões e histórico de simulados das certificações em preparação. Cada certificação tem a própria pasta, todas com a mesma estrutura.

| Certificação | Código | Status | Pasta |
|---|---|---|---|
| AWS Certified AI Business Strategist | AIB-C01 | Em estudo (beta a partir de 29/09/2026) | [aws-ai-business-strategist](aws-ai-business-strategist/) |

## Estrutura de cada pasta

- `README.md`: o exame em si (formato, domínios e pesos, datas, escopo, links oficiais).
- `study-plan.md`: a trilha semana a semana, com checklist dos cursos e os marcos de simulado.
- `notes/`: uma nota por domínio do exame, organizada pelas tasks e skills do exam guide.
- `practice/`: banco de questões por domínio, no formato da prova, com gabarito comentado.
- `progress.md`: histórico de quizzes e simulados, e os pontos fracos em aberto.
- `_raw/`: material bruto (PDFs, slides, prints). Fica só na máquina local, fora do git.

## Sobre o material de origem

Este repositório é público. Slides e guias de eventos da AWS vêm marcados como "Amazon Confidential", e as questões oficiais do Skill Builder têm direitos reservados, então nada disso entra aqui literalmente: as notas são reescritas com palavras próprias e as questões do banco são originais. O material bruto vai para `_raw/`, que está no `.gitignore`.

Cada afirmação nas notas carrega a fonte de onde veio (exam guide, kickoff, sessão ao vivo, curso ou complemento). O que está marcado como complemento é conhecimento geral que ainda precisa ser confirmado contra o curso oficial.

## Como estudar com o Claude

O skill [`study`](../.claude/skills/study/SKILL.md) define o fluxo. Pedidos em linguagem natural funcionam, e também os atalhos:

| Pedido | O que acontece |
|---|---|
| `/study conteudo` + material colado | vira nota no domínio certo, marca o curso na trilha e gera questões novas sobre ele |
| `/study quiz d2 10` | 10 questões do domínio 2, uma por vez, com correção comentada |
| `/study quiz fracos` | questões das skills com mais erro no histórico |
| `/study simulado beta` | prova completa com os pesos oficiais (85 questões no beta, 60 no GA) |
| `/study revisar RAG vs fine-tuning` | explicação curta com o ângulo da prova e perguntas de checagem |
| `/study status` | cursos feitos, evolução das notas, pontos fracos e próximo passo |
