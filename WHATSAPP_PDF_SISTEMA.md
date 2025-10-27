# 📱 Sistema WhatsApp com Anexos PDF - Documentação Completa

## 🎯 Visão Geral

O Sistema de Controle de Aulas agora inclui integração completa com WhatsApp, permitindo o envio automático de relatórios de aulas com anexos PDF. O sistema utiliza a biblioteca WPPConnect para conectar com o WhatsApp Web e enviar mensagens programaticamente.

## 🚀 Funcionalidades Implementadas

### ✅ **1. Conexão com WhatsApp**
- **Conexão via QR Code**: Escaneie o QR Code com seu celular
- **Status em tempo real**: Monitoramento do status da conexão
- **Reconexão automática**: Mantém a sessão ativa
- **Desconexão segura**: Encerra a conexão quando necessário

### ✅ **2. Geração Automática de PDFs**
- **Relatórios detalhados**: PDFs com informações completas da aula
- **Layout profissional**: Design limpo e organizado
- **Dados enriquecidos**: Turma, professor, disciplina, sala, horários
- **Limpeza automática**: PDFs temporários são removidos após envio

### ✅ **3. Envio de Mensagens**
- **Mensagens de texto**: Suporte a formatação (negrito, itálico)
- **Anexos PDF**: Relatórios completos em PDF
- **Mensagens personalizadas**: Texto customizado com anexos opcionais
- **Envio em lote**: Múltiplas aulas de uma vez

### ✅ **4. Interface Intuitiva**
- **Aba dedicada**: Interface específica para WhatsApp
- **Status visual**: Indicadores de conexão em tempo real
- **Formulários organizados**: Campos claros e intuitivos
- **Feedback imediato**: Notificações de sucesso/erro

## 📋 Como Usar

### 🔗 **Passo 1: Conectar WhatsApp**

1. **Acesse a aba "📱 WhatsApp"** na interface
2. **Clique em "🔗 Conectar WhatsApp"**
3. **Escaneie o QR Code** que aparece na tela com seu celular:
   - Abra o WhatsApp no celular
   - Vá em "Dispositivos conectados"
   - Escaneie o código QR
4. **Aguarde a conexão** - o status mudará para "Conectado"

### 📤 **Passo 2: Enviar Relatório de Aula**

1. **Preencha o formulário "Enviar Relatório de Aula"**:
   - **Número do WhatsApp**: Digite apenas números (ex: 11999999999)
   - **Selecionar Aula**: Escolha uma aula da lista
2. **Clique em "📤 Enviar Relatório com PDF"**
3. **Aguarde o envio** - você receberá notificação de sucesso

### 💬 **Passo 3: Enviar Mensagem Personalizada**

1. **Preencha o formulário "Enviar Mensagem Personalizada"**:
   - **Número do WhatsApp**: Digite apenas números
   - **Mensagem**: Digite sua mensagem (use *texto* para negrito)
   - **Anexar PDF** (opcional): Escolha uma aula para anexar
2. **Clique em "📤 Enviar Mensagem"**

### 📋 **Passo 4: Enviar Todas as Aulas**

1. **Preencha o formulário "Enviar Todas as Aulas"**:
   - **Número do WhatsApp**: Digite apenas números
   - **Incluir PDFs**: Marque se deseja anexar PDFs
2. **Clique em "📤 Enviar Todas as Aulas"**
3. **Confirme o envio** quando solicitado

### 🧪 **Passe 5: Testar Conexão**

1. **Clique em "🧪 Testar Conexão"**
2. **Digite um número** para teste
3. **Verifique se a mensagem chegou** no WhatsApp

## 🛠️ Configuração Técnica

### 📦 **Dependências Instaladas**

```bash
npm install @wppconnect-team/wppconnect pdfkit qrcode-terminal
```

### 🔧 **Arquivos Criados/Modificados**

#### **Novos Arquivos:**
- `whatsapp-sender.js` - Módulo principal do WhatsApp
- `pdfs/` - Pasta para PDFs temporários (criada automaticamente)

#### **Arquivos Modificados:**
- `server.js` - Rotas da API WhatsApp
- `public/index.html` - Interface do WhatsApp
- `public/styles.css` - Estilos específicos
- `public/app.js` - Funções JavaScript do WhatsApp

### 🌐 **Rotas da API**

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/whatsapp/conectar` | Conectar WhatsApp |
| `POST` | `/api/whatsapp/desconectar` | Desconectar WhatsApp |
| `GET` | `/api/whatsapp/status` | Obter status da conexão |
| `POST` | `/api/whatsapp/teste` | Enviar mensagem de teste |
| `POST` | `/api/whatsapp/enviar-relatorio` | Enviar relatório de aula |
| `POST` | `/api/whatsapp/enviar-mensagem` | Enviar mensagem personalizada |

## 📱 Formato das Mensagens

### 📄 **Relatório de Aula**

```
📚 *RELATÓRIO DE AULA*

Olá! Segue o relatório detalhado da aula:

📝 *Nome da Aula*
🏫 Instituição
📅 Data
⏰ Horário
📚 Disciplina
👥 Turma
📊 Carga Horária

📎 *Anexo:* Relatório completo em PDF

---
_Sistema de Controle de Aulas_
```

### 🧪 **Mensagem de Teste**

```
🧪 *TESTE DE CONEXÃO*

Olá! Esta é uma mensagem de teste do Sistema de Controle de Aulas.

✅ WhatsApp conectado com sucesso!
📱 Sistema funcionando normalmente

---
_Sistema de Controle de Aulas_
```

## 📄 Formato dos PDFs

### 🎨 **Layout do PDF**

- **Cabeçalho**: Título com logo do sistema
- **Informações da Aula**: Dados completos formatados
- **Horário Detalhado**: Início, fim e duração
- **Dias Trabalhados**: Lista dos dias (se aplicável)
- **Dados Adicionais**: Informações extras
- **Rodapé**: Data de geração

### 📊 **Conteúdo do PDF**

```
📚 RELATÓRIO DE AULA

INFORMAÇÕES DA AULA
📝 Nome: [Nome da Aula]
🏫 Instituição: [Instituição]
📅 Data: [Data]
⏰ Horário: [Horário]
📚 Disciplina: [Disciplina]
👥 Turma: [Turma]
📊 Carga Horária: [Horas] horas

HORÁRIO DETALHADO
🕐 Início: [Horário Início]
🕕 Fim: [Horário Fim]
⏱️ Duração: [Duração] minutos

DIAS QUE SERÃO TRABALHADOS
📅 [Lista de dias]

DADOS ADICIONAIS
[Informações extras]

Gerado em: [Data/Hora]
```

## ⚠️ Limitações e Considerações

### 🔒 **Segurança**
- **Números válidos**: Apenas números brasileiros (código 55)
- **Rate limiting**: 3 segundos entre envios para evitar spam
- **Sessão única**: Uma conexão por vez
- **PDFs temporários**: Removidos automaticamente após 30 segundos

### 📱 **Compatibilidade**
- **WhatsApp Web**: Requer WhatsApp Web ativo
- **Navegador**: Chrome, Firefox, Edge (recomendado)
- **Sistema**: Windows, Linux, macOS
- **Node.js**: Versão 14+ recomendada

### 🚫 **Restrições**
- **Número de envios**: Limitado pelo WhatsApp (evitar spam)
- **Tamanho do PDF**: Máximo 100MB (limite do WhatsApp)
- **Conexão**: Requer internet estável
- **Sessão**: Pode expirar após inatividade

## 🔧 Solução de Problemas

### ❌ **Problemas Comuns**

#### **1. QR Code não aparece**
- **Solução**: Aguarde alguns segundos e recarregue a página
- **Verificar**: Console do navegador para erros

#### **2. Conexão falha**
- **Solução**: Verifique se o WhatsApp Web está ativo
- **Verificar**: Internet estável e firewall

#### **3. Mensagem não enviada**
- **Solução**: Verifique se o número está correto (apenas números)
- **Verificar**: Status da conexão

#### **4. PDF não anexado**
- **Solução**: Verifique se a aula foi selecionada
- **Verificar**: Console do servidor para erros

### 🛠️ **Logs e Debug**

#### **Console do Navegador**
```javascript
// Verificar status
console.log(whatsappStatus);

// Verificar conexão
fetch('/api/whatsapp/status').then(r => r.json()).then(console.log);
```

#### **Console do Servidor**
```bash
# Iniciar com logs detalhados
DEBUG=* node server.js

# Verificar processos
ps aux | grep node
```

## 🚀 Próximos Passos

### 🔮 **Melhorias Futuras**

1. **Agendamento**: Envio programado de mensagens
2. **Templates**: Mensagens pré-definidas
3. **Grupos**: Envio para grupos do WhatsApp
4. **Histórico**: Log de mensagens enviadas
5. **Relatórios**: Estatísticas de envio
6. **Backup**: Sincronização com nuvem

### 📈 **Otimizações**

1. **Cache**: Armazenar PDFs gerados
2. **Compressão**: Reduzir tamanho dos PDFs
3. **Batch**: Envio em lotes otimizado
4. **Retry**: Tentativas automáticas em caso de falha

## 📞 Suporte

### 🆘 **Em caso de problemas:**

1. **Verifique os logs** do console
2. **Teste a conexão** com mensagem simples
3. **Reinicie o servidor** se necessário
4. **Verifique as dependências** instaladas

### 📧 **Contato**

Para suporte técnico ou dúvidas sobre o sistema WhatsApp, consulte a documentação principal do Sistema de Controle de Aulas.

---

**🎉 Sistema WhatsApp com Anexos PDF - Implementado com sucesso!**

*Desenvolvido para o Sistema de Controle de Aulas - ILEDE*
