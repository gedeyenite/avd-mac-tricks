---
title: Rock-Solid Remote Pasting (⌥⌘V)
description: Fix erratic clipboard pasting over RDP latency, strip formatting and hidden newlines, and paste reliably every time.
---

One of the most persistent annoyances of Azure Virtual Desktop is pasting text from your Mac into a remote application.

### Why Standard Remote Pasting Fails
* **Network Latency & Buffer Drops:** When you press <kbd>⌘V</kbd> inside a remote terminal, PowerShell prompt, or web app, the remote session might receive the keystroke before the RDP clipboard synchronization channel has finished transferring the data. The result is pasting stale clipboard content or nothing at all.
* **Rich Text & Stray Newlines:** Copying formatted text or code snippets from macOS often carries hidden RTF formatting or Unix line breaks (`\n`) that execute prematurely in Windows Command Prompts.

Here is the exact **Keyboard Maestro "Paste from macOS to AVD" macro** that solves this completely.

---

## Macro Trigger & Recipe

* **Trigger:** <kbd>⌥ Option</kbd> + <kbd>⌘ Command</kbd> + <kbd>V</kbd>
* **Group:** `Windows/AVD: UNIVERSAL` (Active only when Windows App is frontmost)

```text title="Keyboard Maestro Action Sequence"
1. Filter Clipboard: Set to Plain Text
2. Filter Clipboard: Trim Whitespace
3. Set Action Delay: 0.05 seconds between simulated events
4. Insert Text by Typing (or Paste via System Events):
   • If length < 250 characters: "Insert Text by Typing: %CurrentClipboard%"
   • If length >= 250 characters: Trigger simulated Ctrl+V with 0.1s settle delay
```

---

## AppleScript Implementation (Zero-Jitter Pasting)

If you prefer executing the paste via an AppleScript action inside Keyboard Maestro or an Alfred workflow:

```applescript title="Paste to AVD AppleScript"
-- Ensure the clipboard contains clean plain text
set cleanText to (the clipboard as text)
set the clipboard to cleanText

tell application "System Events"
    tell process "Windows App"
        set frontmost to true
        delay 0.05
        -- Send native Windows Ctrl+V
        key down control
        keystroke "v"
        key up control
    end tell
end tell
```

---

## Benefits
1. **Never executes prematurely** in remote command-line tools.
2. **Strips unwanted fonts, styling, and background colors** when copying from Mac web pages into Outlook or Teams.
3. Provides a dedicated muscle-memory shortcut (<kbd>⌥⌘V</kbd>) whenever you are copying from Mac to Windows.
