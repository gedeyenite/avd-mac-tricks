---
title: Troubleshooting & FAQ
description: Common issues with Windows App, Karabiner-Elements, and macOS accessibility permissions.
---

Here are solutions to the most common issues encountered when setting up this workflow.

---

## 1. Left Command is Still Opening the Windows Start Menu

### Causes & Fixes
1. **Check Rule Precedence:** Ensure the `Left Command to Control` manipulator is at the **very bottom** of your rules list in Karabiner. If it sits above the Arrow or Tab rules, it will intercept those combos prematurely.
2. **Check Bundle Identifier:** Ensure Windows App is running under the bundle identifier `com.microsoft.rdc.macos`. You can verify this in Terminal:
   ```bash title="Terminal"
   osascript -e 'id of app "Windows App"'
   ```
3. **Internal App Settings:** Verify that in **Windows App > Settings > Keyboard**, internal shortcut redirection is turned **OFF**.

---

## 2. Alfred / Spotlight (<kbd>⌘ + Space</kbd>) Doesn't Appear

* Ensure Karabiner's `Pass-Through Global Shortcut (Cmd + Space for Alfred)` rule is enabled.
* If Alfred is configured with a custom hotkey instead of <kbd>⌘ + Space</kbd>, adjust the `to` block in the manipulator to match your specific Alfred trigger.

---

## 3. Todoist Quick Add (<kbd>Ctrl + Space</kbd>) Not Responding

* Ensure the Todoist desktop app is actively running on your Mac.
* If Todoist had a background auto-update pending, Electron's global shortcut listeners can freeze. Restart Todoist via Terminal:
  ```bash title="Terminal"
  pkill -x Todoist && open -a Todoist
  ```
* Karabiner's rule executes `open todoist://openquickadd`, which directly invokes Todoist's internal protocol handler.

---

## 4. Keyboard Maestro Macros Not Firing Inside Windows App

1. **Accessibility Permissions:** On macOS, open **System Settings > Privacy & Security > Accessibility** and ensure both **Keyboard Maestro** and **Keyboard Maestro Engine** are enabled.
2. **Input Monitoring:** Ensure Keyboard Maestro Engine is enabled under **System Settings > Privacy & Security > Input Monitoring**.
3. **Macro Group Activation:** In Keyboard Maestro, check that the macro group's *Available in these applications* setting includes **Windows App** (or is set to *Available in all applications*).
