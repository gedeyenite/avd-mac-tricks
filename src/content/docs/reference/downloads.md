---
title: Downloadable JSON & Recipes
description: Grab the raw configuration files, JSON modifications, and macro recipes.
---

Everything in this guide is available as raw, open configuration files.

---

## 1. Karabiner-Elements Configuration

Download or copy the raw `windows_app_mods.json` file to place in your Karabiner complex modifications directory:

* **File Path:** `~/.config/karabiner/assets/complex_modifications/windows_app_mods.json`
* **Raw Content:** View the full JSON on the [Complete Karabiner Config](/karabiner/complete-config/) page.

### One-Line Terminal Install

You can install the config file directly from your terminal using `curl`:

```bash title="Terminal"
mkdir -p ~/.config/karabiner/assets/complex_modifications
curl -fsSL https://raw.githubusercontent.com/stephenmurphy/avd-mac-tricks/main/public/windows_app_mods.json -o ~/.config/karabiner/assets/complex_modifications/windows_app_mods.json
```

### Alfred Workflow

Prefer running it from Alfred? You can download and install the packaged Alfred Workflow:

* **Download:** [Update-AVD-Windows-Shortcuts.alfredworkflow](/Update-AVD-Windows-Shortcuts.alfredworkflow)
* **Keyword Trigger:** `avd-update`
* **Action:** Automatically downloads and validates the latest rules file and sends a macOS notification when complete.


---

## 2. Keyboard Maestro Macro Bundles

The Keyboard Maestro macro suites described in this guide are structured into four modular groups:

| Group Name | Download Link | Scope |
| :--- | :--- | :--- |
| **`Windows/AVD: UNIVERSAL`** | [Download .kmmacros](#) | Active when Windows App is frontmost |
| **`SPLIT: AVD and macOS`** | [Download .kmmacros](#) | Active everywhere (Context-aware logic) |
| **`Windows/AVD: TEAMS`** | [Download .kmmacros](#) | Teams compose and banner automations |
| **`Windows/AVD: OUTLOOK`** | [Download .kmmacros](#) | Email transmittal and template routines |
