---
title: Anti-Idle & Routine Utilities
description: Smart keep-alive anti-idle pingers, window centering, and email automation routines.
---

In enterprise and government Azure Virtual Desktop environments, strict timeout policies, smart card (CAC/PIV) prompts, and repetitive communications consume significant focus.

Here are three high-utility macros to automate these friction points.

---

## 1. Anti-Idle Keep-Alive (Amphetamine + KM)

Many enterprise remote sessions disconnect or lock after as little as 10–15 minutes of inactivity. While apps like **Amphetamine** keep your physical Mac awake, the remote Windows VM tracks its own separate idle timer.

### The Solution: Periodic Micro-Keystroke / Click
In Keyboard Maestro, create a macro that triggers every 5–10 minutes:
1. Checks if `Windows App` is running.
2. Sends an innocuous key event (such as a simulated <kbd>F15</kbd> or a tiny 1-pixel mouse nudge and return) into the remote session.
3. Keeps the virtual desktop unlocked during long reading sessions, video calls, or downloads without violating host screen sleep settings.

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
