---
title: Shift + Cmd + V Clipboard History
description: Open the Windows Clipboard History using your familiar Mac clipboard manager hotkey (Shift + Cmd + V).
---

On macOS, power users rely on clipboard managers like **Alfred**, **Paste**, or **Raycast** triggered via <kbd>⇧ Shift + ⌘ + V</kbd>.

In Windows 11, the built-in clipboard history popup is mapped to <kbd>Win + V</kbd>.

When switching into Windows App, pressing <kbd>⇧ Shift + ⌘ + V</kbd> usually pastes unformatted text (or does nothing).

This rule maps your familiar Mac clipboard manager shortcut to summon the native Windows Clipboard History popup on demand.

---

## The Mapping

| Physical Keystroke | Windows Key Target | Action Inside Windows 11 |
| :--- | :--- | :--- |
| <kbd>⇧ Shift</kbd> + <kbd>⌘ Cmd</kbd> + <kbd>V</kbd> | `Win + V` | Opens the native Windows 11 Clipboard History flyout |

---

## The Rule Snippet

```json title="Excerpt from windows_app_mods.json"
{
  "description": "Windows App: Clipboard History (Shift + Cmd + V to Win + V)",
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
        "key_code": "v",
        "modifiers": {
          "mandatory": ["command", "shift"]
        }
      },
      "to": [
        {
          "key_code": "v",
          "modifiers": ["right_command"]
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
        "key_code": "v",
        "modifiers": {
          "mandatory": ["left_control", "shift"]
        }
      },
      "to": [
        {
          "key_code": "v",
          "modifiers": ["right_command"]
        }
      ]
    }
  ]
}
```

> [!NOTE] **Enabling Clipboard History in Windows**  
> If pressing this shortcut shows a notification prompt inside Windows:  
> Open **Windows Settings > System > Clipboard** and ensure **Clipboard history** is toggled **ON**.
