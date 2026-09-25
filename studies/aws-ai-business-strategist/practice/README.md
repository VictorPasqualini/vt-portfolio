# Banco de questões AIB-C01

Um arquivo por domínio: [d1](d1.md) · [d2](d2.md) · [d3](d3.md) · [d4](d4.md).

## Regras do banco

- **Só questões originais.** Nada copiado ou adaptado de perto do Skill Builder, do Exam Prep ou de simulados pagos. O repositório é público.
- Cenário e alternativas **em inglês**, como na prova. Explicação **em português**, dizendo por que a certa está certa e por que cada distratora está errada.
- Cada questão é marcada com a skill do exam guide (`Skill 2.2.3`), o que permite medir o desempenho por skill em [progress.md](../progress.md).
- A letra certa varia. Nenhum padrão de posição, e a alternativa certa não é sistematicamente a mais longa.
- Os distratores seguem os erros típicos da prova: resposta técnica demais (fora do escopo), tecnologia antes do problema, bloquear em vez de governar, pular etapas de maturidade.

## Formato

```markdown
### D2-014

`Skill 2.2.4` · Multiple choice

<cenário em inglês>

- **A.** ...
- **B.** ...
- **C.** ...
- **D.** ...

<details><summary>Resposta</summary>

**B.** explicação em português.

</details>
```

- **Multiple choice**: 4 alternativas, 1 correta.
- **Multiple response**: o enunciado diz quantas escolher (*Select TWO.*), 5 alternativas ou mais, e só pontua acertando todas.
- IDs sequenciais por domínio (`D1-001`, `D1-002`...). Uma questão nunca muda de ID, para o histórico continuar valendo.

## Composição dos simulados

Proporcional aos pesos oficiais:

| Domínio | Peso | Simulado GA (60) | Simulado beta (85) |
|---|---|---|---|
| D1 AI Fundamentals and Literacy | 24% | 15 | 20 |
| D2 AI Strategy and Business Value Creation | 28% | 17 | 24 |
| D3 AI Governance and Responsible AI Leadership | 24% | 14 | 21 |
| D4 Business Readiness, Leadership, and AI Transformation | 24% | 14 | 20 |

Cerca de 1 em cada 5 questões é multiple response. Tempo: 130 min para 60 questões, 170 min para 85.

Enquanto o banco for menor que um simulado, o Claude completa com questões novas escritas na hora, seguindo as mesmas regras. As boas entram no banco depois.

## Como usar

Com o skill `study` (ver [studies/README.md](../../README.md)):

- `/study quiz d3 10`: 10 questões do domínio 3, uma por vez.
- `/study quiz fracos`: prioriza as skills com mais erro no histórico.
- `/study simulado ga` ou `/study simulado beta`: prova completa, correção por domínio no fim.

Para estudar sozinho, basta ler o arquivo do domínio com as respostas fechadas e abrir cada `Resposta` depois de decidir.
