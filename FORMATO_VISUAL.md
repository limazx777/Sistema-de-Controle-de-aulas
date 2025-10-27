# 📋 Formato Visual de Relatórios - Estilo Grade

## 🎨 Novo Formato Implementado!

O sistema agora gera relatórios no **formato visual em grade**, similar a um cartão de aula, com fundo verde e layout profissional!

---

## 📊 Como Funciona

### Exportação Visual

**Botão:** "📊 Exportar Todas as Aulas (Excel)"

**Resultado:** Arquivo `escala_visual_AAAA-MM-DD.xlsx`

**Formato:** Uma aba para cada aula cadastrada

---

## 🎯 Layout de Cada Aula

```
┌─────────────────────────────────────────────────────┐
│ TURMA: Turma A              │ SAB TARDE             │
├─────────────────────────────────────────────────────┤
│ PROF: João Silva                                    │
├─────────────────────────────────────────────────────┤
│ DISCIPLINA: Matemática                              │
├─────────────────────────────────────────────────────┤
│ ENCONTRO │ 1º        │ 2º        │ 3º        │ 4º  │
│          │ 06/09/2025│ 13/09/2025│ 20/09/2025│27/09│
├─────────────────────────────────────────────────────┤
│ SALA 101 - HORÁRIO: 14:00 ÀS 17:00                 │
└─────────────────────────────────────────────────────┘
```

---

## ✨ Características

### 🎨 Visual
- ✅ **Fundo verde** (#00B050) em todas as células
- ✅ **Texto em negrito** e centralizado
- ✅ **Bordas pretas** em todas as células
- ✅ **Células mescladas** para melhor organização

### 📅 Datas Automáticas
- Calcula automaticamente os **próximos 4 encontros**
- Baseado no dia da semana cadastrado
- Formato brasileiro (DD/MM/AAAA)

### 🕐 Período do Dia
- **MANHÃ**: Horários antes das 12h
- **TARDE**: Horários entre 12h e 18h
- **NOITE**: Horários após 18h

### 📑 Organização
- **Uma aba por aula**
- Nome da aba: `1_Matemática`, `2_Português`, etc.
- Fácil navegação entre aulas

---

## 📋 Estrutura do Arquivo

### Exemplo: 3 aulas cadastradas

```
escala_visual_2025-10-25.xlsx
├── Aba 1: 1_Matemática
│   └── Grade visual completa
├── Aba 2: 2_Português
│   └── Grade visual completa
└── Aba 3: 3_História
    └── Grade visual completa
```

---

## 🔧 Informações Exibidas

### Linha 1: Cabeçalho
- **Turma** (mesclado em 2 colunas)
- **Dia da Semana + Período** (ex: SAB TARDE)

### Linha 2: Professor
- Label "PROF:"
- Nome do professor (mesclado em 4 colunas)

### Linha 3: Disciplina
- Label "DISCIPLINA:"
- Nome da disciplina (mesclado em 4 colunas)

### Linha 4: Encontros
- Cabeçalho: ENCONTRO, 1º, 2º, 3º, 4º
- Datas calculadas automaticamente

### Linha 5: Rodapé
- Sala e horário completo (mesclado em 5 colunas)

---

## 💡 Como Usar

### Passo 1: Cadastrar Aulas
1. Cadastre turmas, professores, disciplinas e salas
2. Crie as aulas na aba "Escala de Aulas"

### Passo 2: Exportar
1. Vá na aba **"Relatórios"**
2. Clique em **"📊 Exportar Todas as Aulas (Excel)"**
3. Aguarde o download

### Passo 3: Abrir e Usar
1. Abra o arquivo Excel
2. Navegue pelas abas (uma por aula)
3. Imprima ou compartilhe

---

## 🖨️ Dicas para Impressão

### Configurações Recomendadas:
- **Orientação:** Paisagem (Landscape)
- **Ajustar:** 1 página de largura
- **Margens:** Estreitas
- **Qualidade:** Alta

### Para Melhor Resultado:
1. Abra o Excel
2. Selecione a aba desejada
3. Vá em Layout da Página
4. Ajuste para caber em 1 página
5. Imprima (Ctrl+P)

---

## 🎨 Personalização no Excel

Após exportar, você pode:

### Cores
- Mudar a cor de fundo verde
- Adicionar cores diferentes por tipo de aula
- Destacar informações importantes

### Texto
- Aumentar/diminuir tamanho da fonte
- Adicionar mais informações
- Incluir observações

### Layout
- Ajustar largura das colunas
- Adicionar mais linhas
- Incluir logotipo da instituição

---

## 📊 Comparação de Formatos

| Recurso | Relatório Mensal | Planilha Visual |
|---------|------------------|-----------------|
| **Formato** | 6 abas tabeladas | 1 aba por aula |
| **Layout** | Tabela tradicional | Grade visual |
| **Cores** | Sem cor | Fundo verde |
| **Uso** | Análise de dados | Impressão/Cartão |
| **Datas** | Não calcula | Calcula automaticamente |

---

## 🔄 Cálculo de Datas

### Como Funciona:
1. Sistema identifica o dia da semana da aula
2. A partir de hoje, busca as próximas 4 ocorrências
3. Exibe no formato DD/MM/AAAA

### Exemplo:
- **Aula:** Toda segunda-feira
- **Hoje:** 25/10/2025 (sexta)
- **Encontros calculados:**
  - 1º: 28/10/2025
  - 2º: 04/11/2025
  - 3º: 11/11/2025
  - 4º: 18/11/2025

---

## ⚠️ Observações

### Limitações:
- Sempre calcula 4 encontros (fixo)
- Não considera feriados
- Não considera semanas específicas cadastradas

### Recomendações:
- ✅ Use para impressão e distribuição
- ✅ Ideal para cartões de aula
- ✅ Perfeito para afixar em murais
- ✅ Ótimo para compartilhar com alunos

### Quando Usar:
- 📋 Criar cartões de aula individuais
- 🖨️ Imprimir e distribuir
- 📌 Afixar em quadros de avisos
- 📧 Enviar para professores específicos

---

## 🎯 Casos de Uso

### Caso 1: Cartão para Professor
```
1. Exportar todas as aulas
2. Abrir a aba da disciplina do professor
3. Imprimir apenas essa aba
4. Entregar ao professor
```

### Caso 2: Mural de Aulas
```
1. Exportar todas as aulas
2. Imprimir todas as abas
3. Recortar cada cartão
4. Afixar no mural da escola
```

### Caso 3: Envio por Email
```
1. Exportar todas as aulas
2. Enviar arquivo completo
3. Cada professor vê sua aba
```

---

## 🚀 Vantagens do Formato Visual

✅ **Visual Atrativo**: Fundo verde profissional
✅ **Fácil Leitura**: Layout em grade organizado
✅ **Pronto para Imprimir**: Formato ideal para papel
✅ **Datas Automáticas**: Não precisa calcular manualmente
✅ **Separado por Aula**: Uma aba por disciplina
✅ **Personalizável**: Edite no Excel após exportar

---

## 📝 Resumo

| Item | Descrição |
|------|-----------|
| **Botão** | "📊 Exportar Todas as Aulas (Excel)" |
| **Arquivo** | `escala_visual_AAAA-MM-DD.xlsx` |
| **Formato** | Grade visual com fundo verde |
| **Abas** | Uma por aula cadastrada |
| **Datas** | 4 próximos encontros calculados |
| **Uso** | Impressão, distribuição, murais |

---

**Agora você tem cartões de aula profissionais e visuais! 🎉📋**
