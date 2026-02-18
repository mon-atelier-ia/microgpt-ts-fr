import type { LucideIcon } from "lucide-react";
import { Baby, Gem, Globe, PenLine, Wine, Zap } from "lucide-react";

export type Preset = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  examples: [string, string, string];
  words: string;
};

export const CUSTOM_PRESET_ID = "custom";

const PRESET_BABY_NAMES = `emma
olivia
ava
sophia
isabella
mia
charlotte
amelia
harper
evelyn
abigail
emily
elizabeth
avery
ella
scarlett
grace
chloe
victoria
riley
aria
lily
aurora
zoey
penelope
nora
camila
elena
maya
luna
savannah
willow
hazel
stella
ellie
claire
violet
paisley
skylar
isla
madelyn
naomi
hannah
brooklyn
aaliyah
bella
lucy
anna
leah
natalie`;

const PRESET_POKEMON = `pikachu
bulbasaur
charmander
squirtle
eevee
gengar
mewtwo
charizard
blastoise
venusaur
snorlax
gyarados
dragonite
lapras
jigglypuff
clefairy
vulpix
ninetales
psyduck
golduck
machamp
alakazam
abra
haunter
gastly
onix
raichu
sandslash
nidorina
nidoking
wigglytuff
zubat
golbat
oddish
vileplume
diglett
meowth
persian
mankey
primeape
growlithe
arcanine
poliwag
kadabra
geodude
graveler
golem
ponyta
rapidash
slowpoke
magnemite
doduo
seel
grimer
shellder
cloyster
drowzee
hypno
krabby
voltorb
electrode
exeggcute
cubone
hitmonlee
hitmonchan
lickitung
koffing
weezing
rhyhorn
chansey
kangaskhan
scyther
electabuzz
magmar
pinsir
tauros
magikarp
ditto
porygon
omanyte
omastar
kabuto
aerodactyl
articuno
zapdos
moltres
dratini
dragonair
mew`;

const PRESET_COCKTAILS = `mojito
negroni
cosmopolitan
martini
margarita
daiquiri
sidecar
gimlet
sazerac
manhattan
bellini
caipirinha
zombie
hurricane
bramble
spritz
americano
stinger
sangria
mimosa
fizz
smash
julep
cobbler
swizzle
rickey
toddy
sling
highball
mudslide
aperol
campari
fernet
amaretto
sambuca
absinthe
calvados
bourbon
tequila
mezcal
pisco
cognac
armagnac
vermouth
drambuie
kahlua
cointreau
chartreuse
benedictine
midori
frangelico
chambord
disaronno
malibu
galliano
limoncello
grappa
pastis
baileys
cynar
lillet`;

const PRESET_MINERALS = `quartz
amethyst
diamond
emerald
sapphire
ruby
topaz
opal
garnet
tourmaline
beryl
aquamarine
turquoise
malachite
obsidian
onyx
jasper
agate
carnelian
citrine
peridot
spinel
alexandrite
kunzite
tanzanite
zircon
pyrite
hematite
fluorite
calcite
gypsum
celestite
amazonite
rhodonite
labradorite
sodalite
diopside
actinolite
talc
kyanite
sillimanite
staurolite
epidote
zoisite
titanite
apatite
cassiterite
sphalerite
galena
cinnabar
marcasite
covellite
barite
anhydrite
magnetite
chromite
cordierite
iolite
wollastonite
chalcedony`;

const PRESET_COUNTRIES = `albania
algeria
argentina
armenia
australia
austria
azerbaijan
bahamas
bangladesh
barbados
belarus
belgium
belize
benin
bhutan
bolivia
botswana
brazil
brunei
bulgaria
cameroon
canada
chile
colombia
croatia
cuba
cyprus
denmark
ecuador
egypt
eritrea
estonia
ethiopia
fiji
finland
france
gabon
gambia
georgia
germany
ghana
greece
grenada
guatemala
guyana
haiti
honduras
hungary
iceland
india
indonesia
iran
ireland
israel
italy
jamaica
japan
jordan
kazakhstan
kenya
kiribati
kuwait
laos
latvia
lebanon
lesotho
liberia
luxembourg
madagascar
malawi
malaysia
mali
malta
mauritania
mauritius
mexico
moldova
monaco
mongolia
montenegro
morocco
mozambique
myanmar
namibia
nauru
nepal
nicaragua
nigeria
norway
oman
pakistan
panama
paraguay
peru
philippines
poland
portugal
qatar
romania
russia
rwanda
samoa
senegal
serbia
seychelles
singapore
slovakia
slovenia
somalia
spain
sweden
switzerland
tajikistan
tanzania
thailand
tonga
tunisia
turkey
tuvalu
uganda
ukraine
uruguay
uzbekistan
vanuatu
venezuela
vietnam
yemen
zambia
zimbabwe`;

export const PRESETS: Preset[] = [
  {
    id: "baby-names",
    title: "Baby Names",
    description: "Soft vowels and flowing endings",
    icon: Baby,
    examples: ["aurora", "luna", "aria"],
    words: PRESET_BABY_NAMES,
  },
  {
    id: "pokemon",
    title: "Pokémon",
    description: "Punchy sounds and iconic suffixes",
    icon: Zap,
    examples: ["pikachu", "gengar", "eevee"],
    words: PRESET_POKEMON,
  },
  {
    id: "cocktails",
    title: "Cocktails",
    description: "Exotic letters and spirited flair",
    icon: Wine,
    examples: ["negroni", "gimlet", "sazerac"],
    words: PRESET_COCKTAILS,
  },
  {
    id: "minerals",
    title: "Minerals",
    description: "Latinate suffixes and crystalline sounds",
    icon: Gem,
    examples: ["zircon", "epidote", "kunzite"],
    words: PRESET_MINERALS,
  },
  {
    id: "countries",
    title: "Countries",
    description: "Diverse origins from every corner of the world",
    icon: Globe,
    examples: ["fiji", "tuvalu", "grenada"],
    words: PRESET_COUNTRIES,
  },
];

export const CUSTOM_PRESET: Preset = {
  id: CUSTOM_PRESET_ID,
  title: "Custom",
  description: "Paste your own word list",
  icon: PenLine,
  examples: ["your", "words", "here"],
  words: "",
};
