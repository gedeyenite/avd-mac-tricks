---
title: Troubleshooting & FAQ
description: Common setup gotchas, macOS accessibility permissions, and frequently asked questions for Windows App power users.
lastMajorUpdate: "2026-10-22"
updateBadge: "UPDATED"
updateSummary: "Added YubiKey Purebred enrollment collision fixes and new CAC re-provisioning guidance"
---

:::caution[Workaround Disclaimer & Backup Recommendation]
**Your Mileage May Vary (YMMV):** There are numerous intricacies across different macOS versions, hardware models, external keyboard layouts, and corporate virtualization policies. **We cannot guarantee that every macro or rule will work identically in every user environment.**

**Always back up your previous working states first** before importing new configurations:
* **Karabiner-Elements:** Duplicate or make a backup copy of your `~/.config/karabiner/` directory before enabling new complex modifications.
* **Keyboard Maestro:** Select **File > Export > Export All Macros as Archive…** in Keyboard Maestro before importing new `.kmmacros` bundles.
:::

---

## Part 1: Setup & Post-Install Gotchas

These are the most common tripwires encountered when configuring Karabiner-Elements, Keyboard Maestro, and Windows App for the first time.

### 1. Left Command is Still Opening the Windows Start Menu

#### Causes & Fixes
1. **Rule Precedence in Karabiner:** Karabiner evaluates rules strictly from top to bottom. Ensure the catch-all `Left Command to Control` manipulator is placed at the **very bottom** of your rules list in Karabiner. If it sits above the Arrow Snapping or Cmd + Tab rules, it will intercept those key combinations prematurely.
2. **Verify Bundle Identifier:** Ensure Windows App is running under the bundle identifier `com.microsoft.rdc.macos`. You can verify this in Terminal:
   ```bash title="Terminal"
   osascript -e 'id of app "Windows App"'
   ```
3. **Internal App Settings Conflict:** Open **Windows App > Settings > Keyboard** (or Remote Desktop Preferences) and verify that internal keyboard shortcut redirection is turned **OFF**. If left on, Windows App attempts its own translation and conflicts with DriverKit.

---

### 2. Alfred / Spotlight (<kbd>⌘ + Space</kbd>) Doesn't Appear

* Ensure Karabiner's `Pass-Through Global Shortcut (Cmd + Space for Alfred)` rule is active and enabled.
* If Alfred is configured with a custom trigger (such as double-tap Control or a dedicated key) instead of <kbd>⌘ + Space</kbd>, update the `to` block in the manipulator to emit your specific hotkey.

---

### 3. Todoist Quick Add (<kbd>Ctrl + Space</kbd>) Not Responding

* Ensure the Todoist macOS desktop app is actively running.
* If Todoist has a background update pending, Electron's global shortcut listeners can occasionally become unresponsive. Restart Todoist via Terminal:
  ```bash title="Terminal"
  pkill -x Todoist && open -a Todoist
  ```
* Karabiner invokes `open todoist://openquickadd`, which directly calls Todoist's internal macOS URL scheme rather than relying on simulated keystrokes.

---

### 4. Keyboard Maestro Macros Not Firing Inside Windows App

1. **Accessibility Permissions:** On macOS, open **System Settings > Privacy & Security > Accessibility** and ensure both **Keyboard Maestro** and **Keyboard Maestro Engine** are checked and enabled.
2. **Input Monitoring Permissions:** Open **System Settings > Privacy & Security > Input Monitoring** and verify that **Keyboard Maestro Engine** is enabled.
3. **Macro Group Application Scoping:** In the Keyboard Maestro editor, inspect the parent Macro Group (e.g. `Windows/AVD: UNIVERSAL`). Ensure *Available in these applications* includes **Windows App** (or is set to *Available in all applications*).

---

### 5. AirPods Audio Fails to Route to Remote Teams / Windows App

* **Symptom:** Connecting your AirPods after launching Windows App leaves audio blasting through MacBook speakers or silent in remote Teams meetings.
* **Why it happens:** Windows App captures macOS CoreAudio sinks at launch and does not dynamically bind to newly connected Bluetooth devices mid-session.
* **The Solution:** Use **SoundSource** to force per-app redirection (`Windows App` -> `AirPods`).
* **Complete Guide:** See our full troubleshooting breakdown, buffer latency recommendations, and Friendly Streaming workaround in the **[AirPods Routing with SoundSource](/avd-mac-tricks/hardware/airpods-soundsource/)** guide.

---

### 6. Purebred Registration App Targets the Wrong YubiKey (Session Collision)

* **Symptom:** You plug in a new or secondary YubiKey inside AVD to enroll it, but the Purebred Registration app keeps trying to re-enroll or overwrite your existing, currently functioning YubiKey.
* **Why it happens:** If you logged into the AVD Windows session using an existing YubiKey, Windows locks that token as the active logon session owner. Purebred interrogates the active session identity and ignores the newly inserted secondary key.
* **The Solution:** Log out of AVD and **authenticate using your physical CAC in a card reader**. This frees up connected YubiKeys to be recognized as clean, unoccupied enrollment targets.
* **Complete Guide:** See **[The Identity Collision Trap: Setting Up a New or Secondary YubiKey](/avd-mac-tricks/hardware/yubikey-purebred/#1-the-identity-collision-trap-setting-up-a-new-or-secondary-yubikey)**.

---

### 7. New CAC Received: Re-Provisioning YubiKeys Without AESD

* **Symptom:** You renewed or replaced your physical CAC and your YubiKeys stopped working for remote authentication.
* **The Myth:** Users assume they need to wipe the YubiKey or open an urgent ticket with the Army Enterprise Service Desk (AESD).
* **The Solution:** No helpdesk ticket or factory reset is needed. Log into AVD using your new CAC, launch the **Purebred Registration** app, open `https://purebred.csd.disa.mil/pb/` -> **My Devices**, click **Generate OTP**, and paste the OTP into the client app to re-bind your keys in seconds.
* **Complete Guide:** See **[The New CAC Myth & Step-by-Step Self-Service Re-Provisioning](/avd-mac-tricks/hardware/yubikey-purebred/#2-the-new-cac-myth-re-provisioning-without-aesd-or-resets)**.

---

## Part 2: Frequently Asked Questions (FAQ)

### Q: Does this setup work with external PC / Windows keyboards?
**A:** Yes, but keep physical layout differences in mind. On standard PC keyboards, the physical bottom-left key order is typically `Ctrl - Windows - Alt`, whereas Mac keyboards use `Control - Option - Command`. 
* If you use both a MacBook internal keyboard and an external PC keyboard, Karabiner allows you to specify **Target Devices** for individual rules so that each keyboard gets its own appropriate mapping.

### Q: What if my corporate Mac MDM locks down DriverKit or kernel extensions?
**A:** Karabiner-Elements relies on Apple's modern **DriverKit VirtualHIDDevice** system extension. If your organization's MDM profile strictly blocks all system extensions, Karabiner will not be able to install its virtual driver.
* In that scenario, you can still use our **Keyboard Maestro macro suite** (which only requires standard macOS Accessibility permissions), though low-level modifier suppression (such as raw physical Command-to-Control splitting) requires DriverKit.

### Q: Can I use these workarounds with Citrix Workspace, VMware Horizon, or Amazon WorkSpaces?
**A:** Yes! The core HID problem and solution are identical across almost all remote desktop clients on macOS. 
* To adapt the rules, simply update the `bundle_identifiers` regex in `windows_app_mods.json` from `^com\.microsoft\.rdc\.macos$` to your client's bundle ID (for example, `^com\.citrix\.receiver\.nomas$` for Citrix).

### Q: Will remote Ctrl+C and Ctrl+V conflict with native Mac clipboard shortcuts?
**A:** No. By mapping physical **Left Command** to emit **Control** inside the Windows App bundle, your natural Mac muscle memory (<kbd>⌘C</kbd>, <kbd>⌘V</kbd>, <kbd>⌘Z</kbd>, <kbd>⌘A</kbd>) translates directly into native Windows editing keys. 
* Physical **Right Command** remains mapped to the physical Windows key, giving you complete access to Windows OS shortcuts (like <kbd>Win + E</kbd> for File Explorer or <kbd>Win + R</kbd> for Run).

### Q: How are new FAQs and guide updates determined?
**A:** We actively monitor community questions and feedback left via **Giscus Discussions** at the bottom of each page, as well as tickets submitted through our **Community Intake Desk**. Whenever repeat questions or useful new edge cases arise, we verify the workaround and promote it directly into this FAQ guide!
