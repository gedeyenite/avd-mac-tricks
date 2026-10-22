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

<div class="diagram-container">
  <div class="diagram-header">
    <div class="badge-pill">AUTOMATION ROUTINE</div>
    <div class="diagram-title">Morning Standup Macro Recipe</div>
  </div>

  <div class="diagram-layer theme-purple">
    <div class="layer-top">
      <h4 class="layer-title">Step 1 & 2: Focus & Compose</h4>
      <span class="layer-tag tag-purple">Window Focus</span>
    </div>
    <ul class="layer-bullets">
      <li><strong>Focus Teams Window:</strong> Brings Microsoft Teams to the foreground</li>
      <li><strong>Trigger Compose Box:</strong> Sends remote shortcut to activate the chat input box</li>
    </ul>
  </div>

  <div class="diagram-connector">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <polyline points="19 12 12 19 5 12"></polyline>
    </svg>
  </div>

  <div class="diagram-layer theme-emerald">
    <div class="layer-top">
      <h4 class="layer-title">Step 3 & 4: Text Injection</h4>
      <span class="layer-tag tag-emerald">Automated Typing</span>
    </div>
    <ul class="layer-bullets">
      <li><strong>Insert Text by Typing:</strong> <code>"Good morning team! Starting on today's tasks..."</code></li>
      <li><strong>Position Cursor:</strong> Lands at the end of the line ready for additions or immediate Enter</li>
    </ul>
  </div>
</div>

---

## 4. Multi-Chat @Mention Automator

When you need to ping multiple stakeholders across channels:
* Stores a predefined list of email handles or department tags.
* Types `@`, pauses 0.1s for the Teams autosuggest dropdown to populate, presses <kbd>Tab</kbd> or <kbd>Enter</kbd> to confirm the mention pill, and appends the notification message.
