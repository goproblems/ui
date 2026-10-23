# Repository guidelines

- Keep `README.md` empty for now. Do not add README content unless the user
  explicitly requests it. Put repository guidance in `AGENTS.md` instead.
- Keep application-specific stores, transports, navigation, persistence, and pages
  in consuming applications.
- Preserve UI behavior and styles; keep Tailwind class names statically discoverable.
- Compile for React 19 with React Compiler before transforming JSX and TypeScript.
- Keep React and other peer dependencies supplied by the consuming application.
- Ship ESM with `.js` relative imports, declarations, and source files. Keep the
  package's `main` entry pointing to built JavaScript.
- Use pnpm and Node.js 24. Run `pnpm check` and `pnpm test` after code changes.
- Use `.github/workflows/release.yml` for versioning and releases. Tags must include
  built `dist/`; keep registry publishing disabled.
