# 🚀 Como Iniciar o Sistema

## ✅ AGORA OS DADOS SÃO SALVOS NO ARQUIVO `dados.json`!

### 📍 Mudança Importante:

**ANTES**: Dados salvos apenas no LocalStorage do navegador
**AGORA**: Dados salvos no arquivo `dados.json` no servidor

---

## 🎯 Como Usar

### Passo 1: Iniciar o Servidor

Abra o terminal na pasta do projeto e execute:

```bash
node server.js
```

Você verá:
```
Servidor rodando em http://localhost:3000
Banco de dados: C:\Users\Ild\Desktop\Sistema de Controle de aulas\dados.json
Relatórios salvos em: C:\Users\Ild\Desktop\Sistema de Controle de aulas\relatorios
```

### Passo 2: Abrir o Sistema

Abra seu navegador e acesse:
```
http://localhost:3000
```

### Passo 3: Usar Normalmente

✅ Cadastre turmas, professores, disciplinas, salas e aulas
✅ **TUDO será salvo automaticamente no arquivo `dados.json`**
✅ Não precisa fazer backup manual!

---

## 📁 Onde os Dados Ficam

### Arquivo Principal:
```
c:\Users\Ild\Desktop\Sistema de Controle de aulas\dados.json
```

### Estrutura do Arquivo:
```json
{
  "turmas": [...],
  "professores": [...],
  "disciplinas": [...],
  "salas": [...],
  "aulas": [...]
}
```

---

## 🔄 Como Funciona

### Fluxo de Salvamento:

```
Você cadastra algo
    ↓
Sistema envia para o servidor (API)
    ↓
Servidor salva no arquivo dados.json
    ↓
Dados persistidos no disco! ✅
```

### Fluxo de Carregamento:

```
Você abre o sistema
    ↓
Sistema busca dados do servidor
    ↓
Servidor lê o arquivo dados.json
    ↓
Dados carregados na tela! ✅
```

---

## ✨ Vantagens do Novo Sistema

### 1. Persistência Real
- ✅ Dados salvos em arquivo físico
- ✅ Não depende do navegador
- ✅ Não some ao limpar cache

### 2. Backup Automático
- ✅ Arquivo `dados.json` é o backup
- ✅ Pode copiar para qualquer lugar
- ✅ Pode versionar com Git

### 3. Portabilidade
- ✅ Funciona em qualquer navegador
- ✅ Funciona em qualquer computador
- ✅ Basta ter o arquivo `dados.json`

### 4. Segurança
- ✅ Dados no servidor, não no navegador
- ✅ Backup físico no disco
- ✅ Controle total dos dados

---

## 🔧 Comandos Úteis

### Iniciar o Servidor:
```bash
node server.js
```

### Parar o Servidor:
```
Ctrl + C (no terminal)
```

### Verificar se está rodando:
```
Abra: http://localhost:3000
```

---

## 📋 Checklist de Uso Diário

### Ao Começar o Dia:
1. ✅ Abra o terminal
2. ✅ Execute `node server.js`
3. ✅ Abra `http://localhost:3000`
4. ✅ Use normalmente!

### Ao Terminar o Dia:
1. ✅ Feche o navegador
2. ✅ Pressione Ctrl+C no terminal
3. ✅ Seus dados estão salvos em `dados.json`!

---

## 🆘 Solução de Problemas

### Erro: "Erro ao carregar dados"
**Causa**: Servidor não está rodando
**Solução**: Execute `node server.js`

### Erro: "EADDRINUSE"
**Causa**: Porta 3000 já está em uso
**Solução**: Feche outros servidores ou mude a porta no `server.js`

### Dados não aparecem
**Causa**: Arquivo `dados.json` vazio ou não existe
**Solução**: O servidor cria automaticamente na primeira vez

### Servidor não inicia
**Causa**: Node.js não instalado ou dependências faltando
**Solução**: 
```bash
npm install
node server.js
```

---

## 💾 Backup Manual

### Como fazer backup:

1. **Copie o arquivo `dados.json`**
   ```
   c:\Users\Ild\Desktop\Sistema de Controle de aulas\dados.json
   ```

2. **Cole em local seguro**
   - Google Drive
   - OneDrive
   - Pen Drive
   - Outro computador

### Como restaurar backup:

1. **Substitua o arquivo `dados.json`**
2. **Reinicie o servidor**
3. **Pronto!**

---

## 🎯 Resumo

### O que mudou:
- ❌ **Antes**: LocalStorage (navegador)
- ✅ **Agora**: dados.json (arquivo físico)

### O que você precisa fazer:
1. ✅ Iniciar o servidor (`node server.js`)
2. ✅ Abrir o navegador (`http://localhost:3000`)
3. ✅ Usar normalmente!

### O que acontece automaticamente:
- ✅ Dados salvos em `dados.json`
- ✅ Backup em LocalStorage (redundância)
- ✅ Persistência garantida!

---

**Agora seus dados estão seguros no arquivo `dados.json`! 💾✨**
