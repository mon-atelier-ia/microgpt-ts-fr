# Fork Changes Registry

> Tracks all divergences from upstream ([dubzdubz/microgpt-ts](https://github.com/dubzdubz/microgpt-ts)). Each entry is commit-linked and justified, to facilitate future PRs or cherry-picks.

## Localization (FR)

| Change | Commit | Justification |
|--------|--------|---------------|
| All UI strings translated to French | `55fb993` | Target audience: French learners |
| Strings extracted to `web/lib/strings.ts` | `5993f9a` | Single i18n source of truth |
| English presets removed from UI bundle | `79c101f` | FR-only preset list |
| French datasets added (`prenoms`, `prenoms-simple`, `pokemon-fr`, `dinosaures`) | `8c2aa76` | FR training data |
| French preset entries in `presets.ts` | `e49ec88` | Wire FR datasets to UI |

## Data Quality

| Change | Commit | Justification |
|--------|--------|---------------|
| 9 concatenated dinosaur names split into proper entries | `473e7c0` | Data corruption fix — names like `kemkemiakentrosaurus` were 2 names glued together |
| Duplicate `kentrosaurus` deduplicated | `473e7c0` | Created by the split above |

## Training Defaults

| Change | Commit | Justification |
|--------|--------|---------------|
| Default learning rate 0.01 → 0.001 | `229300f` | Upstream 0.01 causes NaN divergence on larger FR datasets. Safer UX default — avoids "app broken" perception on first use |
| Per-preset model/training configs | `229300f` | Different datasets need different hyperparameters. Dinosaures (1530 entries, long names) needs `nEmbd=32, blockSize=32, nLayer=2, numSteps=3000`. Without this, large datasets diverge with default tiny model |
| `handlePresetSelect` merges preset configs on switch | `229300f` | Upstream uses `learningRate: 0.01` in merge; we use `0.001` (intentional, see above) |

## Pedagogical Features

| Change | Commit | Justification |
|--------|--------|---------------|
| NaN divergence detection + pedagogical UI feedback | `6a33442` | When model diverges, explain what happened and why, instead of showing empty outputs silently |
| High-loss warning with educational guidance | `6a33442` | When training barely converges, guide the user to experiment and adjust |

## Infrastructure

| Change | Commit | Justification |
|--------|--------|---------------|
| Husky pre-commit + lint-staged (Biome) | `f1d8a36` | Enforce code quality |
| GitHub links point to fork | `ee479a4` | Correct repo references |
| Deployment info + org context in docs | `828279a` | Document Vercel auto-deploy setup |
| Dynamic default preset (first in list) | `2da5633` | Remove hardcoded EN preset ID |
| Preset configuration tests | `736ec6f` | Validate dataset integrity |
