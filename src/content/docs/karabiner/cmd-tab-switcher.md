---
title: Cmd + Tab Window Switcher
description: Switch windows inside Windows using Cmd + Tab, while keeping physical Ctrl + Tab intact for browser tabs.
---

On macOS, you use <kbd>⌘ + Tab</kbd> hundreds of times a day to cycle between active apps.

In native Windows, application switching is bound to <kbd>Alt + Tab</kbd> (which on a Mac keyboard is <kbd>Option + Tab</kbd>).

Reaching for <kbd>Option + Tab</kbd> breaks years of Mac muscle memory. However, naively remapping <kbd>⌘ + Tab</kbd> to <kbd>Alt + Tab</kbd> can easily break browser tab switching (<kbd>Ctrl + Tab</kbd>).

Here is how we solved both problems simultaneously.

---

## The Desired Experience

1. **Forward App Switch:** Pressing <kbd>⌘ + Tab</kbd> inside Windows App summons the Windows task switcher and cycles forward.
2. **Reverse App Switch:** Pressing <kbd>⇧ Shift + ⌘ + Tab</kbd> cycles backward through open windows.
3. **Browser Tabs Unaffected:** Pressing physical <kbd>Ctrl + Tab</kbd> inside Chrome or Edge on Windows still cycles browser tabs natively without triggering the task switcher.

---

## How It Works: The `is_physical_control` Variable

Because <kbd>Left ⌘</kbd> is remapped to `Control`, Karabiner tracks whether a physical Control key is being held:

```json title="Physical Control Tracker Rule"
{
  "from": {
    "key_code": "left_control",
    "modifiers": { "optional": ["any"] }
  },
  "to": [
    { "set_variable": { "name": "is_physical_control", "value": 1 } },
    { "key_code": "left_control" }
  ],
  "to_after_key_up": [
    { "set_variable": { "name": "is_physical_control", "value": 0 } }
  ]
}
```

Now, when <kbd>Tab</kbd> is pressed with `Control`:
* If `is_physical_control == 1`, Karabiner knows you physically pressed the real Control key (intending to switch browser tabs) and leaves it alone.
* If `is_physical_control == 0`, Karabiner knows `Control` is only active because of the <kbd>⌘</kbd> remap, and converts the stroke to `left_option` + `tab` (<kbd>Alt + Tab</kbd> in Windows).

---

## The Rule Snippet

```json title="Excerpt from windows_app_mods.json"
{
  "description": "Windows App: Switch Windows (Cmd + Tab to Alt + Tab)",
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
        "key_code": "tab",
        "modifiers": { "mandatory": ["command", "shift"], "optional": ["caps_lock"] }
      },
      "to": [
        { "key_code": "tab", "modifiers": ["left_option", "left_shift"] }
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
        "key_code": "tab",
        "modifiers": { "mandatory": ["command"], "optional": ["caps_lock"] }
      },
      "to": [
        { "key_code": "tab", "modifiers": ["left_option"] }
      ]
    }
  ]
}
```
