---
title: Downloadable JSON & Recipes
description: Grab the raw configuration files, JSON modifications, and macro recipes.
lastMajorUpdate: "2026-10-09"
updateBadge: "UPDATED"
updateSummary: "Added Shortcuts Cheatsheet Overlay bundle and one-line installer"
---

Everything in this guide is available as raw, open configuration files.

:::caution[Workaround Disclaimer & Backup Recommendation]
**Your Mileage May Vary (YMMV):** There are many intricate variables across macOS releases, hardware models, external keyboard layouts, and corporate virtualization policies. **We cannot guarantee these workarounds will work out of the box in every individual environment.**

**Please make sure you back up your previous working states first** before importing or replacing configurations:
* **Karabiner-Elements:** Back up or duplicate your `~/.config/karabiner/` directory before overwriting rules.
* **Keyboard Maestro:** Select **File > Export > Export All Macros as Archive…** in Keyboard Maestro before importing `.kmmacros` suites.
:::

---

## 1. Karabiner-Elements Configuration

Download or copy the raw `windows_app_mods.json` file to place in your Karabiner complex modifications directory:

* **File Path:** `~/.config/karabiner/assets/complex_modifications/windows_app_mods.json`
* **Raw Content:** View the full JSON on the [Complete Karabiner Config](/avd-mac-tricks/karabiner/complete-config/) page.

### One-Line Terminal Install

You can install the config file directly from your terminal using `curl`:

```bash title="Terminal"
mkdir -p ~/.config/karabiner/assets/complex_modifications
curl -fsSL https://raw.githubusercontent.com/gedeyenite/avd-mac-tricks/master/public/windows_app_mods.json -o ~/.config/karabiner/assets/complex_modifications/windows_app_mods.json
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

## 3. Shortcuts Cheatsheet Overlay Bundle

A lightweight, native WebKit floating window that appears over full-screen Windows App sessions with a quick reference of active shortcuts when you press <kbd>⌘ + ?</kbd> (<kbd>⌘ + Shift + /</kbd>).

* **Direct ZIP Download:** [shortcuts-overlay.zip](/avd-mac-tricks/downloads/shortcuts-overlay.zip)
* **Live Interactive Demo:** [Test Drive the In-Browser Cheatsheet](/avd-mac-tricks/karabiner/global-passthrough/#live-interactive-preview) or [Open Full-Page Cheatsheet](/avd-mac-tricks/overlay/windows_app_cheatsheet.html)
* **Bundle Contents:**
  * `shortcuts_overlay` (compiled native Swift WebKit binary)
  * `toggle_overlay.sh` (process toggle launcher)
  * `windows_app_cheatsheet.html` (customizable cheatsheet template)

### One-Line Terminal Install

To quickly download and install the overlay components into your local `~/.config/karabiner/` environment:

```bash title="Terminal"
curl -fsSL https://raw.githubusercontent.com/gedeyenite/avd-mac-tricks/master/public/install-overlay.sh | bash
```

Once installed, ensure your Karabiner configuration contains the overlay shortcut rule (included in the main [Karabiner Configuration](#1-karabiner-elements-configuration)).

---

## 4. Recommended macOS Power User Apps

These are the primary apps referenced throughout our workarounds and guides, including their pricing models, tiers, and licensing (all prices listed in **US$**):

| Application | Cost & Model (US$) | License / Tier Breakdown | Role in Workaround Suite |
| :--- | :--- | :--- | :--- |
| **[Karabiner-Elements](https://karabiner-elements.pqrs.org/)** | **Free**<br>*(Open Source)* | **100% Free** & open-source. Donation-supported; no license fee or account required. | Foundation DriverKit engine for physical modifier separation and low-level key remapping. |
| **[Keyboard Maestro](https://www.keyboardmaestro.com/)** | **US$36**<br>*(One-Time)* | **US$36 one-time purchase** for single-user license (includes free minor updates; no recurring subscription). Generous fully-featured free trial available. | Automation powerhouse for rock-solid remote pasting (<kbd>⌥⌘V</kbd>), window centering, and context-aware typing. |
| **[Alfred](https://www.alfredapp.com/)** | **Free core**<br>*(or ~US$44–$77 Powerpack)* | **Core launcher is Free**.<br>The **Powerpack** (required for Workflows and Clipboard History) is a one-time purchase: **Single License (~US$44)** or **Mega Supporter (~US$77)** with lifetime free upgrades. | Fast productivity launcher, clipboard history manager, and workflow execution engine. |
| **[CleanShot X](https://cleanshot.com/)** | **US$29** *(One-Time)*<br>or **US$8/mo** *(Subscription)* | **One-time:** **US$29** perpetual license (includes 1 year of app updates and 1 GB cloud storage; renewal is optional at US$19/yr).<br>**Cloud Pro:** **US$8/mo** (billed annually) for unlimited cloud storage and ongoing updates.<br>*(Also available via Setapp at US$9.99/mo).* | Screen capture, OCR text grabber, and floating pinned reference overlays above full-screen RDP. |
| **[Todoist](https://todoist.com/)** | **Free tier**<br>or **US$4–$5/mo** *(Subscription)* | **Beginner Tier:** **Free** (includes global Quick Add and up to 5 projects).<br>**Pro Tier:** **US$4/mo** billed annually (US$48/yr) or US$5/mo monthly for reminders and power filters.<br>**Business:** US$6/user/mo billed annually. | Global task capture and task management via <kbd>Ctrl + Space</kbd> pass-through. |
| **[Microsoft Windows App](https://apps.apple.com/us/app/windows-app/id1295203466?mt=12)** | **Free App**<br>*(Cloud backend required)* | **Free to download** from the Mac App Store. Connecting to a remote virtual desktop requires an active corporate or organization Azure Virtual Desktop, Windows 365, or Remote Desktop Services environment. | Official client connecting macOS to Azure Virtual Desktop and Windows 365. |


