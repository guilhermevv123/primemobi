/* Modelos do catálogo PRIME MOBI (fotos ilustrativas).
   Para incluir/alterar um modelo, edite esta lista. "destaques" aparecem no card;
   "ficha" é a lista completa mostrada ao abrir o modelo. */
window.MODELOS = [
  {
    id: "torino", nome: "Torino", categoria: "scooter",
    frase: "Scooter clássica, leve e econômica pro dia a dia.",
    destaques: { potencia: "1000W", autonomia: "40 a 50 km", velocidade: "32 km/h" },
    ficha: ["1000W de potência", "Autonomia de 40 a 50 km", "Velocidade máxima de 32 km/h", "Bateria de lítio de 60V 20Ah", "Bateria removível", "Partida no controle, com alarme", "Carregamento entre 5 e 8 h", "Carregador bivolt", "Peso máximo de 120 kg", "Freio a disco (upgrade)"],
    cores: []
  },
  {
    id: "ultra-capri", nome: "Ultra Capri", categoria: "scooter",
    frase: "A de maior autonomia das scooters: até 80 km por carga.",
    destaques: { potencia: "1000W", autonomia: "até 80 km", velocidade: "32 km/h" },
    ficha: ["1000W de potência", "Autonomia de até 80 km", "Velocidade máxima de 32 km/h", "Bateria de lítio de 73V 24Ah", "Partida no controle, alarme e NFC", "Marcha a ré", "Carregamento entre 5 e 8 h", "Carregador bivolt", "Freio a disco hidráulico", "Amortecedor hidráulico", "Peso máximo de 180 kg"],
    cores: ["Preto", "Branco", "Vermelho", "Verde oliva", "Azul petróleo"]
  },
  {
    id: "storm", nome: "Storm", categoria: "scooter",
    frase: "Visual retrô com banco terracota e suporte pro celular.",
    destaques: { potencia: "1000W", autonomia: "40 a 50 km", velocidade: "32 km/h" },
    ficha: ["1000W de potência", "Autonomia de 40 a 50 km", "Velocidade máxima de 32 km/h", "Bateria de lítio de 60V 20Ah", "Partida no controle, com alarme e NFC", "Suporte para celular", "Carregador bivolt", "Freio a disco hidráulico", "Peso máximo de 150 kg"],
    cores: ["Preto", "Branco", "Vermelho", "Preto com banco terracota", "Branco com banco terracota", "Vermelho com banco terracota", "Verde militar com banco terracota"]
  },
  {
    id: "ultra-max", nome: "Ultra Max", categoria: "moto",
    frase: "Mobilidade elétrica com potência dobrada e eficiência máxima.",
    destaques: { potencia: "1000W", autonomia: "40 a 50 km", velocidade: "32 km/h" },
    ficha: ["1000W de potência", "Autonomia de 40 a 50 km", "Velocidade máxima de 32 km/h", "Bateria de lítio de 60V 20Ah", "Marcha a ré", "Partida no controle, alarme e NFC", "Carregamento entre 5 e 8 h", "Carregador bivolt", "Freio a disco", "Pneu aro 12", "Peso máximo de 180 kg"],
    cores: ["Preto brilho", "Branco", "Vermelho brilho", "Carbono", "Azul bebê"]
  },
  {
    id: "fantom", nome: "Fantom", categoria: "scooter",
    frase: "Design compacto, conforto, segurança e tecnologia avançada.",
    destaques: { potencia: "1000W", autonomia: "até 45 km", velocidade: "32 km/h" },
    ficha: ["1000W de potência", "Autonomia de até 45 km", "Velocidade máxima de 32 km/h", "Bateria de lítio 60V 20Ah", "Carregador bivolt", "Tecnologia NFC", "Alarme antifurto de fábrica com travamento de roda traseira", "Amortecedores dianteiro e traseiro", "Freio hidráulico a disco dianteiro", "Painel e setas em LED", "3 níveis de velocidade", "Carga máxima de 150 kg", "Freio a tambor traseiro", "Retrovisores", "Buzina"],
    cores: ["Branca", "Cinza", "Preto"]
  },
  {
    id: "x11-mini", nome: "X11 Mini", categoria: "moto",
    frase: "Estilo marcante, estrutura robusta e tecnologia avançada.",
    destaques: { potencia: "1000W", autonomia: "até 50 km", velocidade: "32 km/h" },
    ficha: ["1000W de potência", "Velocidade máxima de 32 km/h", "Tecnologia NFC", "Bateria de lítio 60V 20Ah", "Autonomia de até 50 km", "Carregador bivolt", "Carregamento de 6 horas", "Quadro em aço de carbono", "Painel, faróis e setas em LED", "Carga máxima de 150 kg", "Bateria removível"],
    cores: ["Azul", "Branco", "Preto", "Cinza", "Vermelho"]
  },
  {
    id: "x15-infinito", nome: "X15 Infinito", categoria: "moto",
    frase: "Potência, estilo e liberdade para ir além.",
    destaques: { potencia: "1000W", autonomia: "45 a 55 km", velocidade: "32 km/h" },
    ficha: ["1000W de potência", "Velocidade máxima de 32 km/h", "Bateria de lítio LMFP 60V 24Ah", "Autonomia de 45 a 55 km", "Freios a disco", "Amortecedores dianteiro e traseiro", "Painel e setas em LED", "3 níveis de velocidade", "Carga máxima de 150 kg", "Buzina", "Sistema de segurança com alarme", "Aplicativo com monitoramento", "Tecnologia NFC"],
    cores: []
  },
  {
    id: "raptor", nome: "Raptor", categoria: "scooter",
    frase: "A campeã de autonomia: até 75 km, bateria que dura até 10 anos.",
    destaques: { potencia: "1000W", autonomia: "até 75 km", velocidade: "32 km/h" },
    ficha: ["1000W de potência", "Bateria 60V 25Ah", "Capacidade de carga: 180 kg", "Bateria de lítio ferro fosfato (LiFePO4)", "Durabilidade da bateria: até 10 anos", "Cartão NFC", "Controle remoto", "Chave", "Autonomia de até 75 km", "Velocidade máxima: 32 km/h"],
    cores: []
  },
  {
    id: "fx2", nome: "FX2", categoria: "moto",
    frase: "Liberdade com mais estilo — e som Bluetooth no painel.",
    destaques: { potencia: "1000W", autonomia: "45 a 55 km", velocidade: "32 km/h" },
    ficha: ["Motor 1000W", "Bateria de lítio de ferro fosfato", "Autonomia de 45 a 55 km", "Velocidade máxima de 32 km/h", "Freio a disco hidráulico dianteiro e traseiro", "Áudio Bluetooth", "Suporte para celular com USB", "Cartão NFC", "Painel digital LCD", "Farol em LED", "Setas indicadoras dianteiras", "Pneu 225/40-10", "Aros 10 polegadas"],
    cores: []
  },
  {
    id: "c3-pro", nome: "C3 Pro", categoria: "scooter",
    frase: "Leve, robusta e prática para o dia a dia.",
    destaques: { potencia: "800W", autonomia: "até 60 km", velocidade: "32 km/h" },
    ficha: ["800W de potência", "Velocidade máxima de 32 km/h", "Bateria de íon-lítio 48V 24Ah", "Autonomia de até 60 km", "Freios a tambor", "Capacidade para subir rampas de até 15°", "Sistema de segurança com alarme e aplicativo com monitoramento", "Carga máxima de 140 kg", "Bateria portátil", "Carregamento residencial"],
    cores: ["Preto", "Azul", "Branco"]
  },
  {
    id: "v8", nome: "V8", categoria: "bike",
    frase: "Bike elétrica de pneu largo (fat tire): potência, robustez e conforto.",
    destaques: { potencia: "1000W", autonomia: "até 35 km", velocidade: "32 km/h" },
    ficha: ["1000W de potência", "Bateria de lítio 48V 15,6Ah", "Capacidade para duas baterias", "Modo de pilotagem por aceleração ou assistida", "Autonomia de até 35 km", "Capacidade de carga de 150 kg", "Velocidade máxima de 32 km/h", "Pneus 20x4.0 (fat tire)", "Freios a disco dianteiros e traseiros", "Modo de ignição: chave, NFC ou partida remota"],
    cores: ["Preto"]
  },
  {
    id: "v8-duas-baterias", nome: "V8 Duas Baterias", categoria: "bike",
    frase: "A mesma V8 com duas baterias: até 60 km de autonomia.",
    destaques: { potencia: "1000W", autonomia: "até 60 km", velocidade: "32 km/h" },
    ficha: ["1000W de potência", "Bateria de lítio 48V 15Ah", "Duas baterias", "Autonomia de até 60 km", "Velocidade máxima de 32 km/h", "Carregamento de 4 a 6 horas", "Capacidade de carga de 150 kg", "Pneus 20x4.0 (fat tire)", "Freios a disco dianteiros e traseiros", "Modo de ignição: chave, NFC ou partida remota"],
    cores: ["Preto"]
  },
  {
    id: "triciclo-big", nome: "Triciclo Big", categoria: "triciclo",
    frase: "Três rodas, cesta e baú: estabilidade pra levar tudo.",
    destaques: { potencia: "1000W", autonomia: "até 45 km", velocidade: "32 km/h" },
    ficha: ["1000W de potência", "Velocidade máxima de 32 km/h", "Bateria de lítio 60V 20Ah", "Autonomia de até 45 km", "Carregador bivolt", "Alarme antifurto", "Carregamento de 5 a 6 horas", "Painel, faróis e setas em LED", "Bateria removível", "Cesta embutida", "Baú traseiro", "Entrada USB"],
    cores: ["Cinza", "Branco", "Preto"]
  },
  {
    id: "t3", nome: "T3", categoria: "triciclo",
    frase: "Elegante, robusto e prático para o dia a dia.",
    destaques: { potencia: "1000W", autonomia: "até 50 km", velocidade: "30 km/h" },
    ficha: ["1000W de potência", "Bateria de íon-lítio 60V 20Ah", "Autonomia de até 50 km", "Velocidade máxima de 30 km/h", "Freios a disco (frente) e tambor (atrás)", "Capacidade para subir rampas de até 20°", "Sistema de segurança com alarme", "Carga máxima permitida de 150 kg"],
    cores: ["Azul/preto", "Branco/bege", "Branco/vermelho"]
  },
  {
    id: "e-mobi", nome: "E-Mobi", categoria: "triciclo",
    frase: "Quadriciclo com assento estofado: conforto e estabilidade.",
    destaques: { potencia: "500W", autonomia: "45 a 55 km", velocidade: "20 km/h" },
    ficha: ["Motor de 500W", "Bateria removível de lítio 60V 20Ah", "Autonomia de 45 a 55 km", "Velocidade máxima de 20 km/h", "Suspensão independente", "Amortecedores traseiros", "Tecnologia NFC", "Freios eletromagnéticos", "Sistema de aceleração por alavancas", "Assento estofado regulável", "Suporte de celular com USB", "Setas direcionais", "Alarme antifurto", "Farol em LED", "Painel indicativo", "Baú traseiro", "Aro 8\""],
    cores: ["Vermelho", "Azul"]
  },
  {
    id: "e-cross", nome: "E-Cross", categoria: "triciclo",
    frase: "Quadriciclo mais potente, com cesta, baú e freio hidráulico.",
    destaques: { potencia: "1000W", autonomia: "45 a 55 km", velocidade: "30 km/h" },
    ficha: ["1000W de potência", "Bateria removível de lítio 60V 20Ah", "Autonomia de 45 a 55 km", "Velocidade máxima de 30 km/h", "Suspensão independente", "Amortecedores traseiros", "Tecnologia NFC", "Freios hidráulicos a disco", "Assento estofado regulável", "Suporte de celular com USB", "Setas direcionais", "Alarme antifurto", "Farol em LED", "Painel indicativo", "Cesta dianteira", "Baú traseiro", "Aro 10\""],
    cores: ["Vermelho", "Azul"]
  },
  {
    id: "ultra-race", nome: "Ultra Race", categoria: "kart",
    frase: "Kart elétrico: diversão garantida com estilo e segurança.",
    destaques: { potencia: "350W", autonomia: "até 5 h", rotuloAutonomia: "Recarga", velocidade: "15 km/h" },
    ficha: ["350W de potência", "Velocidade máxima de 15 km/h", "Bateria de lítio 36V 3,6Ah", "Carregamento em até 5 h", "Carregador bivolt", "Quadro de aço de carbono", "Freio dianteiro", "Direção regulável", "Bluetooth", "Luz de LED", "3 opções de velocidade", "Peso máximo de 100 kg"],
    cores: []
  }
];

window.CATEGORIAS = [
  { id: "todos", nome: "Todos" },
  { id: "scooter", nome: "Scooters" },
  { id: "moto", nome: "Motos" },
  { id: "bike", nome: "Bikes" },
  { id: "triciclo", nome: "Triciclos e quadriciclos" },
  { id: "kart", nome: "Kart" }
];
