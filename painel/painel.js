(function () {
  "use strict";

  var CFG = window.PRIME_CONFIG || {};
  var CHAVE = "primemobi-painel";
  var STATUS = ["Novo", "Em atendimento", "Vendido", "Perdido"];
  var $ = function (s, el) { return (el || document).querySelector(s); };

  var senha = null;
  var leads = [];
  var filtro = "Novo";
  var busca = "";

  function guardar(v, lembrar) {
    try {
      sessionStorage.setItem(CHAVE, v);
      if (lembrar) localStorage.setItem(CHAVE, v); else localStorage.removeItem(CHAVE);
    } catch (e) {}
  }
  function lida() {
    try { return sessionStorage.getItem(CHAVE) || localStorage.getItem(CHAVE); } catch (e) { return null; }
  }
  function esquecer() {
    try { sessionStorage.removeItem(CHAVE); localStorage.removeItem(CHAVE); } catch (e) {}
  }

  function rpc(nome, corpo) {
    return fetch(CFG.supabaseUrl + "/rest/v1/rpc/" + nome, {
      method: "POST",
      headers: { "apikey": CFG.supabaseKey, "Content-Type": "application/json" },
      body: JSON.stringify(corpo)
    }).then(function (r) {
      return r.json().catch(function () { return null; }).then(function (j) {
        if (!r.ok) {
          var e = new Error((j && j.message) || ("HTTP " + r.status));
          e.senha = j && j.message === "senha_invalida";
          throw e;
        }
        return j;
      });
    });
  }

  function esc(t) { var d = document.createElement("div"); d.textContent = t == null ? "" : String(t); return d.innerHTML; }
  function primeiroNome(n) { return String(n || "").trim().split(/\s+/)[0]; }
  function fone(w) {
    var d = String(w || "").replace(/^55/, "");
    if (d.length === 11) return "(" + d.slice(0, 2) + ") " + d.slice(2, 3) + " " + d.slice(3, 7) + "-" + d.slice(7);
    if (d.length === 10) return "(" + d.slice(0, 2) + ") " + d.slice(2, 6) + "-" + d.slice(6);
    return w;
  }
  function quando(iso) {
    var d = new Date(iso), agora = new Date();
    var min = Math.round((agora - d) / 60000);
    if (min < 1) return "agora";
    if (min < 60) return "há " + min + " min";
    var h = Math.round(min / 60);
    if (h < 24 && d.getDate() === agora.getDate()) return "hoje, " + d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }) + " " + d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  }
  function mensagem(l) {
    return "Olá, " + primeiroNome(l.nome) + "! Aqui é da Prime Mobi 🏍️⚡ Vi que você pediu uma proposta da " +
      l.modelo + (l.cor ? " (" + l.cor + ")" : "") + " pelo nosso site. Posso te passar os valores e condições?";
  }

  /* ---------- Entrar ---------- */
  function mostrarApp() {
    $("#entrar").hidden = true;
    $("#app").hidden = false;
  }
  function mostrarEntrar(msg) {
    $("#app").hidden = true;
    $("#entrar").hidden = false;
    var e = $("#erro-entrar");
    e.hidden = !msg;
    e.textContent = msg || "";
    $("#senha").focus();
  }

  $("#form-entrar").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var v = $("#senha").value.trim();
    if (!v) return;
    var b = $("#btn-entrar");
    b.disabled = true; b.textContent = "Entrando…";
    carregar(v).then(function () {
      senha = v;
      guardar(v, $("#lembrar").checked);
      $("#senha").value = "";
      mostrarApp();
    }, function (e) {
      mostrarEntrar(e.senha ? "Senha incorreta." : "Não conseguimos conectar. Confira a internet e tente de novo.");
    }).then(function () { b.disabled = false; b.textContent = "Entrar"; });
  });

  $("#btn-sair").addEventListener("click", function () {
    esquecer(); senha = null; leads = [];
    mostrarEntrar("");
  });

  /* ---------- Dados ---------- */
  function carregar(s) {
    return rpc("painel_leads", { p_senha: s || senha }).then(function (lista) {
      leads = lista || [];
      $("#atualizado").textContent = "Atualizado às " + new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) + " · atualiza sozinho a cada minuto";
      render();
    });
  }

  function atualizar(id, mudancas) {
    var l = leads.filter(function (x) { return x.id === id; })[0];
    if (!l) return Promise.resolve();
    var status = mudancas.status || l.status;
    var nota = mudancas.nota !== undefined ? mudancas.nota : l.nota;
    return rpc("painel_atualizar", { p_senha: senha, p_id: id, p_status: status, p_nota: nota || null }).then(function (r) {
      var row = Array.isArray(r) ? r[0] : r;
      if (row) for (var k in row) l[k] = row[k];
      return l;
    });
  }

  /* ---------- Tela ---------- */
  function render() {
    var cont = { Todos: leads.length };
    STATUS.forEach(function (s) { cont[s] = 0; });
    var hoje = new Date().toDateString(), deHoje = 0;
    leads.forEach(function (l) { cont[l.status] = (cont[l.status] || 0) + 1; if (new Date(l.criado_em).toDateString() === hoje) deHoje++; });

    $("#resumo").innerHTML =
      '<div><strong>' + cont.Novo + '</strong><small>Novos</small></div>' +
      '<div><strong>' + deHoje + '</strong><small>Hoje</small></div>' +
      '<div><strong>' + cont["Em atendimento"] + '</strong><small>Em atendimento</small></div>' +
      '<div><strong>' + cont.Vendido + '</strong><small>Vendidos</small></div>' +
      '<div><strong>' + leads.length + '</strong><small>Total</small></div>';
    document.title = (cont.Novo ? "(" + cont.Novo + ") " : "") + "Painel de Cadastros — Prime Mobi";

    $("#filtros-status").innerHTML = ["Novo", "Em atendimento", "Vendido", "Perdido", "Todos"].map(function (s) {
      return '<button type="button" role="tab" class="filtro" data-status="' + s + '" aria-selected="' + (s === filtro) + '">' +
        esc(s) + '<small>' + (cont[s] || 0) + '</small></button>';
    }).join("");

    var q = busca.toLowerCase().replace(/\D/g, "") ? busca.replace(/\D/g, "") : busca.toLowerCase();
    var vis = leads.filter(function (l) {
      if (filtro !== "Todos" && l.status !== filtro) return false;
      if (!busca) return true;
      var alvo = (l.nome + " " + l.cidade + " " + l.modelo + " " + (l.cor || "")).toLowerCase();
      return alvo.indexOf(busca.toLowerCase()) >= 0 || (q && String(l.whatsapp).indexOf(q) >= 0);
    });

    if (!vis.length) {
      $("#lista").innerHTML = '<p class="vazio">' + (leads.length ? "Nenhum cadastro aqui." : "Ainda não chegou nenhum cadastro. Assim que alguém pedir proposta no site, aparece aqui.") + '</p>';
      return;
    }

    $("#lista").innerHTML = vis.map(function (l) {
      var tags = [];
      if (l.cidade) tags.push('<span class="tag">📍 ' + esc(l.cidade) + '</span>');
      if (l.pagamento) tags.push('<span class="tag">💳 ' + esc(l.pagamento) + '</span>');
      if (l.prazo) tags.push('<span class="tag' + (l.prazo === "Esta semana" ? " tag--destaque" : "") + '">🗓️ ' + esc(l.prazo) + '</span>');
      if (l.test_drive) tags.push('<span class="tag tag--destaque">🏍️ Quer test drive</span>');
      var o = l.origem || {};
      if (o.utm_source || o.utm_campaign || o.fbclid) tags.push('<span class="tag">📣 ' + esc(o.utm_campaign || o.utm_source || "Anúncio") + '</span>');

      return '<article class="lead" data-id="' + l.id + '" data-status="' + esc(l.status) + '">' +
        '<div>' +
          '<div class="lead__topo"><span class="lead__nome">' + esc(l.nome) + '</span><span class="lead__quando">' + quando(l.criado_em) + ' · ' + esc(fone(l.whatsapp)) + '</span></div>' +
          '<div class="lead__modelo">' + esc(l.modelo) + (l.cor ? ' <small>· ' + esc(l.cor) + '</small>' : '') + '</div>' +
          '<div class="tags">' + tags.join("") + '</div>' +
          (l.observacao ? '<p class="lead__obs">“' + esc(l.observacao) + '”</p>' : '') +
        '</div>' +
        '<div class="lead__lado">' +
          '<a class="btn btn--whats" target="_blank" rel="noopener" data-chamar href="https://wa.me/' + esc(l.whatsapp) + '?text=' + encodeURIComponent(mensagem(l)) + '">Chamar no WhatsApp</a>' +
          '<select data-mudar aria-label="Situação">' + STATUS.map(function (s) { return '<option' + (s === l.status ? " selected" : "") + '>' + s + '</option>'; }).join("") + '</select>' +
        '</div>' +
        '<textarea data-nota rows="1" placeholder="Anotação do time (ex.: mandei valores, volta sexta)">' + esc(l.nota || "") + '</textarea>' +
        '<div class="salvo" data-salvo>' + (l.atualizado_em ? "Mexido " + quando(l.atualizado_em) : "") + '</div>' +
      '</article>';
    }).join("");
  }

  function cardDe(el) { var c = el.closest(".lead"); return c ? Number(c.getAttribute("data-id")) : null; }
  function avisar(el, txt) { var c = el.closest(".lead"); if (c) $("[data-salvo]", c).textContent = txt; }

  $("#filtros-status").addEventListener("click", function (e) {
    var b = e.target.closest("[data-status]");
    if (!b) return;
    filtro = b.getAttribute("data-status");
    render();
  });
  $("#busca").addEventListener("input", function () { busca = this.value.trim(); render(); });

  $("#lista").addEventListener("click", function (e) {
    var a = e.target.closest("[data-chamar]");
    if (!a) return;
    var id = cardDe(a);
    var l = leads.filter(function (x) { return x.id === id; })[0];
    if (l && l.status === "Novo") {
      atualizar(id, { status: "Em atendimento" }).then(render, function () {});
    }
  });

  $("#lista").addEventListener("change", function (e) {
    var s = e.target.closest("[data-mudar]");
    if (!s) return;
    avisar(s, "Salvando…");
    atualizar(cardDe(s), { status: s.value }).then(render, function () { avisar(s, "Não salvou. Tente de novo."); });
  });

  $("#lista").addEventListener("focusout", function (e) {
    var t = e.target.closest("[data-nota]");
    if (!t) return;
    var id = cardDe(t);
    var l = leads.filter(function (x) { return x.id === id; })[0];
    if (!l || (l.nota || "") === t.value.trim()) return;
    avisar(t, "Salvando…");
    atualizar(id, { nota: t.value.trim() }).then(function () { avisar(t, "Anotação salva ✓"); }, function () { avisar(t, "Não salvou. Tente de novo."); });
  });

  $("#btn-atualizar").addEventListener("click", function () { carregar().catch(sessaoCaiu); });

  /* ---------- Planilha (CSV que abre no Excel/Google) ---------- */
  $("#btn-planilha").addEventListener("click", function () {
    var cols = [["Data", function (l) { return new Date(l.criado_em).toLocaleString("pt-BR"); }],
      ["Nome", "nome"], ["WhatsApp", "whatsapp"], ["Modelo", "modelo"], ["Cor", "cor"], ["Cidade", "cidade"],
      ["Pagamento", "pagamento"], ["Quando compra", "prazo"], ["Test drive", function (l) { return l.test_drive ? "Sim" : "Não"; }],
      ["Dúvida", "observacao"], ["Situação", "status"], ["Anotação", "nota"],
      ["Campanha", function (l) { var o = l.origem || {}; return o.utm_campaign || o.utm_source || ""; }]];
    var linhas = [cols.map(function (c) { return c[0]; })].concat(leads.map(function (l) {
      return cols.map(function (c) { return typeof c[1] === "function" ? c[1](l) : (l[c[1]] == null ? "" : l[c[1]]); });
    }));
    var csv = "﻿" + linhas.map(function (r) {
      return r.map(function (v) { v = String(v); return /[;"\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }).join(";");
    }).join("\r\n");
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    a.download = "cadastros-prime-mobi-" + new Date().toISOString().slice(0, 10) + ".csv";
    document.body.appendChild(a); a.click(); a.remove();
  });

  function sessaoCaiu(e) {
    if (e && e.senha) { esquecer(); mostrarEntrar("A senha do painel mudou. Entre de novo."); }
  }

  setInterval(function () {
    if (!senha || document.hidden) return;
    var digitando = document.activeElement && document.activeElement.matches && document.activeElement.matches("[data-nota], #busca");
    if (!digitando) carregar().catch(sessaoCaiu);
  }, 60000);

  /* ---------- Início ---------- */
  var salva = lida();
  if (salva) {
    carregar(salva).then(function () { senha = salva; mostrarApp(); }, function (e) { if (e.senha) esquecer(); mostrarEntrar(""); });
  } else mostrarEntrar("");
})();
