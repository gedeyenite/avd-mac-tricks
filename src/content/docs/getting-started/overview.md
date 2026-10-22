---
title: Introduction & Architecture
description: Understand the challenge of using Microsoft Windows App (Remote Desktop) on macOS and how our solution works.
---

Working across **macOS** and **Azure Virtual Desktop (AVD) / Windows 365 / Remote Desktop** via Microsoft's official **Windows App** (`com.microsoft.rdc.macos`) presents severe ergonomic friction. 

Your physical keyboard sends macOS modifier signals, but the remote session expects Windows keystrokes. Worse, the client application hooks keystrokes in a way that creates bizarre, focus-stealing bugs.

This guide provides the **exact architecture** to eliminate that friction completely.

:::tip[New to Government Telework or AVD?]
If you are an absolute beginner looking for basic hardware requirements (CAC readers, adapters) and step-by-step setup instructions without the low-level code, start with **[The "Weak-Kneed" Guide: Zero to Remote Work on macOS](/avd-mac-tricks/getting-started/weak-kneed-guide/)**!
:::

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

<div class="diagram-container">
  <div class="diagram-header">
    <div class="badge-pill">SYSTEM ARCHITECTURE</div>
    <div class="diagram-title">The Three Interception Layers</div>
    <div class="diagram-subtitle">Where keystrokes, shortcuts, and automations live between macOS and Windows App.</div>
  </div>

  <!-- Layer 1: User Space -->
  <div class="diagram-layer theme-purple">
    <div class="layer-top">
      <h4 class="layer-title">Keyboard Maestro</h4>
      <span class="layer-tag tag-purple">macOS User Space</span>
    </div>
    <ul class="layer-bullets">
      <li>Complex text expansion, automated typing & Teams routines</li>
      <li>Application-aware logic (detecting macOS vs. active AVD session)</li>
      <li>Clean remote pasting (sanitizing newlines & formatting across latency)</li>
    </ul>
  </div>

  <div class="diagram-connector">
    <span class="connector-label">Automations & clipboard triggers</span>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <polyline points="19 12 12 19 5 12"></polyline>
    </svg>
  </div>

  <!-- Layer 2: Application Layer -->
  <div class="diagram-layer theme-blue">
    <div class="layer-top">
      <h4 class="layer-title">Microsoft Windows App</h4>
      <span class="layer-tag tag-blue">macOS Application Layer</span>
    </div>
    <ul class="layer-bullets">
      <li>Client bundle: <code>com.microsoft.rdc.macos</code></li>
      <li>Streams raw USB HID scancodes straight to the remote Windows VM</li>
      <li>Default behavior: blindly maps physical Command to Windows Start key</li>
    </ul>
  </div>

  <div class="diagram-connector">
    <span class="connector-label">DriverKit intercepts physical keypresses BEFORE app</span>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <polyline points="19 12 12 19 5 12"></polyline>
    </svg>
  </div>

  <!-- Layer 3: DriverKit -->
  <div class="diagram-layer theme-sky">
    <div class="layer-top">
      <h4 class="layer-title">Karabiner-Elements (DriverKit)</h4>
      <span class="layer-tag tag-sky">Low-Level Virtual HID Layer</span>
    </div>
    <ul class="layer-bullets">
      <li>Rewrites physical keydown/keyup events before Windows App can capture them</li>
      <li>Maps <strong>Left ⌘ → Control</strong> with lazy modifier release</li>
      <li>Preserves <strong>Right ⌘</strong> as the true physical Windows key</li>
      <li>Maps <strong>⌘+Tab → Alt+Tab</strong> and <strong>⌘+Arrows → Win+Arrows</strong></li>
      <li>Passes <strong>⌘+Space</strong> directly to Alfred without popping the Start Menu</li>
    </ul>
  </div>
</div>

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

---

## Display & Multi-Monitor Settings

> [!TIP] **Retina Resolution & Multi-Monitor Setup (Community Tip)**  
> If you connect to high-resolution Mac displays or multiple monitors, you can optimize your display settings per server. Hover over your remote desktop icon on the Windows App launch window, click the ellipses (**`...`**), select **Configure**, check **"Use custom settings"**, and configure **Multiple Monitors** and **Optimize for Retina displays**.  
> *(Contributed by **[u/RudeTorpedo](https://www.reddit.com/user/RudeTorpedo/)** — see the complete guide on the [Multi-Monitor & Retina Display Setup](/avd-mac-tricks/hardware/multi-monitor-retina/) page).*

