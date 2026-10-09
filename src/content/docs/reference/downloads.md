---
title: Downloadable JSON & Recipes
description: Grab the raw configuration files, JSON modifications, and macro recipes.
lastMajorUpdate: "2026-10-09"
updateBadge: "UPDATED"
updateSummary: "Pre-packaged Keyboard Maestro bundles and Alfred workflow updater"
---

Everything in this guide is available as raw, open configuration files.

---

## 1. Karabiner-Elements Configuration

Download or copy the raw `windows_app_mods.json` file to place in your Karabiner complex modifications directory:

* **File Path:** `~/.config/karabiner/assets/complex_modifications/windows_app_mods.json`
* **Raw Content:** View the full JSON on the [Complete Karabiner Config](/avd-mac-tricks/karabiner/complete-config/) page.

### One-Line Terminal Install

You can install the config file directly from your terminal using `curl`:

```bash title="Terminal"
mkdir -p ~/.config/karabiner/assets/complex_modifications
curl -fsSL https://raw.githubusercontent.com/stephenmurphy/avd-mac-tricks/main/public/windows_app_mods.json -o ~/.config/karabiner/assets/complex_modifications/windows_app_mods.json
```

### Alfred Workflow

Prefer running it from Alfred? You can download and install the packaged Alfred Workflow:

* **Download:** [Update-AVD-Windows-Shortcuts.alfredworkflow](/avd-mac-tricks/Update-AVD-Windows-Shortcuts.alfredworkflow)
* **Keyword Trigger:** `avd-update`
* **Action:** Automatically downloads and validates the latest rules file and sends a macOS notification when complete.


---

## 2. Keyboard Maestro Macro Bundles

The Keyboard Maestro macro suites described in this guide are pre-packaged into modular `.kmmacros` bundles ready to import:

| Group Name | Download Link | Scope & Highlights |
| :--- | :--- | :--- |
| **`Windows/AVD: UNIVERSAL`** | [Download .kmmacros](/avd-mac-tricks/macros/Windows-AVD-Universal.kmmacros) | Active when Windows App is frontmost. Includes Safe Remote Paste (<kbd>⌥⌘V</kbd>) and Window Centering (<kbd>⌥⌘C</kbd>). |
| **`SPLIT: AVD and macOS`** | [Download .kmmacros](/avd-mac-tricks/macros/SPLIT-AVD-and-macOS.kmmacros) | Active everywhere. Context-aware logic (e.g. adaptive `;;date` stamps). |
| **`Windows/AVD: TEAMS`** | [Download .kmmacros](/avd-mac-tricks/macros/Windows-AVD-Teams.kmmacros) | Fast compose box navigation (<kbd>⌥R</kbd>) and standup templates. |
| **`Windows/AVD: OUTLOOK`** | [Download .kmmacros](/avd-mac-tricks/macros/Windows-AVD-Outlook.kmmacros) | Email transmittal templates (`;;att`) and fast filing routines. |


---

## 3. Recommended macOS Power User Apps

These are the primary apps referenced throughout our workarounds and guides:

* **[Karabiner-Elements](https://karabiner-elements.pqrs.org/)** — Low-level DriverKit keyboard remapping for macOS. (Free / Open Source)
* **[Keyboard Maestro](https://www.keyboardmaestro.com/)** — Automation powerhouse for macOS workflows, context detection, and typing routines.
* **[Alfred](https://www.alfredapp.com/)** — Productivity launcher, clipboard history manager, and workflow engine.
* **[CleanShot X](https://cleanshot.com/)** — Screen capture, OCR text grabber, and floating overlay pin tool.
* **[Todoist](https://todoist.com/)** — Task management with global Quick Add capability.
* **[Microsoft Windows App](https://apps.apple.com/us/app/windows-app/id1295203466?mt=12)** — Official client for Azure Virtual Desktop and Windows 365.

