(function () {
  "use strict";

  var CFG = window.PRIME_CONFIG || {};
  var MODELOS = window.MODELOS || [];
  var CATS = window.CATEGORIAS || [];
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };

  function foto(m) { return "assets/img/motos/" + m.id + ".webp?v=2"; }
  function paginaCatalogo(m) { return "assets/img/fichas/" + m.id + ".webp"; }
  function porId(id) { for (var i = 0; i < MODELOS.length; i++) if (MODELOS[i].id === id) return MODELOS[i]; return null; }
  function esc(t) { var d = document.createElement("div"); d.textContent = t == null ? "" : String(t); return d.innerHTML; }
  function linkWhats(texto) { return "https://api.whatsapp.com/send?phone=" + CFG.whatsapp + (texto ? "&text=" + encodeURIComponent(texto) : ""); }

  function nums(m) {
    var d = m.destaques;
    return '<div><strong>' + esc(d.potencia) + '</strong><small>Potência</small></div>' +
           '<div><strong>' + esc(d.autonomia) + '</strong><small>' + esc(d.rotuloAutonomia || "Autonomia") + '</small></div>' +
           '<div><strong>' + esc(d.velocidade) + '</strong><small>Vel. máx.</small></div>';
  }

  /* ---------- Dados da loja no HTML ---------- */
  $$("[data-cfg-whats]").forEach(function (a) { a.href = linkWhats("Olá! Vim pelo site da Prime Mobi e quero saber mais sobre as motos elétricas."); });
  $$("[data-cfg-insta]").forEach(function (a) { a.href = "https://instagram.com/" + CFG.instagram; a.textContent = "@" + CFG.instagram; });
  $$("[data-cfg-mapa]").forEach(function (a) { a.href = CFG.mapa; });
  $$("[data-cfg=endereco]").forEach(function (el) { el.textContent = CFG.endereco; });

  /* ---------- Catálogo ---------- */
  var grade = $("#grade");
  var filtros = $("#filtros");
  var catAtual = "todos";

  function renderFiltros() {
    filtros.innerHTML = CATS.map(function (c) {
      var n = c.id === "todos" ? MODELOS.length : MODELOS.filter(function (m) { return m.categoria === c.id; }).length;
      if (!n) return "";
      return '<button type="button" role="tab" class="filtro" data-cat="' + c.id + '" aria-selected="' + (c.id === catAtual) + '">' +
        esc(c.nome) + '<small>' + n + '</small></button>';
    }).join("");
  }

  function renderGrade() {
    var lista = MODELOS.filter(function (m) { return catAtual === "todos" || m.categoria === catAtual; });
    grade.innerHTML = lista.map(function (m) {
      return '<article class="card">' +
        '<button type="button" class="card__foto" data-abrir="' + m.id + '" aria-label="Ver ficha da ' + esc(m.nome) + '">' +
          '<img src="' + foto(m) + '" alt="' + esc(m.nome) + ' elétrica" loading="lazy" width="1100" height="1000"></button>' +
        '<div class="card__corpo">' +
          '<h3 class="card__nome">' + esc(m.nome) + '</h3>' +
          '<p class="card__frase">' + esc(m.frase) + '</p>' +
          '<div class="nums">' + nums(m) + '</div>' +
          '<div class="card__acoes">' +
            '<button type="button" class="btn btn--ghost" data-abrir="' + m.id + '">Ver ficha</button>' +
            '<button type="button" class="btn btn--lime" data-quero="' + m.id + '">Quero essa</button>' +
          '</div>' +
        '</div></article>';
    }).join("");
  }

  filtros.addEventListener("click", function (e) {
    var b = e.target.closest("[data-cat]");
    if (!b) return;
    catAtual = b.getAttribute("data-cat");
    renderFiltros();
    renderGrade();
  });

  grade.addEventListener("click", function (e) {
    var a = e.target.closest("[data-abrir]");
    if (a) return abrirFicha(a.getAttribute("data-abrir"));
    var q = e.target.closest("[data-quero]");
    if (q) escolher(q.getAttribute("data-quero"), true);
  });

  /* ---------- Ficha (modal) ---------- */
  var ficha = $("#ficha");
  var fichaId = null;

  function abrirFicha(id) {
    var m = porId(id);
    if (!m) return;
    fichaId = id;
    $("#ficha-img").src = foto(m);
    $("#ficha-img").alt = m.nome;
    $("#ficha-nome").textContent = m.nome;
    $("#ficha-frase").textContent = m.frase;
    $("#ficha-nums").className = "ficha__nums nums";
    $("#ficha-nums").innerHTML = nums(m);
    $("#ficha-lista").innerHTML = m.ficha.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("");
    $("#ficha-cores-box").hidden = !m.cores.length;
    $("#ficha-cores").innerHTML = m.cores.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("");
    $("#ficha-catalogo").href = paginaCatalogo(m);
    if (CFG.pixelId && window.fbq) window.fbq("track", "ViewContent", { content_name: m.nome, content_ids: [m.id], content_type: "product" });
    if (typeof ficha.showModal === "function") ficha.showModal(); else ficha.setAttribute("open", "");
    ficha.scrollTop = 0;
  }
  function fecharFicha() { if (ficha.close) ficha.close(); else ficha.removeAttribute("open"); }

  $("[data-fechar]", ficha).addEventListener("click", fecharFicha);
  ficha.addEventListener("click", function (e) { if (e.target === ficha) fecharFicha(); });
  $("#ficha-quero").addEventListener("click", function () { fecharFicha(); escolher(fichaId, true); });

  /* ---------- Formulário ---------- */
  var form = $("#form");
  var selModelo = $("#f-modelo");
  var selCor = $("#f-cor");
  var campoCor = $("#campo-cor");
  var whats = $("#f-whats");

  CATS.forEach(function (c) {
    if (c.id === "todos") return;
    var ms = MODELOS.filter(function (m) { return m.categoria === c.id; });
    if (!ms.length) return;
    var g = document.createElement("optgroup");
    g.label = c.nome;
    ms.forEach(function (m) { var o = document.createElement("option"); o.value = m.id; o.textContent = m.nome; g.appendChild(o); });
    selModelo.appendChild(g);
  });
  var oIndeciso = document.createElement("option");
  oIndeciso.value = "indeciso"; oIndeciso.textContent = "Ainda não sei — quero ajuda para escolher";
  selModelo.appendChild(oIndeciso);

  function atualizarModelo() {
    var m = porId(selModelo.value);
    if (m && m.cores.length) {
      selCor.innerHTML = '<option value="">Tanto faz / ainda não sei</option>' +
        m.cores.map(function (c) { return '<option>' + esc(c) + '</option>'; }).join("");
      campoCor.hidden = false;
    } else {
      selCor.innerHTML = "";
      campoCor.hidden = true;
    }
    var box = $("#escolhida");
    if (m) {
      $("#escolhida-img").src = foto(m);
      $("#escolhida-img").alt = m.nome;
      $("#escolhida-nome").textContent = m.nome;
      box.hidden = false;
    } else box.hidden = true;
    $("#foto-padrao").hidden = !!m;
  }
  selModelo.addEventListener("change", function () { atualizarModelo(); limparErro("modelo"); });

  function escolher(id, rolar) {
    selModelo.value = id;
    atualizarModelo();
    limparErro("modelo");
    mostrarForm();
    if (rolar) {
      $("#quero").scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(function () { $("#f-nome").focus({ preventScroll: true }); }, 600);
    }
  }

  // Máscara (73) 9 0000-0000
  whats.addEventListener("input", function () {
    var d = whats.value.replace(/\D/g, "").replace(/^55(?=\d{10,11}$)/, "").slice(0, 11);
    var r = d;
    if (d.length > 2) r = "(" + d.slice(0, 2) + ") " + d.slice(2);
    if (d.length > 3 && d.length === 11) r = "(" + d.slice(0, 2) + ") " + d.slice(2, 3) + " " + d.slice(3, 7) + (d.length > 7 ? "-" + d.slice(7) : "");
    else if (d.length > 6) r = "(" + d.slice(0, 2) + ") " + d.slice(2, 6) + "-" + d.slice(6);
    whats.value = r;
    limparErro("whatsapp");
  });

  function erro(nome) {
    var el = form.querySelector('[data-erro="' + nome + '"]');
    if (!el) return;
    var campo = el.closest(".campo");
    if (campo) campo.classList.add("invalido"); else el.classList.add("mostrar");
  }
  function limparErro(nome) {
    var el = form.querySelector('[data-erro="' + nome + '"]');
    if (!el) return;
    var campo = el.closest(".campo");
    if (campo) campo.classList.remove("invalido"); else el.classList.remove("mostrar");
  }
  ["f-nome", "f-cidade"].forEach(function (id) {
    $("#" + id).addEventListener("input", function () { limparErro(this.name); });
  });
  form.consentimento.addEventListener("change", function () { limparErro("consentimento"); });

  function utms() {
    var p = new URLSearchParams(location.search), o = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"].forEach(function (k) { if (p.get(k)) o[k] = p.get(k); });
    return o;
  }

  function mensagemWhats(l) {
    var nome = l.nome.split(" ")[0];
    var linhas = [
      "Oi, Prime Mobi! Aqui é " + nome + ", vim pelo site 😊",
      "",
      "Quero uma proposta da *" + l.modelo + "*" + (l.cor ? " na cor " + l.cor : "") + ".",
      "",
      "📍 Cidade: " + l.cidade,
      "💳 Pagamento: " + l.pagamento,
      "🗓️ Quero comprar: " + l.prazo.toLowerCase()
    ];
    if (l.testDrive === "Sim") linhas.push("🏍️ Quero agendar um test drive");
    if (l.observacao) linhas.push("", "Dúvida: " + l.observacao);
    return linhas.join("\n");
  }

  var enviando = false;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (enviando) return;

    var ok = true;
    var digitos = whats.value.replace(/\D/g, "");
    if (!selModelo.value) { erro("modelo"); ok = false; }
    if (form.nome.value.trim().length < 2) { erro("nome"); ok = false; }
    if (digitos.length < 10) { erro("whatsapp"); ok = false; }
    if (form.cidade.value.trim().length < 2) { erro("cidade"); ok = false; }
    if (!form.consentimento.checked) { erro("consentimento"); ok = false; }
    if (!ok) {
      var primeiro = form.querySelector(".invalido input, .invalido select") || form.consentimento;
      primeiro.focus();
      return;
    }

    var m = porId(selModelo.value);
    var lead = {
      data: new Date().toISOString(),
      modelo: m ? m.nome : "Ainda não sabe (quer ajuda)",
      modeloId: selModelo.value,
      cor: selCor.value || "",
      nome: form.nome.value.trim(),
      whatsapp: "55" + digitos,
      cidade: form.cidade.value.trim(),
      pagamento: (form.pagamento.value || ""),
      prazo: (form.prazo.value || ""),
      testDrive: form.testDrive.checked ? "Sim" : "Não",
      observacao: form.observacao.value.trim(),
      pagina: location.href.split("#")[0]
    };
    var u = utms();
    for (var k in u) lead[k] = u[k];

    // Robô preencheu o campo escondido: finge sucesso e não envia.
    if (form.empresa.value) return sucesso(lead, false);

    enviando = true;
    var botao = $("#enviar");
    botao.disabled = true;
    botao.textContent = "Enviando…";

    if (CFG.pixelId && window.fbq) window.fbq("track", "Lead", { content_name: lead.modelo });

    function falhou() {
      enviando = false;
      botao.disabled = false;
      botao.textContent = "Quero receber a proposta";
      alert("Não conseguimos enviar agora. Vamos abrir o WhatsApp da loja para você mandar direto.");
      window.location.href = linkWhats(mensagemWhats(lead));
    }

    var envios = [];

    // 1) Banco de cadastros (painel da loja)
    if (CFG.supabaseUrl && CFG.supabaseKey) {
      envios.push(fetch(CFG.supabaseUrl + "/rest/v1/leads", {
        method: "POST",
        headers: {
          "apikey": CFG.supabaseKey,
          "Content-Type": "application/json",
          "Prefer": "return=minimal"
        },
        body: JSON.stringify({
          nome: lead.nome.slice(0, 120),
          whatsapp: lead.whatsapp,
          modelo: lead.modelo,
          modelo_id: lead.modeloId,
          cor: lead.cor || null,
          cidade: lead.cidade.slice(0, 80),
          pagamento: lead.pagamento || null,
          prazo: lead.prazo || null,
          test_drive: lead.testDrive === "Sim",
          observacao: lead.observacao ? lead.observacao.slice(0, 1000) : null,
          origem: (function () { var o = { pagina: lead.pagina }; for (var k in u) o[k] = u[k]; return o; })()
        })
      }).then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); }));
    }

    // 2) Webhook extra (n8n, CRM...), opcional
    if (CFG.webhookUrl) {
      var hook = fetch(CFG.webhookUrl, {
        method: "POST",
        mode: "no-cors",
        keepalive: true,
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(lead)
      });
      if (!envios.length) envios.push(hook); else hook.catch(function () {});
    }

    if (!envios.length) {
      // Sem destino configurado: o cadastro segue direto pro WhatsApp da loja.
      sucesso(lead, true);
      window.location.href = linkWhats(mensagemWhats(lead));
      return;
    }

    var tempo = new Promise(function (res, rej) { setTimeout(function () { rej(new Error("tempo")); }, 12000); });
    Promise.race([Promise.all(envios), tempo]).then(function () { sucesso(lead, false); }, falhou);
  });

  function mostrarForm() {
    form.hidden = false;
    $("#sucesso").hidden = true;
  }

  function sucesso(lead, foiProWhats) {
    enviando = false;
    var botao = $("#enviar");
    botao.disabled = false;
    botao.textContent = "Quero receber a proposta";
    $("#sucesso-nome").textContent = lead.nome.split(" ")[0];
    $("#sucesso-modelo").textContent = lead.modelo;
    $("#sucesso-whats").href = linkWhats(mensagemWhats(lead));
    $("#sucesso-whats").textContent = foiProWhats ? "Abrir o WhatsApp de novo" : "Não abriu? Toque aqui";
    form.hidden = true;
    $("#sucesso").hidden = false;
    $("#sucesso").focus();
    // Abre o WhatsApp da loja com a mensagem pronta: o cliente só aperta enviar.
    if (!foiProWhats) setTimeout(function () { window.location.href = linkWhats(mensagemWhats(lead)); }, 900);
  }

  $("#sucesso-outro").addEventListener("click", function () {
    form.reset();
    atualizarModelo();
    mostrarForm();
    $("#modelos").scrollIntoView({ behavior: "smooth" });
  });

  /* ---------- Pixel da Meta (opcional) ---------- */
  if (CFG.pixelId) {
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", CFG.pixelId);
    window.fbq("track", "PageView");
  }

  /* ---------- Início ---------- */
  renderFiltros();
  renderGrade();
  var pedido = new URLSearchParams(location.search).get("modelo");
  if (pedido && porId(pedido)) escolher(pedido, false);
})();
