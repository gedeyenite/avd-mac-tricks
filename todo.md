# Project To-Do List: AVD (Windows App) on macOS

## Current Tasks & Action Items

- [ ] **Re-evaluate what is included in the "5. Downloads and Tools" section**
  - Audit current offerings (`windows_app_mods.json`, `Update-AVD-Windows-Shortcuts.alfredworkflow`, Keyboard Maestro `.kmmacros` bundles).
  - Clarify download formats, installation steps, and whether individual macro exports or single bundle libraries are preferable.
  - Review how third-party tools (Alfred, CleanShot X, Todoist) fit into downloadable recipes vs configuration guides.

- [ ] **Expand Third-Party Power User App Integration Guides**
  - **CleanShot X:** Document screenshot triggers, pinning floating screenshots over full-screen remote desktop sessions, OCR text grab direct to Windows.
  - **Alfred:** Document hotkey passthrough (`⌘ + Space`), universal search, clipboard history interoperability, and custom remote workflows.
  - **Todoist:** Document global Quick Add shortcut passthrough (`Ctrl + Space` / custom) and workflow while focused in Windows App.

- [ ] **Review Keyboard Maestro Macro Bundles**
  - Populate downloadable `.kmmacros` files for the Universal, Split, Teams, and Outlook suites.
  - Test and verify paste-to-AVD latency delay settings across varying network conditions.

- [x] **Configure Giscus discussion categories for live comment integration**
- [x] **Deploy Todoist Sync Workflow for CRM Tickets**
  - Workflow added at `.github/workflows/todoist-sync.yml`
  - Labels `accepted` and `approved` created in repo
  - Remaining: Add `TODOIST_API_TOKEN` secret in GitHub repo settings (or via `gh secret set TODOIST_API_TOKEN`)

