# 🔧 Guia de Instalação - Sistema de Controle de Aulas

## ⚠️ Pré-requisito: Instalar Node.js

O sistema precisa do Node.js para funcionar. Siga os passos abaixo:

### 1️⃣ Baixar Node.js

1. Acesse: https://nodejs.org/
2. Baixe a versão **LTS (Long Term Support)** - recomendada
3. Execute o instalador baixado
4. Siga o assistente de instalação (clique em "Next" e aceite as opções padrão)
5. **Importante**: Marque a opção "Automatically install the necessary tools" se aparecer

### 2️⃣ Verificar Instalação

Após instalar, abra um **NOVO** terminal PowerShell e digite:

```bash
node --version
```

Deve aparecer algo como: `v18.17.0` ou similar

Depois digite:

```bash
npm --version
```

Deve aparecer algo como: `9.6.7` ou similar

### 3️⃣ Instalar Dependências do Sistema

No terminal, navegue até a pasta do projeto:

```bash
cd "c:\Users\Ild\Desktop\Sistema de Controle de aulas"
```

Depois instale as dependências:

```bash
npm install
```

Aguarde alguns minutos enquanto os pacotes são baixados.

### 4️⃣ Iniciar o Sistema

Após a instalação, inicie o servidor:

```bash
npm start
```

Você verá uma mensagem como:
```
Servidor rodando em http://localhost:3000
Banco de dados: C:\Users\Ild\Desktop\Sistema de Controle de aulas\database.json
Relatórios salvos em: C:\Users\Ild\Desktop\Sistema de Controle de aulas\relatorios
```

### 5️⃣ Acessar o Sistema

Abra seu navegador (Chrome, Edge, Firefox) e acesse:

```
http://localhost:3000
```

## ✅ Pronto!

O sistema está funcionando! Agora você pode:

1. Cadastrar turmas, professores, disciplinas e salas
2. Criar escalas de aulas
3. Gerar relatórios mensais em PDF

## 🔄 Para usar novamente

Sempre que quiser usar o sistema:

1. Abra o terminal na pasta do projeto
2. Execute: `npm start`
3. Acesse: http://localhost:3000

## ⚠️ Problemas Comuns

### "npm não é reconhecido"
- Você precisa instalar o Node.js primeiro (passo 1)
- Após instalar, feche e abra um NOVO terminal

### "Porta 3000 já está em uso"
- Feche outros programas que possam estar usando a porta 3000
- Ou altere a porta no arquivo `server.js` (linha 5)

### Navegador não abre a página
- Verifique se o servidor está rodando (deve aparecer a mensagem no terminal)
- Tente http://127.0.0.1:3000 ao invés de localhost

## 📞 Ajuda

Se tiver dúvidas, verifique:
- O terminal não deve ter mensagens de erro em vermelho
- O Node.js está instalado corretamente
- Você está na pasta correta do projeto

---

**Dica**: Mantenha o terminal aberto enquanto usa o sistema. Para parar o servidor, pressione `Ctrl + C` no terminal.
