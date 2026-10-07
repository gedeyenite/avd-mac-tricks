---
title: Smart Split Macros (macOS vs AVD)
description: Create single hotkeys and text expansions that intelligently adapt based on whether you are working on your Mac or inside Windows App.
---

A major pain point of switching back and forth between macOS and Windows is having different credentials, work emails, date conventions, and shortcuts for each environment.

With **Keyboard Maestro's Split Macro Group** (`SPLIT: AVD and macOS`), you can assign a **single hotkey or snippet string** that automatically behaves differently depending on which operating system is currently focused.

---

## The Pattern: The `If/Then` Frontmost Application Check

In Keyboard Maestro, create a macro in a group set to *Available in all applications*. Inside the macro, begin with this conditional block:

```text title="Keyboard Maestro Condition"
If:
  Application "Windows App" is at the front (or frontmost application bundle ID is com.microsoft.rdc.macos)
Then:
  Execute Remote AVD Action
Else:
  Execute Local macOS Action
```

---

## Real-World Examples

### 1. Dual Work Email Expansion (`ctr@` or `eml@`)
* **When in Windows App (AVD):** Types your official enterprise email (e.g. `stephen.m.murphy6.civ@army.mil`).
* **When in macOS (Chrome, Mail):** Types your personal or contractor email (e.g. `yourname@gmail.com`).

### 2. ISO Date & Timestamp Insertion (`;;date`)
* **When in Windows App:** Outputs Windows-compatible file naming format: `YYYY-MM-DD` or `YYYYMMDD_HHMM`.
* **When in macOS:** Formats according to macOS preferences with standard formatting and clipboard history tags.

### 3. Password / Credential Vault Autofill
* Safely dispatches the appropriate enterprise password or PIN into AVD, while sending local macOS credentials when working locally.

---

## Why This is Better Than Two Separate Shortcuts
* **Zero Brain Cycles Spent:** You don't have to remember "shortcut A for Mac, shortcut B for Windows".
* **Consistency:** Your fingers type the exact same sequence regardless of which monitor you are looking at.
