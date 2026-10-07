---
title: macOS Hotkey Pass-Throughs (Alfred & Todoist)
description: Ensure global macOS shortcuts like Alfred (Cmd + Space) and Todoist Quick Add (Ctrl + Space) continue to work when Windows App is frontmost.
---

One of the most frustrating aspects of working inside a full-screen remote desktop session is that **your macOS launcher and quick-capture shortcuts stop working**—or worse, trigger remote Windows actions.

* When you pressed <kbd>⌘ + Space</kbd> to open **Alfred**, the remap to `Control` turned it into `Ctrl + Space` (which inside Windows is Chinese input method toggle, or triggered Todoist in the wrong context), while releasing it triggered the **Windows Start Menu**.
* When you pressed <kbd>Ctrl + Space</kbd> to quick-add a task to **Todoist**, it failed to reach macOS.
* Media pause/play hotkeys (<kbd>Ctrl + Opt + Cmd + =</kbd>) got swallowed by the remote stream.

Here is how we configure clean pass-throughs.

---

## 1. Alfred Pass-Through (<kbd>⌘ + Space</kbd>)

We want pressing physical <kbd>Left ⌘ + Space</kbd> inside Windows App to:
1. Trigger native macOS Alfred search bar.
2. **Never** open the Windows Start Menu.

### The Karabiner Solution

```json title="Excerpt from windows_app_mods.json"
{
  "description": "Windows App: Pass-Through Global Shortcut (Cmd + Space for Alfred)",
  "manipulators": [
    {
      "type": "basic",
      "conditions": [
        {
          "type": "frontmost_application_if",
          "bundle_identifiers": ["^com\\.microsoft\\.rdc\\.macos$"]
        },
        {
          "type": "variable_unless",
          "name": "is_physical_control",
          "value": 1
        }
      ],
      "from": {
        "key_code": "spacebar",
        "modifiers": { "mandatory": ["left_control"], "optional": ["caps_lock"] }
      },
      "to": [
        { "key_code": "spacebar", "modifiers": ["left_command"] }
      ],
      "to_after_key_up": [
        { "key_code": "left_control" }
      ]
    }
  ]
}
```

The `to_after_key_up` cleanly resets modifier state so no trailing `Windows Key Up` event is ever delivered to the remote desktop.

---

## 2. Todoist Quick Add (<kbd>Ctrl + Space</kbd>)

When you are deep in a Windows App window and press physical <kbd>Ctrl + Space</kbd>, we want the macOS Todoist Quick Add window to slide open over the screen.

Because Windows App intercepts keystrokes before Electron's `globalShortcut` listener can see them, we use Karabiner's `shell_command` action with the native Todoist URL scheme:

```json title="Excerpt from windows_app_mods.json"
{
  "description": "Windows App: Todoist Quick Add (Ctrl + Space)",
  "manipulators": [
    {
      "type": "basic",
      "conditions": [
        {
          "type": "frontmost_application_if",
          "bundle_identifiers": ["^com\\.microsoft\\.rdc\\.macos$"]
        },
        {
          "type": "variable_if",
          "name": "is_physical_control",
          "value": 1
        }
      ],
      "from": {
        "key_code": "spacebar",
        "modifiers": { "mandatory": ["left_control"], "optional": ["caps_lock"] }
      },
      "to": [
        { "shell_command": "open todoist://openquickadd" }
      ]
    }
  ]
}
```

---

## 3. Media / System Pause-Play (<kbd>Ctrl + Opt + Cmd + =</kbd>)

For custom system global hotkeys (like a pause/play macro or stream controller), we pass all 3 modifiers through with an equal sign:

```json title="Excerpt from windows_app_mods.json"
{
  "description": "Windows App: Pass-Through Global Shortcut (Ctrl + Opt + Cmd + =)",
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
        "key_code": "equal_sign",
        "modifiers": { "mandatory": ["control", "option"], "optional": ["any"] }
      },
      "to": [
        {
          "key_code": "equal_sign",
          "modifiers": ["left_control", "left_option", "left_command"]
        }
      ],
      "to_after_key_up": [
        { "key_code": "left_control" }
      ]
    }
  ]
}
```
