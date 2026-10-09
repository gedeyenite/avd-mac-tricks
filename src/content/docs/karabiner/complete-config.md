---
title: Complete Karabiner Configuration
description: The complete, ready-to-deploy windows_app_mods.json file for Karabiner-Elements.
---

This page contains the **complete, battle-tested `windows_app_mods.json`** file. 

It remaps modifiers, enables window snapping, fixes the app switcher, syncs clipboard history, and allows macOS global hotkeys like **Alfred** and **Todoist** to pass through seamlessly.

:::tip[🥷 Skip the Manual Copy-Paste: Automated AI Setup Available]
Tired of manually managing JSON files and reloading rules? Check out the **[Super Double Ninja Power User Extreme Setup](/avd-mac-tricks/karabiner/ai-automated-setup/)** to see how we used the Antigravity app with Google Gemini Pro to inspect, write, and reload Karabiner modifications hands-free. *(Note: Requires an AI subscription or API tier).*
:::

:::caution[Workaround Disclaimer & Backup Notice]
**Your Mileage May Vary (YMMV):** There are many intricate variables across macOS versions, external keyboards, and virtualization policies. **We cannot guarantee these rules will work identically in every configuration.**

**Always back up your working configuration first:** Make a copy of your existing `~/.config/karabiner/` directory before overwriting rules.
:::

---

## Installation Quick Start

### Step 1: Open the Complex Modifications Folder
In macOS Terminal, create the assets folder if it does not already exist:

```bash title="Terminal"
mkdir -p ~/.config/karabiner/assets/complex_modifications
```

### Step 2: Save the File
Save the JSON below to:  
`~/.config/karabiner/assets/complex_modifications/windows_app_mods.json`

### Step 3: Enable the Rules in Karabiner-Elements
1. Open **Karabiner-Elements Settings**.
2. Navigate to **Complex Modifications > Add predefined rule**.
3. You will see **"Windows App Command to Control"**.
4. Click **Enable All** (or enable the individual rules you need).

---

## Full `windows_app_mods.json`

```json title="~/.config/karabiner/assets/complex_modifications/windows_app_mods.json"
{
  "title": "Windows App Command to Control",
  "rules": [
    {
      "description": "Windows App: Track Physical Control Key",
      "manipulators": [
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "left_control",
            "modifiers": {
              "optional": [
                "any"
              ]
            }
          },
          "to": [
            {
              "set_variable": {
                "name": "is_physical_control",
                "value": 1
              }
            },
            {
              "key_code": "left_control"
            }
          ],
          "to_after_key_up": [
            {
              "set_variable": {
                "name": "is_physical_control",
                "value": 0
              }
            }
          ]
        }
      ]
    },
    {
      "description": "Windows App: Clipboard History (Shift + Cmd + V to Win + V)",
      "manipulators": [
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "v",
            "modifiers": {
              "mandatory": [
                "command",
                "shift"
              ]
            }
          },
          "to": [
            {
              "key_code": "v",
              "modifiers": [
                "right_command"
              ]
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "v",
            "modifiers": {
              "mandatory": [
                "left_control",
                "shift"
              ]
            }
          },
          "to": [
            {
              "key_code": "v",
              "modifiers": [
                "right_command"
              ]
            }
          ]
        }
      ]
    },
    {
      "description": "Windows App: Windows Snipping Tool (Shift + Cmd + S to Win + Shift + S)",
      "manipulators": [
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "s",
            "modifiers": {
              "mandatory": [
                "command",
                "shift"
              ],
              "optional": [
                "caps_lock"
              ]
            }
          },
          "to": [
            {
              "key_code": "s",
              "modifiers": [
                "right_command",
                "left_shift"
              ]
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            },
            {
              "type": "variable_unless",
              "name": "is_physical_control",
              "value": 1
            }
          ],
          "from": {
            "key_code": "s",
            "modifiers": {
              "mandatory": [
                "left_control",
                "shift"
              ],
              "optional": [
                "caps_lock"
              ]
            }
          },
          "to": [
            {
              "key_code": "s",
              "modifiers": [
                "right_command",
                "left_shift"
              ]
            }
          ]
        }
      ]
    },
    {
      "description": "Windows App: Window Management Shortcuts (Option A: Left Command [+ Shift] + Arrows)",
      "manipulators": [
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "up_arrow",
            "modifiers": {
              "mandatory": [
                "left_command",
                "shift"
              ]
            }
          },
          "to": [
            {
              "key_code": "up_arrow",
              "modifiers": [
                "right_command",
                "left_shift"
              ]
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "down_arrow",
            "modifiers": {
              "mandatory": [
                "left_command",
                "shift"
              ]
            }
          },
          "to": [
            {
              "key_code": "down_arrow",
              "modifiers": [
                "right_command",
                "left_shift"
              ]
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "left_arrow",
            "modifiers": {
              "mandatory": [
                "left_command",
                "shift"
              ]
            }
          },
          "to": [
            {
              "key_code": "left_arrow",
              "modifiers": [
                "right_command",
                "left_shift"
              ]
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "right_arrow",
            "modifiers": {
              "mandatory": [
                "left_command",
                "shift"
              ]
            }
          },
          "to": [
            {
              "key_code": "right_arrow",
              "modifiers": [
                "right_command",
                "left_shift"
              ]
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "up_arrow",
            "modifiers": {
              "mandatory": [
                "left_control",
                "shift"
              ]
            }
          },
          "to": [
            {
              "key_code": "up_arrow",
              "modifiers": [
                "right_command",
                "left_shift"
              ]
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "down_arrow",
            "modifiers": {
              "mandatory": [
                "left_control",
                "shift"
              ]
            }
          },
          "to": [
            {
              "key_code": "down_arrow",
              "modifiers": [
                "right_command",
                "left_shift"
              ]
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "left_arrow",
            "modifiers": {
              "mandatory": [
                "left_control",
                "shift"
              ]
            }
          },
          "to": [
            {
              "key_code": "left_arrow",
              "modifiers": [
                "right_command",
                "left_shift"
              ]
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "right_arrow",
            "modifiers": {
              "mandatory": [
                "left_control",
                "shift"
              ]
            }
          },
          "to": [
            {
              "key_code": "right_arrow",
              "modifiers": [
                "right_command",
                "left_shift"
              ]
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "up_arrow",
            "modifiers": {
              "mandatory": [
                "left_command"
              ]
            }
          },
          "to": [
            {
              "key_code": "up_arrow",
              "modifiers": [
                "right_command"
              ]
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "down_arrow",
            "modifiers": {
              "mandatory": [
                "left_command"
              ]
            }
          },
          "to": [
            {
              "key_code": "down_arrow",
              "modifiers": [
                "right_command"
              ]
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "left_arrow",
            "modifiers": {
              "mandatory": [
                "left_command"
              ]
            }
          },
          "to": [
            {
              "key_code": "left_arrow",
              "modifiers": [
                "right_command"
              ]
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "right_arrow",
            "modifiers": {
              "mandatory": [
                "left_command"
              ]
            }
          },
          "to": [
            {
              "key_code": "right_arrow",
              "modifiers": [
                "right_command"
              ]
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "up_arrow",
            "modifiers": {
              "mandatory": [
                "left_control"
              ]
            }
          },
          "to": [
            {
              "key_code": "up_arrow",
              "modifiers": [
                "right_command"
              ]
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "down_arrow",
            "modifiers": {
              "mandatory": [
                "left_control"
              ]
            }
          },
          "to": [
            {
              "key_code": "down_arrow",
              "modifiers": [
                "right_command"
              ]
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "left_arrow",
            "modifiers": {
              "mandatory": [
                "left_control"
              ]
            }
          },
          "to": [
            {
              "key_code": "left_arrow",
              "modifiers": [
                "right_command"
              ]
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "right_arrow",
            "modifiers": {
              "mandatory": [
                "left_control"
              ]
            }
          },
          "to": [
            {
              "key_code": "right_arrow",
              "modifiers": [
                "right_command"
              ]
            }
          ]
        }
      ]
    },
    {
      "description": "Windows App: Alfred Hotkey Pass-Through (Cmd + Space)",
      "manipulators": [
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            },
            {
              "type": "variable_unless",
              "name": "is_physical_control",
              "value": 1
            }
          ],
          "from": {
            "key_code": "spacebar",
            "modifiers": {
              "mandatory": [
                "left_control"
              ],
              "optional": [
                "caps_lock"
              ]
            }
          },
          "to": [
            {
              "key_code": "spacebar",
              "modifiers": [
                "left_command"
              ]
            }
          ],
          "to_after_key_up": [
            {
              "key_code": "left_control"
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "spacebar",
            "modifiers": {
              "mandatory": [
                "command"
              ],
              "optional": [
                "caps_lock"
              ]
            }
          },
          "to": [
            {
              "key_code": "spacebar",
              "modifiers": [
                "left_command"
              ]
            }
          ],
          "to_after_key_up": [
            {
              "key_code": "left_control"
            }
          ]
        }
      ]
    },
    {
      "description": "Windows App: Todoist Quick Add (Ctrl + Space)",
      "manipulators": [
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            },
            {
              "type": "variable_if",
              "name": "is_physical_control",
              "value": 1
            }
          ],
          "from": {
            "key_code": "spacebar",
            "modifiers": {
              "mandatory": [
                "left_control"
              ],
              "optional": [
                "caps_lock"
              ]
            }
          },
          "to": [
            {
              "shell_command": "open todoist://openquickadd"
            }
          ]
        }
      ]
    },
    {
      "description": "Windows App: Switch Windows (Cmd + Tab to Alt + Tab)",
      "manipulators": [
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "tab",
            "modifiers": {
              "mandatory": [
                "command",
                "shift"
              ],
              "optional": [
                "caps_lock"
              ]
            }
          },
          "to": [
            {
              "key_code": "tab",
              "modifiers": [
                "left_option",
                "left_shift"
              ]
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            },
            {
              "type": "variable_unless",
              "name": "is_physical_control",
              "value": 1
            }
          ],
          "from": {
            "key_code": "tab",
            "modifiers": {
              "mandatory": [
                "left_control",
                "shift"
              ],
              "optional": [
                "caps_lock"
              ]
            }
          },
          "to": [
            {
              "key_code": "tab",
              "modifiers": [
                "left_option",
                "left_shift"
              ]
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "tab",
            "modifiers": {
              "mandatory": [
                "command"
              ],
              "optional": [
                "caps_lock"
              ]
            }
          },
          "to": [
            {
              "key_code": "tab",
              "modifiers": [
                "left_option"
              ]
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            },
            {
              "type": "variable_unless",
              "name": "is_physical_control",
              "value": 1
            }
          ],
          "from": {
            "key_code": "tab",
            "modifiers": {
              "mandatory": [
                "left_control"
              ],
              "optional": [
                "caps_lock"
              ]
            }
          },
          "to": [
            {
              "key_code": "tab",
              "modifiers": [
                "left_option"
              ]
            }
          ]
        }
      ]
    },
    {
      "description": "Windows App: Pass-Through Global Shortcut (Ctrl + Opt + Cmd + =)",
      "manipulators": [
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "equal_sign",
            "modifiers": {
              "mandatory": [
                "control",
                "option"
              ],
              "optional": [
                "any"
              ]
            }
          },
          "to": [
            {
              "key_code": "equal_sign",
              "modifiers": [
                "left_control",
                "left_option",
                "left_command"
              ]
            }
          ],
          "to_after_key_up": [
            {
              "key_code": "left_control"
            }
          ]
        }
      ]
    },
    {
      "description": "Windows App: CleanShot X Pass-Through (Shift + Cmd + 3, 4, 5, 6, 7, 0)",
      "manipulators": [
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "3",
            "modifiers": {
              "mandatory": [
                "command",
                "shift"
              ],
              "optional": [
                "caps_lock"
              ]
            }
          },
          "to": [
            {
              "key_code": "3",
              "modifiers": [
                "left_command",
                "left_shift"
              ]
            }
          ],
          "to_after_key_up": [
            {
              "key_code": "left_control"
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            },
            {
              "type": "variable_unless",
              "name": "is_physical_control",
              "value": 1
            }
          ],
          "from": {
            "key_code": "3",
            "modifiers": {
              "mandatory": [
                "left_control",
                "shift"
              ],
              "optional": [
                "caps_lock"
              ]
            }
          },
          "to": [
            {
              "key_code": "3",
              "modifiers": [
                "left_command",
                "left_shift"
              ]
            }
          ],
          "to_after_key_up": [
            {
              "key_code": "left_control"
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "4",
            "modifiers": {
              "mandatory": [
                "command",
                "shift"
              ],
              "optional": [
                "caps_lock"
              ]
            }
          },
          "to": [
            {
              "key_code": "4",
              "modifiers": [
                "left_command",
                "left_shift"
              ]
            }
          ],
          "to_after_key_up": [
            {
              "key_code": "left_control"
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            },
            {
              "type": "variable_unless",
              "name": "is_physical_control",
              "value": 1
            }
          ],
          "from": {
            "key_code": "4",
            "modifiers": {
              "mandatory": [
                "left_control",
                "shift"
              ],
              "optional": [
                "caps_lock"
              ]
            }
          },
          "to": [
            {
              "key_code": "4",
              "modifiers": [
                "left_command",
                "left_shift"
              ]
            }
          ],
          "to_after_key_up": [
            {
              "key_code": "left_control"
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "5",
            "modifiers": {
              "mandatory": [
                "command",
                "shift"
              ],
              "optional": [
                "caps_lock"
              ]
            }
          },
          "to": [
            {
              "key_code": "5",
              "modifiers": [
                "left_command",
                "left_shift"
              ]
            }
          ],
          "to_after_key_up": [
            {
              "key_code": "left_control"
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            },
            {
              "type": "variable_unless",
              "name": "is_physical_control",
              "value": 1
            }
          ],
          "from": {
            "key_code": "5",
            "modifiers": {
              "mandatory": [
                "left_control",
                "shift"
              ],
              "optional": [
                "caps_lock"
              ]
            }
          },
          "to": [
            {
              "key_code": "5",
              "modifiers": [
                "left_command",
                "left_shift"
              ]
            }
          ],
          "to_after_key_up": [
            {
              "key_code": "left_control"
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "6",
            "modifiers": {
              "mandatory": [
                "command",
                "shift"
              ],
              "optional": [
                "caps_lock"
              ]
            }
          },
          "to": [
            {
              "key_code": "6",
              "modifiers": [
                "left_command",
                "left_shift"
              ]
            }
          ],
          "to_after_key_up": [
            {
              "key_code": "left_control"
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            },
            {
              "type": "variable_unless",
              "name": "is_physical_control",
              "value": 1
            }
          ],
          "from": {
            "key_code": "6",
            "modifiers": {
              "mandatory": [
                "left_control",
                "shift"
              ],
              "optional": [
                "caps_lock"
              ]
            }
          },
          "to": [
            {
              "key_code": "6",
              "modifiers": [
                "left_command",
                "left_shift"
              ]
            }
          ],
          "to_after_key_up": [
            {
              "key_code": "left_control"
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "7",
            "modifiers": {
              "mandatory": [
                "command",
                "shift"
              ],
              "optional": [
                "caps_lock"
              ]
            }
          },
          "to": [
            {
              "key_code": "7",
              "modifiers": [
                "left_command",
                "left_shift"
              ]
            }
          ],
          "to_after_key_up": [
            {
              "key_code": "left_control"
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            },
            {
              "type": "variable_unless",
              "name": "is_physical_control",
              "value": 1
            }
          ],
          "from": {
            "key_code": "7",
            "modifiers": {
              "mandatory": [
                "left_control",
                "shift"
              ],
              "optional": [
                "caps_lock"
              ]
            }
          },
          "to": [
            {
              "key_code": "7",
              "modifiers": [
                "left_command",
                "left_shift"
              ]
            }
          ],
          "to_after_key_up": [
            {
              "key_code": "left_control"
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "0",
            "modifiers": {
              "mandatory": [
                "command",
                "shift"
              ],
              "optional": [
                "caps_lock"
              ]
            }
          },
          "to": [
            {
              "key_code": "0",
              "modifiers": [
                "left_command",
                "left_shift"
              ]
            }
          ],
          "to_after_key_up": [
            {
              "key_code": "left_control"
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            },
            {
              "type": "variable_unless",
              "name": "is_physical_control",
              "value": 1
            }
          ],
          "from": {
            "key_code": "0",
            "modifiers": {
              "mandatory": [
                "left_control",
                "shift"
              ],
              "optional": [
                "caps_lock"
              ]
            }
          },
          "to": [
            {
              "key_code": "0",
              "modifiers": [
                "left_command",
                "left_shift"
              ]
            }
          ],
          "to_after_key_up": [
            {
              "key_code": "left_control"
            }
          ]
        }
      ]
    },
    {
      "description": "Windows App: Paste from macOS Pass-Through (Opt + Cmd + V / Shift + Opt + Cmd + V)",
      "manipulators": [
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "v",
            "modifiers": {
              "mandatory": [
                "command",
                "option",
                "shift"
              ],
              "optional": [
                "caps_lock"
              ]
            }
          },
          "to": [
            {
              "key_code": "v",
              "modifiers": [
                "left_command",
                "left_option",
                "left_shift"
              ]
            }
          ],
          "to_after_key_up": [
            {
              "key_code": "left_control"
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            },
            {
              "type": "variable_unless",
              "name": "is_physical_control",
              "value": 1
            }
          ],
          "from": {
            "key_code": "v",
            "modifiers": {
              "mandatory": [
                "left_control",
                "option",
                "shift"
              ],
              "optional": [
                "caps_lock"
              ]
            }
          },
          "to": [
            {
              "key_code": "v",
              "modifiers": [
                "left_command",
                "left_option",
                "left_shift"
              ]
            }
          ],
          "to_after_key_up": [
            {
              "key_code": "left_control"
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "v",
            "modifiers": {
              "mandatory": [
                "command",
                "option"
              ],
              "optional": [
                "caps_lock"
              ]
            }
          },
          "to": [
            {
              "key_code": "v",
              "modifiers": [
                "left_command",
                "left_option"
              ]
            }
          ],
          "to_after_key_up": [
            {
              "key_code": "left_control"
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            },
            {
              "type": "variable_unless",
              "name": "is_physical_control",
              "value": 1
            }
          ],
          "from": {
            "key_code": "v",
            "modifiers": {
              "mandatory": [
                "left_control",
                "option"
              ],
              "optional": [
                "caps_lock"
              ]
            }
          },
          "to": [
            {
              "key_code": "v",
              "modifiers": [
                "left_command",
                "left_option"
              ]
            }
          ],
          "to_after_key_up": [
            {
              "key_code": "left_control"
            }
          ]
        }
      ]
    },
    {
      "description": "Windows App: Shortcuts Cheat Sheet Overlay (Cmd + ?)",
      "manipulators": [
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "slash",
            "modifiers": {
              "mandatory": [
                "command",
                "shift"
              ],
              "optional": [
                "caps_lock"
              ]
            }
          },
          "to": [
            {
              "shell_command": "/Users/stephenmurphy/.config/karabiner/bin/toggle_overlay.sh"
            }
          ]
        },
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            },
            {
              "type": "variable_unless",
              "name": "is_physical_control",
              "value": 1
            }
          ],
          "from": {
            "key_code": "slash",
            "modifiers": {
              "mandatory": [
                "left_control",
                "shift"
              ],
              "optional": [
                "caps_lock"
              ]
            }
          },
          "to": [
            {
              "shell_command": "/Users/stephenmurphy/.config/karabiner/bin/toggle_overlay.sh"
            }
          ]
        }
      ]
    },
    {
      "description": "Windows App: Left Command to Control (com.microsoft.rdc.macos)",
      "manipulators": [
        {
          "type": "basic",
          "conditions": [
            {
              "type": "frontmost_application_if",
              "bundle_identifiers": [
                "^com\\.microsoft\\.rdc\\.macos$"
              ]
            }
          ],
          "from": {
            "key_code": "left_command",
            "modifiers": {
              "optional": [
                "any"
              ]
            }
          },
          "to": [
            {
              "set_variable": {
                "name": "is_physical_command",
                "value": 1
              }
            },
            {
              "key_code": "left_control",
              "lazy": true
            }
          ],
          "to_after_key_up": [
            {
              "set_variable": {
                "name": "is_physical_command",
                "value": 0
              }
            }
          ]
        }
      ]
    }
  ]
}
```
