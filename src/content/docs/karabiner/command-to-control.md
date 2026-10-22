---
title: Left vs. Right Command Split
description: How remapping Left Command to Control while leaving Right Command untouched solves the Start Menu bug while preserving Windows shortcuts.
---

The core breakthrough of this setup is the **asymmetric split** between your left and right Command keys.

:::tip[🥷 Automated Setup Option]
Rather than hand-crafting or tweaking DriverKit rules yourself, see how to automate Karabiner modifications using Antigravity and Gemini Pro in the **[Super Double Ninja Power User Extreme Setup](/avd-mac-tricks/karabiner/ai-automated-setup/)**. *(Note: Requires an AI subscription or API tier).*
:::

---

## The Design Principle

| Key | Physical Keystroke | Rewritten As | Purpose |
| :--- | :--- | :--- | :--- |
| **Left Command** | <kbd>Left ⌘</kbd> | `left_control` (`lazy: true`) | Mac muscle memory for <kbd>⌘C</kbd>, <kbd>⌘V</kbd>, <kbd>⌘Z</kbd>, <kbd>⌘A</kbd>, <kbd>⌘S</kbd> without Start menu focus theft |
| **Right Command** | <kbd>Right ⌘</kbd> | `right_command` (Untouched) | Genuine Windows key: opens Start menu, triggers Windows shortcuts (<kbd>Win+E</kbd> for Explorer, <kbd>Win+R</kbd> for Run) |

---

## Why `lazy: true` is Essential

In Karabiner-Elements, the `lazy: true` flag on modifier keys is critical:

```json
"to": [
  {
    "key_code": "left_control",
    "lazy": true
  }
]
```

### What `lazy` Does
Normally, when you press a modifier key, the OS immediately fires a modifier-down event. If you tap the key quickly, it sends modifier-down followed immediately by modifier-up.

With `"lazy": true`, Karabiner **suppresses sending `Control Down` until you actually press an accompanying companion key** (such as `C`, `V`, or `Z`). 

If you accidentally brush <kbd>Left ⌘</kbd> or press it without a companion character, no stray modifier down/up event is streamed into the remote Windows session.

---

## Rule Precedence: Why Order in JSON Matters

> [!IMPORTANT] **Karabiner Evaluates Rules Top-To-Bottom**  
> In Karabiner's engine, the first matching rule wins.  
> The catch-all `Left Command to Control` manipulator **MUST sit at the very bottom** of the rule list.

If the general `Left Command -> Control` rule sat at the top of the file:
* Pressing <kbd>⌘ + Up Arrow</kbd> would first convert <kbd>⌘</kbd> into <kbd>Ctrl</kbd>.
* Windows would receive `Ctrl + Up Arrow` (paragraph jump in Word) instead of `Win + Up Arrow` (Maximize Window).

By putting specific combo rules (arrows, tab, space) **above** the catch-all, combos are intercepted first, and any remaining single <kbd>⌘</kbd> strokes safely fall through to `Control`.

<div class="graduation-guide-container">
  <div class="graduation-header">
    <div class="graduation-eyebrow">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
      <span>Next Step in Karabiner Rules</span>
    </div>
    <h3 class="graduation-title">⌨️ Modifiers Mastered! Where Should You Go Next?</h3>
    <p class="graduation-subtitle">Now that you understand the Left/Right Command split, explore the combo rules that sit above it:</p>
  </div>

  <div class="graduation-grid">
    <div class="graduation-card">
      <span class="graduation-card-badge">NEXT RULE</span>
      <h4 class="graduation-card-title">
        <span class="card-icon">📐</span>
        <span>Window Snapping & Hopping</span>
      </h4>
      <p class="graduation-card-desc">See how ⌘ + Arrows and ⇧ + ⌘ + Arrows snap Windows 11 windows and hop multi-monitor setups.</p>
      <a href="/avd-mac-tricks/karabiner/window-snapping/" class="graduation-card-btn">
        <span>Window Snapping Guide →</span>
      </a>
    </div>

    <div class="graduation-card">
      <span class="graduation-card-badge badge-purple">APP SWITCHING</span>
      <h4 class="graduation-card-title">
        <span class="card-icon">🔀</span>
        <span>Cmd + Tab Window Switcher</span>
      </h4>
      <p class="graduation-card-desc">Fix the dreaded bug where Cmd + Tab gets swallowed by macOS instead of cycling Windows applications.</p>
      <a href="/avd-mac-tricks/karabiner/cmd-tab-switcher/" class="graduation-card-btn">
        <span>App Switcher Guide →</span>
      </a>
    </div>

    <div class="graduation-card">
      <span class="graduation-card-badge badge-success">ALL RULES IN ONE</span>
      <h4 class="graduation-card-title">
        <span class="card-icon">⚡</span>
        <span>Complete Config JSON</span>
      </h4>
      <p class="graduation-card-desc">Deploy all rules together in the verified execution order with one copy-paste or download.</p>
      <a href="/avd-mac-tricks/karabiner/complete-config/" class="graduation-card-btn btn-success">
        <span>View Complete Config →</span>
      </a>
    </div>
  </div>
</div>
