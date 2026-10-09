---
title: Rock-Solid Remote Pasting (⌥⌘V)
description: Fix erratic clipboard pasting over RDP latency, strip formatting and hidden newlines, and paste reliably every time.
---

One of the most persistent annoyances of Azure Virtual Desktop is pasting text from your Mac into a remote application.

### Why Standard Remote Pasting Fails
* **Network Latency & Buffer Drops:** When you press <kbd>⌘V</kbd> inside a remote terminal, PowerShell prompt, or web app, the remote session might receive the keystroke before the RDP clipboard synchronization channel has finished transferring the data. The result is pasting stale clipboard content or nothing at all.
* **Rich Text & Stray Newlines:** Copying formatted text or code snippets from macOS often carries hidden RTF formatting or Unix line breaks (`\n`) that execute prematurely in Windows Command Prompts.

Here is the exact **Keyboard Maestro "Paste from macOS to AVD" macro** that solves this completely.

:::caution[Workaround Disclaimer & Backup Notice]
**Your Mileage May Vary (YMMV):** Keyboard Maestro macros rely on macOS Accessibility permissions and timing thresholds that may require slight calibration depending on your network latency and environment. **Always back up your macros first** via **File > Export > Export All Macros as Archive…** in Keyboard Maestro before importing.
:::

---

## Macro Trigger & Recipe

* **Trigger:** <kbd>⌥ Option</kbd> + <kbd>⌘ Command</kbd> + <kbd>V</kbd>
* **Group:** `Windows/AVD: UNIVERSAL` (Active only when Windows App is frontmost)

```text title="Keyboard Maestro Action Sequence"
1. Filter Clipboard: Unwrap
2. Filter Clipboard: WindowsLineEndings
3. Pause Until: All physical modifiers (Ctrl, Shift, Command, Option) are UP
4. Execute AppleScript:
   • Release any stuck modifier keys
   • Normalize line breaks to LF
   • Type normal characters directly with small pauses
   • Inject Alt-codes (via Option key) for shifted/special characters (!@#$%^&*()_+{}:"<>?|~`)
```

---

## The Production AppleScript (Special Characters & Alt-Code Injection)

When typing into remote AVD sessions, shifted symbols (like `!`, `@`, `#`, `$`) can drop their Shift modifier across latency, typing `1`, `2`, `3`, `4` instead. 

This production script handles this by calculating the ASCII value and typing Windows Alt-codes via `key down option` for problematic symbols:

```applescript title="Paste from macOS to AVD.applescript"
set clipText to (the clipboard as text)

-- Normalize line breaks to LF
set AppleScript's text item delimiters to return & linefeed
set clipItems to text items of clipText
set AppleScript's text item delimiters to linefeed
set clipText to clipItems as text

set AppleScript's text item delimiters to return
set clipItems to text items of clipText
set AppleScript's text item delimiters to linefeed
set clipText to clipItems as text
set AppleScript's text item delimiters to ""

-- Release any stuck modifier keys
tell application "System Events"
	key up shift
	key up option
	key up control
	key up command
end tell

-- Problematic characters in AVD that require Alt codes
set problemChars to "!@#$%^&*()_+{}:\"<>?|~`"

repeat with i from 1 to count of characters in clipText
	set currentChar to character i of clipText
	set asciiNum to id of currentChar
	
	tell application "System Events"
		if asciiNum is 10 then
			-- Shift + Enter for new lines
			key down shift
			key code 36
			key up shift
			delay 0.02
		else if problemChars contains currentChar then
			-- Fast Alt-code injection for shifted/special characters
			set numStr to asciiNum as text
			if asciiNum < 100 then
				set altCode to "0" & numStr
			else
				set altCode to numStr
			end if
			
			key down option
			keystroke altCode
			key up option
			delay 0.005
		else
			-- Direct keystroke for regular letters, numbers, spaces, and unshifted punctuation
			keystroke currentChar
		end if
	end tell
end repeat
```

---

## Karabiner Pass-Through Requirement

Because Karabiner remaps <kbd>Left Command</kbd> to <kbd>Control</kbd> inside Windows App, you must pass <kbd>⌥ + ⌘ + V</kbd> through to macOS uninhibited so Keyboard Maestro can catch the hotkey:

```json title="Karabiner Rule (Included in windows_app_mods.json)"
{
  "description": "Windows App: Paste from macOS Pass-Through (Opt + Cmd + V / Shift + Opt + Cmd + V)",
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
          "mandatory": ["left_command", "left_option"],
          "optional": ["any"]
        }
      },
      "to": [
        {
          "key_code": "v",
          "modifiers": ["left_command", "left_option"]
        }
      ]
    }
  ]
}
```

---

## Benefits
1. **Never executes prematurely** in remote command-line tools.
2. **Strips unwanted fonts, styling, and background colors** when copying from Mac web pages into Outlook or Teams.
3. Provides a dedicated muscle-memory shortcut (<kbd>⌥⌘V</kbd>) whenever you are copying from Mac to Windows.
