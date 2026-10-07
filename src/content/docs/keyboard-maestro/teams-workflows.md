---
title: Microsoft Teams Power Workflows
description: Automate the Microsoft Teams compose box, dismiss mute photobombs, and manage notifications inside Windows App.
---

Microsoft Teams in Azure Virtual Desktop can be sluggish to navigate purely with a mouse. 

Using **Keyboard Maestro**, you can create targeted macros grouped under `Windows/AVD: TEAMS` that run with one touch.

---

## 1. Quick-Focus Compose Box

When viewing a busy Teams channel or chat, navigating your cursor back into the message entry field requires searching for the bottom input bar.

### The Macro
* **Trigger:** <kbd>⌥ Option</kbd> + <kbd>C</kbd>
* **Action:**
  1. Simulates pressing <kbd>C</kbd> (native Teams shortcut to jump to compose).
  2. Falls back to a small relative click if in a pop-out chat window.
  3. Ensures cursor is actively blinking and ready for typing.

---

## 2. Dismiss "You're Muted" Notification Photobomb

During meetings, Teams often pops a sticky banner: *"You're muted. Speak up or unmute."* which covers active screen sharing buttons or slide controls.

### The Macro
* **Trigger:** Custom hotkey or Stream Deck button
* **Action:** Uses Keyboard Maestro's **Found Image** or fixed coordinate action to click the tiny dismiss <kbd>×</kbd> icon in the lower-middle notification region without interrupting your active presentation window.

---

## 3. Automated Morning Standup Greeting

```text title="Morning Standup Macro Recipe"
1. Focus Teams window
2. Trigger "Open Compose Box"
3. Insert Text by Typing: "Good morning team! Starting on today's tasks..."
4. Position cursor at the end of the text
```

---

## 4. Multi-Chat @Mention Automator

When you need to ping multiple stakeholders across channels:
* Stores a predefined list of email handles or department tags.
* Types `@`, pauses 0.1s for the Teams autosuggest dropdown to populate, presses <kbd>Tab</kbd> or <kbd>Enter</kbd> to confirm the mention pill, and appends the notification message.
