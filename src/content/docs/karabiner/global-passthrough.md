---
title: macOS Hotkey Pass-Throughs (Alfred & Todoist)
description: Ensure global macOS shortcuts like Alfred (Cmd + Space) and Todoist Quick Add (Ctrl + Space) continue to work when Windows App is frontmost.
---

One of the most frustrating aspects of working inside a full-screen remote desktop session is that **your macOS launcher and quick-capture shortcuts stop working**—or worse, trigger remote Windows actions.

* When you pressed <kbd>⌘ + Space</kbd> to open **Alfred**, the remap to `Control` turned it into `Ctrl + Space` (which inside Windows is Chinese input method toggle, or triggered Todoist in the wrong context), while releasing it triggered the **Windows Start Menu**.
* When you pressed <kbd>Ctrl + Space</kbd> to quick-add a task to **Todoist**, it failed to reach macOS.
* Media pause/play hotkeys (<kbd>Ctrl + Opt + Cmd + =</kbd>) got swallowed by the remote stream.

Here is how we configure clean pass-throughs.

:::tip[🥷 Automated Setup Option]
Tuning complex passthrough triggers and `to_after_key_up` reset behaviors is effortless when delegated to an AI agent. Learn how to do this in the **[Super Double Ninja Power User Extreme Setup](/avd-mac-tricks/karabiner/ai-automated-setup/)**. *(Note: Requires an AI subscription or API tier).*
:::

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

---

## 4. CleanShot X Screenshot Overlay (<kbd>⇧ + ⌘ + 4</kbd> / <kbd>⇧ + ⌘ + 5</kbd>)

By default, when Windows App has focus in full-screen or multiple monitors, pressing native macOS screenshot keys can be swallowed by the remote session or trigger Windows snipping tools.

### The Problem
* Mac users rely on **CleanShot X** for OCR text extraction, floating pinned screenshots (pinning a spec sheet on screen while typing into remote Windows), and quick annotations.
* Windows App captures the modifier stream unless explicit pass-through directives are defined.

### The Workaround
Pass CleanShot's native capture hotkeys (<kbd>⇧ + ⌘ + 4</kbd> for Area Capture, <kbd>⇧ + ⌘ + 3</kbd> for Fullscreen) through Karabiner, or configure CleanShot's **"Pin to Screen"** overlay floating window to maintain macOS Window Level `NSFloatingWindowLevel` above fullscreen RDP sessions.

---

## 5. Remote Windows Snipping Tool (<kbd>⇧ + ⌘ + S</kbd>)

If you prefer using Windows's built-in **Snipping Tool** directly inside your remote virtual desktop rather than macOS screenshot utilities, you run into the same modifier conflict: Windows triggers snipping via <kbd>Win + ⇧ + S</kbd>.

### The Remap
Our Karabiner rule intercepts <kbd>Shift + Cmd + S</kbd> inside Windows App and emits physical <kbd>Right Command (Win)</kbd> + <kbd>Left Shift</kbd> + <kbd>S</kbd>:

```json
{
  "description": "Windows App: Windows Snipping Tool (Shift + Cmd + S to Win + Shift + S)",
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
        "key_code": "s",
        "modifiers": {
          "mandatory": ["command", "shift"],
          "optional": ["caps_lock"]
        }
      },
      "to": [
        {
          "key_code": "s",
          "modifiers": ["right_command", "left_shift"]
        }
      ]
    }
  ]
}
```

---

## 6. Shortcuts Cheat Sheet Overlay (<kbd>⌘ + ?</kbd>)

Remembering every remote remap, passthrough key, and modifier difference can take time. To help keep shortcuts at your fingertips, you can bind <kbd>⌘ + ?</kbd> (<kbd>⇧ + ⌘ + /</kbd>) to a shell script trigger that toggles a floating cheat sheet overlay on your Mac screen.

```json
{
  "description": "Windows App: Shortcuts Cheat Sheet Overlay (Cmd + ?)",
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
        "key_code": "slash",
        "modifiers": {
          "mandatory": ["command", "shift"],
          "optional": ["caps_lock"]
        }
      },
      "to": [
        {
          "shell_command": "/Users/stephenmurphy/.config/karabiner/bin/toggle_overlay.sh"
        }
      ]
    }
  ]
}
```


