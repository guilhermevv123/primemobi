# Site de vendas — Prime Mobi (Gandu-BA)

Página de vendas com o catálogo de elétricas e formulário de proposta.
O cliente escolhe o modelo, deixa nome/WhatsApp/cidade/forma de pagamento,
e o time da loja chama ele no WhatsApp.

## Estrutura

```
index.html                  página
css/style.css               visual (cores e fontes da marca)
js/config.js                WhatsApp, endereço, destino dos cadastros, Pixel  ← editar aqui
js/modelos.js               os 17 modelos do catálogo (ficha, cores, destaques)
js/app.js                   catálogo, ficha, formulário
assets/img/motos/           foto de cada modelo (recortada do catálogo)
assets/img/fichas/          página inteira do catálogo de cada modelo
integracoes/planilha-google.gs  receptor de cadastros para Planilha Google
```

Abre direto no navegador (clique duas vezes no `index.html`), sem servidor.
Para publicar, basta subir a pasta inteira (GitHub Pages, EasyPanel, Hostinger…).

## Para onde vão os cadastros

Em `js/config.js`, campo `webhookUrl`:

- **Vazio (padrão):** ao enviar, o cliente é levado ao WhatsApp da loja com a mensagem
  pronta (modelo, cor, nome, cidade, pagamento). Funciona sem configurar nada,
  mas o cliente precisa apertar "enviar" no WhatsApp.
- **Planilha Google (recomendado):** siga as instruções em `integracoes/planilha-google.gs`
  e cole a URL `/exec` no `webhookUrl`. Cada cadastro vira uma linha com link
  que abre a conversa do cliente no WhatsApp. O cliente ainda vê o botão
  "Quero adiantar pelo WhatsApp".
- **n8n / CRM:** qualquer URL que aceite POST com JSON (o corpo vai como texto JSON).

Campos enviados: `data, modelo, modeloId, cor, nome, whatsapp (55+DDD+número), cidade,
pagamento, prazo, testDrive, observacao, pagina` + `utm_*`/`fbclid` quando vierem do anúncio.

## Link direto para um modelo

`index.html?modelo=raptor` já abre o formulário com a Raptor escolhida
(ids em `js/modelos.js`). Bom para anúncio de um modelo só.

## Pixel da Meta

Coloque o ID em `pixelId` no `js/config.js`. O site dispara `PageView` e `Lead` no envio.
