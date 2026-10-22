---
title: Smart Split Macros (macOS vs AVD)
description: Create single hotkeys and text expansions that intelligently adapt based on whether you are working on your Mac or inside Windows App.
---

A major pain point of switching back and forth between macOS and Windows is having different credentials, work emails, date conventions, and shortcuts for each environment.

With **Keyboard Maestro's Split Macro Group** (`SPLIT: AVD and macOS`), you can assign a **single hotkey or snippet string** that automatically behaves differently depending on which operating system is currently focused.

---

## The Pattern: The `If/Then` Frontmost Application Check

In Keyboard Maestro, create a macro in a group set to *Available in all applications*. Inside the macro, begin with this conditional block:

<div class="diagram-container">
  <div class="diagram-header">
    <div class="badge-pill">KEYBOARD MAESTRO LOGIC</div>
    <div class="diagram-title">Conditional Application Check</div>
  </div>

  <div class="diagram-layer theme-purple">
    <div class="layer-top">
      <h4 class="layer-title">If: Frontmost Application is Windows App</h4>
      <span class="layer-tag tag-purple">Condition</span>
    </div>
    <ul class="layer-bullets">
      <li>Application matches: <code>Windows App</code> (bundle ID: <code>com.microsoft.rdc.macos</code>)</li>
    </ul>
  </div>

  <div class="diagram-split">
    <div class="split-card success-card">
      <div class="split-card-header">
        <span>🪟 THEN (Inside Remote Session)</span>
      </div>
      <p style="margin: 0; font-size: 0.85rem; color: var(--sl-color-gray-2);">
        Execute Remote AVD Action (e.g. simulate keystrokes, type DoD enterprise email, format Windows paths).
      </p>
    </div>
    <div class="split-card tip-card">
      <div class="split-card-header">
        <span>🍎 ELSE (Native macOS)</span>
      </div>
      <p style="margin: 0; font-size: 0.85rem; color: var(--sl-color-gray-3);">
        Execute Local macOS Action (e.g. system clipboard, native Mac notification, local script).
      </p>
    </div>
  </div>
</div>

---

## Real-World Examples

### 1. Dual Work Email Expansion (`ctr@` or `eml@`)
* **When in Windows App (AVD):** Types your official enterprise email (e.g. `first.m.last.civ@army.mil`).
* **When in macOS (Chrome, Mail):** Types your personal or contractor email (e.g. `yourname@gmail.com`).

### 2. ISO Date & Timestamp Insertion (`;;date`)
* **When in Windows App:** Outputs Windows-compatible file naming format: `YYYY-MM-DD` or `YYYYMMDD_HHMM`.
* **When in macOS:** Formats according to macOS preferences with standard formatting and clipboard history tags.

### 3. Application & Folder Quick Launcher
* **When in Windows App:** Uses keystrokes to open Windows-specific network drives and mapped enterprise paths (`X:\Shared\Projects`).
* **When in macOS:** Triggers native macOS Finder or opens local project repositories directly.

---

## Why This is Better Than Two Separate Shortcuts
* **Zero Brain Cycles Spent:** You don't have to remember "shortcut A for Mac, shortcut B for Windows".
* **Consistency:** Your fingers type the exact same sequence regardless of which monitor you are looking at.
