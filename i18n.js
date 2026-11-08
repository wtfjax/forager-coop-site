// Site language (pt, en, ru): interface texts, labels for the data keys, and which data file to use.
// The choice is kept in this browser; changing it reloads the page.
(function () {
  let lang = "pt";
  try { lang = localStorage.getItem("forager-lang") || "pt"; } catch (e) {}
  if (!["pt", "en", "ru"].includes(lang)) lang = "pt";

  const S = {
    // header
    legendFixed: ["corrigido por nós", "fixed by us", "исправлено нами"],
    legendMod: ["sincronizado pelo mod", "synced by the mod", "синхронизировано модом"],
    legendUnknown: ["não verificado", "not checked", "не проверено"],
    vIslands: ["Ilhas", "Islands", "Острова"], vSkills: ["Habilidades", "Skills", "Навыки"], vFeats: ["Façanhas", "Feats", "Подвиги"],
    vCraft: ["Fabricação", "Crafting", "Создание"], vGear: ["Equipamentos", "Gear", "Снаряжение"], vSkins: ["Skins", "Skins", "Скины"],
    commands: ["Comandos", "Commands", "Команды"], language: ["Idioma", "Language", "Язык"],
    // drawer
    tabGive: ["Itens (/give)", "Items (/give)", "Предметы (/give)"], tabSpawn: ["Objetos (/spawn)", "Objects (/spawn)", "Объекты (/spawn)"],
    titleGive: ["Itens / IDs ", "Items / IDs ", "Предметы / ID "], titleSpawn: ["Objetos / spawn ", "Objects / spawn ", "Объекты / spawn "],
    searchGive: ["Buscar por nome ou ID... (clique copia /give)", "Search by name or ID... (click copies /give)", "Поиск по названию или ID... (клик копирует /give)"],
    searchSpawn: ["Buscar por nome, objeto ou o que faz... (clique copia /spawn)", "Search by name, object or what it does... (click copies /spawn)", "Поиск по названию, объекту или действию... (клик копирует /spawn)"],
    all: ["Todos", "All", "Все"], countOf: ["({0} de {1})", "({0} of {1})", "({0} из {1})"],
    safeOk: ["seguro", "safe", "безопасно"], safeCare: ["cuidado", "careful", "осторожно"], safeNo: ["não use", "don't use", "не использовать"],
    copied: ["Copiado: ", "Copied: ", "Скопировано: "], copy: ["copiar", "copy", "копировать"],
    // islands
    checkOn: ["Conferido: sincronizado (clique para desmarcar)", "Checked: synced (click to uncheck)", "Проверено: синхронизировано (нажмите, чтобы снять)"],
    checkOff: ["Marcar como sincronizado", "Mark as synced", "Отметить как синхронизированное"],
    myNotes: ["Minhas anotações", "My notes", "Мои заметки"],
    noteTitle: ["Título (aparece no mapa no lugar do nome)", "Title (shown on the map instead of the name)", "Заголовок (показывается на карте вместо названия)"],
    noteText: ["Descrição...", "Description...", "Описание..."],
    noteOk: ["Área conferida: está sincronizada", "Area checked: it's synced", "Область проверена: синхронизирована"],
    noteSaved: ["Salvo automaticamente neste navegador.", "Saved automatically in this browser.", "Сохраняется автоматически в этом браузере."],
    inCoop: ["No co-op", "In co-op", "В кооперативе"], cmdsRow: ["Comandos", "Commands", "Команды"],
    chestRemoveYou: ["Remove o baú mais perto de você (até 160 px), para os dois.", "Removes the chest closest to you (up to 160 px), for both players.", "Убирает ближайший к вам сундук (до 160 px) у обоих игроков."],
    chestRemoveBoth: ["/chestremove remove o baú mais perto de você (até 160 px), para os dois jogadores.", "/chestremove removes the chest closest to you (up to 160 px), for both players.", "/chestremove убирает ближайший к вам сундук (до 160 px) у обоих игроков."],
    whatsThere: ["O que tem", "What's there", "Что там"], biomeWiki: ["página do bioma na wiki", "the biome's wiki page", "страница биома на вики"],
    island: ["ilha: ", "island: ", "остров: "], howSolve: ["Como resolver", "How to solve", "Как решить"], reward: ["Recompensa", "Reward", "Награда"],
    gameObject: ["Objeto do jogo", "Game object", "Объект игры"],
    resetUnsupported: ["ainda não suportado para este puzzle", "not supported for this puzzle yet", "для этой головоломки пока не поддерживается"],
    chatCommands: ["Comandos do chat", "Chat commands", "Команды чата"],
    chatHelp: ["Digite no chat do jogo, sem precisar de cheats. Funcionam para os dois jogadores ao mesmo tempo (versão de teste do mod, branch <code>play</code>).",
      "Type them in the game chat, no cheats needed. They work for both players at once (the mod's test build, <code>play</code> branch).",
      "Вводите в чат игры, читы не нужны. Работают сразу для обоих игроков (тестовая версия мода, ветка <code>play</code>)."],
    wiki: ["Wiki", "Wiki", "Вики"],
    supported: ["Já suportados", "Supported so far", "Уже поддерживаются"],
    // skills
    gridPos: ["posição {0}×{1} na grade", "position {0}×{1} in the grid", "позиция {0}×{1} в сетке"],
    // feats
    feats: ["Façanhas", "Feats", "Подвиги"], searchFeat: ["Buscar façanha...", "Search feats...", "Поиск подвига..."],
    seeEarned: ["Ver conquistadas", "Show earned", "Показать полученные"], seeLocked: ["Ver bloqueadas", "Show locked", "Показать закрытые"],
    // crafting
    crafting: ["Fabricação", "Crafting", "Создание"],
    craftHelp: ["Clique numa estrutura para ver o que ela faz. As versões nucleares fazem os mesmos itens.", "Click a structure to see what it makes. The nuclear versions make the same items.", "Нажмите на строение, чтобы увидеть, что оно создаёт. Ядерные версии делают те же предметы."],
    recipes: ["{0} receitas", "{0} recipes", "рецептов: {0}"],
    unlockedStart: ["liberado desde o início", "unlocked from the start", "открыто с начала"], skill: ["habilidade", "skill", "навык"],
    tierOf: ["evolução {0} de {1}", "tier {0} of {1}", "уровень {0} из {1}"],
    btnCraft: ["criar", "craft", "создать"], btnHalf: ["metade", "half", "половина"], btnMax: ["máximo", "max", "максимум"],
    btnInf: ["infinito", "infinite", "бесконечно"], btnPin1: ["fixar", "pin", "закрепить"], btnPin2: ["receita", "recipe", "рецепт"],
    // gear
    gTools: ["ferramentas e armas", "tools and weapons", "инструменты и оружие"], gAcc: ["acessórios", "accessories", "аксессуары"],
    gSeals: ["selos", "seals", "печати"], gArt: ["artefatos", "artifacts", "артефакты"], gSigils: ["selos de invocação", "summoning sigils", "знаки призыва"],
    howGet: ["Como conseguir: ", "How to get: ", "Как получить: "],
    accHow: ["Fabrique na {0} ({1}). Cada nível é feito a partir do anterior.", "Craft it at the {0} ({1}). Each tier is made from the previous one.", "Создаётся: {0} ({1}). Каждый уровень делается из предыдущего."],
    gearNote: ["Os selos de invocação não ficam nessa tela do jogo; estão aqui para completar. Clique num espaço para ver os detalhes.",
      "The summoning sigils aren't on this game screen; they're here to complete the list. Click a slot to see the details.",
      "Знаков призыва нет на этом экране игры; они здесь для полноты. Нажмите на ячейку, чтобы увидеть подробности."],
    // skins
    skins: ["Skins", "Skins", "Скины"],
    skinsHelp: ["{0} skins em 4 partes. Troque na casa da árvore do druida. Quase todas vêm de façanhas.", "{0} skins in 4 parts. Change them at the druid's tree house. Almost all come from feats.", "{0} скинов в 4 частях. Меняются в домике друида. Почти все даются за подвиги."],
    allF: ["Todas", "All", "Все"], searchSkin: ["Buscar skin ou façanha...", "Search skin or feat...", "Поиск скина или подвига..."],
  };
  // labels for values that are used as keys in the data (kept in Portuguese there)
  const LBL = {
    "Grama": ["Grama", "Grass", "Трава"], "Deserto": ["Deserto", "Desert", "Пустыня"], "Cemitério": ["Cemitério", "Graveyard", "Кладбище"],
    "Inverno": ["Inverno", "Winter", "Зима"], "Fogo": ["Fogo", "Fire", "Огонь"],
    "Indústria": ["Indústria", "Industry", "Индустрия"], "Economia": ["Economia", "Economy", "Экономика"], "Coleta": ["Coleta", "Foraging", "Собирательство"], "Magia": ["Magia", "Magic", "Магия"],
    "Materiais": ["Materiais", "Materials", "Материалы"], "Comida": ["Comida", "Food", "Еда"], "Picaretas": ["Picaretas", "Pickaxes", "Кирки"], "Espadas": ["Espadas", "Swords", "Мечи"],
    "Arcos": ["Arcos", "Bows", "Луки"], "Pás": ["Pás", "Shovels", "Лопаты"], "Varas": ["Varas", "Rods", "Жезлы"], "Equipamentos": ["Equipamentos", "Gear", "Снаряжение"],
    "Selos": ["Selos", "Seals", "Печати"], "Pergaminhos": ["Pergaminhos", "Scrolls", "Свитки"], "Poções": ["Poções", "Potions", "Зелья"],
    "Bombas e munição": ["Bombas e munição", "Bombs and ammo", "Бомбы и боеприпасы"], "Sementes": ["Sementes", "Seeds", "Семена"], "Construção": ["Construção", "Building", "Строительство"],
    "Pigmentos": ["Pigmentos", "Pigments", "Красители"], "Engarrafados": ["Engarrafados", "Bottled", "В бутылках"], "Relíquias": ["Relíquias", "Relics", "Реликвии"], "Utilitários": ["Utilitários", "Utilities", "Полезное"],
    "Inimigos": ["Inimigos", "Enemies", "Враги"], "Chefes": ["Chefes", "Bosses", "Боссы"], "Animais e criaturas": ["Animais e criaturas", "Animals and creatures", "Животные и существа"],
    "Recursos": ["Recursos", "Resources", "Ресурсы"], "Plantas": ["Plantas", "Plants", "Растения"], "Estruturas": ["Estruturas", "Structures", "Строения"],
    "Especiais e puzzles": ["Especiais e puzzles", "Special and puzzles", "Особое и головоломки"], "NPCs": ["NPCs", "NPCs", "NPC"], "Familiares": ["Familiares", "Familiars", "Фамильяры"],
    "Efeitos e mundo": ["Efeitos e mundo", "Effects and world", "Эффекты и мир"], "Interface": ["Interface", "Interface", "Интерфейс"], "Sistema": ["Sistema", "System", "Система"], "Classe base": ["Classe base", "Base class", "Базовый класс"],
    "Cabeça": ["Cabeça", "Head", "Голова"], "Corpo": ["Corpo", "Body", "Тело"], "Mochila": ["Mochila", "Backpack", "Рюкзак"], "Asas": ["Asas", "Wings", "Крылья"],
    "padrão": ["padrão", "default", "по умолчанию"], "façanha": ["façanha", "feat", "подвиг"], "item": ["item", "item", "предмет"], "terraria": ["terraria", "terraria", "terraria"], "museu": ["museu", "museum", "музей"],
    "baú": ["baú", "chest", "сундук"], "missão": ["missão", "quest", "задание"], "fabricado": ["fabricado", "crafted", "создаётся"], "cortado": ["cortado", "cut", "вырезано"], "?": ["?", "?", "?"],
  };
  const li = { pt: 0, en: 1, ru: 2 }[lang];
  window.LANG = lang;
  window.t = (k, ...a) => (S[k] ? S[k][li] : k).replace(/\{(\d)\}/g, (_, n) => a[+n]);
  window.L = (v) => (LBL[v] ? LBL[v][li] : v);
  window.setLang = (l) => { try { localStorage.setItem("forager-lang", l); } catch (e) {} location.reload(); };
  window.FORAGER = lang === "en" ? window.FORAGER_EN || window.FORAGER : lang === "ru" ? window.FORAGER_RU || window.FORAGER : window.FORAGER;
  document.documentElement.lang = lang === "pt" ? "pt-BR" : lang;
  document.title = "Forager Co-op — " + ["Mapa", "Map", "Карта"][li];
})();
