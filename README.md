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

Cada envio do formulário é gravado no banco **Supabase "primemobi"** (projeto `ycgocezwmsxwtrubfogu`,
São Paulo) e aparece no **painel**: `/painel/` (ex.: https://guilhermevv123.github.io/primemobi/painel/).

No painel o time vê os cadastros novos, clica em **Chamar no WhatsApp** (mensagem já pronta;
o cadastro passa sozinho para "Em atendimento"), muda a situação (Novo / Em atendimento /
Vendido / Perdido), escreve anotações e baixa tudo em planilha (CSV que abre no Excel e no
Google Planilhas). Atualiza sozinho a cada minuto.

Segurança: a chave em `js/config.js` é pública de propósito — com ela só dá para **gravar**
cadastro novo. Ler e mudar cadastros só com a senha do painel (guardada no banco como hash,
funções `painel_leads` / `painel_atualizar` em `supabase/leads.sql`).
A senha fica fora do repositório (`~/.config/prime-mobi/painel.env`). Para trocar:
`update painel_acesso set senha_hash = extensions.crypt('NOVA', extensions.gen_salt('bf'));`

Se o banco não responder, o cliente é levado ao WhatsApp da loja com a mensagem pronta
(nenhum cadastro se perde). `webhookUrl` em `js/config.js` manda uma cópia extra para
n8n/CRM, se quiser; `integracoes/planilha-google.gs` é a alternativa com Planilha Google.

## Link direto para um modelo

`index.html?modelo=raptor` já abre o formulário com a Raptor escolhida
(ids em `js/modelos.js`). Bom para anúncio de um modelo só.

## Pixel da Meta

Coloque o ID em `pixelId` no `js/config.js`. O site dispara `PageView` e `Lead` no envio.
