export const strings = {
  meta: {
    title: "microgpt",
    description:
      "Un GPT complet construit \u00e0 partir de z\u00e9ro, sans aucune d\u00e9pendance runtime.",
  },
  nav: {
    logo: "microgpt",
    playground: "Playground",
    about: "\u00c0 propos",
    github: "GitHub",
    openPlayground: "Ouvrir le Playground",
    toggleTheme: "Changer de th\u00e8me",
  },
  tabs: {
    dataset: "Donn\u00e9es",
    train: "Entra\u00eenement",
    generate: "G\u00e9n\u00e9ration",
  },
  home: {
    heading: "microgpt-ts",
    sub: "Un GPT complet construit \u00e0 partir de z\u00e9ro en TypeScript. Z\u00e9ro d\u00e9pendance. Fonctionne directement dans votre navigateur.",
    desc: "Architecture GPT-2 avec tokenizer, autograd, attention multi-t\u00eate et optimiseur Adam. Entra\u00eenement et inf\u00e9rence en ~400 lignes de code lisible. Entra\u00eenez un mod\u00e8le et g\u00e9n\u00e9rez du texte ici m\u00eame, dans votre navigateur.",
    inspired: "Inspir\u00e9 par le",
    inspiredEnd: " d\u2019Andrej Karpathy",
  },
  about: {
    title: "\u00c0 propos",
    intro1a:
      " est un GPT complet construit \u00e0 partir de z\u00e9ro en TypeScript, sans aucune d\u00e9pendance runtime, inspir\u00e9 par ",
    intro1b:
      " d\u2019Andrej Karpathy. Il impl\u00e9mente une architecture GPT-2 avec tokenizer, moteur d\u2019autograd, attention multi-t\u00eate et optimiseur Adam. Il comprend les boucles d\u2019entra\u00eenement et d\u2019inf\u00e9rence en ~400 lignes de code lisible.",
    intro2a:
      "C\u2019est un projet \u00e9ducatif. Le code source complet est sur ",
    intro2b:
      ", chaque \u00e9tape d\u2019impl\u00e9mentation est une pull request distincte, et le ",
    intro2c:
      " permet d\u2019entra\u00eener et d\u2019ex\u00e9cuter le mod\u00e8le directement dans votre navigateur.",
    whatsInside: "Que contient le projet",
    insideLibThe: "La biblioth\u00e8que ",
    insideLib: "\u00a0: un moteur d\u2019autograd ",
    insideLibDesc:
      ", architecture GPT-2 (embeddings, attention multi-t\u00eate, MLP, connexions r\u00e9siduelles, rmsnorm) et optimiseur Adam",
    insidePlaygroundA: "Un ",
    insidePlayground: "Playground dans le navigateur",
    insidePlaygroundDesc:
      " pour entra\u00eener le mod\u00e8le et g\u00e9n\u00e9rer du texte sans installation ni backend",
    learnTitle: "Apprendre \u00e9tape par \u00e9tape",
    learnIntro:
      "Suivant le billet de blog de Karpathy, le mod\u00e8le est construit couche par couche. Chaque \u00e9tape introduit un nouveau concept et correspond \u00e0 une pull request, pour suivre la progression d\u2019une simple table de correspondance \u00e0 un GPT complet\u00a0:",
    step1: "Table de comptage bigram",
    step1desc: " \u2014 pas de r\u00e9seau de neurones, pas de gradients",
    step2: "MLP + gradients manuels + SGD",
    step3: "Autograd",
    step3desc: " \u2014 une classe ",
    step3descEnd: " qui remplace les gradients manuels",
    step4: "Attention \u00e0 une t\u00eate",
    step4desc:
      " \u2014 embeddings positionnels, rmsnorm, connexions r\u00e9siduelles",
    step5: "Attention multi-t\u00eate + boucle de couches",
    step5desc: " \u2014 architecture GPT compl\u00e8te",
    step6: "Optimiseur Adam",
    diffTitle: "Diff\u00e9rences avec l\u2019original",
    diff1a:
      "Le microgpt original de Karpathy est un script Python unique optimis\u00e9 pour la concision. ",
    diff1b:
      " adopte une approche diff\u00e9rente, privil\u00e9giant la lisibilit\u00e9. Le code est d\u00e9coup\u00e9 en fichiers et enti\u00e8rement typ\u00e9. Les op\u00e9rations math\u00e9matiques sont extraites dans des fonctions utilitaires comme ",
    diff1bAnd: " et ",
    diff2:
      "Le r\u00e9sultat est une biblioth\u00e8que r\u00e9utilisable sous forme de module, et non un script isol\u00e9. Le Playground l\u2019importe directement. Et comme c\u2019est du TypeScript, il s\u2019ex\u00e9cute nativement dans le navigateur, sans runtime Python ni backend.",
    creditsTitle: "Cr\u00e9dits",
    creditsInspired: "Inspir\u00e9 par le",
    creditsInspiredEnd: " d\u2019Andrej Karpathy",
    creditsBuilt: "Cr\u00e9\u00e9 par",
    creditsSource: ". Code source sur",
  },
  presets: {
    babyNames: {
      title: "Baby Names",
      description: "50 popular names with soft vowels",
    },
    babyNames1k: {
      title: "Baby Names (1k)",
      description: "1000 diverse names from around the world",
    },
    pokemon: {
      title: "Pok\u00e9mon",
      description: "Punchy sounds and iconic suffixes",
    },
    cocktails: {
      title: "Cocktails",
      description: "Classic cocktail and spirit names",
    },
    movieTitles: {
      title: "Movie Titles",
      description: "Real film titles with cinematic rhythm",
    },
    custom: {
      title: "Custom",
      description: "Paste your own word list",
    },
  },
  dataset: {
    label: "Donn\u00e9es",
    trainButton: "Entra\u00eener sur ces donn\u00e9es",
    placeholder: "Entrez des mots, un par ligne\u2026",
  },
  train: {
    model: "Mod\u00e8le",
    embeddingDim: "Dim. d\u2019embedding (embedding dim)",
    attentionHeads: "T\u00eates d\u2019attention (attention heads)",
    layers: "Couches (layers)",
    contextLength: "Longueur de contexte (context length)",
    training: "Entra\u00eenement",
    learningRate: "Taux d\u2019apprentissage (learning rate)",
    trainingSteps: "Pas d\u2019entra\u00eenement (training steps)",
    settings: "Param\u00e8tres",
    stop: "Arr\u00eater",
    retrain: "R\u00e9-entra\u00eener",
    trainBtn: "Entra\u00eener",
    goGenerate: "G\u00e9n\u00e9rer \u2192",
    idle: "Configurez les hyperparam\u00e8tres, puis lancez l\u2019entra\u00eenement.",
    loss: "Perte (loss)",
    step: "Pas (step)",
    time: "Temps",
    trainLoss: "Perte d\u2019entra\u00eenement (train loss)",
    evalLoss: "Perte d\u2019\u00e9valuation (eval loss)",
  },
  generate: {
    prefix: "Pr\u00e9fixe",
    prefixHint: "Caract\u00e8res de d\u00e9part pour la g\u00e9n\u00e9ration",
    temperature: "Temp\u00e9rature",
    temperatureHint:
      "Plus \u00e9lev\u00e9 = plus al\u00e9atoire, plus bas = plus d\u00e9terministe",
    samples: "\u00c9chantillons (samples)",
    stepByStep: "Pas \u00e0 pas",
    settings: "Param\u00e8tres",
    nextToken: "Token suivant (next token)",
    reset: "R\u00e9initialiser",
    generating: "G\u00e9n\u00e9ration en cours\u2026",
    generateBtn: "G\u00e9n\u00e9rer",
    notTrained:
      "Entra\u00eenez d\u2019abord le mod\u00e8le pour g\u00e9n\u00e9rer de nouveaux mots.",
    goToTrain: "Aller \u00e0 Entra\u00eenement",
    noOutput: "Cliquez sur G\u00e9n\u00e9rer pour cr\u00e9er de nouveaux mots",
  },
  explore: {
    clickToBegin: "Cliquez sur Token suivant pour commencer",
    sampleOutput: "Sortie g\u00e9n\u00e9r\u00e9e",
    tokenProbs: "Probabilit\u00e9s des tokens",
    position: "position",
    probsDesc:
      "Chaque barre montre la probabilit\u00e9 que le mod\u00e8le attribue \u00e0 chaque caract\u00e8re. La barre en surbrillance a \u00e9t\u00e9 \u00e9chantillonn\u00e9e.",
  },
  liveStream: {
    title: "\u00c9chantillons en direct",
    waiting: "En attente d\u2019\u00e9chantillons\u2026",
    step: "Pas (step)",
  },
  chart: {
    train: "Entra\u00eenement",
    eval: "\u00c9valuation",
    step: "Pas",
    character: "Caract\u00e8re",
  },
} as const;
