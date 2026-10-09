---
title: Why Keyboard Maestro Fails for Modifiers
description: Why you cannot use Keyboard Maestro or AppleScript alone to remap Command keys inside Windows App, and why DriverKit is required.
---

When users first notice that pressing <kbd>⌘ Cmd</kbd> sends a `Windows` key signal into their virtual desktop, their initial instinct is often to write a **Keyboard Maestro macro** or an **AppleScript** to remap <kbd>⌘</kbd> to <kbd>Ctrl</kbd>.

This approach does not work. Understanding *why* will save you hours of troubleshooting.

---

## The Root Cause: Raw HID Interception

Microsoft Windows App (`com.microsoft.rdc.macos`) does not behave like a standard Cocoa/macOS application. 

Instead of listening for high-level macOS NSEvents (key down text events), Windows App attaches a low-level hook directly to the **macOS HID (Human Interface Device) stream**. It needs to do this to transmit raw physical scan codes over the RDP network channel with low latency.

### The Focus-Stealing Glitch

1. You press physical <kbd>Left ⌘</kbd> to begin typing a shortcut like <kbd>⌘ + Z</kbd> or <kbd>⌘ + C</kbd>.
2. Windows App immediately streams a `Windows Key Down` packet to the remote session.
3. If you release the key without a matching companion, Windows registers a solo `Win Up`.
4. In Windows 11, a solo `Win` keypress **immediately summons the Start Menu or Snap Layouts**.
5. **The disaster:** The Start Menu pops open and steals keyboard focus from whatever you were actively editing—whether that is an active in-cell formula in Excel, a draft message in Microsoft Teams, or a code editor.

---

## Dead Ends & Failed Approaches

Here are the common approaches that do **not** work reliably:

### 1. Keyboard Maestro Native Hotkey Triggers
* **The issue:** Keyboard Maestro hooks keystrokes through the macOS Accessibility API. By the time Keyboard Maestro registers that you pressed <kbd>⌘</kbd> and attempts to suppress or simulate keys, Windows App has already captured the raw hardware event.
* **The result:** Missed modifiers, stuck keys, and modifier collisions where Windows sees both `Win` and `Ctrl` held simultaneously.

### 2. AppleScript `System Events` Key Injection
* **The issue:** Attempting to script:
  ```applescript
  tell application "System Events"
      key down control
      keystroke "z"
      key up control
  end tell
  ```
  causes race conditions. Introducing small delays (`delay 0.05`) causes Windows to see a physical `Win` release before the synthetic `Ctrl` registers, popping the Start Menu anyway.

### 3. macOS System Settings > Keyboard Shortcuts
* **The issue:** macOS allows you to remap app-specific shortcuts under *System Settings > Keyboard > Keyboard Shortcuts > App Shortcuts*. However, this only applies to native macOS application menu items. Windows App does not have macOS menu items for remote desktop window actions.

---

## The Only Reliable Fix: DriverKit Virtual HID

The only layer that sits **beneath** the Windows App HID capture hook is **macOS DriverKit** (the kernel extension replacement introduced by Apple).

**Karabiner-Elements** runs a virtual DriverKit device. It intercepts the physical hardware scancodes directly from your keyboard, transforms them, and presents the rewritten scancodes to macOS before Windows App ever receives them.

With Karabiner:
* When you press physical <kbd>Left ⌘</kbd>, Windows App never receives a `Win` scancode. It only sees `Ctrl`.
* The Start Menu never triggers accidentally.
* Your muscle memory for Undo, Cut, Copy, Paste, Select All, and Bold works with 100% reliability.
