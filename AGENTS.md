# Repository guidelines

This repository is the source of truth for this package. Keep application-specific
stores, transports, navigation, persistence, and pages in consuming applications.

- Use pnpm and Node.js 24 for development.
- Keep relative TypeScript imports ending in `.js` so emitted ESM works in Node.js
  and bundlers.
- Run `pnpm check` and `pnpm test` after changing code.
- `pnpm pack` must include built JavaScript, declarations, and source files.
- React and other peer dependencies belong to the consuming application.
- Update package.json with `pnpm version patch --no-git-tag-version` (or minor/major)
  when preparing a release, commit and push main, then manually run the Release
  workflow. It creates the matching `vX.Y.Z` tag and GitHub Release.
- Keep registry publishing disabled. Release tags include compiled `dist/` in a
  release commit; main keeps generated files ignored. Consumers install from a
  GitHub tag and commit their lockfile. Keep `main` pointing to a built entry so
  pnpm can recognize releases that already contain build output.
- UI changes must preserve existing behavior and styles; keep Tailwind class names
  statically discoverable in the published JavaScript.
