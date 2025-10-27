# 🖼️ Instruções para Adicionar a Logo

## ⚠️ Ação Necessária

O sistema está configurado para usar a logo **`logo-ilede.png`**, mas o arquivo precisa ser adicionado manualmente.

---

## 📋 Como Adicionar a Logo

### Passo 1: Salvar a Logo Original
1. Você tem a logo original da ILEDE (a imagem amarela que me mostrou)
2. Salve essa imagem como **`logo-ilede.png`**

### Passo 2: Colocar na Pasta Correta
1. Copie o arquivo `logo-ilede.png`
2. Cole na pasta: `c:\Users\Ild\Desktop\Sistema de Controle de aulas\public\`
3. O arquivo deve ficar em: `public/logo-ilede.png`

### Passo 3: Verificar
1. Abra o arquivo `index.html` no navegador
2. A logo deve aparecer no cabeçalho
3. Se não aparecer, pressione F12 e veja se há erro no Console

---

## 📁 Estrutura de Arquivos

```
Sistema de Controle de aulas/
└── public/
    ├── index.html
    ├── app.js
    ├── styles.css
    └── logo-ilede.png  ← ADICIONE ESTE ARQUIVO AQUI
```

---

## 🎨 Especificações da Logo

### Formato Recomendado:
- **Formato**: PNG (com fundo transparente)
- **Tamanho**: Mínimo 300x300 pixels
- **Qualidade**: Alta resolução
- **Fundo**: Transparente (recomendado)

### Alternativas:
- PNG com fundo branco
- JPG (se não tiver transparência)
- SVG (formato vetorial)

---

## 🔧 Se a Logo Não Aparecer

### Verifique:
1. ✅ O arquivo está na pasta `public/`
2. ✅ O nome é exatamente `logo-ilede.png` (minúsculas)
3. ✅ O arquivo não está corrompido
4. ✅ O navegador foi atualizado (Ctrl+F5)

### Teste no Console:
1. Pressione F12 no navegador
2. Vá na aba "Console"
3. Veja se há erro tipo: "Failed to load resource: logo-ilede.png"

---

## 💡 Solução Temporária (Sem Logo)

Se você quiser usar o sistema sem logo por enquanto, você pode:

### Opção 1: Remover a Logo do HTML
Edite o arquivo `index.html` e remova a linha:
```html
<img src="logo-ilede.png" alt="Logo ILEDE" class="logo">
```

### Opção 2: Usar um Placeholder
Substitua por um emoji ou texto:
```html
<div class="logo-text">📚 ILEDE</div>
```

---

## 🎯 Formato Atual do Cabeçalho

```html
<header>
    <img src="logo-ilede.png" alt="Logo ILEDE" class="logo">
    <div class="header-text">
        <h1>Sistema de Controle de Aulas</h1>
        <p class="subtitle">ILEDE - Educação Sem Fronteiras</p>
    </div>
</header>
```

---

## 📝 Resumo

**O que você precisa fazer:**
1. Pegue a logo original da ILEDE (imagem amarela)
2. Salve como `logo-ilede.png`
3. Coloque na pasta `public/`
4. Atualize o navegador

**Pronto! A logo aparecerá no cabeçalho! 🎉**

---

## 🆘 Precisa de Ajuda?

Se você não tiver a logo em formato PNG:
- Posso criar uma versão SVG novamente
- Ou você pode usar a logo original que me mostrou
- Ou pode remover temporariamente a logo do sistema

**Nota**: O sistema funciona perfeitamente sem a logo, ela é apenas decorativa! ✨
