---
title: Keyboard Maestro Overview
description: How Keyboard Maestro complements Karabiner-Elements to automate workflows across macOS and Azure Virtual Desktop.
---

While **Karabiner-Elements** handles low-level hardware scancodes and modifier keys, **Keyboard Maestro (KM)** handles automation, clipboard intelligence, and contextual typing.

Together, they form a complete pair:

```text
┌────────────────────────────────────────────────────────┐
│  Hardware / Keystroke Layer: Karabiner-Elements       │
│  • Left Command -> Control (with lazy modifiers)       │
│  • Window Snapping, App Switcher, Alfred passthrough   │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│  Workflow / Automation Layer: Keyboard Maestro         │
│  • Sanitized text pasting across RDP network latency   │
│  • Smart Split Macros (Mac vs AVD context detection)   │
│  • Teams compose box & notification automation         │
│  • Snippet expansions (emails, signatures, templates)  │
└────────────────────────────────────────────────────────┘
```

---

## Recommended Macro Group Structure

In the Keyboard Maestro editor, organizing your macros into dedicated groups makes managing active applications simple:

1. **`Windows/AVD: UNIVERSAL`**  
   * **Active:** *Only when Microsoft Windows App is running and frontmost.*
   * **Purpose:** Macros specifically created for the remote desktop environment (e.g., dedicated remote paste, window centering, and clipboard sanitizing).

2. **`SPLIT: AVD and macOS`**  
   * **Active:** *In all applications.*
   * **Purpose:** Macros that use an `If Application 'Windows App' is at front` conditional check to execute different actions depending on whether you are on your local Mac or inside Windows.

3. **`Windows/AVD: TEAMS`**  
   * **Active:** *Only when Windows App is frontmost.*
   * **Purpose:** Automating repetitive Teams interactions (navigating to the compose box, clicking mute banners, inserting pre-composed standup updates).

4. **`Windows/AVD: OUTLOOK`**  
   * **Active:** *Only when Windows App is frontmost.*
   * **Purpose:** Multi-action routines for filing, templating, and dispatching repetitive enterprise emails.
