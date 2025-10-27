# 📚 Sistema de Controle de Aulas

Sistema completo para gerenciamento de escalas de aulas com cadastro de turmas, professores, disciplinas, salas e geração automática de relatórios mensais.

## 🎉 NOVO: Sistema 100% Offline!

**Não precisa mais de servidor Node.js!** Agora o sistema funciona diretamente no navegador.

## 🚀 Funcionalidades

- ✅ **Cadastro Unificado**: Adicione turma, professor, disciplina e sala de uma vez
- ✅ **Escala de Aulas**: Sistema completo de agendamento com:
  - Seleção de turma, professor, disciplina e sala
  - Definição de dia da semana
  - Horários de início e fim
  - Seleção de semanas do mês (1ª, 2ª, 3ª, 4ª)
- ✅ **Relatórios Excel**: Geração automática de relatórios mensais em formato .xlsx
- ✅ **Exportação Completa**: Exporte todas as aulas em planilha Excel tabelada
- ✅ **Backup JSON**: Baixe todos os dados em formato JSON
- ✅ **Armazenamento Automático**: Dados salvos no navegador (localStorage)
- ✅ **100% Offline**: Funciona sem internet

## 📋 Pré-requisitos

**NENHUM!** Apenas um navegador web (Chrome, Edge, Firefox, etc.)

## ▶️ Como Usar

### Método Simples:

1. Abra o arquivo `public/index.html` no seu navegador
   - Clique duas vezes no arquivo, OU
   - Arraste para o navegador, OU
   - Botão direito > Abrir com > Navegador

2. Pronto! O sistema está funcionando! 🎉

### Não precisa instalar nada!

## 📖 Guia de Uso

### 1. Cadastro Unificado
- Acesse a aba **"Cadastros"**
- Preencha os 4 campos de uma vez:
  - 🎓 Turma
  - 👨‍🏫 Professor
  - 📖 Disciplina
  - 🚪 Sala
- Clique em **"✅ Adicionar Todos os Dados"**
- Os itens aparecerão nas listas abaixo
- Clique no ícone 🗑️ para remover itens

### 2. Criar Escala de Aulas
- Acesse a aba **"Escala de Aulas"**
- Preencha todos os campos:
  - Selecione a turma
  - Selecione o professor
  - Selecione a disciplina
  - Selecione a sala
  - Escolha o dia da semana
  - Defina horário de início e fim
  - Marque as semanas do mês (1ª, 2ª, 3ª, 4ª)
- Clique em **"Cadastrar Aula"**
- A aula aparecerá na lista abaixo

### 3. Gerar Relatórios e Exportar Dados
- Acesse a aba **"Relatórios"**
- **Para relatório mensal em Excel**:
  - Selecione o mês e ano
  - Clique em **"📊 Gerar Relatório Excel"**
  - Arquivo .xlsx com 6 abas será baixado:
    - Resumo
    - Escala de Aulas
    - Turmas
    - Professores
    - Disciplinas
    - Salas
- **Para exportar todas as aulas**:
  - Clique em **"📊 Exportar Todas as Aulas (Excel)"**
  - Planilha completa tabelada será baixada
- **Para backup dos dados**:
  - Clique em **"📥 Baixar dados.json"**
  - Guarde este arquivo em local seguro

## 📁 Estrutura de Arquivos

```
Sistema de Controle de aulas/
├── public/               ← PASTA PRINCIPAL
│   ├── index.html       ← Abra este arquivo!
│   ├── app.js           ← JavaScript (necessário)
│   └── styles.css       ← Estilos (necessário)
├── README.md            # Documentação
├── SEM_SERVIDOR.md      # Guia detalhado do novo sistema
└── server.js            # (Não é mais necessário)
```

**Importante**: Mantenha os 3 arquivos da pasta `public/` juntos!

## 💾 Armazenamento de Dados

### LocalStorage (Automático)
- Os dados são salvos automaticamente no navegador
- Permanecem mesmo após fechar o navegador
- Específicos para cada navegador

### Arquivo dados.json (Backup Manual)
- Baixe na aba "Relatórios"
- Clique em "📥 Baixar dados.json"
- Guarde em local seguro (pen drive, nuvem, etc.)

**Formato do JSON**:
```json
{
  "turmas": [...],
  "professores": [...],
  "disciplinas": [...],
  "salas": [...],
  "aulas": [...],
  "ultimaAtualizacao": "2025-10-25T11:00:00.000Z"
}
```

**Importante**: Faça backup do JSON regularmente!

## 📊 Relatórios Excel

Os relatórios são gerados em formato **Excel (.xlsx)** profissional e incluem:

### Relatório Mensal (`relatorio_MM_AAAA.xlsx`)
- **6 abas organizadas**:
  1. Resumo geral com totais
  2. Escala de aulas tabelada
  3. Lista de turmas
  4. Lista de professores
  5. Lista de disciplinas
  6. Lista de salas
- Colunas ajustadas automaticamente
- Formato profissional para impressão

### Planilha Completa (`escala_completa_AAAA-MM-DD.xlsx`)
- Todas as aulas em uma única tabela
- Ideal para visualização rápida
- Pronto para imprimir e compartilhar

**Compatível com:** Excel, Google Sheets, LibreOffice Calc

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Armazenamento**: LocalStorage + JSON Export
- **Geração Excel**: SheetJS (xlsx.js) - Biblioteca open-source
- **100% Client-Side**: Sem necessidade de servidor

## 🎨 Interface

- Design moderno e responsivo
- Cores vibrantes e interface intuitiva
- Sistema de abas para organização
- Notificações toast para feedback
- Totalmente em português

## ⚠️ Observações

- **Não precisa de servidor**: Funciona diretamente no navegador
- **Dados por navegador**: Use sempre o mesmo navegador ou faça backup
- **Limpar cache**: Se limpar o navegador, os dados serão perdidos
- **Backup**: Baixe o `dados.json` regularmente
- **Portabilidade**: Leve a pasta `public/` para qualquer computador

## 🆘 Suporte

Se encontrar problemas:
1. Verifique se está abrindo o arquivo `public/index.html`
2. Tente outro navegador (Chrome, Edge, Firefox)
3. Pressione F12 e veja o Console para erros
4. Certifique-se de que os 3 arquivos estão na pasta `public/`

## 📝 Licença

Este projeto é de uso livre para fins educacionais e comerciais.

---

Desenvolvido com ❤️ para facilitar o controle de aulas
