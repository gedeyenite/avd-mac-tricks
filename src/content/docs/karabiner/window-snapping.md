---
title: Window Snapping & Display Hopping
description: Use Left Command + Arrows to snap windows and Shift + Left Command + Arrows to hop monitors inside Windows.
---

In native Windows, **Snap Layouts** and window docking are controlled by the **Windows Key + Arrow Keys**. 

On macOS, window managers (such as Rectangle, Magnet, or Raycast) typically use <kbd>⌘ + Arrows</kbd> or <kbd>⌥ + ⌘ + Arrows</kbd>.

Because our general rule converts <kbd>Left ⌘</kbd> to <kbd>Control</kbd>, pressing <kbd>⌘ + Left Arrow</kbd> would normally just jump your text cursor to the beginning of a line.

This rule restores full native window management using your left hand.

:::tip[🥷 Automated Setup Option]
You can have an AI agent write, test, and insert window-snapping manipulators directly into your Karabiner configuration file. Check out the **[Super Double Ninja Power User Extreme Setup](/avd-mac-tricks/karabiner/ai-automated-setup/)**. *(Note: Requires an AI subscription or API tier).*
:::

---

## Shortcuts Overview

| Desired Action | Physical Mac Keys | Sent to Windows | Result in Windows 11 |
| :--- | :--- | :--- | :--- |
| **Snap Left** | <kbd>Left ⌘</kbd> + <kbd>←</kbd> | `Win + Left Arrow` | Snaps active window to left half |
| **Snap Right** | <kbd>Left ⌘</kbd> + <kbd>→</kbd> | `Win + Right Arrow` | Snaps active window to right half |
| **Maximize / Restore** | <kbd>Left ⌘</kbd> + <kbd>↑</kbd> | `Win + Up Arrow` | Maximizes active window |
| **Minimize / Restore** | <kbd>Left ⌘</kbd> + <kbd>↓</kbd> | `Win + Down Arrow` | Minimizes or un-maximizes window |
| **Hop to Next Monitor** | <kbd>⇧ Shift</kbd> + <kbd>Left ⌘</kbd> + <kbd>→</kbd> | `Win + Shift + Right Arrow` | Moves active window to next display |
| **Hop to Prev Monitor** | <kbd>⇧ Shift</kbd> + <kbd>Left ⌘</kbd> + <kbd>←</kbd> | `Win + Shift + Left Arrow` | Moves active window to previous display |

---

## The Rule Snippet

Notice that we map the destination modifier to `right_command`. Because Windows App interprets physical Right Command as the genuine Windows key, sending `right_command` + `arrow` tells the remote session to perform a native Windows snap:

```json title="Excerpt from windows_app_mods.json"
{
  "description": "Windows App: Window Management Shortcuts (Left Command [+ Shift] + Arrows)",
  "manipulators": [
    {
      "type": "basic",
      "conditions": [
        {
          "type": "frontmost_application_if",
          "bundle_identifiers": ["^com\\.microsoft\\.rdc\\.macos$"]
        }
      ],
      "from": {
        "key_code": "left_arrow",
        "modifiers": {
          "mandatory": ["command", "shift"]
        }
      },
      "to": [
        {
          "key_code": "left_arrow",
          "modifiers": ["right_command", "left_shift"]
        }
      ]
    },
    {
      "type": "basic",
      "conditions": [
        {
          "type": "frontmost_application_if",
          "bundle_identifiers": ["^com\\.microsoft\\.rdc\\.macos$"]
        }
      ],
      "from": {
        "key_code": "left_arrow",
        "modifiers": {
          "mandatory": ["command"]
        }
      },
      "to": [
        {
          "key_code": "left_arrow",
          "modifiers": ["right_command"]
        }
      ]
    }
  ]
}
```

> [!TIP] **Placement Rule**  
> Put the 4-arrow rules with `shift` **before** the 4-arrow rules without `shift`. If you put the non-shift version first without `optional: []`, pressing Shift could get swallowed or ignored.
