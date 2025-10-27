# ⏱️ Banco de Horas - Sistema de Controle de Aulas

## 🎯 Nova Funcionalidade Implementada!

O sistema agora possui **controle de banco de horas trabalhadas** pelos professores!

---

## 📋 Como Funciona

### 1️⃣ Cadastro de Aulas com Horas

Ao cadastrar uma aula na **Escala de Aulas**, você agora tem um novo campo:

**⏱️ Horas Trabalhadas**
- Digite quantas horas o professor trabalha **por encontro**
- Aceita valores decimais (ex: 2.5, 4, 6.5)
- Incremento de 0.5 horas
- Campo obrigatório

### 2️⃣ Cálculo Automático

O sistema calcula automaticamente:

**Horas por Encontro** × **Número de Semanas** = **Total Horas/Mês**

#### Exemplo:
```
Horas por Encontro: 4h
Semanas selecionadas: 1ª, 2ª, 3ª, 4ª (4 semanas)
Total Horas/Mês: 4h × 4 = 16h
```

---

## 📊 Visualização das Horas

### Na Lista de Aulas Cadastradas

Cada aula exibe:
- ⏱️ **Horas por Encontro**: Horas trabalhadas em cada aula
- 📊 **Total Horas/Mês**: Total de horas no mês

### Exemplo de Card:
```
┌─────────────────────────────────────┐
│ Matemática                      🗑️  │
├─────────────────────────────────────┤
│ Turma: Turma A                      │
│ Professor: João Silva               │
│ Sala: Sala 101                      │
│ Dia: Segunda-feira                  │
│ Horário: 08:00 - 12:00             │
│ Semanas: 1ª, 2ª, 3ª, 4ª           │
│ ⏱️ Horas por Encontro: 4h          │
│ 📊 Total Horas/Mês: 16h            │
└─────────────────────────────────────┘
```

---

## 📈 Relatórios Excel

### Relatório Mensal

O relatório mensal agora possui **7 abas**:

1. **Resumo** - Totais gerais
2. **Escala de Aulas** - Com colunas de horas
3. **Turmas** - Lista de turmas
4. **Professores** - Lista de professores
5. **Disciplinas** - Lista de disciplinas
6. **Salas** - Lista de salas
7. **Banco de Horas** - ⭐ NOVA ABA!

### Aba: Escala de Aulas

Agora inclui as colunas:
| # | Turma | Professor | Disciplina | Sala | Dia | Início | Fim | **Horas/Encontro** | **Total Horas/Mês** | Semanas |
|---|-------|-----------|------------|------|-----|--------|-----|-------------------|-------------------|---------|

### Aba: Banco de Horas ⭐

Resumo consolidado por professor:

| Professor | Total de Aulas | Total Horas/Mês |
|-----------|----------------|-----------------|
| João Silva | 3 | 48h |
| Maria Santos | 2 | 32h |
| Pedro Costa | 1 | 16h |
| **TOTAL GERAL** | **6** | **96h** |

**Recursos:**
- ✅ Agrupa todas as aulas por professor
- ✅ Soma total de aulas de cada professor
- ✅ Soma total de horas de cada professor
- ✅ Linha de total geral no final
- ✅ Ordenado alfabeticamente por nome

---

## 💡 Casos de Uso

### Caso 1: Controle de Carga Horária
```
Objetivo: Verificar se professor não ultrapassou limite
1. Gere o relatório mensal
2. Abra a aba "Banco de Horas"
3. Verifique o total de horas de cada professor
4. Compare com o limite estabelecido
```

### Caso 2: Pagamento de Professores
```
Objetivo: Calcular pagamento baseado em horas
1. Gere o relatório mensal
2. Abra a aba "Banco de Horas"
3. Use o total de horas para calcular pagamento
4. Exporte ou imprima para RH
```

### Caso 3: Distribuição de Carga
```
Objetivo: Equilibrar horas entre professores
1. Gere o relatório mensal
2. Abra a aba "Banco de Horas"
3. Identifique professores com poucas horas
4. Redistribua aulas conforme necessário
```

### Caso 4: Relatório para Gestão
```
Objetivo: Apresentar dados para coordenação
1. Gere o relatório mensal
2. Aba "Banco de Horas" mostra resumo executivo
3. Aba "Escala de Aulas" mostra detalhamento
4. Compartilhe o arquivo Excel
```

---

## 🔢 Exemplos de Cálculo

### Exemplo 1: Aula Semanal Completa
```
Disciplina: Matemática
Horas por Encontro: 4h
Semanas: 1ª, 2ª, 3ª, 4ª (4 semanas)
Total Horas/Mês: 4h × 4 = 16h
```

### Exemplo 2: Aula Quinzenal
```
Disciplina: Física
Horas por Encontro: 3h
Semanas: 1ª, 3ª (2 semanas)
Total Horas/Mês: 3h × 2 = 6h
```

### Exemplo 3: Aula com Meio Período
```
Disciplina: Inglês
Horas por Encontro: 2.5h
Semanas: 1ª, 2ª, 3ª, 4ª (4 semanas)
Total Horas/Mês: 2.5h × 4 = 10h
```

### Exemplo 4: Professor com Múltiplas Aulas
```
Professor: João Silva

Aula 1 - Matemática: 16h/mês
Aula 2 - Física: 12h/mês
Aula 3 - Química: 8h/mês

Total do Professor: 36h/mês
```

---

## 📊 Análises Possíveis

Com o banco de horas, você pode:

### 1. Análise por Professor
- Quem tem mais horas?
- Quem tem menos horas?
- Distribuição está equilibrada?

### 2. Análise por Período
- Comparar meses diferentes
- Identificar tendências
- Planejar próximos períodos

### 3. Análise Financeira
- Calcular custos com professores
- Projetar orçamento
- Controlar gastos

### 4. Análise de Capacidade
- Verificar disponibilidade
- Identificar sobrecarga
- Otimizar distribuição

---

## 🎯 Benefícios

### Para Gestores:
✅ **Controle Total**: Visão completa das horas trabalhadas
✅ **Tomada de Decisão**: Dados para redistribuir carga
✅ **Planejamento**: Previsão de custos e necessidades
✅ **Transparência**: Relatórios claros e profissionais

### Para RH/Financeiro:
✅ **Pagamento**: Base de cálculo para remuneração
✅ **Controle**: Verificação de limites contratuais
✅ **Histórico**: Registro de horas trabalhadas
✅ **Auditoria**: Dados organizados e rastreáveis

### Para Coordenação:
✅ **Equilíbrio**: Distribuição justa de carga
✅ **Qualidade**: Evitar sobrecarga de professores
✅ **Eficiência**: Otimização de recursos
✅ **Relatórios**: Dados para apresentações

---

## 📝 Campos no Sistema

### No Formulário de Cadastro:
- **Campo**: Horas Trabalhadas
- **Tipo**: Número decimal
- **Mínimo**: 0
- **Incremento**: 0.5
- **Obrigatório**: Sim
- **Descrição**: "Horas por encontro"

### No Card da Aula:
- **⏱️ Horas por Encontro**: Valor digitado
- **📊 Total Horas/Mês**: Calculado automaticamente

### No JSON (dados.json):
```json
{
  "aulas": [
    {
      "id": "...",
      "horasTrabalhadas": 4,
      "totalHorasMes": 16,
      ...
    }
  ]
}
```

---

## 🔄 Compatibilidade

### Aulas Antigas (sem horas):
- Exibem: 0h
- Não afetam cálculos
- Podem ser editadas (futura funcionalidade)

### Aulas Novas:
- Campo obrigatório
- Cálculo automático
- Incluídas em todos os relatórios

---

## 💡 Dicas de Uso

### Dica 1: Seja Consistente
- Use sempre a mesma unidade (horas)
- Considere intervalos se necessário
- Documente critérios de cálculo

### Dica 2: Revise Regularmente
- Gere relatório mensal
- Verifique banco de horas
- Ajuste distribuição se necessário

### Dica 3: Use para Planejamento
- Analise tendências
- Preveja necessidades
- Otimize recursos

### Dica 4: Compartilhe Dados
- Exporte relatórios
- Compartilhe com gestão
- Use para decisões estratégicas

---

## 📊 Resumo Rápido

| Recurso | Descrição |
|---------|-----------|
| **Campo** | Horas Trabalhadas (por encontro) |
| **Cálculo** | Horas × Semanas = Total/Mês |
| **Visualização** | Cards de aula + Relatórios |
| **Relatório** | Aba "Banco de Horas" |
| **Agrupamento** | Por professor |
| **Total** | Soma geral no final |

---

## ✨ Exemplo Completo

### Cadastro:
```
Turma: Enfermagem 2024.1
Professor: Dr. João Silva
Disciplina: Anatomia
Sala: Lab 03
Dia: Segunda-feira
Horário: 08:00 - 12:00
Horas Trabalhadas: 4h
Semanas: 1ª, 2ª, 3ª, 4ª
```

### Resultado:
```
✅ Aula cadastrada!
⏱️ Horas por Encontro: 4h
📊 Total Horas/Mês: 16h
```

### No Relatório (Banco de Horas):
```
Dr. João Silva | 1 aula | 16h/mês
```

---

**Agora você tem controle total sobre as horas trabalhadas pelos professores! ⏱️📊**
