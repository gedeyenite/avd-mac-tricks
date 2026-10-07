---
title: Left vs. Right Command Split
description: How remapping Left Command to Control while leaving Right Command untouched solves the Start Menu bug while preserving Windows shortcuts.
---

The core breakthrough of this setup is the **asymmetric split** between your left and right Command keys.

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
