> **Note:** `CLAUDE.md` is a symlink to this file. `AGENTS.md` is the source of truth — edit this file, not `CLAUDE.md`.

## Agent Behavior

- Be proactive: when you learn something important (decisions, conventions, pitfalls, user preferences), save it to `AGENTS.md` or the relevant file in `docs/`.
- For non-trivial tasks, create a plan doc in `docs/plans/` using the filename format `YY-MM-DD-short-description.md` (e.g. `26-02-18-add-auth-flow.md`).

## Documentation

Project documentation lives in docs/. Use it extensively.
In particular:
- docs/style-guide.md — code style, Biome rules, naming conventions, TypeScript & React patterns
- docs/ui-guide.md — UI principles, shadcn-first approach, adding components, design guidelines


## Web App (`web/`)

### Stack

| Tool | Purpose |
|------|---------|
| [Next.js 16](https://nextjs.org/) | React framework (App Router) |
| [shadcn/ui](https://ui.shadcn.com/) | UI component library |
| [Tailwind CSS v4](https://tailwindcss.com/) | Styling |
| [Base UI](https://base-ui.com/) | Headless primitives (used by shadcn) |
| [motion](https://motion.dev/) | Animations |
| [Biome](https://biomejs.dev/) | Linting & formatting (replaces ESLint + Prettier) |
| [Storybook](https://storybook.js.org/) | Component development & visual testing |
| [Vitest](https://vitest.dev/) | Unit testing |
| [pnpm](https://pnpm.io/) | Package manager |

### Scripts (run from `web/`)

```bash
pnpm dev          # Start dev server (localhost:3000)
pnpm build        # Production build
pnpm lint         # Biome check
pnpm lint:fix     # Biome check + auto-fix
pnpm storybook    # Storybook (localhost:6006)
pnpm vitest       # Run unit tests
```

### Key Rules

- Run `pnpm lint:fix` before committing
- Add `.stories.tsx` alongside new components
- Install shadcn components via CLI, never copy-paste: `pnpm dlx shadcn@latest add [component]`
- Prefer Server Components; add `"use client"` only when necessary


## microgpt lib

Follow Karpathy's style: keep code compact and simple. Prefer plain arrays and indexOf over Maps, simple loops over abstractions, and minimal intermediate variables. The code should read almost like pseudocode.

### Tokenizer

The tokenizer is **dynamic** (`microgpt/model.ts:buildTokenizer`): it extracts unique characters from the dataset at training time. Vocab is NOT hardcoded to a-z — any Unicode character works. Accented characters (e, e, c) would increase vocab size (27 → ~40+), which means more embedding parameters.

### Optimal dataset sizing

The model trains one document per step (see `web/workers/train-worker.ts`). Step slider: 100-10,000. For good convergence, 3-10 epochs are needed.

| Dataset size | Epochs at 1K steps | Epochs at 5K steps | Epochs at 10K steps |
|---|---|---|---|
| ~50 | 22 | 111 | 222 |
| ~1,000 | 1.1 | 5.6 | 11.1 |
| ~2,000 | 0.6 | 2.8 | 5.6 |

Sweet spot: **~1,000 entries** for full datasets, **~50** for quick demos. Beyond 2,000, default settings cannot converge.


## Datasets (`datasets/`)

### Format

```typescript
export const variableName: string[] = [
  "entry",
  ...
];
```

- One export per file, `string[]` type annotation
- Entries sorted alphabetically, lowercase, a-z only (no accents)
- Min 3 characters per entry
- File name kebab-case, export name camelCase

### French datasets

| File | Entries | Source |
|---|---|---|
| `prenoms-simple.ts` | 50 | INSEE 2024 national, top 50 by all-time births |
| `prenoms.ts` | 1,000 | INSEE 2024 national, top 1000 by all-time births |
| `dinosaures.ts` | 1,522 | github.com/Dvelezs94 via tuto-llm |
| `pokemon-fr.ts` | 1,022 | PokeAPI FR names via tuto-llm |

### English datasets (upstream)

| File | Entries | Source |
|---|---|---|
| `baby-names-simple.ts` | 52 | Curated |
| `baby-names.ts` | 1,002 | Diverse international |
| `cocktails.ts` | 63 | Cocktails & spirits |
| `countries.ts` | 131 | Country names |
| `emoji-mini-stories.ts` | 101 | Emoji sequences |
| `fortunes.ts` | 100 | Dev proverbs |
| `minerals.ts` | 62 | Mineral names |
| `movie-titles.ts` | 1,920 | Film titles |
| `pokemon.ts` | 810 | English Pokemon names |

### Adding a new dataset

1. Create `datasets/my-dataset.ts` with the format above
2. Add a preset entry in `web/components/demo/presets.ts` (optional)
3. Run `pnpm check` to validate


## Project: microgpt-ts-fr

### Context
- Clone of dubzdubz/microgpt-ts, adapted for French UI and datasets
- Solo developer (pierrealexandreguillemin-a11y)
- Target deployment: microgpt-ts-fr.vercel.app

### Git Rules — STRICT
- NEVER run `git push` without explicit user request
- NEVER run any `gh pr` command (no PR creation, no PR management)
- NEVER run destructive git commands (force push, reset --hard, etc.)
- Work is LOCAL ONLY: edits, commits, lint. User decides when to push.
- NEVER modify upstream (dubzdubz/microgpt-ts) files in `datasets/` or `microgpt/` — these are read-only. Only add new files or modify files under `web/`.

### Environment
- Node 24 (see .nvmrc)
- pnpm as package manager
- Husky pre-commit: lint-staged (Biome check on staged files)
- Husky pre-push: build + tests must pass

### Scripts
```bash
pnpm check        # Full validation: lint + build + tests
pnpm lint:fix     # Auto-fix formatting before commit
```
