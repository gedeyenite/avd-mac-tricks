---
title: Keyboard Maestro Overview
description: How Keyboard Maestro complements Karabiner-Elements to automate workflows across macOS and Azure Virtual Desktop.
---

While **Karabiner-Elements** handles low-level hardware scancodes and modifier keys, **Keyboard Maestro (KM)** handles automation, clipboard intelligence, and contextual typing.

Together, they form a complete pair:

<div class="diagram-container">
  <div class="diagram-header">
    <div class="badge-pill">COMPLEMENTARY STACK</div>
    <div class="diagram-title">Karabiner + Keyboard Maestro Division of Labor</div>
    <div class="diagram-subtitle">Low-level scancode transformation on the bottom; high-level workflow automation on top.</div>
  </div>

  <!-- Layer 1: Hardware Keystroke -->
  <div class="diagram-layer theme-sky">
    <div class="layer-top">
      <h4 class="layer-title">Hardware / Keystroke Layer: Karabiner-Elements</h4>
      <span class="layer-tag tag-sky">DriverKit HID</span>
    </div>
    <ul class="layer-bullets">
      <li><strong>Left Command → Control:</strong> Harmonizes Mac muscle memory (<kbd>⌘C</kbd>, <kbd>⌘V</kbd>, <kbd>⌘Z</kbd>)</li>
      <li><strong>Right Command:</strong> Preserved as native physical Windows OS key</li>
      <li>Window snapping, ⌘+Tab application switcher, and Alfred/Todoist global passthroughs</li>
    </ul>
  </div>

  <div class="diagram-connector">
    <span class="connector-label">Harmonized keystrokes feed into user automation</span>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <polyline points="19 12 12 19 5 12"></polyline>
    </svg>
  </div>

  <!-- Layer 2: Automation Layer -->
  <div class="diagram-layer theme-purple">
    <div class="layer-top">
      <h4 class="layer-title">Workflow / Automation Layer: Keyboard Maestro</h4>
      <span class="layer-tag tag-purple">macOS User Space</span>
    </div>
    <ul class="layer-bullets">
      <li><strong>Rock-Solid Pasting (⌥⌘V):</strong> Strips formatting and unrolls text across laggy networks</li>
      <li><strong>Smart Split Macros:</strong> Automatically detects whether Mac or Windows App is frontmost</li>
      <li><strong>Microsoft Teams Automation:</strong> One-tap compose box focus, automated status, and meeting muting</li>
      <li><strong>Snippet Expansions:</strong> Instant insertion of emails, signatures, and canned text templates</li>
    </ul>
  </div>
</div>

:::caution[Workaround Disclaimer & Backup Notice]
**Your Mileage May Vary (YMMV):** There are many intricate variables across remote desktop network latency, corporate group policies, and macOS versions. **We cannot guarantee these macros will work identically in every environment.**

**Always back up your macros first:** In Keyboard Maestro, go to **File > Export > Export All Macros as Archive…** before importing any new `.kmmacros` bundles so you can always restore your previous working setup.
:::

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
