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
2. Check community feedback & repeat questions in GitHub Discussions / Giscus (`gh api graphql` for discussion comments) to identify potential FAQ additions or troubleshooting updates.
3. Sync changes into `public/windows_app_mods.json`, `src/content/docs/karabiner/complete-config.md`, and any related guide pages.
4. Export updated `.kmmacros` bundles into `public/macros/` and update `public/Update-AVD-Windows-Shortcuts.alfredworkflow`.
5. Run `npm run build` to verify formatting and sitemaps.
6. Commit and push changes to `origin master` so GitHub Pages deploys the updates automatically.

## Project Context Verification

This project is **"AVD Mac Tricks / Website"** (`friendly-noether`): an Astro/Starlight documentation site for Microsoft Windows App workarounds on macOS.

If the user gives a prompt or command that appears to belong to another project (e.g., real estate / house hunting scraper, Kindle downloader, Home Assistant, or unrelated app tasks), **DO NOT execute it immediately**. Always ask:
> *"It looks like this request might be intended for another project (e.g., [Project Name]). Are we in the correct project, or did you mean to run this in that workspace?"*


