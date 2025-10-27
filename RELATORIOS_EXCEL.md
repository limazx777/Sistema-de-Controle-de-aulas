# 📊 Relatórios em Excel - Sistema de Controle de Aulas

## 🎉 Nova Funcionalidade: Exportação para Excel!

O sistema agora gera relatórios profissionais em formato **Excel (.xlsx)** com múltiplas abas tabeladas!

---

## 📋 Tipos de Exportação

### 1️⃣ Relatório Mensal Completo

**Como usar:**
1. Vá na aba **"Relatórios"**
2. Selecione o **mês** e **ano**
3. Clique em **"📊 Gerar Relatório Excel"**
4. O arquivo `relatorio_MM_AAAA.xlsx` será baixado

**O que contém:**

#### 📑 Aba 1: Resumo
- Título do relatório
- Período (mês/ano)
- Data de geração
- Totais gerais:
  - Total de Turmas
  - Total de Professores
  - Total de Disciplinas
  - Total de Salas
  - Total de Aulas Cadastradas

#### 📑 Aba 2: Escala de Aulas
Tabela completa com todas as aulas:
| # | Turma | Professor | Disciplina | Sala | Dia da Semana | Horário Início | Horário Fim | Semanas |
|---|-------|-----------|------------|------|---------------|----------------|-------------|---------|
| 1 | Turma A | João Silva | Matemática | Sala 101 | Segunda-feira | 08:00 | 10:00 | 1ª, 2ª, 3ª, 4ª |

#### 📑 Aba 3: Turmas
Lista de todas as turmas cadastradas:
| ID | Nome | Data de Criação |
|----|------|-----------------|

#### 📑 Aba 4: Professores
Lista de todos os professores cadastrados:
| ID | Nome | Data de Criação |
|----|------|-----------------|

#### 📑 Aba 5: Disciplinas
Lista de todas as disciplinas cadastradas:
| ID | Nome | Data de Criação |
|----|------|-----------------|

#### 📑 Aba 6: Salas
Lista de todas as salas cadastradas:
| ID | Nome | Data de Criação |
|----|------|-----------------|

---

### 2️⃣ Exportar Planilha Completa

**Como usar:**
1. Vá na aba **"Relatórios"**
2. Clique em **"📊 Exportar Todas as Aulas (Excel)"**
3. O arquivo `escala_completa_AAAA-MM-DD.xlsx` será baixado

**O que contém:**

Uma única aba com **TODAS as aulas** cadastradas no sistema:

| Turma | Professor | Disciplina | Sala | Dia da Semana | Horário Início | Horário Fim | Semanas | Data de Cadastro |
|-------|-----------|------------|------|---------------|----------------|-------------|---------|------------------|
| Turma A | João Silva | Matemática | Sala 101 | Segunda-feira | 08:00 | 10:00 | 1ª, 2ª, 3ª, 4ª | 25/10/2025 |

**Ideal para:**
- Visualização rápida de toda a escala
- Impressão
- Compartilhamento
- Análise de dados

---

## 🎨 Recursos do Excel

### ✅ Colunas Ajustadas Automaticamente
- Larguras otimizadas para melhor visualização
- Não precisa ajustar manualmente

### ✅ Formato Profissional
- Cabeçalhos claros
- Dados organizados em tabelas
- Fácil de ler e imprimir

### ✅ Múltiplas Abas
- Informações separadas por categoria
- Navegação fácil entre abas
- Tudo em um único arquivo

### ✅ Compatível com Excel e Google Sheets
- Abra no Microsoft Excel
- Abra no Google Sheets
- Abra no LibreOffice Calc
- Formato universal (.xlsx)

---

## 💡 Dicas de Uso

### Para Impressão:
1. Abra o arquivo Excel
2. Vá na aba desejada
3. Ajuste zoom se necessário
4. Imprima (Ctrl+P)

### Para Edição:
- Você pode editar o Excel livremente
- Adicionar cores, filtros, gráficos
- Fazer cálculos adicionais
- Formatar como preferir

### Para Compartilhamento:
- Envie por email
- Compartilhe no Google Drive
- Imprima e distribua
- Formato universal, todos podem abrir

---

## 📊 Exemplos de Uso

### Caso 1: Relatório Mensal para Coordenação
```
1. Selecione o mês atual
2. Gere o relatório Excel
3. Abra e revise as 6 abas
4. Envie para a coordenação
```

### Caso 2: Escala Completa para Professores
```
1. Clique em "Exportar Todas as Aulas"
2. Abra a planilha
3. Filtre por professor (se quiser)
4. Imprima ou compartilhe
```

### Caso 3: Análise de Dados
```
1. Gere o relatório mensal
2. Abra no Excel
3. Use as abas separadas para análises
4. Crie gráficos e relatórios personalizados
```

---

## 🔧 Tecnologia Utilizada

**Biblioteca:** SheetJS (xlsx.js)
- Biblioteca JavaScript open-source
- Funciona 100% no navegador
- Não precisa de servidor
- Gera arquivos Excel reais (.xlsx)

**CDN:** https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js

---

## ⚠️ Observações

### Requisitos:
- ✅ Navegador moderno (Chrome, Edge, Firefox)
- ✅ JavaScript habilitado
- ✅ Conexão com internet (apenas para carregar a biblioteca)

### Limitações:
- ❌ Não funciona em navegadores muito antigos
- ❌ Precisa de internet na primeira vez (para carregar biblioteca)

### Dicas:
- 💾 Salve os relatórios Excel como backup
- 📅 Gere relatórios mensalmente
- 🔄 Use a planilha completa para visão geral
- 📊 Personalize no Excel após exportar

---

## 🎯 Resumo Rápido

| Recurso | Arquivo Gerado | Quando Usar |
|---------|----------------|-------------|
| **Relatório Mensal** | `relatorio_MM_AAAA.xlsx` | Relatórios mensais completos com 6 abas |
| **Planilha Completa** | `escala_completa_AAAA-MM-DD.xlsx` | Exportar todas as aulas em uma tabela |
| **Backup JSON** | `dados.json` | Backup completo do sistema |

---

## ✨ Vantagens do Excel

✅ **Profissional**: Formato aceito em qualquer empresa/escola
✅ **Editável**: Pode personalizar após exportar
✅ **Imprimível**: Qualidade perfeita para impressão
✅ **Compartilhável**: Todos podem abrir
✅ **Organizado**: Múltiplas abas separadas por categoria
✅ **Automático**: Colunas ajustadas automaticamente

---

**Agora seus relatórios são profissionais e prontos para uso! 🎉**
