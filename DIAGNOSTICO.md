# 🔍 Diagnóstico de Erros - Sistema de Controle de Aulas

## ✅ Correções Aplicadas

Identifiquei e corrigi os seguintes problemas no código:

### 1. **Tratamento de Erros Melhorado**
- ✅ Adicionado `try-catch` no formulário de cadastro
- ✅ Mensagens de erro mais claras
- ✅ Supressão de mensagens individuais (modo silencioso)

### 2. **Validação de Resposta do Servidor**
- ✅ Verificação se `response.ok` antes de processar
- ✅ Lançamento de erro se a resposta não for bem-sucedida

## 🚨 Possíveis Causas de Erro

### ❌ Erro 1: "Servidor não está rodando"

**Sintoma**: Ao clicar em "Adicionar Todos os Dados", aparece erro de conexão.

**Causa**: O servidor Node.js não foi iniciado.

**Solução**:
1. Abra o terminal na pasta do projeto
2. Execute: `npm start`
3. Aguarde a mensagem: "Servidor rodando em http://localhost:3000"
4. Tente cadastrar novamente

---

### ❌ Erro 2: "npm não é reconhecido"

**Sintoma**: Ao tentar rodar `npm start`, aparece erro.

**Causa**: Node.js não está instalado.

**Solução**:
1. Baixe o Node.js: https://nodejs.org/
2. Instale a versão LTS
3. Feche e abra um NOVO terminal
4. Execute: `npm install`
5. Depois: `npm start`

---

### ❌ Erro 3: "Cannot find module 'express'"

**Sintoma**: Servidor não inicia, erro de módulo não encontrado.

**Causa**: Dependências não foram instaladas.

**Solução**:
```bash
npm install
```

---

### ❌ Erro 4: "Port 3000 is already in use"

**Sintoma**: Servidor não inicia, porta já está em uso.

**Causa**: Outro programa está usando a porta 3000.

**Solução 1** - Fechar o processo existente:
```bash
# No PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

**Solução 2** - Mudar a porta no `server.js`:
```javascript
const PORT = 3001; // Linha 8
```

---

### ❌ Erro 5: "CORS Error"

**Sintoma**: Erro de CORS no console do navegador.

**Causa**: Problema de configuração de segurança.

**Solução**: Já está configurado no servidor com `app.use(cors())`.
Se persistir, acesse pelo mesmo endereço: http://localhost:3000

---

## 🧪 Como Testar se Está Funcionando

### Teste 1: Verificar se o servidor está rodando
```bash
# No navegador, acesse:
http://localhost:3000
```
✅ Deve abrir a página do sistema

### Teste 2: Verificar API
```bash
# No navegador, acesse:
http://localhost:3000/api/turmas
```
✅ Deve mostrar: `[]` (array vazio) ou lista de turmas

### Teste 3: Cadastrar dados
1. Preencha todos os campos
2. Clique em "Adicionar Todos os Dados"
3. ✅ Deve aparecer: "✅ Todos os dados foram adicionados com sucesso!"
4. ✅ Os itens devem aparecer nas listas abaixo

---

## 🔧 Checklist de Verificação

Antes de usar o sistema, verifique:

- [ ] Node.js está instalado (`node --version`)
- [ ] Dependências instaladas (`npm install`)
- [ ] Servidor está rodando (`npm start`)
- [ ] Navegador aberto em `http://localhost:3000`
- [ ] Console do navegador sem erros (F12 > Console)

---

## 📝 Console do Navegador

Para ver erros detalhados:

1. Pressione **F12** no navegador
2. Vá na aba **Console**
3. Tente cadastrar novamente
4. Veja se aparece algum erro em vermelho

**Erros comuns**:
- `Failed to fetch` = Servidor não está rodando
- `404 Not Found` = Rota incorreta (verifique o código)
- `500 Internal Server Error` = Erro no servidor (veja o terminal)

---

## 🆘 Ainda com Problemas?

Se o erro persistir:

1. **Feche o navegador completamente**
2. **Pare o servidor** (Ctrl+C no terminal)
3. **Reinicie o servidor** (`npm start`)
4. **Abra o navegador novamente**
5. **Limpe o cache** (Ctrl+Shift+Delete)
6. **Tente novamente**

---

## 📞 Informações Úteis

- **URL do Sistema**: http://localhost:3000
- **Porta do Servidor**: 3000
- **Banco de Dados**: `database.json` (na pasta do projeto)
- **Relatórios**: pasta `relatorios/`

---

**Última atualização**: Código corrigido com melhor tratamento de erros e mensagens mais claras.
