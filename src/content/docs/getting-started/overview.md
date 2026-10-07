---
title: Introduction & Architecture
description: Understand the challenge of using Microsoft Windows App (Remote Desktop) on macOS and how our solution works.
---

Working across **macOS** and **Azure Virtual Desktop (AVD) / Windows 365 / Remote Desktop** via Microsoft's official **Windows App** (`com.microsoft.rdc.macos`) presents severe ergonomic friction. 

Your physical keyboard sends macOS modifier signals, but the remote session expects Windows keystrokes. Worse, the client application hooks keystrokes in a way that creates bizarre, focus-stealing bugs.

This guide provides the **exact architecture** to eliminate that friction completely.

---

## The Target Setup

| Parameter | Value |
| :--- | :--- |
| **Client Application** | Microsoft Windows App (Remote Desktop client for Mac) |
| **Bundle Identifier** | `com.microsoft.rdc.macos` |
| **Host Operating System** | macOS (Sonoma, Sequoia, and newer) |
| **Remote Session** | Windows 11 Enterprise (Azure Virtual Desktop / Windows 365) |
| **Core Tools** | **Karabiner-Elements** (DriverKit layer) + **Keyboard Maestro** (Automation layer) |

---

## Two Distinct Problem Layers

To make macOS and Windows App cooperate, you must use the right tool for the right layer:

```text
+-------------------------------------------------------------+
|                     macOS User Space                        |
|                                                             |
|  [ Keyboard Maestro ]                                       |
|    • Complex text expansion & macros                        |
|    • App-aware logic (detect Mac vs AVD)                    |
|    • Clean clipboard pasting (stripping newlines & formats) |
+-------------------------------------------------------------+
                              |
+-------------------------------------------------------------+
|             macOS Application Layer (Windows App)           |
|                                                             |
|  [ Microsoft Windows App (com.microsoft.rdc.macos) ]        |
|    • Streams raw scancodes to remote Windows VM             |
|    • Maps physical Command directly to Windows key          |
+-------------------------------------------------------------+
                              |
+-------------------------------------------------------------+
|            macOS Low-Level DriverKit / HID Layer            |
|                                                             |
|  [ Karabiner-Elements DriverKit Virtual HID Device ]        |
|    • Intercepts physical keydown / keyup BEFORE Windows App |
|    • Maps Left ⌘ -> Ctrl (with lazy modifiers)              |
|    • Preserves Right ⌘ as true Windows key                  |
|    • Maps ⌘+Tab -> Alt+Tab, ⌘+Arrows -> Win+Arrows          |
|    • Passes ⌘+Space through to Alfred without Start Menu    |
+-------------------------------------------------------------+
```

### Layer 1: Hardware Scancodes (Karabiner-Elements)
When you press <kbd>⌘ Cmd</kbd> or <kbd>⌘+Tab</kbd>, Windows App captures the key before standard macOS accessibility apps can touch it. Only a low-level DriverKit driver like **Karabiner-Elements** can rewrite scancodes before the client application captures them.

### Layer 2: Automations & Pasting (Keyboard Maestro)
Once keystrokes are properly harmonized, **Keyboard Maestro** acts as your workflow accelerator: automating Teams, pasting sanitized text into laggy remote sessions, and executing context-aware triggers.

---

## Built-In Settings to Turn OFF

Before applying any custom configurations, ensure the built-in Microsoft keyboard workarounds are disabled in Windows App:

> [!WARNING] **Disable Windows App Internal Keyboard Redirection**  
> In **Windows App > Settings > Keyboard**:  
> Turn **OFF** toggles for *Redirect macOS shortcuts* (such as Undo, Cut, Copy, Paste).  
> Leaving them enabled creates race conditions with Karabiner's DriverKit mappings.
