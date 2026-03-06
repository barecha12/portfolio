# Portfolio

Personal one-page portfolio built with React, TypeScript, and Vite.

## Development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Sync projects from GitHub

Refresh `src/data/projects.ts` from your GitHub profile:

```bash
npm run sync:projects
```

Optional username override:

```bash
node scripts/sync-projects.mjs <github-username>
```

## Contact form setup

Copy `.env.example` to `.env` and set real values:

```bash
VITE_CONTACT_ENDPOINT=https://api.web3forms.com/submit
VITE_CONTACT_ACCESS_KEY=your_web3forms_access_key
VITE_CONTACT_SUBJECT=Portfolio inquiry
```

If endpoint config is missing, the form falls back to `mailto:`.
