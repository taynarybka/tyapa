const WORLD_SIZE = 365;
const START = 182;
const ZOOM_LEVELS = [11, 9, 7, 5, 3];
const START_VIEW_SIZE = 7;
const APP_VERSION = "1.3";
const STEP_SOURCE_MODE = "health";
const MOVE_COST = 10;
const FLIGHT_STEP_GOAL = 15000;
const DEMO_FLIGHT_LEVEL = 8;
const FORCED_FLIGHT_LEVEL = 8;
const DEMO_MODE = false;
const DEMO_START_STEPS = 88888888;
const STEP_SOURCE_DEVICE = "device";
const STEP_SOURCE_DEMO = "demo";
const STEP_SOURCE_OPTIONS = new Set([STEP_SOURCE_DEVICE, STEP_SOURCE_DEMO]);
const INITIAL_OPEN_CELLS = 9;
const TRAIL_MAX = 12;
const TRAIL_VISIBLE_AT = 3;
const TRAIL_DIRECTIONS = ["up", "down", "left", "right"];
const STEP_SETTLEMENT_LOOKBACK_DAYS = 7;
const STEP_SETTLEMENT_LOOKBACK_MS = STEP_SETTLEMENT_LOOKBACK_DAYS * 24 * 60 * 60 * 1000;
const STEP_SETTLEMENT_HISTORY_LIMIT = 20;
const SEED_COST = 15;
const SEED_DISCOUNT_COST = 5;
const SEED_DISCOUNT_USES = 3;
const SEED_TUTORIAL_ID = "seeding";
const OPEN_COST_TIERS = [
  { limit: 100, cost: 1000 },
  { limit: 200, cost: 1500 },
  { limit: 400, cost: 2500 },
  { limit: Infinity, cost: 3000 },
];
const STORAGE_KEY = `tyapa-web-mvp-v${APP_VERSION}-${STEP_SOURCE_MODE}`;
const TUTORIAL_VERSION = 2;
const AUDIO_SETTINGS_KEY = "tyapa-audio-settings";
const INTRO_CUTSCENE_MS = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1100 : 6400;
const AUDIO_SFX_BASE = "assets/audio/sfx/";
const AUDIO_SFX_FILES = {
  stepFieldA: "step-tyapa-01.wav",
  stepFieldB: "step-tyapa-01.wav",
  stepFieldC: "step-tyapa-01.wav",
  moveDenied: "move-denied-soft.wav",
  closedCell: "closed-cell-tap.wav",
  waterBlocked: "water-blocked-soft.wav",
  forestBlocked: "forest-blocked-soft.wav",
  cellOpen: "cell-open-soft-bloom.wav",
  coinsEarned: "tyaptyaps-earned.wav",
  coinsSpend: "ui-tap-soft.wav",
  zoomIn: "map-zoom-in-soft.wav",
  zoomOut: "map-zoom-out-soft.wav",
  restIn: "shell-rest-in.wav",
  restOut: "shell-rest-out.wav",
  returnToMap: "ui-tap-soft.wav",
  dialogueNext: "ui-tap-soft.wav",
  toggleOn: "ui-tap-soft.wav",
  toggleOff: "ui-tap-soft.wav",
  uiTap: "ui-tap-soft.wav",
};
const TILE_TYPES = ["field", "water", "forest"];
const TILE_TYPE_CODES = Object.fromEntries(TILE_TYPES.map((type, index) => [type, index]));
const TILE_LABELS = {
  field: "поле",
  water: "вода",
  forest: "лес",
};
const MESSAGE_VARIANTS = {
  mapWindow: [
    ({ x, y }) => `Окно карты: ${coordLabel(x, y)}.`,
  ],
  stepsEarned: [
    ({ earned }) => `Начислено ${formatNumber(earned)} тяптяпов.`,
  ],
  stepsNoEarn: [
    () => "Шаги обновлены, новых тяптяпов пока нет.",
  ],
  coinsUpdated: [
    ({ coins }) => `Тяптяпы обновлены: ${formatNumber(coins)}.`,
  ],
  worldEdge: [
    () => "Край мира. Тяпа пока туда не идет.",
  ],
  closedCell: [
    () => "Эта клетка еще закрыта.",
    () => "Там пока туманная клетка.",
    () => "Тяпа видит край неизвестного.",
    () => "Сначала эту клетку надо открыть.",
    () => "За скорлупкой карты еще секрет.",
  ],
  waterBlocked: [
    () => "Тяпа пока не умеет ходить по воде. Нужный навык появится позже.",
    () => "Вода блестит, но Тяпа пока без плавок.",
    () => "Тяпа смотрит на воду с уважением.",
    () => "Через воду пока не пройти. Навык появится позже.",
  ],
  forestBlocked: [
    () => "Тяпа пока не умеет ходить по лесу. Нужный навык появится позже.",
    () => "В лесу шуршит незнакомая тропа.",
    () => "Тяпа пока не готов идти в чащу.",
    () => "Лес подождет нужного навыка.",
  ],
  notEnoughMoveCoins: [
    () => "Не хватает тяптяпов для движения.",
    () => "Тяптяпов маловато. Надо еще пройтись.",
    () => "Тяпа посчитал запас и решил подкопить.",
    () => "Пока не хватает на дорогу.",
    () => "Нужно еще немного тяптяпов для похода.",
  ],
  moveSuccess: [
    () => "Тяпа сделал маленький важный шаг.",
    () => "Тяпа важно топнул дальше.",
    () => "Еще один шажок в большую карту.",
    () => "Тяпа проверил тропинку клювом и пошел.",
    () => "Тихий шаг, но мир стал ближе.",
  ],
  flightSuccess: [
    ({ level }) => `Тяпа перелетел. Полет ур. ${level} сэкономил дорогу.`,
    () => "Тяпа мягко перелетел через сложный кусочек карты.",
    () => "Короткий полет, и Тяпа уже на месте.",
  ],
  openNotAllowed: [
    () => "Эту клетку пока нельзя открыть.",
  ],
  notEnoughOpenCoins: [
    ({ openCost }) => `Для открытия клетки нужно ${formatNumber(openCost)} тяптяпов.`,
  ],
  cellOpened: [
    () => "Новая клетка открыта. Мир Тяпы стал чуть больше.",
    () => "Новая клетка проснулась.",
    () => "Мир Тяпы распахнулся еще на один кусочек.",
    () => "Тут теперь можно гулять.",
    () => "На карте стало уютнее.",
  ],
  familyReturn: [
    () => "Тяпа вернулся к карте.",
  ],
  restStart: [
    () => "Тяпа спрятался в скорлупку и отдыхает.",
    () => "Тяпа устроился в скорлупке поудобнее.",
    () => "Скорлупка включила режим тишины.",
  ],
  restEnd: [
    () => "Тяпа выглянул из скорлупки.",
    () => "Тяпа выглянул и снова готов к карте.",
    () => "Отдых закончен. Можно топать.",
  ],
  zoomMaxIn: [
    () => "Карта уже максимально близко.",
  ],
  zoomMaxOut: [
    () => "Карта уже максимально далеко.",
  ],
  zoomChanged: [
    ({ viewSize }) => `Масштаб карты: ${viewSize} x ${viewSize}.`,
  ],
  mapCentered: [
    () => "Карта снова вокруг Тяпы.",
  ],
  progressReset: [
    () => "Прогресс сброшен. Тяпа снова в центре мира.",
  ],
};
const TILE_IMAGES = {
  field: "assets/tile-field.png",
  water: "assets/tile-water.png",
  forest: "assets/tile-forest.png",
  closed: "assets/tile-closed.png",
};
const TRAIL_IMAGES = {
  start: "assets/trails/variant-2/start.png",
  middle: "assets/trails/variant-2/middle.png",
  max: "assets/trails/variant-2/max.png",
  horizontal: "assets/trails/variant-2/horizontal-cell.png",
  vertical: "assets/trails/variant-2/vertical-cell.png",
  cross: "assets/trails/variant-2/cross-cell.png",
  tDown: "assets/trails/variant-2/t-down-cell.png",
};
const PRELOAD_CRITICAL_ASSETS = [
  "assets/backgrounds/screen-background-open-sky.png",
  TILE_IMAGES.field,
  TILE_IMAGES.closed,
  "assets/ui/sliced/steps-panel.png",
  "assets/ui/sliced/coins-panel.png",
];
const PRELOAD_STAGED_ASSETS = [
  TILE_IMAGES.water,
  TILE_IMAGES.forest,
  "assets/tyapa-hidden.png",
  "assets/ui/sliced/settings-button.png",
  "assets/ui/sliced/music-button.png",
  "assets/ui/sliced/eggshell-title.png",
  "assets/ui/sliced/bottom-message-block.png",
];
const PRELOAD_TIMEOUT_MS = 7000;
const BIOME_VERSION = 3;
const BIOME_BLEND_DIRECTIONS = [
  ["n", 0, -1],
  ["s", 0, 1],
  ["w", -1, 0],
  ["e", 1, 0],
];
const FAMILY_EVENTS = {};
const CHARACTERS = [];
const ITEM_CATALOG = {
  pebble: {
    id: "pebble",
    name: "Камешек",
    icon: "●",
    color: "#9ca7a4",
    note: "Тяпа нашел камешек. Теперь камешки считаются открытой находкой.",
  },
};
const TUTORIAL_STEPS = [
  {
    title: "Тяпа проснулся",
    text: "За минуту покажу главное: шаги дают тяптяпы, а тяптяпы открывают дорогу к дальнему углу карты.",
    target: "map",
    action: "Начать",
  },
  {
    title: "Запас на прогулку",
    text: () => `Один шажок по карте стоит ${formatNumber(MOVE_COST)} тяптяпов. Чем больше шагов, тем смелее можно тянуть тропинку к краю.`,
    target: "stats",
    action: "Дальше",
  },
  {
    title: "Первый шажок",
    text: "Нажми подсвеченную соседнюю клетку или используй стрелки на клавиатуре.",
    target: "move-cell",
    waitsFor: "move",
  },
  {
    title: "Разбуди карту",
    text: () => `Серые клетки рядом с открытой землей можно раскрывать. Сейчас это стоит ${formatNumber(openCostForNextCell())} тяптяпов.`,
    target: "open-cell",
    waitsFor: "open",
  },
  {
    title: "Смотри ближе",
    text: "Плюс и минус меняют масштаб карты. Попробуй приблизить мир Тяпы.",
    target: "zoom",
    waitsFor: "zoom",
  },
  {
    title: "Вернуться к Тяпе",
    text: "Иконка Тяпы рядом с масштабом возвращает карту к нему. Нажми на нее, если заблудилась в окне карты.",
    target: "zoom",
    waitsFor: "center",
  },
  {
    title: "Теперь можно гулять",
    text: "Готово. Не обязательно раскрывать все вокруг: иногда важнее выбрать один дальний угол и идти к нему.",
    target: "map",
    action: "В путь",
  },
];
const TUTORIAL_TIPS = {
  routeChoice: {
    title: "Выбирай направление",
    text: "Карту не нужно раскрывать ровным квадратом. Намечай тонкую тропинку туда, где край кажется любопытнее центра.",
    target: "open-cell",
  },
  trails: {
    title: "Тропинки помнят",
    text: "Если часто ходить по одним клеткам, следы становятся заметнее. Любимые маршруты постепенно проявятся сами.",
    target: "map",
  },
  terrain: {
    title: "Не все пути сразу",
    text: "Вода и густой лес ждут будущих навыков. Пока обходи их и собирай дорогу по полям.",
    target: "map",
  },
  cornerHint: {
    title: "Дальний угол",
    text: "У карты есть углы, которых не видно из центра. Выбери один и проверяй, как меняется путь.",
    target: "open-cell",
  },
  shell: {
    title: "Скорлупка для паузы",
    text: "Нажатие на Тяпу прячет его в скорлупку. Это просто уютный отдых, прогресс не теряется.",
    target: "map",
  },
  seeding: {
    title: "\u0421\u0435\u043c\u0435\u0447\u043a\u0438 \u0434\u043b\u044f \u0442\u0440\u043e\u043f\u0438\u043d\u043e\u043a",
    text: () => `\u0412 \u0440\u0435\u0436\u0438\u043c\u0435 \u00ab\u041f\u043e\u0441\u0435\u044f\u0442\u044c\u00bb \u0432\u044b\u0431\u0435\u0440\u0438 \u043a\u043b\u0435\u0442\u043a\u0443 \u0441 \u0442\u0440\u043e\u043f\u0438\u043d\u043a\u043e\u0439, \u0438 \u0422\u044f\u043f\u0430 \u0437\u0430\u0441\u0435\u0435\u0442 \u0435\u0435 \u0441\u0435\u043c\u0435\u043d\u0430\u043c\u0438. \u041f\u0435\u0440\u0432\u044b\u0435 ${SEED_DISCOUNT_USES} \u0442\u0440\u043e\u043f\u0438\u043d\u043a\u0438 \u0441\u0442\u0438\u0440\u0430\u044e\u0442\u0441\u044f \u0437\u0430 ${SEED_DISCOUNT_COST} \u0442\u044f\u043f\u0442\u044f\u043f\u043e\u0432.`,
    target: "map",
  },
};

const elements = {
  achievementList: document.querySelector("#achievementList"),
  coins: document.querySelector("#coins"),
  grantStepsButton: document.querySelector("#grantStepsButton"),
  demoSourceToggle: document.querySelector("#demoSourceToggle"),
  demoStepsButton: document.querySelector("#demoStepsButton"),
  deviceSourceToggle: document.querySelector("#deviceSourceToggle"),
  deviceStepsButton: document.querySelector("#deviceStepsButton"),
  map: document.querySelector("#map"),
  message: document.querySelector("#message"),
  permissionPanel: document.querySelector("#permissionPanel"),
  permissionStatus: document.querySelector("#permissionStatus"),
  positionLabel: document.querySelector("#positionLabel"),
  resetButton: document.querySelector("#resetButton"),
  restButton: document.querySelector("#restButton"),
  saveStepsButton: document.querySelector("#saveStepsButton"),
  settingsButton: document.querySelector("#settingsButton"),
  settingsDialog: document.querySelector("#settingsDialog"),
  settingsGeneralPanel: document.querySelector("#settingsGeneralPanel"),
  settingsGeneralTab: document.querySelector("#settingsGeneralTab"),
  settingsStatsPanel: document.querySelector("#settingsStatsPanel"),
  settingsStatsTab: document.querySelector("#settingsStatsTab"),
  seedButton: document.querySelector("#seedButton"),
  seedCancelButton: document.querySelector("#seedCancelButton"),
  seedCost: document.querySelector("#seedCost"),
  flightSkillButton: document.querySelector("#flightSkillButton"),
  flightLevel: document.querySelector("#flightLevel"),
  shellButton: document.querySelector("#shellButton"),
  shellCloseButton: document.querySelector("#shellCloseButton"),
  shellDiaryEntries: document.querySelector("#shellDiaryEntries"),
  shellHome: document.querySelector("#shellHome"),
  shellItems: document.querySelector("#shellItems"),
  introCutscene: document.querySelector("#introCutscene"),
  introSkipButton: document.querySelector("#introSkipButton"),
  soundButton: document.querySelector("#soundButton"),
  sfxToggle: document.querySelector("#sfxToggle"),
  statCoinsCurrent: document.querySelector("#statCoinsCurrent"),
  statFlightsCount: document.querySelector("#statFlightsCount"),
  statLastSettlement: document.querySelector("#statLastSettlement"),
  statOpenCells: document.querySelector("#statOpenCells"),
  statRecentTyaptyaps: document.querySelector("#statRecentTyaptyaps"),
  statSpentFlights: document.querySelector("#statSpentFlights"),
  statSpentOpenCells: document.querySelector("#statSpentOpenCells"),
  statSpentSeeding: document.querySelector("#statSpentSeeding"),
  statSpentWalking: document.querySelector("#statSpentWalking"),
  statTotalTyaptyaps: document.querySelector("#statTotalTyaptyaps"),
  stats: document.querySelector(".stats"),
  musicToggle: document.querySelector("#musicToggle"),
  stepStatus: document.querySelector("#stepStatus"),
  stepSourceHint: document.querySelector("#stepSourceHint"),
  stepSourceLayer: document.querySelector("#stepSourceLayer"),
  stepsInput: document.querySelector("#stepsInput"),
  stepsPanel: document.querySelector("#stepsPanel"),
  tutorialKicker: document.querySelector("#tutorialKicker"),
  tutorialLayer: document.querySelector("#tutorialLayer"),
  tutorialNextButton: document.querySelector("#tutorialNextButton"),
  tutorialSkipButton: document.querySelector("#tutorialSkipButton"),
  tutorialText: document.querySelector("#tutorialText"),
  tutorialTitle: document.querySelector("#tutorialTitle"),
  viewLabel: document.querySelector("#viewLabel"),
  centerTyapaButton: document.querySelector("#centerTyapaButton"),
  zoomControls: document.querySelector(".zoom-controls"),
  zoomInButton: document.querySelector("#zoomInButton"),
  zoomOutButton: document.querySelector("#zoomOutButton"),
};

function createEmptySpendStats() {
  return {
    walking: 0,
    flights: 0,
    openCells: 0,
    seeding: 0,
    legacyUnknown: 0,
  };
}

function createInitialStats(initialTyaptyaps = 0) {
  return {
    totalTyaptyapsEarned: initialTyaptyaps,
    spent: createEmptySpendStats(),
    flightsCount: 0,
    settlementCount: 0,
  };
}

const createInitialState = () => {
  const cells = {};
  const characterPlacements = createInitialCharacterPlacements();
  const initialCoins = DEMO_MODE ? DEMO_START_STEPS : 0;

  for (let y = START - 1; y <= START + 1; y += 1) {
    for (let x = START - 1; x <= START + 1; x += 1) {
      cells[keyOf(x, y)] = { x, y, type: "field" };
    }
  }

  ensureCharacterCells(cells, characterPlacements);

  return {
    coins: initialCoins,
    openedCellsCount: 0,
    spentCoins: 0,
    stats: createInitialStats(initialCoins),
    stepSettlements: [],
    stepsToday: DEMO_MODE ? DEMO_START_STEPS : 0,
    lastStepsCounted: DEMO_MODE ? DEMO_START_STEPS : 0,
    lastStepDate: todayKey(),
    lastStepSettlementAt: DEMO_MODE ? new Date().toISOString() : null,
    stepsPermission: DEMO_MODE ? "granted" : "unknown",
    stepSource: DEMO_MODE ? STEP_SOURCE_DEMO : null,
    position: { x: START, y: START },
    viewCenter: { x: START, y: START },
    cells,
    trails: {
      [keyOf(START, START)]: { walkCount: 1, up: 0, down: 0, left: 0, right: 0 },
    },
    seedMode: false,
    seededTrailCount: 0,
    isResting: false,
    familyOverlay: null,
    activeDialogue: null,
    characterPlacements,
    seenDialogues: {},
    unlockedItems: {},
    diaryEntries: [],
    diaryMeetingDays: {},
    flightDays: DEMO_MODE ? { [todayKey()]: true } : {},
    skills: {
      forest: false,
      water: false,
    },
    tutorial: createTutorialState(),
    introCutscenePlayed: false,
    biomeVersion: BIOME_VERSION,
    viewSize: START_VIEW_SIZE,
  };
};

let state = loadState();
let audioSettings = loadAudioSettings();
let audioContext = null;
let masterGain = null;
let musicGain = null;
let sfxGain = null;
let melodyTimer = null;
let musicFadeTimer = null;
const sfxCooldowns = {};
const sfxBuffers = new Map();
const STEP_SFX = ["stepFieldA", "stepFieldB", "stepFieldC"];
let mapDrag = null;
let didDragMap = false;
let suppressNextMapClick = false;
let renderFrame = null;
let saveTimer = null;
let saveIdleHandle = null;
let activeTravelAnimation = null;
let shellHomeOpen = false;
let introCutsceneActive = false;
let introCutsceneTimer = null;
const mapTilePool = [];
let mapTileLayer = null;
const trailMarkupCache = new Map();

function keyOf(x, y) {
  return `${x}:${y}`;
}

function displayCoordX(value) {
  return value - START;
}

function displayCoordY(value) {
  return START - value;
}

function coordLabel(x, y) {
  return `${displayCoordX(x)}:${displayCoordY(y)}`;
}

function shouldShowCoord(offsetX, offsetY) {
  return Math.abs(offsetX) <= 1 && Math.abs(offsetY) <= 1;
}

function syncVisibleCoordinateBadges() {
  if (elements.positionLabel) {
    elements.positionLabel.textContent = coordLabel(state.position.x, state.position.y);
  }

  for (const tile of mapTilePool) {
    if (!tile || tile.hidden) continue;

    const xValue = tile.dataset.cellX ?? tile.dataset.openX;
    const yValue = tile.dataset.cellY ?? tile.dataset.openY;
    if (xValue === undefined || yValue === undefined) continue;

    const x = Number(xValue);
    const y = Number(yValue);
    const existingBadge = tile.querySelector(".coord-badge");
    const isCurrent = x === state.position.x && y === state.position.y;
    const coordOffsetX = x - state.position.x;
    const coordOffsetY = y - state.position.y;
    const shouldShow = !isCurrent && shouldShowCoord(coordOffsetX, coordOffsetY);

    if (!shouldShow) {
      existingBadge?.remove();
      continue;
    }

    const text = coordLabel(x, y);
    if (existingBadge) {
      existingBadge.textContent = text;
    } else {
      const badge = document.createElement("small");
      badge.className = "coord-badge";
      badge.textContent = text;
      tile.append(badge);
    }
  }
}

function todayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function safeCount(value) {
  return Math.max(0, Math.floor(Number(value) || 0));
}

function parseStoredDate(value) {
  if (typeof value !== "string" || value.trim() === "") return null;

  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? date : null;
}

function createTutorialState(options = {}) {
  const startCompleted = Boolean(options.startCompleted);

  return {
    version: TUTORIAL_VERSION,
    introStep: startCompleted ? TUTORIAL_STEPS.length - 1 : 0,
    startCompleted,
    seenTips: {},
    activeTipId: null,
  };
}

function hasSavedGameProgress(saved) {
  if (!saved || typeof saved !== "object") return false;

  const position = saved.position || {};
  return Boolean(
    Number(saved.spentCoins) > 0
    || Number(saved.openedCellsCount) > 0
    || position.x !== START
    || position.y !== START,
  );
}

function normalizeTutorialState(tutorial, saved) {
  const inferredComplete = !tutorial && hasSavedGameProgress(saved);
  if (!tutorial || typeof tutorial !== "object") return createTutorialState({ startCompleted: inferredComplete });

  const introStep = Math.min(Math.max(Number(tutorial.introStep) || 0, 0), TUTORIAL_STEPS.length - 1);
  const startCompleted = Boolean(tutorial.startCompleted);
  const seenTips = tutorial.seenTips && typeof tutorial.seenTips === "object" ? { ...tutorial.seenTips } : {};
  const activeTipId = TUTORIAL_TIPS[tutorial.activeTipId] ? tutorial.activeTipId : null;

  return {
    version: TUTORIAL_VERSION,
    introStep,
    startCompleted,
    seenTips,
    activeTipId: startCompleted ? activeTipId : null,
  };
}

function normalizeUnlockedItems(items) {
  const normalized = {};
  if (!items || typeof items !== "object") return normalized;

  Object.values(items).forEach((item) => {
    const itemId = typeof item === "string" ? item : item?.id;
    if (!ITEM_CATALOG[itemId]) return;

    normalized[itemId] = {
      id: itemId,
      unlockedAt: typeof item?.unlockedAt === "string" ? item.unlockedAt : null,
    };
  });

  return normalized;
}

function normalizeDiaryEntries(entries) {
  if (!Array.isArray(entries)) return [];

  return entries
    .map((entry, index) => ({
      id: typeof entry?.id === "string" ? entry.id : `legacy-${index}`,
      type: typeof entry?.type === "string" ? entry.type : "note",
      date: typeof entry?.date === "string" ? entry.date : todayKey(),
      text: typeof entry?.text === "string" ? entry.text : "",
      characterId: typeof entry?.characterId === "string" ? entry.characterId : null,
      itemId: typeof entry?.itemId === "string" ? entry.itemId : null,
      createdAt: typeof entry?.createdAt === "string" ? entry.createdAt : null,
    }))
    .filter((entry) => entry.text.trim().length > 0);
}

function normalizeDiaryMeetingDays(days) {
  const normalized = {};
  if (!days || typeof days !== "object") return normalized;

  Object.entries(days).forEach(([date, meetings]) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !meetings || typeof meetings !== "object") return;
    normalized[date] = {};
    Object.keys(meetings).forEach((characterId) => {
      if (CHARACTERS.some(({ id }) => id === characterId)) {
        normalized[date][characterId] = true;
      }
    });
  });

  return normalized;
}

function totalSpentByCategory(spent) {
  return Object.values(spent || {}).reduce((sum, value) => sum + safeCount(value), 0);
}

function normalizeSpendStats(spent, legacySpentCoins = 0) {
  const normalized = createEmptySpendStats();

  if (spent && typeof spent === "object") {
    Object.keys(normalized).forEach((category) => {
      normalized[category] = safeCount(spent[category]);
    });
    return normalized;
  }

  normalized.legacyUnknown = safeCount(legacySpentCoins);
  return normalized;
}

function normalizeStats(stats, saved) {
  const spent = normalizeSpendStats(stats?.spent, saved.spentCoins);
  const totalFromSave = safeCount(saved.coins) + totalSpentByCategory(spent);
  const totalTyaptyapsEarned = Math.max(safeCount(stats?.totalTyaptyapsEarned), totalFromSave);

  return {
    totalTyaptyapsEarned,
    spent,
    flightsCount: safeCount(stats?.flightsCount),
    settlementCount: safeCount(stats?.settlementCount),
  };
}

function normalizeStepSettlements(settlements) {
  if (!Array.isArray(settlements)) return [];

  return settlements
    .map((settlement) => ({
      start: parseStoredDate(settlement?.start)?.toISOString() || null,
      end: parseStoredDate(settlement?.end)?.toISOString() || null,
      earned: safeCount(settlement?.earned),
      source: typeof settlement?.source === "string" ? settlement.source : "unknown",
    }))
    .filter((settlement) => settlement.start && settlement.end)
    .slice(0, STEP_SETTLEMENT_HISTORY_LIMIT);
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved ? normalizeState(saved) : createInitialState();
  } catch {
    return createInitialState();
  }
}

function normalizeStepSource(source) {
  return STEP_SOURCE_OPTIONS.has(source) ? source : null;
}

function normalizeState(saved) {
  const base = createInitialState();
  const merged = { ...base, ...saved };
  merged.cells = normalizeCells(merged.cells, saved.biomeVersion);
  merged.characterPlacements = { ...createInitialCharacterPlacements(), ...normalizeCharacterPlacements(saved.characterPlacements || saved.characters) };
  ensureCharacterCells(merged.cells, merged.characterPlacements);
  merged.trails = normalizeTrails(merged.trails, merged.cells);
  merged.coins = safeCount(merged.coins);
  merged.spentCoins = safeCount(merged.spentCoins);
  merged.stepsToday = safeCount(merged.stepsToday);
  merged.lastStepsCounted = safeCount(merged.lastStepsCounted);
  merged.stepSource = normalizeStepSource(saved.stepSource);
  merged.stats = normalizeStats(saved.stats, merged);
  merged.stepSettlements = normalizeStepSettlements(saved.stepSettlements);
  merged.lastStepSettlementAt = parseStoredDate(saved.lastStepSettlementAt)?.toISOString() || null;
  merged.seedMode = false;
  merged.seededTrailCount = Math.max(0, Math.floor(Number(saved.seededTrailCount) || 0));
  merged.familyOverlay = normalizeFamilyOverlay(merged.familyOverlay);
  merged.biomeVersion = BIOME_VERSION;
  if (merged.viewSize === 10) {
    merged.viewSize = 11;
  }

  if (!ZOOM_LEVELS.includes(merged.viewSize)) {
    merged.viewSize = base.viewSize;
  }

  if (!Number.isFinite(merged.openedCellsCount)) {
    merged.openedCellsCount = Math.max(0, Object.keys(merged.cells || {}).length - INITIAL_OPEN_CELLS);
  }

  merged.skills = { ...base.skills, ...(saved.skills || {}) };
  merged.seenDialogues = { ...base.seenDialogues, ...(saved.seenDialogues || {}) };
  merged.unlockedItems = normalizeUnlockedItems(saved.unlockedItems);
  merged.diaryEntries = normalizeDiaryEntries(saved.diaryEntries);
  merged.diaryMeetingDays = normalizeDiaryMeetingDays(saved.diaryMeetingDays);
  merged.flightDays = normalizeFlightDays(saved.flightDays);
  merged.activeDialogue = normalizeDialogue(merged.activeDialogue);
  merged.tutorial = normalizeTutorialState(saved.tutorial, saved);
  merged.introCutscenePlayed = Boolean(saved.introCutscenePlayed || hasSavedGameProgress(saved) || saved.tutorial?.startCompleted);

  if (!merged.viewCenter || !insideWorld(merged.viewCenter.x, merged.viewCenter.y)) {
    merged.viewCenter = { ...merged.position };
  }

  if (merged.lastStepDate !== todayKey()) {
    merged.stepsToday = 0;
    merged.lastStepsCounted = 0;
    merged.lastStepDate = todayKey();
  }

  if (DEMO_MODE && merged.stepsPermission !== "granted") {
    merged.stepsPermission = "granted";
  }

  if (DEMO_MODE) {
    merged.stepSource = STEP_SOURCE_DEMO;
  }

  if (merged.stepSource === STEP_SOURCE_DEMO) {
    merged.stepsPermission = "granted";
  }

  if (DEMO_MODE && merged.stepsToday < DEMO_START_STEPS) {
    merged.stepsToday = DEMO_START_STEPS;
    merged.lastStepsCounted = DEMO_START_STEPS;
  }

  if (DEMO_MODE && merged.coins + merged.spentCoins < DEMO_START_STEPS) {
    merged.coins = Math.max(0, DEMO_START_STEPS - merged.spentCoins);
  }

  if (merged.stepsToday >= FLIGHT_STEP_GOAL) {
    merged.flightDays[merged.lastStepDate] = true;
  }

  return merged;
}

function normalizeFlightDays(days) {
  if (!days || typeof days !== "object") return {};

  return Object.fromEntries(
    Object.entries(days).filter(([date, value]) => /^\d{4}-\d{2}-\d{2}$/.test(date) && value),
  );
}

function normalizeCharacterPlacements(placements) {
  const normalized = {};
  if (!placements || typeof placements !== "object") return normalized;

  for (const character of CHARACTERS) {
    const placement = placements[character.id];
    const home = placement && placement.home;
    const retreat = placement && placement.retreat;
    const homeX = Number(home && home.x);
    const homeY = Number(home && home.y);
    const retreatX = Number(retreat && retreat.x);
    const retreatY = Number(retreat && retreat.y);
    const retreatType = TILE_TYPES.includes(retreat && retreat.type) ? retreat.type : "field";

    if (!insideWorld(homeX, homeY) || !insideWorld(retreatX, retreatY)) continue;
    normalized[character.id] = {
      home: { x: homeX, y: homeY },
      retreat: { x: retreatX, y: retreatY, type: retreatType },
    };
  }

  return normalized;
}

function createInitialCharacterPlacements() {
  const placements = {};

  for (const character of CHARACTERS) {
    if (character.spawn?.type !== "fixed") continue;

    const { x, y } = character.spawn.home;
    if (!insideWorld(x, y) || x <= 0) continue;
    const retreat = character.spawn.retreat || { dx: -1, dy: 0, type: "field" };
    const retreatX = x + retreat.dx;
    const retreatY = y + retreat.dy;
    if (!insideWorld(retreatX, retreatY)) continue;

    placements[character.id] = {
      home: { x, y },
      retreat: { x: retreatX, y: retreatY, type: retreat.type || "field" },
    };
  }

  return placements;
}

function characterPlacement(character) {
  return state.characterPlacements[character.id] || null;
}

function ensureCharacterCells(cells, placements) {
  CHARACTERS.forEach((character) => {
    const placement = placements && placements[character.id];
    if (!placement) return;

    const homeKey = keyOf(placement.home.x, placement.home.y);
    cells[homeKey] = { ...(cells[homeKey] || {}), ...placement.home, type: "field", isService: false };

    const retreatKey = keyOf(placement.retreat.x, placement.retreat.y);
    cells[retreatKey] = { ...(cells[retreatKey] || {}), x: placement.retreat.x, y: placement.retreat.y, type: placement.retreat.type || "field", isService: true };

    const leftX = placement.home.x - 1;
    const leftY = placement.home.y;
    if (insideWorld(leftX, leftY)) {
      const leftKey = keyOf(leftX, leftY);
      cells[leftKey] = { ...(cells[leftKey] || {}), x: leftX, y: leftY, type: "field", isService: true };
    }
  });
}

function normalizeFamilyOverlay(overlay) {
  if (!overlay) return null;

  return Object.values(FAMILY_EVENTS).find(({ image }) => image === overlay.image) || null;
}

function normalizeDialogue(dialogue) {
  if (!dialogue) return null;

  const character = CHARACTERS.find(({ id }) => id === dialogue.characterId);
  if (!character) return null;

  const lineIndex = Math.min(Math.max(Number(dialogue.lineIndex) || 0, 0), character.dialog.length - 1);
  return { characterId: character.id, lineIndex };
}

function normalizeCells(cells, savedBiomeVersion) {
  const normalized = {};
  if (!cells) return normalized;

  const normalizeCell = (cell) => {
    const isCompactCell = Array.isArray(cell);
    const x = Number(isCompactCell ? cell[0] : cell.x);
    const y = Number(isCompactCell ? cell[1] : cell.y);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;

    const savedType = (isCompactCell ? TILE_TYPES[cell[2]] : cell.type) || biomeAt(x, y);
    const isService = isCompactCell ? cell[3] === 1 : Boolean(cell.isService);
    normalized[keyOf(x, y)] = {
      x,
      y,
      type: savedBiomeVersion === BIOME_VERSION ? savedType : biomeAt(x, y),
      isService,
    };
  };

  if (Array.isArray(cells)) {
    for (const cell of cells) normalizeCell(cell);
  } else {
    for (const key in cells) normalizeCell(cells[key]);
  }

  return normalized;
}

function serializeCells(cells) {
  const serialized = [];

  for (const key in cells) {
    const { x, y, type, isService } = cells[key];
    const compactCell = [x, y, TILE_TYPE_CODES[type] ?? 0];
    if (isService) compactCell.push(1);
    serialized.push(compactCell);
  }

  return serialized;
}

function clampTrail(value) {
  return Math.min(TRAIL_MAX, Math.max(0, Math.floor(Number(value) || 0)));
}

function normalizeTrails(trails, cells) {
  const normalized = {};
  if (!trails || typeof trails !== "object") return normalized;

  for (const key in trails) {
    const cell = cells[key];
    if (!cell || cell.type !== "field") continue;

    const trail = trails[key] || {};
    normalized[key] = {
      walkCount: clampTrail(trail.walkCount),
      up: clampTrail(trail.up),
      down: clampTrail(trail.down),
      left: clampTrail(trail.left),
      right: clampTrail(trail.right),
    };
  }

  return normalized;
}

function trailLevel(value) {
  if (value < TRAIL_VISIBLE_AT) return "none";
  if (value <= 5) return "weak";
  if (value <= 8) return "light";
  if (value <= 11) return "medium";
  return "strong";
}

function trailForCell(x, y) {
  const cell = state.cells[keyOf(x, y)];
  if (!cell || cell.type !== "field") return null;

  return state.trails[keyOf(x, y)] || null;
}

function ensureTrail(x, y) {
  const key = keyOf(x, y);
  state.trails[key] = state.trails[key] || { walkCount: 0, up: 0, down: 0, left: 0, right: 0 };
  return state.trails[key];
}

function directionBetween(from, to) {
  if (to.x > from.x) return ["right", "left"];
  if (to.x < from.x) return ["left", "right"];
  if (to.y > from.y) return ["down", "up"];
  if (to.y < from.y) return ["up", "down"];
  return null;
}

function recordTrailMove(from, to) {
  const fromCell = state.cells[keyOf(from.x, from.y)];
  const toCell = state.cells[keyOf(to.x, to.y)];
  if (!fromCell || !toCell || fromCell.type !== "field" || toCell.type !== "field") return;

  const directions = directionBetween(from, to);
  if (!directions) return;

  const [fromDirection, toDirection] = directions;
  const fromTrail = ensureTrail(from.x, from.y);
  const toTrail = ensureTrail(to.x, to.y);

  fromTrail.walkCount = clampTrail(fromTrail.walkCount + 1);
  toTrail.walkCount = clampTrail(toTrail.walkCount + 1);
  fromTrail[fromDirection] = clampTrail(fromTrail[fromDirection] + 1);
  toTrail[toDirection] = clampTrail(toTrail[toDirection] + 1);
}

function activeTrailDirections(trail) {
  if (!trail) return [];
  return TRAIL_DIRECTIONS.filter((direction) => trail[direction] >= TRAIL_VISIBLE_AT);
}

function hasVisibleTrailAt(x, y) {
  return activeTrailDirections(trailForCell(x, y)).length > 0;
}

function seedCost() {
  return state.seededTrailCount < SEED_DISCOUNT_USES ? SEED_DISCOUNT_COST : SEED_COST;
}

function seedDiscountRemaining() {
  return Math.max(0, SEED_DISCOUNT_USES - (Number(state.seededTrailCount) || 0));
}

function seedModePrompt() {
  const cost = seedCost();
  const remaining = seedDiscountRemaining();
  if (remaining > 0) {
    return `\u0420\u0435\u0436\u0438\u043c \u043f\u043e\u0441\u0435\u0432\u0430: \u0432\u044b\u0431\u0435\u0440\u0438 \u0442\u0440\u043e\u043f\u0438\u043d\u043a\u0443. \u0415\u0449\u0435 ${remaining} \u043f\u043e ${cost} \u0442\u044f\u043f\u0442\u044f\u043f\u043e\u0432.`;
  }

  return `\u0420\u0435\u0436\u0438\u043c \u043f\u043e\u0441\u0435\u0432\u0430: \u0432\u044b\u0431\u0435\u0440\u0438 \u0442\u0440\u043e\u043f\u0438\u043d\u043a\u0443. \u0426\u0435\u043d\u0430 ${cost} \u0442\u044f\u043f\u0442\u044f\u043f\u043e\u0432.`;
}

function normalizeTrailAfterClearing(key) {
  const trail = state.trails[key];
  if (!trail) return;

  const strongestDirection = TRAIL_DIRECTIONS.reduce((max, direction) => Math.max(max, clampTrail(trail[direction])), 0);
  trail.walkCount = strongestDirection;

  if (strongestDirection <= 0) {
    delete state.trails[key];
  }
}

function clearTrailCell(x, y) {
  delete state.trails[keyOf(x, y)];

  const neighbors = [
    [0, -1, "down"],
    [0, 1, "up"],
    [-1, 0, "right"],
    [1, 0, "left"],
  ];

  for (const [dx, dy, neighborDirection] of neighbors) {
    const neighborKey = keyOf(x + dx, y + dy);
    const neighborTrail = state.trails[neighborKey];
    if (!neighborTrail) continue;

    neighborTrail[neighborDirection] = 0;
    normalizeTrailAfterClearing(neighborKey);
  }

  trailMarkupCache.clear();
}

function cancelSeedMode({ silent = false } = {}) {
  if (!state.seedMode) return false;

  state.seedMode = false;
  saveState();
  render();
  if (!silent) {
    setMessage("\u0422\u044f\u043f\u0430 \u0443\u0431\u0440\u0430\u043b \u0441\u0435\u043c\u0435\u0447\u043a\u0438 \u043e\u0431\u0440\u0430\u0442\u043d\u043e \u0432 \u0441\u043a\u043e\u0440\u043b\u0443\u043f\u043a\u0443.");
    playSfx("toggleOff");
  }
  return true;
}

function toggleSeedMode() {
  if (isStartTutorialBlockingActions()) return;

  if (state.seedMode) {
    cancelSeedMode();
    return;
  }

  state.seedMode = true;
  shellHomeOpen = false;
  stopMapDrag();
  syncShellHome();

  const tutorialShown = showTutorialTip(SEED_TUTORIAL_ID);
  if (!tutorialShown) {
    saveState();
    render();
  }

  setMessage(seedModePrompt());
  playSfx("toggleOn");
}

function seedTrailAt(x, y) {
  if (!state.seedMode) return false;

  if (!hasVisibleTrailAt(x, y)) {
    setMessage("\u0422\u0443\u0442 \u043f\u043e\u043a\u0430 \u043d\u0435\u0447\u0435\u0433\u043e \u0437\u0430\u0441\u0435\u0432\u0430\u0442\u044c: \u0432\u044b\u0431\u0435\u0440\u0438 \u043a\u043b\u0435\u0442\u043a\u0443 \u0441 \u0442\u0440\u043e\u043f\u0438\u043d\u043a\u043e\u0439.");
    playSfx("moveDenied");
    return true;
  }

  const cost = seedCost();
  if (state.coins < cost) {
    setMessage(`\u0414\u043b\u044f \u043f\u043e\u0441\u0435\u0432\u0430 \u043d\u0443\u0436\u043d\u043e ${formatNumber(cost)} \u0442\u044f\u043f\u0442\u044f\u043f\u043e\u0432.`);
    playSfx("moveDenied");
    return true;
  }

  spendTyaptyaps(cost, "seeding");
  state.seededTrailCount += 1;
  clearTrailCell(x, y);
  saveState();
  render();
  setMessage(`\u0422\u044f\u043f\u0430 \u043f\u043e\u0441\u0435\u044f\u043b \u0441\u0435\u043c\u0435\u0447\u043a\u0438. \u042d\u0442\u0430 \u0442\u0440\u043e\u043f\u0438\u043d\u043a\u0430 \u0437\u0430\u0440\u0430\u0441\u0442\u0430\u0435\u0442. -${formatNumber(cost)} \u0442\u044f\u043f\u0442\u044f\u043f\u043e\u0432.`);
  playSfx("coinsSpend");
  return true;
}

function renderTrail(cell) {
  const trail = trailForCell(cell.x, cell.y);
  if (!trail) return "";

  const cacheKey = [
    trail.walkCount || 0,
    trail.up || 0,
    trail.down || 0,
    trail.left || 0,
    trail.right || 0,
  ].join(":");
  const cachedMarkup = trailMarkupCache.get(cacheKey);
  if (cachedMarkup !== undefined) return cachedMarkup;

  const activeDirections = activeTrailDirections(trail);
  if (activeDirections.length === 0) {
    trailMarkupCache.set(cacheKey, "");
    return "";
  }

  const strongestDirection = activeDirections.reduce((max, direction) => Math.max(max, trail[direction]), 0);
  const level = trailLevel(Math.max(trail.walkCount, strongestDirection));
  if (level === "none") {
    trailMarkupCache.set(cacheKey, "");
    return "";
  }

  const directionClasses = activeDirections.map((direction) => `trail-has-${direction}`).join(" ");
  const hasOppositePair = (activeDirections.includes("left") && activeDirections.includes("right")) || (activeDirections.includes("up") && activeDirections.includes("down"));
  const shapeClass = activeDirections.length >= 4
    ? "trail-cross"
    : activeDirections.length === 3
      ? "trail-junction"
      : activeDirections.length === 2 && !hasOppositePair
        ? "trail-turn"
        : "trail-path";
  const layers = trailArtLayers(activeDirections, level).map(({ src, rotation, layerClass }) => `
    <img class="trail-art ${layerClass}" src="${src}" alt="" draggable="false" loading="lazy" decoding="async" style="--trail-rotation: ${rotation}deg;" />
  `).join("");

  const markup = `
    <span class="trail trail-art-wrap trail-${level} ${shapeClass} ${directionClasses}" aria-hidden="true">
      ${layers}
    </span>
  `;
  trailMarkupCache.set(cacheKey, markup);
  return markup;
}

function straightTrailImage(level) {
  if (level === "weak") return TRAIL_IMAGES.start;
  if (level === "light" || level === "medium") return TRAIL_IMAGES.middle;
  return TRAIL_IMAGES.max;
}

function trailArtLayers(directions, level) {
  const has = (direction) => directions.includes(direction);
  const layer = (src, rotation = 0, layerClass = "trail-art-main") => ({ src, rotation, layerClass });
  const armLayer = (direction) => {
    const isVertical = direction === "up" || direction === "down";
    return layer(
      isVertical ? TRAIL_IMAGES.vertical : TRAIL_IMAGES.horizontal,
      0,
      `trail-art-arm trail-art-arm-${direction}`
    );
  };

  if (directions.length >= 4) {
    return [layer(TRAIL_IMAGES.cross)];
  }

  if (directions.length === 3) {
    const missing = TRAIL_DIRECTIONS.find((direction) => !has(direction));
    const rotationByMissingDirection = {
      up: 0,
      down: 180,
      left: -90,
      right: 90,
    };
    return [layer(TRAIL_IMAGES.tDown, rotationByMissingDirection[missing] || 0)];
  }

  if (has("left") && has("right")) return [layer(TRAIL_IMAGES.horizontal)];
  if (has("up") && has("down")) return [layer(TRAIL_IMAGES.vertical)];

  if (directions.length === 2) {
    return directions.map(armLayer);
  }

  if (directions.length === 1) return [armLayer(directions[0])];
  return [layer(straightTrailImage(level))];
}

function trailPaths(directions) {
  const has = (direction) => directions.includes(direction);
  const paths = [];
  const mainPaths = [];
  const branchPaths = [];

  const horizontal = { d: "M -8 50 C 14 47, 31 53, 50 50 C 69 47, 86 53, 108 50", kind: "main" };
  const vertical = { d: "M 50 -8 C 47 14, 53 31, 50 50 C 47 69, 53 86, 50 108", kind: "main" };
  const arms = {
    up: { d: "M 50 52 C 47 40, 53 21, 50 -8", kind: "branch" },
    down: { d: "M 50 48 C 53 62, 47 81, 50 108", kind: "branch" },
    left: { d: "M 52 50 C 40 47, 21 53, -8 50", kind: "branch" },
    right: { d: "M 48 50 C 62 53, 81 47, 108 50", kind: "branch" },
  };
  const turns = {
    "up-right": { d: "M 50 -8 C 48 18, 40 38, 50 50 C 62 62, 84 52, 108 50", kind: "main" },
    "right-down": { d: "M 108 50 C 84 48, 62 38, 50 50 C 38 62, 48 84, 50 108", kind: "main" },
    "down-left": { d: "M 50 108 C 52 84, 60 62, 50 50 C 38 38, 16 48, -8 50", kind: "main" },
    "left-up": { d: "M -8 50 C 16 52, 38 62, 50 50 C 62 38, 52 16, 50 -8", kind: "main" },
  };
  const junctionArms = {
    up: { d: "M 50 54 C 45 42, 53 24, 50 -8", kind: "branch" },
    down: { d: "M 50 46 C 55 60, 47 80, 50 108", kind: "branch" },
    left: { d: "M 54 50 C 42 45, 24 53, -8 50", kind: "branch" },
    right: { d: "M 46 50 C 60 55, 80 47, 108 50", kind: "branch" },
  };

  if (directions.length === 1) return [arms[directions[0]]];

  if (directions.length === 2 && !((has("left") && has("right")) || (has("up") && has("down")))) {
    if (has("up") && has("right")) return [turns["up-right"]];
    if (has("right") && has("down")) return [turns["right-down"]];
    if (has("down") && has("left")) return [turns["down-left"]];
    if (has("left") && has("up")) return [turns["left-up"]];
  }

  if (has("left") && has("right")) mainPaths.push(horizontal);
  if (has("up") && has("down")) mainPaths.push(vertical);

  for (const direction of TRAIL_DIRECTIONS) {
    if (!has(direction)) continue;
    if ((direction === "left" || direction === "right") && has("left") && has("right")) continue;
    if ((direction === "up" || direction === "down") && has("up") && has("down")) continue;
    branchPaths.push(directions.length === 3 ? junctionArms[direction] : arms[direction]);
  }

  paths.push(...branchPaths, ...mainPaths);
  return paths;
}

function saveState() {
  if (saveTimer !== null || saveIdleHandle !== null) return;

  const runSave = () => {
    saveTimer = null;
    saveIdleHandle = null;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, cells: serializeCells(state.cells) }));
  };

  if ("requestIdleCallback" in window) {
    saveIdleHandle = window.requestIdleCallback(runSave, { timeout: 1000 });
  } else {
    saveTimer = window.setTimeout(runSave, 120);
  }
}

function flushSaveState() {
  if (saveIdleHandle !== null && "cancelIdleCallback" in window) {
    window.cancelIdleCallback(saveIdleHandle);
  }

  if (saveTimer !== null) {
    window.clearTimeout(saveTimer);
  }

  saveTimer = null;
  saveIdleHandle = null;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, cells: serializeCells(state.cells) }));
}

function scheduleRender() {
  if (renderFrame !== null) return;

  renderFrame = requestAnimationFrame(() => {
    renderFrame = null;
    render();
  });
}

function formatNumber(value) {
  return new Intl.NumberFormat("ru-RU").format(value);
}

function formatCoinsForDisplay(value) {
  if (DEMO_MODE && state.spentCoins === 0 && value > 999999) return ">1 млн";

  return formatNumber(value);
}

function formatFixedCounter(value) {
  const safeValue = Math.max(0, value);
  if (safeValue > 999999) return formatNumber(safeValue);

  const formatted = formatNumber(safeValue);
  return `<span class="counter-pad" aria-hidden="true">0</span>${formatted}`;
}

function parseCoinsInput(value) {
  const digits = String(value).replace(/\D/g, "");
  return Math.max(0, Math.floor(Number(digits) || 0));
}

function earnTyaptyaps(amount) {
  const earned = safeCount(amount);
  if (earned <= 0) return 0;

  state.coins += earned;
  state.stats.totalTyaptyapsEarned += earned;
  return earned;
}

function spendTyaptyaps(amount, category) {
  const spent = safeCount(amount);
  if (spent <= 0) return 0;

  state.coins = Math.max(0, state.coins - spent);
  state.spentCoins += spent;
  state.stats.spent[category] = safeCount(state.stats.spent[category]) + spent;

  if (category === "flights") {
    state.stats.flightsCount += 1;
  }

  return spent;
}

function nativeStepProvider() {
  const provider = window.tyapaSteps || window.TyapaSteps;
  if (!provider || typeof provider !== "object") return null;
  if (typeof provider.getStepsBetween !== "function" && typeof provider.getTodaySteps !== "function") return null;

  return provider;
}

function activeStepProvider() {
  if (state.stepSource !== STEP_SOURCE_DEVICE) return null;
  return nativeStepProvider();
}

function canSettleStepsFromProvider(provider = activeStepProvider()) {
  return Boolean(provider && typeof provider.getStepsBetween === "function");
}

function settlementStartFor(now) {
  const lookbackStart = new Date(now.getTime() - STEP_SETTLEMENT_LOOKBACK_MS);
  const savedStart = parseStoredDate(state.lastStepSettlementAt);

  if (savedStart && savedStart > lookbackStart && savedStart < now) {
    return savedStart;
  }

  return lookbackStart;
}

function recordStepSettlement({ start, end, earned, source }) {
  state.stepSettlements = [
    {
      start,
      end,
      earned: safeCount(earned),
      source,
    },
    ...(state.stepSettlements || []),
  ].slice(0, STEP_SETTLEMENT_HISTORY_LIMIT);
  state.stats.settlementCount += 1;
}

function updateTodayStepsSnapshot(steps, date = todayKey()) {
  const nextSteps = safeCount(steps);
  state.stepsToday = nextSteps;
  state.lastStepDate = date;
  recordFlightProgress(nextSteps, date);
}

async function settleStepsOnEntry(options = {}) {
  const { silent = true, source = "entry" } = options;
  const provider = activeStepProvider();
  if (state.stepsPermission !== "granted" || !canSettleStepsFromProvider(provider)) return 0;

  const now = new Date();
  const start = settlementStartFor(now);
  const endIso = now.toISOString();
  const startIso = start.toISOString();

  try {
    if (typeof provider.getTodaySteps === "function") {
      const todaySteps = await provider.getTodaySteps();
      updateTodayStepsSnapshot(todaySteps);
    }

    const earned = safeCount(await provider.getStepsBetween(startIso, endIso));
    if (earned > 0) {
      earnTyaptyaps(earned);
      recordStepSettlement({ start: startIso, end: endIso, earned, source });
    }

    state.lastStepSettlementAt = endIso;
    saveState();
    render();

    if (!silent) {
      if (earned > 0) {
        setRandomMessage("stepsEarned", { earned });
        playSfx("coinsEarned");
      } else {
        setRandomMessage("stepsNoEarn");
        playSfx("uiTap");
      }
    }

    return earned;
  } catch (error) {
    console.warn("Step settlement failed.", error);
    return 0;
  }
}

function openCostForNextCell() {
  return OPEN_COST_TIERS.find((tier) => state.openedCellsCount < tier.limit).cost;
}

function insideWorld(x, y) {
  return x >= 0 && y >= 0 && x < WORLD_SIZE && y < WORLD_SIZE;
}

function hasCell(x, y) {
  return Boolean(state.cells[keyOf(x, y)]);
}

function hasExploredCell(x, y) {
  const cell = state.cells[keyOf(x, y)];
  return Boolean(cell && !cell.isService);
}

function canEnterCell(cell) {
  if (!cell) return false;
  if (cell.isService) return false;
  if (cell.type === "water") return Boolean(state.skills.water);
  if (cell.type === "forest") return Boolean(state.skills.forest);

  return true;
}

function flightLevel() {
  const earnedLevel = Object.values(state.flightDays || {}).filter(Boolean).length;
  return Math.max(FORCED_FLIGHT_LEVEL, DEMO_MODE ? Math.max(DEMO_FLIGHT_LEVEL, earnedLevel) : earnedLevel);
}

function recordFlightProgress(steps, date = todayKey()) {
  if (steps < FLIGHT_STEP_GOAL) return false;

  state.flightDays = state.flightDays || {};
  const alreadyCounted = Boolean(state.flightDays[date]);
  state.flightDays[date] = true;
  return !alreadyCounted;
}

function canPassFlightCell(cell) {
  return Boolean(cell && !cell.isService);
}

function canLandFlightCell(cell) {
  return Boolean(cell && !cell.isService && cell.type === "field");
}

function flightDistanceTo(targetX, targetY) {
  const level = flightLevel();
  if (level <= 0) return null;
  if (targetX === state.position.x && targetY === state.position.y) return null;

  const targetCell = state.cells[keyOf(targetX, targetY)];
  if (!canLandFlightCell(targetCell)) return null;

  const queue = [{ x: state.position.x, y: state.position.y, distance: 0 }];
  const visited = new Set([keyOf(state.position.x, state.position.y)]);
  let cursor = 0;

  while (cursor < queue.length) {
    const current = queue[cursor];
    cursor += 1;

    if (current.distance >= level) continue;

    for (const [dx, dy] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) {
      const nextX = current.x + dx;
      const nextY = current.y + dy;
      const nextKey = keyOf(nextX, nextY);
      if (visited.has(nextKey) || !insideWorld(nextX, nextY)) continue;

      const nextCell = state.cells[nextKey];
      if (!canPassFlightCell(nextCell)) continue;

      const distance = current.distance + 1;
      if (nextX === targetX && nextY === targetY) return distance;

      visited.add(nextKey);
      queue.push({ x: nextX, y: nextY, distance });
    }
  }

  return null;
}

function directionForTravel(from, to) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;

  if (Math.abs(dx) >= Math.abs(dy)) return dx >= 0 ? "right" : "left";
  return dy >= 0 ? "down" : "up";
}

function hasCharacterPlacement(characterId) {
  return Boolean(state.characterPlacements[characterId]);
}

function isCharacterHomeCell(x, y) {
  return CHARACTERS.some((character) => {
    const placement = characterPlacement(character);
    return placement && placement.home.x === x && placement.home.y === y;
  });
}

function isAccessibleCharacterCell(x, y) {
  if (!insideWorld(x, y) || x <= 0 || isCharacterHomeCell(x, y)) return false;

  const homeCell = state.cells[keyOf(x, y)];
  const retreatCell = state.cells[keyOf(x - 1, y)];
  if (!homeCell || homeCell.type !== "field" || homeCell.isService) return false;
  if (retreatCell && retreatCell.type !== "field") return false;

  return true;
}

function placeCharacter(character, x, y) {
  state.characterPlacements[character.id] = {
    home: { x, y },
    retreat: { x: x - 1, y, type: "field" },
  };

  ensureCharacterCells(state.cells, state.characterPlacements);
}

function placeCharactersAfterCellOpen(x, y) {
  for (const character of CHARACTERS) {
    if (hasCharacterPlacement(character.id) || !character.spawn) continue;
    if (character.spawn.type !== "nth-open-accessible-cell") continue;
    if (state.openedCellsCount < character.spawn.openCount) continue;
    if (!isAccessibleCharacterCell(x, y)) continue;

    placeCharacter(character, x, y);
  }
}

function characterAtHome(x, y) {
  return CHARACTERS.find((character) => {
    const placement = characterPlacement(character);
    return placement && placement.home.x === x && placement.home.y === y;
  }) || null;
}

function characterRenderPosition(character) {
  const placement = characterPlacement(character);
  if (!placement) return null;

  const tyapaOnHome = state.position.x === placement.home.x && state.position.y === placement.home.y;
  if (!tyapaOnHome) return placement.home;

  const retreatCell = state.cells[keyOf(placement.retreat.x, placement.retreat.y)];
  const tyapaOnRetreat = state.position.x === placement.retreat.x && state.position.y === placement.retreat.y;
  if (retreatCell && retreatCell.isService && !tyapaOnRetreat) {
    return placement.retreat;
  }

  return null;
}

function characterAtRenderPosition(x, y) {
  return CHARACTERS.find((character) => {
    const position = characterRenderPosition(character);
    return position && position.x === x && position.y === y;
  }) || null;
}

function canOpenCell(x, y) {
  if (!insideWorld(x, y) || hasCell(x, y)) return false;

  return [
    [x, y - 1],
    [x, y + 1],
    [x - 1, y],
    [x + 1, y],
  ].some(([nextX, nextY]) => hasExploredCell(nextX, nextY));
}

function isWorldCorner(x, y) {
  const max = WORLD_SIZE - 1;
  return (x === 0 || x === max) && (y === 0 || y === max);
}

function familyForCorner(x, y) {
  return FAMILY_EVENTS[keyOf(x, y)] || null;
}

function clampViewCenterForSize(center, viewSize) {
  const half = Math.floor((viewSize - 1) / 2);

  return {
    x: Math.min(Math.max(center.x, half), WORLD_SIZE - 1 - half),
    y: Math.min(Math.max(center.y, half), WORLD_SIZE - 1 - half),
  };
}

function keepPositionInView() {
  const half = Math.floor((state.viewSize - 1) / 2);
  const nextCenter = state.viewCenter ? { ...state.viewCenter } : { ...state.position };
  const left = nextCenter.x - half;
  const right = nextCenter.x + half;
  const top = nextCenter.y - half;
  const bottom = nextCenter.y + half;

  if (state.position.x < left) {
    nextCenter.x = state.position.x + half;
  } else if (state.position.x === left) {
    nextCenter.x -= 1;
  } else if (state.position.x > right) {
    nextCenter.x = state.position.x - half;
  } else if (state.position.x === right) {
    nextCenter.x += 1;
  }

  if (state.position.y < top) {
    nextCenter.y = state.position.y + half;
  } else if (state.position.y === top) {
    nextCenter.y -= 1;
  } else if (state.position.y > bottom) {
    nextCenter.y = state.position.y - half;
  } else if (state.position.y === bottom) {
    nextCenter.y += 1;
  }

  state.viewCenter = clampViewCenterForSize(nextCenter, state.viewSize);
}

function clampCurrentViewCenter() {
  state.viewCenter = clampViewCenterForSize(state.viewCenter || state.position, state.viewSize);
}

function moveViewByCells(deltaX, deltaY, options = {}) {
  const nextCenter = clampViewCenterForSize(
    {
      x: state.viewCenter.x + deltaX,
      y: state.viewCenter.y + deltaY,
    },
    state.viewSize,
  );

  if (nextCenter.x === state.viewCenter.x && nextCenter.y === state.viewCenter.y) return false;

  state.viewCenter = nextCenter;
  if (options.persist) {
    saveState();
    render();
  } else {
    scheduleRender();
  }
  return true;
}

function panView(direction) {
  const deltas = {
    up: [0, -1],
    down: [0, 1],
    left: [-1, 0],
    right: [1, 0],
  };
  const [dx, dy] = deltas[direction];
  const step = state.viewSize;
  state.viewCenter = clampViewCenterForSize(
    {
      x: state.viewCenter.x + dx * step,
      y: state.viewCenter.y + dy * step,
    },
    state.viewSize,
  );
  saveState();
  render();
  setRandomMessage("mapWindow", { x: state.viewCenter.x, y: state.viewCenter.y });
}

function hash2d(x, y, salt = 0) {
  let value = Math.imul(x + 374761393, 668265263) ^ Math.imul(y + 1442695041, 2246822519) ^ Math.imul(salt + 1, 3266489917);
  value = Math.imul(value ^ (value >>> 13), 1274126177);
  return ((value ^ (value >>> 16)) >>> 0) / 4294967295;
}

function clusterScore(x, y, cellSize, salt, density, minRadius, maxRadius) {
  const gx = Math.floor(x / cellSize);
  const gy = Math.floor(y / cellSize);
  let best = Infinity;

  for (let oy = -1; oy <= 1; oy += 1) {
    for (let ox = -1; ox <= 1; ox += 1) {
      const seedX = gx + ox;
      const seedY = gy + oy;
      if (hash2d(seedX, seedY, salt) > density) continue;

      const centerX = seedX * cellSize + 1 + Math.floor(hash2d(seedX, seedY, salt + 11) * (cellSize - 2));
      const centerY = seedY * cellSize + 1 + Math.floor(hash2d(seedX, seedY, salt + 23) * (cellSize - 2));
      const radius = minRadius + hash2d(seedX, seedY, salt + 37) * (maxRadius - minRadius);
      const dx = (x - centerX) / radius;
      const dy = (y - centerY) / (radius * (0.72 + hash2d(seedX, seedY, salt + 41) * 0.45));
      const wobble = (hash2d(x, y, salt + 53) - 0.5) * 0.34;
      best = Math.min(best, dx * dx + dy * dy + wobble);
    }
  }

  return best;
}

function directionalStreamScore(x, y, salt, angle, spacing, density) {
  const along = x * Math.cos(angle) + y * Math.sin(angle);
  const cross = -x * Math.sin(angle) + y * Math.cos(angle);
  const band = Math.floor(cross / spacing);
  const active = hash2d(band, 0, salt) < density;
  if (!active) return Infinity;

  const center = band * spacing + spacing * (0.22 + hash2d(band, 1, salt + 1) * 0.46);
  const phase = hash2d(band, 2, salt + 2) * Math.PI * 2;
  const meander = Math.sin(along * 0.48 + phase) * 1.15 + Math.sin(along * 0.17 + phase * 0.7) * 0.7;
  const segmentGap = hash2d(Math.floor(along / 5), band, salt + 3) < 0.38;
  if (segmentGap) return Infinity;

  return Math.abs(cross - center - meander);
}

function streamScore(x, y) {
  return Math.min(
    directionalStreamScore(x, y, 730, 0.1, 24, 0.08),
    directionalStreamScore(x, y, 760, 1.36, 28, 0.06),
    directionalStreamScore(x, y, 790, -0.72, 30, 0.05),
  );
}

function biomeAt(x, y) {
  if (Math.abs(x - START) <= 1 && Math.abs(y - START) <= 1) return "field";

  const pond = clusterScore(x, y, 6, 100, 0.26, 1.15, 1.75);
  const stream = streamScore(x, y);
  if (pond < 1 || stream < 0.45) return "water";

  const grove = clusterScore(x, y, 5, 300, 0.14, 1, 1.65);
  if (grove < 1 && hash2d(x, y, 301) > 0.08) return "forest";

  return "field";
}

function randomTileType(x, y) {
  return biomeAt(x, y);
}

function biomeBlendLayers(cell) {
  return "";
}

function biomeDetailLayers(cell) {
  return "";
}

function biomeSurfaceLayer(cell) {
  return "";
}

function setMessage(text) {
  elements.message.textContent = text;
}

function setRandomMessage(key, params = {}) {
  const variants = MESSAGE_VARIANTS[key];
  if (!variants || variants.length === 0) return;

  const variant = variants[Math.floor(Math.random() * variants.length)];
  setMessage(variant(params));
}

function diaryEntryId(type) {
  return `${type}-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function addDiaryEntry({ type = "note", text, characterId = null, itemId = null, date = todayKey() }) {
  const cleanText = String(text || "").trim();
  if (!cleanText) return null;

  const entry = {
    id: diaryEntryId(type),
    type,
    date,
    text: cleanText,
    characterId,
    itemId,
    createdAt: new Date().toISOString(),
  };

  state.diaryEntries.push(entry);
  saveState();
  renderShellHome();
  return entry;
}

function addDiaryNote(text) {
  return addDiaryEntry({ type: "note", text });
}

function recordCharacterMeeting(character) {
  if (!character) return null;

  const date = todayKey();
  state.diaryMeetingDays[date] ||= {};
  if (state.diaryMeetingDays[date][character.id]) return null;

  state.diaryMeetingDays[date][character.id] = true;
  return addDiaryEntry({
    type: "meeting",
    date,
    characterId: character.id,
    text: `Тяпа встретил ${character.name}.`,
  });
}

function unlockItem(itemId, options = {}) {
  const item = ITEM_CATALOG[itemId];
  if (!item) return null;
  if (state.unlockedItems[itemId]) return state.unlockedItems[itemId];

  const unlockedItem = {
    id: item.id,
    unlockedAt: new Date().toISOString(),
  };

  state.unlockedItems[itemId] = unlockedItem;
  addDiaryEntry({
    type: "item",
    itemId: item.id,
    text: options.note || item.note || `Тяпа нашел: ${item.name}.`,
  });

  return unlockedItem;
}

window.tyapaShell = {
  addDiaryNote,
  itemCatalog: ITEM_CATALOG,
  recordCharacterMeeting,
  unlockItem,
};

function ensureTutorialState() {
  if (!state.tutorial || state.tutorial.version !== TUTORIAL_VERSION) {
    state.tutorial = normalizeTutorialState(state.tutorial, state);
  }

  if (!state.tutorial.seenTips || typeof state.tutorial.seenTips !== "object") {
    state.tutorial.seenTips = {};
  }

  return state.tutorial;
}

function needsStepSourceChoice() {
  return !state.stepSource;
}

function tutorialIsSuppressed() {
  return Boolean(needsStepSourceChoice() || introCutsceneActive || shellHomeOpen || state.familyOverlay || state.activeDialogue);
}

function activeStartTutorialStep() {
  const tutorial = ensureTutorialState();
  if (tutorial.startCompleted || tutorialIsSuppressed()) return null;

  const stepIndex = Math.min(Math.max(tutorial.introStep, 0), TUTORIAL_STEPS.length - 1);
  return { ...TUTORIAL_STEPS[stepIndex], kind: "start", stepIndex };
}

function activeTutorialTip() {
  const tutorial = ensureTutorialState();
  if (!tutorial.startCompleted || tutorialIsSuppressed()) return null;
  if (!tutorial.activeTipId || !TUTORIAL_TIPS[tutorial.activeTipId]) return null;

  return { ...TUTORIAL_TIPS[tutorial.activeTipId], kind: "tip", id: tutorial.activeTipId };
}

function activeTutorialEntry() {
  return activeStartTutorialStep() || activeTutorialTip();
}

function isStartTutorialBlockingActions() {
  const step = activeStartTutorialStep();
  return Boolean(step && !step.waitsFor);
}

function completeStartTutorial() {
  const tutorial = ensureTutorialState();
  tutorial.startCompleted = true;
  tutorial.introStep = TUTORIAL_STEPS.length - 1;
  tutorial.activeTipId = null;
}

function completeStartTutorialAction(action) {
  const tutorial = ensureTutorialState();
  if (tutorial.startCompleted) return false;

  const step = TUTORIAL_STEPS[tutorial.introStep];
  if (!step || step.waitsFor !== action) return false;

  tutorial.introStep = Math.min(tutorial.introStep + 1, TUTORIAL_STEPS.length - 1);
  return true;
}

function advanceTutorialCard() {
  const step = activeStartTutorialStep();

  if (step) {
    if (step.waitsFor) return;

    if (step.stepIndex >= TUTORIAL_STEPS.length - 1) {
      completeStartTutorial();
    } else {
      ensureTutorialState().introStep = step.stepIndex + 1;
    }

    saveState();
    render();
    playSfx("uiTap");
    return;
  }

  dismissTutorialTip();
}

function skipTutorial() {
  if (activeStartTutorialStep()) {
    completeStartTutorial();
    saveState();
    render();
    playSfx("uiTap");
    return;
  }

  dismissTutorialTip();
}

function dismissTutorialTip() {
  const tutorial = ensureTutorialState();
  if (!tutorial.activeTipId) return;

  tutorial.activeTipId = null;
  saveState();
  render();
  playSfx("uiTap");
}

function maybeQueueTutorialTip(id) {
  const tutorial = ensureTutorialState();
  if (!tutorial.startCompleted || tutorial.activeTipId || !TUTORIAL_TIPS[id] || tutorial.seenTips[id]) return false;

  tutorial.activeTipId = id;
  tutorial.seenTips[id] = true;
  return true;
}

function showTutorialTip(id) {
  if (!maybeQueueTutorialTip(id)) return false;

  saveState();
  render();
  return true;
}

function totalTrailWalks() {
  return Object.values(state.trails || {}).reduce((sum, trail) => sum + (Number(trail.walkCount) || 0), 0);
}

function maybeQueueProgressTutorialTips() {
  const candidates = [
    ["routeChoice", state.openedCellsCount >= 3],
    ["trails", totalTrailWalks() >= 8],
    ["cornerHint", state.openedCellsCount >= 12],
  ];

  for (const [id, condition] of candidates) {
    if (condition && maybeQueueTutorialTip(id)) return true;
  }

  return false;
}

function tutorialMoveTarget() {
  const candidates = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  for (const [dx, dy] of candidates) {
    const x = state.position.x + dx;
    const y = state.position.y + dy;
    const cell = state.cells[keyOf(x, y)];
    if (cell && canEnterCell(cell)) return { x, y };
  }

  return null;
}

function tutorialOpenTarget() {
  const candidates = [];

  Object.values(state.cells || {}).forEach((cell) => {
    if (!cell || cell.isService) return;

    [
      [cell.x + 1, cell.y],
      [cell.x, cell.y + 1],
      [cell.x - 1, cell.y],
      [cell.x, cell.y - 1],
    ].forEach(([x, y]) => {
      if (canOpenCell(x, y)) candidates.push({ x, y });
    });
  });

  candidates.sort((a, b) => {
    const distanceA = Math.abs(a.x - state.position.x) + Math.abs(a.y - state.position.y);
    const distanceB = Math.abs(b.x - state.position.x) + Math.abs(b.y - state.position.y);
    if (distanceA !== distanceB) return distanceA - distanceB;
    if (a.y !== b.y) return a.y - b.y;
    return a.x - b.x;
  });

  return candidates[0] || null;
}

function tutorialTileClass(x, y, canOpen, entry, target) {
  if (!entry) return "";

  if (entry.target === "move-cell") {
    return target && target.x === x && target.y === y ? " tutorial-target" : "";
  }

  if (entry.target === "open-cell" && canOpen) {
    return target && target.x === x && target.y === y ? " tutorial-target" : "";
  }

  return "";
}

function tutorialEntryText(entry) {
  return typeof entry.text === "function" ? entry.text() : entry.text;
}

function renderTutorial() {
  const entry = activeTutorialEntry();
  const hasEntry = Boolean(entry);
  const target = entry?.target || "";
  const isBlocking = Boolean(entry?.kind === "start" && !entry.waitsFor);

  document.body.classList.toggle("tutorial-active", hasEntry);
  document.body.dataset.tutorialTarget = target;
  elements.stats?.classList.toggle("tutorial-focus", target === "stats");
  elements.map?.classList.toggle("tutorial-focus", target === "map");
  elements.zoomControls?.classList.toggle("tutorial-focus", target === "zoom");
  elements.seedButton?.classList.toggle("tutorial-focus", target === "seed");

  if (!elements.tutorialLayer) return;

  elements.tutorialLayer.hidden = !hasEntry;
  elements.tutorialLayer.classList.toggle("is-blocking", isBlocking);
  elements.tutorialLayer.classList.toggle("is-waiting", Boolean(entry?.waitsFor));

  if (!entry) return;

  elements.tutorialKicker.textContent = entry.kind === "start"
    ? `Обучение ${entry.stepIndex + 1}/${TUTORIAL_STEPS.length}`
    : "Подсказка";
  elements.tutorialTitle.textContent = entry.title;
  elements.tutorialText.textContent = tutorialEntryText(entry);
  elements.tutorialNextButton.hidden = Boolean(entry.waitsFor);
  elements.tutorialNextButton.textContent = entry.action || "Понял";
  elements.tutorialSkipButton.hidden = entry.kind === "tip";
  elements.tutorialSkipButton.textContent = "Пропустить";
}

function renderStepSourceChoice() {
  const shouldShow = needsStepSourceChoice();
  document.body.classList.toggle("step-source-active", shouldShow);

  if (!elements.stepSourceLayer) return;

  elements.stepSourceLayer.hidden = !shouldShow;
  if (!shouldShow) return;

  const hasNativeSteps = Boolean(nativeStepProvider());
  if (elements.deviceStepsButton) {
    elements.deviceStepsButton.disabled = !hasNativeSteps;
    elements.deviceStepsButton.querySelector("strong").textContent = hasNativeSteps
      ? "Дать доступ к шагам"
      : "Недоступно в Safari";
    elements.deviceStepsButton.querySelector("span").textContent = hasNativeSteps
      ? "Подключит шаги с этого устройства."
      : "Сайт не может читать Apple Health напрямую. Для проверки выбери демо.";
  }
  if (elements.stepSourceHint) {
    elements.stepSourceHint.textContent = hasNativeSteps
      ? "Это можно поменять позже в настройках."
      : "Настоящие шаги появятся в iPhone-приложении или TestFlight-сборке.";
  }
}

function markStepSource(source) {
  state.stepSource = source;
  if (source === STEP_SOURCE_DEMO) {
    state.stepsPermission = "granted";
  } else if (source === STEP_SOURCE_DEVICE && state.stepsPermission === "granted" && !nativeStepProvider()) {
    state.stepsPermission = "unknown";
  }
}

async function continueAfterStepSourceChoice(options = {}) {
  const { settle = true } = options;
  if (settle) {
    await settleStepsOnEntry({ silent: true, source: "step-source" });
  }

  const shouldPlayIntro = shouldPlayIntroCutscene();
  introCutsceneActive = shouldPlayIntro;
  saveState();
  render();

  if (shouldPlayIntro) {
    window.setTimeout(playIntroCutscene, 240);
  }
}

async function chooseStepSource(source, options = {}) {
  const { fromSettings = false } = options;
  playSfx("uiTap");

  if (source === STEP_SOURCE_DEMO) {
    markStepSource(STEP_SOURCE_DEMO);
    saveState();
    render();
    setMessage("Демо-режим включен. Можно ввести шаги вручную.");
    await continueAfterStepSourceChoice({ settle: false });
    return;
  }

  if (source !== STEP_SOURCE_DEVICE) return;

  const provider = nativeStepProvider();
  if (!provider) {
    setMessage("В Safari сайт не может читать Apple Health напрямую. Включи демо-режим для проверки.");
    if (elements.stepSourceHint && needsStepSourceChoice()) {
      elements.stepSourceHint.textContent = "Для настоящих шагов нужна iPhone-сборка с HealthKit. Демо подойдет для теста сайта.";
    }
    if (fromSettings) render();
    playSfx("moveDenied");
    return;
  }

  markStepSource(STEP_SOURCE_DEVICE);
  await grantSteps({ continueAfterChoice: true });
}

function setLoaderProgress(value) {
  const progress = document.querySelector("#loaderProgress");
  const bar = document.querySelector("#loaderBarFill");
  if (progress) progress.textContent = `${value}%`;
  if (bar) bar.style.width = `${Math.min(Math.max(value, 0), 100)}%`;
}

function loadImageAsset(src) {
  return new Promise((resolve) => {
    const image = new Image();
    const timeout = window.setTimeout(() => resolve({ src, ok: false, timedOut: true }), PRELOAD_TIMEOUT_MS);
    image.onload = () => {
      window.clearTimeout(timeout);
      resolve({ src, ok: true });
    };
    image.onerror = () => {
      window.clearTimeout(timeout);
      resolve({ src, ok: false });
    };
    image.src = src;
  });
}

async function preloadImageAssets(assets, { onProgress, concurrency = 3 } = {}) {
  const uniqueAssets = [...new Set(assets)];
  let loadedCount = 0;
  const results = [];
  let nextIndex = 0;

  if (uniqueAssets.length === 0) {
    onProgress?.(100);
    return results;
  }

  async function worker() {
    while (nextIndex < uniqueAssets.length) {
      const src = uniqueAssets[nextIndex];
      nextIndex += 1;
      const result = await loadImageAsset(src);
      results.push(result);
      loadedCount += 1;
      onProgress?.(Math.round((loadedCount / uniqueAssets.length) * 100));
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, uniqueAssets.length) }, worker));

  return results;
}

async function preloadKeyAssets() {
  setLoaderProgress(0);

  const results = await preloadImageAssets(PRELOAD_CRITICAL_ASSETS, {
    concurrency: 2,
    onProgress: setLoaderProgress,
  });

  const failedAssets = results.filter((result) => !result.ok);
  if (failedAssets.length > 0) {
    console.warn("Some assets failed to preload:", failedAssets.map(({ src }) => src));
  }
}

function preloadStagedAssets() {
  const familyImages = Object.values(FAMILY_EVENTS).map(({ image }) => image);
  preloadImageAssets([...PRELOAD_STAGED_ASSETS, ...familyImages], { concurrency: 2 })
    .then((results) => {
      const failedAssets = results.filter((result) => !result.ok);
      if (failedAssets.length > 0) {
        console.warn("Some staged assets failed to preload:", failedAssets.map(({ src }) => src));
      }
    });
}

function hideLoader() {
  const loader = document.querySelector("#loader");
  document.body.classList.remove("loading");
  if (!loader) return;

  loader.classList.add("done");
  window.setTimeout(() => loader.remove(), 450);
}

function shouldPlayIntroCutscene() {
  const tutorial = ensureTutorialState();
  return Boolean(
    elements.introCutscene
    && !state.introCutscenePlayed
    && !hasSavedGameProgress(state)
    && !tutorial.startCompleted,
  );
}

function playIntroCutscene() {
  if (!elements.introCutscene || state.introCutscenePlayed) {
    introCutsceneActive = false;
    render();
    return;
  }

  introCutsceneActive = true;
  document.body.classList.add("intro-playing");
  elements.introCutscene.hidden = false;
  elements.introCutscene.classList.remove("is-playing");
  elements.introCutscene.getBoundingClientRect();
  elements.introCutscene.classList.add("is-playing");
  introCutsceneTimer = window.setTimeout(() => finishIntroCutscene(), INTRO_CUTSCENE_MS);
}

function finishIntroCutscene(options = {}) {
  if (introCutsceneTimer !== null) {
    window.clearTimeout(introCutsceneTimer);
    introCutsceneTimer = null;
  }

  introCutsceneActive = false;
  state.introCutscenePlayed = true;
  document.body.classList.remove("intro-playing");

  if (elements.introCutscene) {
    elements.introCutscene.classList.remove("is-playing");
    elements.introCutscene.hidden = true;
  }

  saveState();
  render();

  if (options.skipped) {
    playSfx("uiTap");
  }
}

async function grantSteps(options = {}) {
  const { continueAfterChoice = false } = options;
  if (state.stepSource !== STEP_SOURCE_DEVICE) {
    markStepSource(STEP_SOURCE_DEMO);
    saveState();
    render();
    setMessage("Демо-режим включен. Можно ввести шаги вручную.");
    return;
  }

  const provider = activeStepProvider();
  if (provider && typeof provider.requestPermission === "function") {
    try {
      const permission = await provider.requestPermission();
      state.stepsPermission = permission === true || permission === "granted" ? "granted" : "denied";
    } catch (error) {
      console.warn("Step permission failed.", error);
      state.stepsPermission = "denied";
    }
  } else {
    state.stepsPermission = "granted";
  }

  saveState();
  render();

  if (state.stepsPermission === "granted") {
    if (provider) {
      setMessage("Доступ к шагам включен.");
    } else {
      setMessage("Доступ к шагам включен, но мост устройства пока не ответил.");
    }
    playSfx("toggleOn");
    await settleStepsOnEntry({ silent: false, source: "permission" });
  } else {
    setMessage("Доступ к шагам не выдан.");
    playSfx("moveDenied");
  }

  if (continueAfterChoice) {
    await continueAfterStepSourceChoice({ settle: false });
  }
}

function updateSteps() {
  if (state.stepSource !== STEP_SOURCE_DEMO || !elements.stepsInput) return;

  const rawSteps = String(elements.stepsInput.value || "").replace(/[^\d]/g, "");
  const nextSteps = Math.max(0, Math.floor(Number(rawSteps) || 0));
  const settlementDate = new Date();
  const settlementStart = settlementStartFor(settlementDate).toISOString();
  const settlementEnd = settlementDate.toISOString();

  if (state.lastStepDate !== todayKey()) {
    state.stepsToday = 0;
    state.lastStepsCounted = 0;
    state.lastStepDate = todayKey();
  }

  const earned = Math.max(0, nextSteps - state.lastStepsCounted);
  state.stepsToday = nextSteps;
  state.lastStepsCounted = Math.max(state.lastStepsCounted, nextSteps);
  recordFlightProgress(nextSteps, state.lastStepDate);
  if (earned > 0) {
    earnTyaptyaps(earned);
    recordStepSettlement({ start: settlementStart, end: settlementEnd, earned, source: "manual" });
  }
  state.lastStepSettlementAt = settlementEnd;
  saveState();
  render();

  if (earned > 0) {
    setRandomMessage("stepsEarned", { earned });
    playSfx("coinsEarned");
  } else {
    setRandomMessage("stepsNoEarn");
    playSfx("uiTap");
  }
}

function startCoinsEdit() {
  elements.coins.value = String(state.coins);
  elements.coins.select();
}

function commitCoinsEdit() {
  state.coins = parseCoinsInput(elements.coins.value);
  saveState();
  render();
  setRandomMessage("coinsUpdated", { coins: state.coins });
  playSfx("coinsEarned");
}

function finishTyapaTravel(previousPosition, nextPosition, options = {}) {
  const { recordTrail = true, message = "moveSuccess", spendCategory = "walking" } = options;

  spendTyaptyaps(MOVE_COST, spendCategory);
  state.position = { ...nextPosition };
  if (recordTrail) recordTrailMove(previousPosition, state.position);
  state.isResting = false;
  state.familyOverlay = familyForCorner(nextPosition.x, nextPosition.y);
  const hasFamilyOverlay = Boolean(state.familyOverlay);
  const character = characterAtHome(nextPosition.x, nextPosition.y);
  recordCharacterMeeting(character);
  if (character && !state.seenDialogues[character.id]) {
    state.seenDialogues[character.id] = true;
    state.activeDialogue = { characterId: character.id, lineIndex: 0 };
  }
  completeStartTutorialAction("move");
  maybeQueueProgressTutorialTips();
  keepPositionInView();
  saveState();
  const animated = animateTyapaTravel(previousPosition, state.position, directionForTravel(previousPosition, state.position), () => {
    render();
  });
  if (animated) {
    syncVisibleCoordinateBadges();
  } else {
    render();
  }
  playSfx(STEP_SFX[Math.floor(Math.random() * STEP_SFX.length)], { cooldown: 90 });
  if (hasFamilyOverlay) playSfx("familyFound");
  if (state.activeDialogue) return;
  setRandomMessage(message, { level: flightLevel() });
}

function moveTyapa(direction) {
  if (state.activeDialogue) return;
  if (needsStepSourceChoice()) return;
  if (isStartTutorialBlockingActions()) return;
  if (state.seedMode) {
    setMessage(seedModePrompt());
    playSfx("moveDenied");
    return;
  }

  const deltas = {
    up: [0, -1],
    down: [0, 1],
    left: [-1, 0],
    right: [1, 0],
  };
  const [dx, dy] = deltas[direction];
  const nextX = state.position.x + dx;
  const nextY = state.position.y + dy;

  if (!insideWorld(nextX, nextY)) {
    setRandomMessage("worldEdge");
    playSfx("moveDenied");
    return;
  }

  if (!hasCell(nextX, nextY)) {
    setRandomMessage("closedCell");
    playSfx("closedCell");
    return;
  }

  const nextCell = state.cells[keyOf(nextX, nextY)];
  if (nextCell.isService) {
    setRandomMessage("closedCell");
    playSfx("closedCell");
    return;
  }

  if (!canEnterCell(nextCell)) {
    setRandomMessage(nextCell.type === "water" ? "waterBlocked" : "forestBlocked");
    playSfx(nextCell.type === "water" ? "waterBlocked" : "forestBlocked");
    showTutorialTip("terrain");
    return;
  }

  if (state.coins < MOVE_COST) {
    setRandomMessage("notEnoughMoveCoins");
    playSfx("moveDenied");
    return;
  }

  finishTyapaTravel({ ...state.position }, { x: nextX, y: nextY });
}

function flyTyapaTo(x, y) {
  if (state.activeDialogue) return false;
  if (isStartTutorialBlockingActions()) return false;
  if (state.seedMode) {
    setMessage(seedModePrompt());
    playSfx("moveDenied");
    return true;
  }

  const distance = flightDistanceTo(x, y);
  if (!distance) return false;

  if (state.coins < MOVE_COST) {
    setRandomMessage("notEnoughMoveCoins");
    playSfx("moveDenied");
    return true;
  }

  finishTyapaTravel({ ...state.position }, { x, y }, { recordTrail: false, message: "flightSuccess", spendCategory: "flights" });
  return true;
}

function openCell(x, y) {
  if (isStartTutorialBlockingActions()) return;
  if (state.seedMode) {
    setMessage(seedModePrompt());
    playSfx("moveDenied");
    return;
  }

  const openCost = openCostForNextCell();

  if (!canOpenCell(x, y)) {
    setRandomMessage("openNotAllowed");
    playSfx("moveDenied");
    return;
  }

  if (state.coins < openCost) {
    setRandomMessage("notEnoughOpenCoins", { openCost });
    playSfx("moveDenied");
    return;
  }

  spendTyaptyaps(openCost, "openCells");
  state.openedCellsCount += 1;
  state.cells[keyOf(x, y)] = { x, y, type: randomTileType(x, y) };
  placeCharactersAfterCellOpen(x, y);
  state.familyOverlay = familyForCorner(x, y);
  const hasFamilyOverlay = Boolean(state.familyOverlay);
  completeStartTutorialAction("open");
  maybeQueueProgressTutorialTips();
  saveState();
  render();
  setRandomMessage("cellOpened");
  playSfx("coinsSpend");
  playSfx("cellOpen", { cooldown: 180 });
  if (hasFamilyOverlay) playSfx("familyFound");
}

function continueFromFamily() {
  state.familyOverlay = null;
  saveState();
  render();
  setRandomMessage("familyReturn");
  playSfx("returnToMap");
}

function toggleRest() {
  state.isResting = !state.isResting;
  if (state.isResting) maybeQueueTutorialTip("shell");
  saveState();
  render();
  setRandomMessage(state.isResting ? "restStart" : "restEnd");
  playSfx(state.isResting ? "restIn" : "restOut");
}

function showFlightInfo() {
  const level = flightLevel();
  setMessage(`Полет ур. ${level}: клик по доступной клетке в пределах ${level} переходов переносит Тяпу за ${MOVE_COST} тяптяпов. Лететь можно через воду и лес, но садиться только на поле.`);
  playSfx("uiTap");
}

function renderShellItems() {
  if (!elements.shellItems) return;

  elements.shellItems.replaceChildren();
  const unlockedItems = Object.keys(state.unlockedItems)
    .map((itemId) => ITEM_CATALOG[itemId])
    .filter(Boolean);

  if (unlockedItems.length === 0) {
    const empty = document.createElement("p");
    empty.className = "shell-empty";
    empty.textContent = "Полочка уже есть. Находки откроются позже.";
    elements.shellItems.append(empty);
    return;
  }

  unlockedItems.forEach((item) => {
    const itemNode = document.createElement("article");
    itemNode.className = "shell-item";
    itemNode.title = item.name;

    const icon = document.createElement("span");
    icon.className = "shell-item-icon";
    icon.style.setProperty("--item-color", item.color || "#f0b43f");
    icon.textContent = item.icon || "•";

    const name = document.createElement("strong");
    name.textContent = item.name;

    itemNode.append(icon, name);
    elements.shellItems.append(itemNode);
  });
}

function renderShellDiary() {
  if (!elements.shellDiaryEntries) return;

  elements.shellDiaryEntries.replaceChildren();
  const entries = state.diaryEntries.slice(-6).reverse();

  if (entries.length === 0) {
    const empty = document.createElement("li");
    empty.className = "shell-empty";
    empty.textContent = "Дневник уже на месте. Записи откроются позже.";
    elements.shellDiaryEntries.append(empty);
    return;
  }

  entries.forEach((entry) => {
    const row = document.createElement("li");
    row.className = `shell-diary-entry diary-${entry.type}`;

    const date = document.createElement("time");
    date.dateTime = entry.date;
    date.textContent = entry.date;

    const text = document.createElement("span");
    text.textContent = entry.text;

    row.append(date, text);
    elements.shellDiaryEntries.append(row);
  });
}

function renderShellHome() {
  renderShellItems();
  renderShellDiary();
}

function syncShellHome() {
  if (!elements.shellHome || !elements.shellButton) return;

  elements.shellHome.hidden = !shellHomeOpen;
  elements.shellButton.setAttribute("aria-expanded", String(shellHomeOpen));
}

function openShellHome() {
  shellHomeOpen = true;
  stopMapDrag();
  syncShellHome();
  renderShellHome();
  setMessage("Тяпа открыл скорлупку. Полочка и дневник уже на месте, но пока недоступны.");
  playSfx("restIn");
}

function closeShellHome() {
  shellHomeOpen = false;
  syncShellHome();
  setMessage("Тяпа вернулся к карте.");
  playSfx("restOut");
  elements.shellButton?.focus();
}

function changeZoom(direction) {
  if (isStartTutorialBlockingActions()) return;

  const currentIndex = ZOOM_LEVELS.indexOf(state.viewSize);
  const nextIndex = Math.min(Math.max(currentIndex + direction, 0), ZOOM_LEVELS.length - 1);

  if (nextIndex === currentIndex) {
    setRandomMessage(direction > 0 ? "zoomMaxIn" : "zoomMaxOut");
    playSfx("moveDenied");
    return;
  }

  state.viewSize = ZOOM_LEVELS[nextIndex];
  completeStartTutorialAction("zoom");
  maybeQueueProgressTutorialTips();
  keepPositionInView();
  saveState();
  render();
  setRandomMessage("zoomChanged", { viewSize: state.viewSize });
  playSfx(direction > 0 ? "zoomIn" : "zoomOut");
}

function centerViewOnTyapa() {
  if (isStartTutorialBlockingActions()) return;

  state.viewCenter = clampViewCenterForSize({ ...state.position }, state.viewSize);
  completeStartTutorialAction("center");
  saveState();
  render();
  setRandomMessage("mapCentered");
  playSfx("uiTap");
}

function loadAudioSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(AUDIO_SETTINGS_KEY));
    return {
      sfxEnabled: saved?.sfxEnabled !== false,
      musicEnabled: saved?.musicEnabled === true,
    };
  } catch {
    return { sfxEnabled: true, musicEnabled: false };
  }
}

function saveAudioSettings() {
  localStorage.setItem(AUDIO_SETTINGS_KEY, JSON.stringify(audioSettings));
}

function syncAudioControls() {
  const musicLabel = audioSettings.musicEnabled ? "Вкл" : "Выкл";
  elements.soundButton.classList.toggle("active", audioSettings.musicEnabled);
  elements.soundButton.setAttribute("aria-pressed", String(audioSettings.musicEnabled));
  elements.soundButton.querySelector(".switch-state").textContent = musicLabel;

  if (elements.musicToggle) {
    elements.musicToggle.setAttribute("aria-pressed", String(audioSettings.musicEnabled));
    elements.musicToggle.textContent = audioSettings.musicEnabled ? "Музыка: вкл" : "Музыка: выкл";
  }

  if (elements.sfxToggle) {
    elements.sfxToggle.setAttribute("aria-pressed", String(audioSettings.sfxEnabled));
    elements.sfxToggle.textContent = audioSettings.sfxEnabled ? "Звуки: вкл" : "Звуки: выкл";
  }
}

async function ensureAudioContext() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;

    audioContext = new AudioContextClass();
    masterGain = audioContext.createGain();
    musicGain = audioContext.createGain();
    sfxGain = audioContext.createGain();
    masterGain.gain.value = 0.78;
    musicGain.gain.value = 0;
    sfxGain.gain.value = 0.48;
    musicGain.connect(masterGain);
    sfxGain.connect(masterGain);
    masterGain.connect(audioContext.destination);
  }

  try {
    await audioContext.resume();
  } catch {
    return null;
  }

  return audioContext;
}

function playTone({ time, frequency, duration, volume = 0.035, type = "sine", destination = sfxGain, attack = 0.012, release = 0.08, detune = 0 }) {
  if (!audioContext || !destination) return;

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, time);
  oscillator.detune.setValueAtTime(detune, time);
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, volume), time + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + duration + release);
  oscillator.connect(gain).connect(destination);
  oscillator.onended = () => {
    oscillator.disconnect();
    gain.disconnect();
  };
  oscillator.start(time);
  oscillator.stop(time + duration + release + 0.03);
}

async function loadSfxBuffer(fileName) {
  if (!audioContext || !fileName) return null;

  if (!sfxBuffers.has(fileName)) {
    const bufferPromise = fetch(`${AUDIO_SFX_BASE}${fileName}`)
      .then((response) => {
        if (!response.ok) throw new Error(`SFX not found: ${fileName}`);
        return response.arrayBuffer();
      })
      .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer));
    sfxBuffers.set(fileName, bufferPromise);
  }

  try {
    return await sfxBuffers.get(fileName);
  } catch (error) {
    console.warn(error);
    sfxBuffers.delete(fileName);
    return null;
  }
}

async function playSfxSample(name, options = {}) {
  const fileName = AUDIO_SFX_FILES[name];
  if (!fileName || !audioContext || !sfxGain) return false;

  const buffer = await loadSfxBuffer(fileName);
  if (!buffer) return false;

  const source = audioContext.createBufferSource();
  const gain = audioContext.createGain();
  const isStep = name.startsWith("stepField");
  const volume = options.volume ?? (isStep ? 0.95 : 0.86);
  const pitchJitter = isStep ? 0.035 : 0;
  const playbackRate = options.playbackRate ?? (1 + (Math.random() * pitchJitter * 2 - pitchJitter));

  source.buffer = buffer;
  source.playbackRate.setValueAtTime(playbackRate, audioContext.currentTime);
  gain.gain.setValueAtTime(volume, audioContext.currentTime);
  source.connect(gain).connect(sfxGain);
  source.onended = () => {
    source.disconnect();
    gain.disconnect();
  };
  source.start();
  return true;
}

async function playSfx(name, options = {}) {
  if (!audioSettings.sfxEnabled) return;
  if (!(await ensureAudioContext())) return;

  const nowMs = performance.now();
  const cooldown = options.cooldown ?? 120;
  if (sfxCooldowns[name] && nowMs - sfxCooldowns[name] < cooldown) return;
  sfxCooldowns[name] = nowMs;

  if (await playSfxSample(name, options)) return;

  const now = audioContext.currentTime + 0.01;
  const pick = (items) => items[Math.floor(Math.random() * items.length)];

  switch (name) {
    case "stepFieldA":
    case "stepFieldB":
    case "stepFieldC": {
      const base = pick([245, 268, 292]);
      playTone({ time: now, frequency: base, duration: 0.075, volume: 0.022, type: "sine", attack: 0.018, release: 0.12 });
      playTone({ time: now + 0.07, frequency: base * 1.18, duration: 0.06, volume: 0.016, type: "triangle", attack: 0.02, release: 0.14 });
      break;
    }
    case "moveDenied":
      playTone({ time: now, frequency: 170, duration: 0.1, volume: 0.018, type: "sine", attack: 0.02, release: 0.16 });
      playTone({ time: now + 0.09, frequency: 142, duration: 0.1, volume: 0.014, type: "sine", attack: 0.02, release: 0.16 });
      break;
    case "waterBlocked":
      playTone({ time: now, frequency: 430, duration: 0.11, volume: 0.018, type: "sine", attack: 0.025, release: 0.18 });
      playTone({ time: now + 0.08, frequency: 610, duration: 0.1, volume: 0.012, type: "sine", attack: 0.025, release: 0.18 });
      break;
    case "forestBlocked":
      playTone({ time: now, frequency: 220, duration: 0.12, volume: 0.014, type: "triangle", attack: 0.03, release: 0.2, detune: -6 });
      playTone({ time: now + 0.08, frequency: 278, duration: 0.11, volume: 0.012, type: "sine", attack: 0.03, release: 0.18 });
      break;
    case "cellOpen":
      [329.63, 392, 523.25].forEach((frequency, index) => playTone({ time: now + index * 0.08, frequency, duration: 0.14, volume: 0.018, type: "sine", attack: 0.035, release: 0.2 }));
      break;
    case "coinsEarned":
      [659.25, 783.99, 987.77].forEach((frequency, index) => playTone({ time: now + index * 0.06, frequency, duration: 0.1, volume: 0.014, type: "sine", attack: 0.025, release: 0.16 }));
      break;
    case "coinsSpend":
      [392, 329.63].forEach((frequency, index) => playTone({ time: now + index * 0.06, frequency, duration: 0.09, volume: 0.012, type: "triangle", attack: 0.025, release: 0.14 }));
      break;
    case "zoomIn":
      playTone({ time: now, frequency: 392, duration: 0.08, volume: 0.014, type: "sine", attack: 0.025, release: 0.14 });
      playTone({ time: now + 0.07, frequency: 493.88, duration: 0.09, volume: 0.012, type: "sine", attack: 0.025, release: 0.16 });
      break;
    case "zoomOut":
      playTone({ time: now, frequency: 493.88, duration: 0.08, volume: 0.014, type: "sine", attack: 0.025, release: 0.14 });
      playTone({ time: now + 0.07, frequency: 392, duration: 0.09, volume: 0.012, type: "sine", attack: 0.025, release: 0.16 });
      break;
    case "restIn":
      playTone({ time: now, frequency: 294, duration: 0.14, volume: 0.016, type: "sine", attack: 0.035, release: 0.22 });
      playTone({ time: now + 0.1, frequency: 220, duration: 0.18, volume: 0.012, type: "sine", attack: 0.04, release: 0.24 });
      break;
    case "restOut":
      playTone({ time: now, frequency: 330, duration: 0.1, volume: 0.014, type: "sine", attack: 0.03, release: 0.16 });
      playTone({ time: now + 0.08, frequency: 440, duration: 0.14, volume: 0.016, type: "sine", attack: 0.03, release: 0.2 });
      break;
    case "toggleOn":
      playTone({ time: now, frequency: 440, duration: 0.08, volume: 0.014, type: "sine", attack: 0.025, release: 0.14 });
      playTone({ time: now + 0.07, frequency: 587.33, duration: 0.1, volume: 0.012, type: "sine", attack: 0.025, release: 0.16 });
      break;
    case "toggleOff":
      playTone({ time: now, frequency: 392, duration: 0.08, volume: 0.012, type: "sine", attack: 0.025, release: 0.14 });
      playTone({ time: now + 0.07, frequency: 294, duration: 0.1, volume: 0.01, type: "sine", attack: 0.025, release: 0.16 });
      break;
    case "uiTap":
    default:
      playTone({ time: now, frequency: 330, duration: 0.055, volume: 0.012, type: "sine", attack: 0.018, release: 0.12 });
      break;
  }
}

function scheduleMelody() {
  if (!audioContext || !audioSettings.musicEnabled) return;

  const now = audioContext.currentTime + 0.05;
  const melody = [392, 493.88, 587.33, 493.88, 440, 523.25, 493.88, 392];
  const harmony = [196, 246.94, 293.66, 246.94];
  melody.forEach((frequency, index) => {
    playTone({ time: now + index * 0.48, frequency, duration: 0.28, volume: 0.01, type: "sine", destination: musicGain, attack: 0.08, release: 0.28 });
  });
  harmony.forEach((frequency, index) => {
    playTone({ time: now + index * 0.96, frequency, duration: 0.6, volume: 0.006, type: "sine", destination: musicGain, attack: 0.12, release: 0.36 });
  });

  melodyTimer = window.setTimeout(scheduleMelody, 4800);
}

async function startMusic({ persist = true } = {}) {
  if (!(await ensureAudioContext())) return;

  if (persist) {
    audioSettings.musicEnabled = true;
    saveAudioSettings();
  }

  window.clearTimeout(melodyTimer);
  window.clearTimeout(musicFadeTimer);
  const now = audioContext.currentTime;
  musicGain.gain.cancelScheduledValues(now);
  musicGain.gain.setValueAtTime(Math.max(0.0001, musicGain.gain.value), now);
  musicGain.gain.linearRampToValueAtTime(0.16, now + 0.6);
  syncAudioControls();
  scheduleMelody();
}

function stopMusic({ persist = true, fade = true } = {}) {
  if (persist) {
    audioSettings.musicEnabled = false;
    saveAudioSettings();
  }

  window.clearTimeout(melodyTimer);
  syncAudioControls();

  if (!audioContext || !musicGain) return;

  window.clearTimeout(musicFadeTimer);
  const now = audioContext.currentTime;
  musicGain.gain.cancelScheduledValues(now);
  musicGain.gain.setValueAtTime(Math.max(0.0001, musicGain.gain.value), now);
  musicGain.gain.linearRampToValueAtTime(0.0001, now + (fade ? 0.45 : 0.02));
}

function toggleMusic() {
  if (audioSettings.musicEnabled) {
    playSfx("toggleOff");
    stopMusic();
    return;
  }

  audioSettings.musicEnabled = true;
  saveAudioSettings();
  syncAudioControls();
  startMusic();
  playSfx("toggleOn");
}

function toggleSfx() {
  audioSettings.sfxEnabled = !audioSettings.sfxEnabled;
  saveAudioSettings();
  syncAudioControls();
  if (audioSettings.sfxEnabled) playSfx("toggleOn");
}

function resumeSavedMusicAfterGesture() {
  if (audioSettings.musicEnabled && !audioContext) {
    startMusic({ persist: false });
  }
}

function setSettingsTab(tabName, options = {}) {
  const isStats = tabName === "stats";
  elements.settingsGeneralPanel.hidden = isStats;
  elements.settingsStatsPanel.hidden = !isStats;
  elements.settingsGeneralTab.setAttribute("aria-selected", String(!isStats));
  elements.settingsStatsTab.setAttribute("aria-selected", String(isStats));

  if (isStats) renderSettingsStats();
  if (!options.silent) playSfx("uiTap");
}

function resetProgress() {
  state = createInitialState();
  shellHomeOpen = false;
  flushSaveState();
  elements.settingsDialog.close();
  render();
  setRandomMessage("progressReset");
  playSfx("moveDenied");
}

function renderDuck() {
  if (state.isResting) {
    return `
      <div class="duck resting" aria-hidden="true">
        <img class="tyapa-sprite tyapa-hidden-sprite" src="assets/tyapa-hidden.png" alt="" draggable="false" />
      </div>
    `;
  }

  return `
    <div class="duck" aria-hidden="true">
      <img class="tyapa-sprite" src="assets/tyapa-hidden.png" alt="" draggable="false" />
    </div>
  `;
}

function tileElementForCell({ x, y }) {
  return elements.map.querySelector(`[data-cell-x="${x}"][data-cell-y="${y}"]`);
}

function clearTyapaTravel() {
  if (!activeTravelAnimation) return;

  const target = activeTravelAnimation.effect.target;
  activeTravelAnimation.cancel();
  target.remove();
  activeTravelAnimation = null;
  elements.map.classList.remove("tyapa-is-traveling");
}

function animateTyapaTravel(from, to, direction, onSettled = null) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

  clearTyapaTravel();

  const fromTile = tileElementForCell(from);
  const toTile = tileElementForCell(to);
  if (!fromTile || !toTile) return false;

  const mapRect = elements.map.getBoundingClientRect();
  const fromRect = fromTile.getBoundingClientRect();
  const toRect = toTile.getBoundingClientRect();
  const deltaX = toRect.left - fromRect.left;
  const deltaY = toRect.top - fromRect.top;
  const roll = direction === "left" || direction === "up" ? -1 : 1;
  const lift = Math.max(5, Math.min(16, fromRect.width * 0.09));
  const traveler = document.createElement("div");

  traveler.className = `tyapa-traveler travel-${direction}`;
  traveler.setAttribute("aria-hidden", "true");
  traveler.style.left = `${fromRect.left - mapRect.left}px`;
  traveler.style.top = `${fromRect.top - mapRect.top}px`;
  traveler.style.width = `${fromRect.width}px`;
  traveler.style.height = `${fromRect.height}px`;
  traveler.innerHTML = `<img src="assets/tyapa-hidden.png" alt="" draggable="false" />`;

  elements.map.classList.add("tyapa-is-traveling");
  elements.map.append(traveler);

  activeTravelAnimation = traveler.animate(
    [
      { offset: 0, opacity: 0.98, transform: "translate(0, 0) rotate(0deg) scale(0.92, 1.05)" },
      { offset: 0.16, opacity: 1, transform: `translate(${deltaX * 0.12}px, ${deltaY * 0.12 - lift * 0.45}px) rotate(${roll * -9}deg) scale(1.04, 0.94)` },
      { offset: 0.58, opacity: 1, transform: `translate(${deltaX * 0.68}px, ${deltaY * 0.68 - lift}px) rotate(${roll * 12}deg) scale(1)` },
      { offset: 0.82, opacity: 1, transform: `translate(${deltaX}px, ${deltaY - lift * 0.18}px) rotate(${roll * -5}deg) scale(1.03, 0.96)` },
      { offset: 1, opacity: 1, transform: `translate(${deltaX}px, ${deltaY}px) rotate(0deg) scale(1)` },
    ],
    {
      duration: 560,
      easing: "cubic-bezier(0.2, 0.72, 0.2, 1)",
      fill: "forwards",
    },
  );

  activeTravelAnimation.addEventListener("finish", () => {
    if (typeof onSettled === "function") onSettled();
    requestAnimationFrame(() => {
      traveler.remove();
      activeTravelAnimation = null;
      elements.map.classList.remove("tyapa-is-traveling");
    });
  }, { once: true });

  return true;
}

function renderCharacterToken(character) {
  const sprite = character.sprite || "";

  return `
    <div class="map-character" aria-label="${character.name}">
      ${sprite ? `<img class="map-character-sprite" src="${sprite}" alt="" draggable="false" />` : `<span class="map-character-dot" aria-hidden="true"></span>`}
    </div>
  `;
}

function activeDialogueCharacter() {
  if (!state.activeDialogue) return null;

  return CHARACTERS.find(({ id }) => id === state.activeDialogue.characterId) || null;
}

function activeDialogueLine() {
  const character = activeDialogueCharacter();
  if (!character) return null;

  return character.dialog[state.activeDialogue.lineIndex] || null;
}

function renderDialogueOverlay() {
  const character = activeDialogueCharacter();
  const line = activeDialogueLine();
  if (!character || !line) return "";

  const isTyapa = line.speaker === "tyapa";
  const speakerName = isTyapa ? "\u0422" : character.name;

  return `
    <button class="dialogue-overlay" type="button" data-dialogue-advance aria-label="\u0414\u0430\u043b\u044c\u0448\u0435">
      <span class="dialogue-portrait character-portrait${isTyapa ? "" : " speaking"}" aria-hidden="true">
        ${character.portrait ? `<img src="${character.portrait}" alt="" draggable="false" />` : `<span></span>`}
      </span>
      <span class="dialogue-bubble">
        <strong>${speakerName}:</strong>
        <span>${line.text}</span>
      </span>
      <span class="dialogue-portrait tyapa-portrait${isTyapa ? " speaking" : ""}" aria-hidden="true">
        <img src="assets/tyapa-hidden.png" alt="" draggable="false" />
      </span>
    </button>
  `;
}

function advanceDialogue() {
  const character = activeDialogueCharacter();
  if (!character) {
    state.activeDialogue = null;
    saveState();
    render();
    return;
  }

  if (state.activeDialogue.lineIndex >= character.dialog.length - 1) {
    state.activeDialogue = null;
  } else {
    state.activeDialogue.lineIndex += 1;
  }

  saveState();
  render();
  playSfx("dialogueNext");
}

function renderFamilyOverlay() {
  if (!state.familyOverlay) return "";

  return `
    <div class="family-overlay" role="dialog" aria-label="${state.familyOverlay.label}">
      <img src="${state.familyOverlay.image}" alt="${state.familyOverlay.label}" draggable="false" />
      <button class="family-continue" type="button" data-family-continue>Продолжить</button>
    </div>
  `;
}

function renderMap() {
  clampCurrentViewCenter();
  if (!mapTileLayer || !elements.map.contains(mapTileLayer)) {
    mapTileLayer = document.createElement("div");
    mapTileLayer.className = "map-tile-layer";
    elements.map.prepend(mapTileLayer);
  }

  const { x: centerX, y: centerY } = state.viewCenter;
  const startOffset = -Math.floor((state.viewSize - 1) / 2);
  const endOffset = startOffset + state.viewSize - 1;
  const openCost = openCostForNextCell();
  const canAffordOpen = state.coins >= openCost;
  const tutorialEntry = activeTutorialEntry();
  const tutorialTarget = tutorialEntry?.target === "move-cell"
    ? tutorialMoveTarget()
    : tutorialEntry?.target === "open-cell"
      ? tutorialOpenTarget()
      : null;
  const visibleTileCount = state.viewSize * state.viewSize;
  elements.map.style.setProperty("--view-size", state.viewSize);
  elements.map.setAttribute("aria-label", `Карта ${state.viewSize} на ${state.viewSize}`);
  const tileSize = 100 / state.viewSize;
  elements.map.style.setProperty("--tile-size", `${tileSize}%`);

  elements.map.querySelectorAll(".dialogue-overlay, .family-overlay").forEach((overlay) => overlay.remove());

  while (mapTilePool.length > visibleTileCount) {
    mapTilePool.pop().remove();
  }

  const fragment = document.createDocumentFragment();
  while (mapTilePool.length < visibleTileCount) {
    const tile = document.createElement("div");
    mapTilePool.push(tile);
    fragment.append(tile);
  }

  if (fragment.childNodes.length > 0) {
    mapTileLayer.append(fragment);
  }

  let tileIndex = 0;
  for (let offsetY = startOffset; offsetY <= endOffset; offsetY += 1) {
    for (let offsetX = startOffset; offsetX <= endOffset; offsetX += 1) {
      const x = centerX + offsetX;
      const y = centerY + offsetY;
      const cell = state.cells[keyOf(x, y)];
      const tile = mapTilePool[tileIndex];
      const isCurrent = x === state.position.x && y === state.position.y;
      const canOpen = canOpenCell(x, y);
      const isCorner = isWorldCorner(x, y);
      const visualRow = offsetY - startOffset;
      const visualColumn = offsetX - startOffset;
      const character = characterAtRenderPosition(x, y);
      const visibleCell = cell && (!cell.isService || character);
      const imageType = visibleCell ? cell.type : "closed";
      const coordOffsetX = x - state.position.x;
      const coordOffsetY = y - state.position.y;
      const coord = !isCurrent && shouldShowCoord(coordOffsetX, coordOffsetY) ? `<small class="coord-badge">${coordLabel(x, y)}</small>` : "";
      const blends = visibleCell ? biomeBlendLayers(cell) : "";
      const details = visibleCell ? biomeDetailLayers(cell) : "";
      const surface = visibleCell ? biomeSurfaceLayer(cell) : "";
      const trail = visibleCell ? renderTrail(cell) : "";
      const tutorialClassName = tutorialTileClass(x, y, canOpen, tutorialEntry, tutorialTarget);
      const seedable = Boolean(state.seedMode && visibleCell && hasVisibleTrailAt(x, y));
      const seedBlocked = Boolean(state.seedMode && visibleCell && !seedable);
      const tileRotation = Math.floor(hash2d(x, y, 1221) * 4) * 90;
      const tileFlip = hash2d(x, y, 1222) > 0.5 ? -1 : 1;
      const occupant = isCurrent ? renderDuck() : character ? renderCharacterToken(character) : "";
      const openControl = !cell && canOpen
        ? `<button type="button" class="open-button${canAffordOpen ? " affordable" : " muted"}${isCorner ? " corner-open" : ""}">Открыть ${formatNumber(openCost)}</button>`
        : "";
      const tileMarkup = `
        <img class="tile-art" src="${TILE_IMAGES[imageType]}" alt="" draggable="false" loading="eager" decoding="async" />
        ${blends}
        ${details}
        ${surface}
        ${trail}
        ${coord}
        ${occupant}
        ${openControl}
      `;
      const renderKey = [
        imageType,
        x,
        y,
        visibleCell ? 1 : 0,
        isCurrent ? 1 : 0,
        character?.id || "",
        canOpen ? openCost : 0,
        canOpen && canAffordOpen ? 1 : 0,
        isCorner ? 1 : 0,
        coord,
        blends,
        details,
        surface,
        trail,
      ].join("|");

      tileIndex += 1;
      tile.hidden = false;
      tile.className = `tile ${visibleCell ? cell.type : "closed"}${isCurrent ? " current" : ""}${canOpen ? " openable" : ""}${seedable ? " seedable" : ""}${seedBlocked ? " seed-blocked" : ""}${tutorialClassName}`;
      tile.setAttribute("aria-label", cell ? TILE_LABELS[cell.type] : "закрытая клетка");
      tile.style.setProperty("--tile-left", `${visualColumn * tileSize}%`);
      tile.style.setProperty("--tile-top", `${visualRow * tileSize}%`);
      tile.style.setProperty("--tile-rotation", `${tileRotation}deg`);
      tile.style.setProperty("--tile-flip", String(tileFlip));
      tile.style.zIndex = String(visualRow * state.viewSize + visualColumn);
      tile.removeAttribute("aria-disabled");
      tile.removeAttribute("tabindex");
      delete tile.dataset.cellX;
      delete tile.dataset.cellY;
      delete tile.dataset.openX;
      delete tile.dataset.openY;

      if (tile.dataset.renderKey !== renderKey) {
        tile.innerHTML = tileMarkup;
        tile.dataset.renderKey = renderKey;
      }

      if (!insideWorld(x, y)) {
        tile.setAttribute("aria-disabled", "true");
      } else if (isCurrent || character || visibleCell) {
        tile.dataset.cellX = String(x);
        tile.dataset.cellY = String(y);
      } else if (!cell && canOpen) {
        tile.dataset.openX = String(x);
        tile.dataset.openY = String(y);
        tile.tabIndex = 0;
      }
    }
  }

  for (let unusedIndex = tileIndex; unusedIndex < mapTilePool.length; unusedIndex += 1) {
    const tile = mapTilePool[unusedIndex];
    tile.hidden = true;
    tile.className = "tile unused";
    tile.innerHTML = "";
    tile.removeAttribute("aria-label");
    tile.removeAttribute("aria-disabled");
    tile.removeAttribute("tabindex");
    delete tile.dataset.renderKey;
    delete tile.dataset.cellX;
    delete tile.dataset.cellY;
    delete tile.dataset.openX;
    delete tile.dataset.openY;
  }

  elements.map.insertAdjacentHTML("beforeend", renderDialogueOverlay());
  elements.map.insertAdjacentHTML("beforeend", renderFamilyOverlay());
}

function setStatText(element, value) {
  if (element) element.textContent = formatNumber(safeCount(value));
}

function recentStepSettlementTotal() {
  const cutoff = Date.now() - STEP_SETTLEMENT_LOOKBACK_MS;
  return (state.stepSettlements || []).reduce((sum, settlement) => {
    const end = parseStoredDate(settlement.end);
    if (!end || end.getTime() < cutoff) return sum;
    return sum + safeCount(settlement.earned);
  }, 0);
}

function lastSettlementLabel() {
  const latest = (state.stepSettlements || [])[0];
  const end = latest ? parseStoredDate(latest.end) : null;
  if (!end) return "пока нет";

  return end.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function renderSettingsStats() {
  const stats = state.stats || createInitialStats();
  const spent = { ...createEmptySpendStats(), ...(stats.spent || {}) };
  setStatText(elements.statCoinsCurrent, state.coins);
  setStatText(elements.statTotalTyaptyaps, stats.totalTyaptyapsEarned);
  setStatText(elements.statSpentOpenCells, spent.openCells);
  setStatText(elements.statSpentFlights, spent.flights);
  setStatText(elements.statSpentWalking, spent.walking);
  setStatText(elements.statSpentSeeding, spent.seeding);
  setStatText(elements.statOpenCells, state.openedCellsCount);
  setStatText(elements.statFlightsCount, stats.flightsCount);
  setStatText(elements.statRecentTyaptyaps, recentStepSettlementTotal());
  if (elements.statLastSettlement) elements.statLastSettlement.textContent = lastSettlementLabel();

  if (!elements.achievementList) return;

  const achievements = [
    { title: "Первое открытие", done: state.openedCellsCount >= 1, detail: `${formatNumber(state.openedCellsCount)} клеток` },
    { title: "Широкая карта", done: state.openedCellsCount >= 25, detail: `${formatNumber(state.openedCellsCount)} / 25` },
    { title: "Первый полет", done: stats.flightsCount >= 1, detail: `${formatNumber(stats.flightsCount)} полетов` },
    { title: "Большой запас", done: stats.totalTyaptyapsEarned >= 100000, detail: `${formatNumber(stats.totalTyaptyapsEarned)} / 100 000` },
  ];

  elements.achievementList.innerHTML = achievements.map((achievement) => `
    <article class="achievement${achievement.done ? " done" : ""}">
      <span class="achievement-mark" aria-hidden="true">${achievement.done ? "✓" : "•"}</span>
      <div>
        <strong>${achievement.title}</strong>
        <span>${achievement.detail}</span>
      </div>
    </article>
  `).join("");
}

function render() {
  clampCurrentViewCenter();
  elements.coins.value = formatCoinsForDisplay(state.coins);
  elements.positionLabel.textContent = coordLabel(state.position.x, state.position.y);
  elements.viewLabel.textContent = `Окно: ${coordLabel(state.viewCenter.x, state.viewCenter.y)} / мир ${WORLD_SIZE} x ${WORLD_SIZE}`;
  const provider = activeStepProvider();
  const hasNativeSteps = Boolean(nativeStepProvider());
  const isDemoSteps = state.stepSource === STEP_SOURCE_DEMO;
  const isDeviceSteps = state.stepSource === STEP_SOURCE_DEVICE;
  elements.permissionStatus.textContent = needsStepSourceChoice()
    ? "источник не выбран"
    : isDemoSteps
      ? "демо-режим"
      : state.stepsPermission === "granted"
        ? "доступ выдан"
        : hasNativeSteps
          ? "ожидает доступа"
          : "мост шагов не найден";
  elements.permissionPanel.hidden = !isDeviceSteps || state.stepsPermission === "granted" || !provider;
  if (elements.stepsPanel) elements.stepsPanel.hidden = true;
  elements.grantStepsButton.textContent = "Подключить шаги";
  elements.deviceSourceToggle?.setAttribute("aria-pressed", String(isDeviceSteps));
  elements.demoSourceToggle?.setAttribute("aria-pressed", String(isDemoSteps));
  if (elements.deviceSourceToggle) {
    elements.deviceSourceToggle.disabled = !hasNativeSteps;
    elements.deviceSourceToggle.title = hasNativeSteps
      ? "Читать шаги с устройства"
      : "В Safari сайт не может читать Apple Health напрямую";
  }
  if (elements.stepsInput) {
    elements.stepsInput.readOnly = !isDemoSteps;
    elements.stepsInput.classList.toggle("editable", isDemoSteps);
    elements.stepsInput.title = isDemoSteps ? "Ввести шаги за сегодня" : "Шаги с устройства";
    if (document.activeElement !== elements.stepsInput) {
      elements.stepsInput.value = String(state.stepsToday || 0);
    }
  }
  if (elements.stepStatus) {
    elements.stepStatus.textContent = state.stepsToday === 0
      ? "Сегодня шагов пока 0."
      : "Введите число больше текущего счетчика, чтобы начислить разницу.";
  }
  if (elements.flightLevel) {
    elements.flightLevel.textContent = formatNumber(flightLevel());
  }
  elements.zoomInButton.disabled = state.viewSize === ZOOM_LEVELS[ZOOM_LEVELS.length - 1];
  elements.zoomOutButton.disabled = state.viewSize === ZOOM_LEVELS[0];
  elements.map?.classList.toggle("seed-mode", Boolean(state.seedMode));
  elements.seedButton?.classList.toggle("active", Boolean(state.seedMode));
  elements.seedButton?.setAttribute("aria-pressed", String(Boolean(state.seedMode)));
  elements.seedButton?.setAttribute("title", state.seedMode ? "\u0412\u044b\u0439\u0442\u0438 \u0438\u0437 \u0440\u0435\u0436\u0438\u043c\u0430 \u043f\u043e\u0441\u0435\u0432\u0430" : "\u041f\u043e\u0441\u0435\u044f\u0442\u044c \u0441\u0435\u043c\u0435\u043d\u0430 \u043d\u0430 \u0442\u0440\u043e\u043f\u0438\u043d\u043a\u0435");
  if (elements.seedCancelButton) {
    elements.seedCancelButton.hidden = !state.seedMode;
  }
  if (elements.seedCost) {
    elements.seedCost.textContent = formatNumber(seedCost());
  }
  syncShellHome();
  if (shellHomeOpen) renderShellHome();
  if (elements.settingsDialog?.open) renderSettingsStats();

  renderMap();
  renderStepSourceChoice();
  renderTutorial();
}

function startMapDrag(event) {
  if (needsStepSourceChoice() || shellHomeOpen || state.seedMode || state.familyOverlay || state.activeDialogue || event.target.closest(".zoom-controls")) return;

  mapDrag = {
    lastX: event.clientX,
    lastY: event.clientY,
    restX: 0,
    restY: 0,
    movedX: 0,
    movedY: 0,
    tileSize: elements.map.getBoundingClientRect().width / state.viewSize,
  };
  didDragMap = false;
  elements.map.classList.add("dragging");
  document.body.classList.add("map-dragging");
}

function dragMap(event) {
  if (!mapDrag) return;

  event.preventDefault();
  const dx = event.clientX - mapDrag.lastX;
  const dy = event.clientY - mapDrag.lastY;
  mapDrag.lastX = event.clientX;
  mapDrag.lastY = event.clientY;
  mapDrag.restX += dx;
  mapDrag.restY += dy;
  mapDrag.movedX += dx;
  mapDrag.movedY += dy;
  elements.map.style.setProperty("--drag-x", `${mapDrag.movedX}px`);
  elements.map.style.setProperty("--drag-y", `${mapDrag.movedY}px`);
  didDragMap = didDragMap || Math.abs(mapDrag.movedX) > 6 || Math.abs(mapDrag.movedY) > 6;
}

function stopMapDrag() {
  if (!mapDrag) return;

  const cellsX = Math.trunc(mapDrag.movedX / mapDrag.tileSize);
  const cellsY = Math.trunc(mapDrag.movedY / mapDrag.tileSize);
  const shouldPersist = cellsX !== 0 || cellsY !== 0;

  mapDrag = null;
  elements.map.style.removeProperty("--drag-x");
  elements.map.style.removeProperty("--drag-y");
  elements.map.classList.remove("dragging");
  document.body.classList.remove("map-dragging");

  if (shouldPersist) {
    moveViewByCells(-cellsX, -cellsY, { persist: true });
  }
}

function finishMapPointer(event) {
  const pointerStartedOnMap = Boolean(mapDrag);
  const pointerEndedOnMap = Boolean(event.target.closest("#map"));
  if (!pointerStartedOnMap && !pointerEndedOnMap) return;

  const wasDragging = didDragMap;
  stopMapDrag();
  if (wasDragging) {
    saveState();
    suppressNextMapClick = true;
    didDragMap = false;
    return;
  }

  if (event.target.closest("button") && !event.target.closest("[data-family-continue]") && !event.target.closest("[data-dialogue-advance]")) {
    return;
  }

  suppressNextMapClick = true;
  handleMapTap(event.target);
}

function handleMapTap(target) {
  if (target.closest("[data-family-continue]")) {
    continueFromFamily();
    return true;
  }

  if (target.closest("[data-dialogue-advance]")) {
    advanceDialogue();
    return true;
  }

  if (state.seedMode) {
    const seedTile = target.closest("[data-cell-x][data-cell-y]");
    if (seedTile) {
      seedTrailAt(Number(seedTile.dataset.cellX), Number(seedTile.dataset.cellY));
      return true;
    }

    setMessage(seedModePrompt());
    return true;
  }

  const openTile = target.closest("[data-open-x][data-open-y]");
  if (openTile) {
    openCell(Number(openTile.dataset.openX), Number(openTile.dataset.openY));
    return true;
  }

  const cellTile = target.closest("[data-cell-x][data-cell-y]");
  if (!cellTile) return false;

  const x = Number(cellTile.dataset.cellX);
  const y = Number(cellTile.dataset.cellY);
  const dx = x - state.position.x;
  const dy = y - state.position.y;
  const directionByDelta = {
    "0:-1": "up",
    "0:1": "down",
    "-1:0": "left",
    "1:0": "right",
  };
  const direction = directionByDelta[`${dx}:${dy}`];

  if (direction) {
    moveTyapa(direction);
  } else if (flyTyapaTo(x, y)) {
    return true;
  } else {
    state.viewCenter = clampViewCenterForSize({ x, y }, state.viewSize);
    render();
    playSfx("uiTap");
  }

  return true;
}

elements.grantStepsButton.addEventListener("click", grantSteps);
elements.saveStepsButton?.addEventListener("click", updateSteps);
elements.restButton.addEventListener("click", toggleRest);
elements.seedButton?.addEventListener("click", toggleSeedMode);
elements.seedCancelButton?.addEventListener("click", () => cancelSeedMode());
elements.flightSkillButton?.addEventListener("click", showFlightInfo);
elements.shellButton?.addEventListener("click", openShellHome);
elements.shellCloseButton?.addEventListener("click", closeShellHome);
elements.resetButton.addEventListener("click", resetProgress);
elements.settingsButton.addEventListener("click", () => {
  playSfx("uiTap");
  setSettingsTab("general", { silent: true });
  elements.settingsDialog.showModal();
});
elements.settingsGeneralTab?.addEventListener("click", () => setSettingsTab("general"));
elements.settingsStatsTab?.addEventListener("click", () => setSettingsTab("stats"));
elements.soundButton.addEventListener("click", toggleMusic);
elements.deviceStepsButton?.addEventListener("click", () => chooseStepSource(STEP_SOURCE_DEVICE));
elements.demoStepsButton?.addEventListener("click", () => chooseStepSource(STEP_SOURCE_DEMO));
elements.deviceSourceToggle?.addEventListener("click", () => chooseStepSource(STEP_SOURCE_DEVICE, { fromSettings: true }));
elements.demoSourceToggle?.addEventListener("click", () => chooseStepSource(STEP_SOURCE_DEMO, { fromSettings: true }));
elements.coins?.removeAttribute("readonly");
elements.coins?.addEventListener("focus", startCoinsEdit);
elements.coins?.addEventListener("click", startCoinsEdit);
elements.coins?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    elements.coins.blur();
  }

  if (event.key === "Escape") {
    event.preventDefault();
    render();
    elements.coins.blur();
  }
});
elements.coins?.addEventListener("blur", commitCoinsEdit);
elements.stepsInput?.addEventListener("focus", () => {
  if (state.stepSource !== STEP_SOURCE_DEMO) return;
  elements.stepsInput.select();
});
elements.stepsInput?.addEventListener("keydown", (event) => {
  if (state.stepSource !== STEP_SOURCE_DEMO) return;

  if (event.key === "Enter") {
    event.preventDefault();
    elements.stepsInput.blur();
  }

  if (event.key === "Escape") {
    event.preventDefault();
    render();
    elements.stepsInput.blur();
  }
});
elements.stepsInput?.addEventListener("blur", updateSteps);
elements.sfxToggle?.addEventListener("click", toggleSfx);
elements.musicToggle?.addEventListener("click", toggleMusic);
elements.tutorialNextButton?.addEventListener("click", advanceTutorialCard);
elements.tutorialSkipButton?.addEventListener("click", skipTutorial);
elements.introSkipButton?.addEventListener("click", () => finishIntroCutscene({ skipped: true }));
elements.zoomInButton.addEventListener("pointerdown", (event) => event.stopPropagation());
elements.zoomOutButton.addEventListener("pointerdown", (event) => event.stopPropagation());
elements.centerTyapaButton?.addEventListener("pointerdown", (event) => event.stopPropagation());
elements.zoomInButton.addEventListener("click", (event) => {
  event.stopPropagation();
  changeZoom(1);
});
elements.centerTyapaButton?.addEventListener("click", (event) => {
  event.stopPropagation();
  centerViewOnTyapa();
});
elements.zoomOutButton.addEventListener("click", (event) => {
  event.stopPropagation();
  changeZoom(-1);
});
elements.map.addEventListener("pointerdown", startMapDrag);
document.addEventListener("pointermove", dragMap);
document.addEventListener("pointerup", finishMapPointer);
document.addEventListener("pointercancel", stopMapDrag);
window.addEventListener("pagehide", flushSaveState);
document.addEventListener("pointerdown", resumeSavedMusicAfterGesture, { once: true });
document.addEventListener("keydown", resumeSavedMusicAfterGesture, { once: true });
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopMusic({ persist: false });
  } else {
    if (!needsStepSourceChoice()) settleStepsOnEntry({ silent: true, source: "resume" });
    if (audioSettings.musicEnabled && audioContext) {
      startMusic({ persist: false });
    }
  }
});
elements.map.addEventListener("click", (event) => {
  if (needsStepSourceChoice()) return;

  if (suppressNextMapClick) {
    suppressNextMapClick = false;
    return;
  }

  handleMapTap(event.target);
});
elements.map.addEventListener("keydown", (event) => {
  if (needsStepSourceChoice()) return;

  if (event.target.closest("[data-family-continue]")) {
    return;
  }

  if (event.key !== "Enter" && event.key !== " ") return;

  if (event.target.closest("[data-dialogue-advance]")) {
    event.preventDefault();
    event.stopPropagation();
    advanceDialogue();
    return;
  }

  const tile = event.target.closest("[data-open-x][data-open-y]");
  if (!tile) return;

  event.preventDefault();
  openCell(Number(tile.dataset.openX), Number(tile.dataset.openY));
});

document.querySelectorAll("[data-move]").forEach((button) => {
  button.addEventListener("click", () => moveTyapa(button.dataset.move));
});

document.addEventListener("keydown", (event) => {
  const activeElement = document.activeElement;
  const isTyping = activeElement && ["INPUT", "TEXTAREA", "SELECT"].includes(activeElement.tagName);

  if (introCutsceneActive) {
    if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      finishIntroCutscene({ skipped: true });
    }
    return;
  }

  if (needsStepSourceChoice()) {
    return;
  }

  if (shellHomeOpen) {
    if (event.key === "Escape" || event.key === "ArrowLeft") {
      event.preventDefault();
      closeShellHome();
    }
    return;
  }

  if (state.seedMode && !isTyping && !elements.settingsDialog.open) {
    if (event.key === "Escape") {
      event.preventDefault();
      cancelSeedMode();
      return;
    }

    if (event.key.startsWith("Arrow")) {
      event.preventDefault();
      setMessage(seedModePrompt());
      playSfx("moveDenied");
      return;
    }
  }

  if (!isTyping && state.activeDialogue && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    advanceDialogue();
    return;
  }

  const directionByKey = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
  };

  if (isTyping || elements.settingsDialog.open || !directionByKey[event.key]) {
    return;
  }

  event.preventDefault();
  moveTyapa(directionByKey[event.key]);
});

async function boot() {
  try {
    await preloadKeyAssets();
  } finally {
    if (!needsStepSourceChoice()) {
      await settleStepsOnEntry({ silent: true, source: "boot" });
    }
    const shouldPlayIntro = !needsStepSourceChoice() && shouldPlayIntroCutscene();
    introCutsceneActive = shouldPlayIntro;
    render();
    syncAudioControls();
    window.requestAnimationFrame(() => {
      hideLoader();
      if (shouldPlayIntro) {
        window.setTimeout(playIntroCutscene, 470);
      }
      window.setTimeout(preloadStagedAssets, shouldPlayIntro ? 1400 : 300);
    });
  }
}

boot().catch((error) => {
  console.error("Startup failed; continuing without preload.", error);
  const shouldPlayIntro = !needsStepSourceChoice() && shouldPlayIntroCutscene();
  introCutsceneActive = shouldPlayIntro;
  render();
  hideLoader();
  if (shouldPlayIntro) {
    window.setTimeout(playIntroCutscene, 470);
  }
  window.setTimeout(preloadStagedAssets, shouldPlayIntro ? 1400 : 300);
});
