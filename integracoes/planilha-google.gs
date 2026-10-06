/**
 * Recebe os cadastros do site da Prime Mobi e grava numa Planilha Google.
 *
 * Como usar:
 * 1. Crie uma planilha no Google Planilhas (ex.: "Leads Prime Mobi").
 * 2. Menu Extensões > Apps Script. Apague o que tiver e cole este arquivo.
 * 3. Implantar > Nova implantação > tipo "App da Web".
 *    Executar como: Eu. Quem pode acessar: Qualquer pessoa.
 * 4. Copie a URL gerada (termina em /exec) e cole em js/config.js, no campo webhookUrl.
 */
var COLUNAS = ["data", "nome", "whatsapp", "modelo", "cor", "cidade", "pagamento", "prazo",
  "testDrive", "observacao", "utm_source", "utm_campaign", "utm_content", "pagina", "status"];

function doPost(e) {
  var lead = JSON.parse(e.postData.contents);
  var aba = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads") ||
            SpreadsheetApp.getActiveSpreadsheet().insertSheet("Leads");
  if (aba.getLastRow() === 0) {
    aba.appendRow(COLUNAS);
    aba.setFrozenRows(1);
  }
  lead.data = Utilities.formatDate(new Date(), "America/Bahia", "dd/MM/yyyy HH:mm");
  lead.status = "Novo";
  // Link que abre a conversa com o cliente direto no WhatsApp
  lead.whatsapp = '=HYPERLINK("https://wa.me/' + lead.whatsapp + '";"' + lead.whatsapp + '")';
  aba.appendRow(COLUNAS.map(function (c) { return lead[c] || ""; }));
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
