## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## "Update Website" Protocol

Whenever the user prompts "Update Website":
1. Inspect the source project ("Windows App Keyboard Shortcuts Workarounds" at `~/.config/karabiner/assets/complex_modifications/windows_app_mods.json` and active Keyboard Maestro macros via AppleScript).
2. Sync changes into `public/windows_app_mods.json`, `src/content/docs/karabiner/complete-config.md`, and any related guide pages.
3. Export updated `.kmmacros` bundles into `public/macros/` and update `public/Update-AVD-Windows-Shortcuts.alfredworkflow`.
4. Run `npm run build` to verify formatting and sitemaps.
5. Commit and push changes to `origin master` so GitHub Pages deploys the updates automatically.

