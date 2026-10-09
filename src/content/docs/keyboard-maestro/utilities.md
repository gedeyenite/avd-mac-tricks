---
title: Productivity & Routine Utilities
description: Window management, clean text formatting, and email automation routines.
---

When working across macOS and Azure Virtual Desktop, repetitive communications, multi-monitor reorganization, and messy formatting consume significant daily focus.

Here are high-utility macros to automate these friction points.

---

## 1. Clean Clipboard Formatter (Strip Formatting & Fix Line Breaks)

Copying text from macOS PDFs, Slack, or web pages into remote Windows Word documents, Excel cells, or web forms often carries unwanted rich text formatting, odd font sizes, or fractured hard line-breaks.

### The Macro
* **Trigger:** Dedicated hotkey (e.g. <kbd>⌥ + ⌘ + C</kbd> or via typed string `;;clean`)
* **Action:**
  1. Grabs the current macOS clipboard.
  2. Runs Keyboard Maestro’s filter action: **Remove Styles** / **Filter Plain Text**.
  3. Optionally normalizes line endings (`\r\n` to `\n` or joins disjointed line breaks in copied paragraphs).
  4. Prepares sanitized plain text ready for immediate remote pasting without formatting corruption.


---

## 2. Fast Window Reset & Center
When multi-monitor sessions get reorganized or windows open partially off-screen inside AVD:
* **Trigger:** Dedicated hotkey (e.g., <kbd>⌥ + ⌘ + C</kbd>)
* **Action:**
  1. Issues standard Windows keyboard commands to maximize, restore, or center the active application window.
  2. Snaps the focused document into primary view without needing to hunt down window titlebars with your mouse cursor.

---

## 3. Outlook "Transit Assist" Automation

For repetitive email tasks—such as sending standard approvals, transmittals, or filing tickets:
* Automatically creates a new reply or forward in Outlook.
* Fills predefined text blocks ("Please see attached", "Signed, please see attached").
* Prompts you with a fast Keyboard Maestro list dialog to select the routing category, then attaches and files the message in one step.
