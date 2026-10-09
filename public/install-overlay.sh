#!/bin/bash
set -e

echo "🚀 Installing Windows App Shortcuts Overlay for macOS..."

TARGET_DIR="$HOME/.config/karabiner"
BIN_DIR="$TARGET_DIR/bin"
mkdir -p "$BIN_DIR"

BASE_URL="https://raw.githubusercontent.com/gedeyenite/avd-mac-tricks/master/public/overlay"

echo "📥 Downloading cheatsheet UI..."
curl -fsSL "$BASE_URL/windows_app_cheatsheet.html" -o "$TARGET_DIR/windows_app_cheatsheet.html"

echo "📥 Downloading toggle script..."
curl -fsSL "$BASE_URL/toggle_overlay.sh" -o "$BIN_DIR/toggle_overlay.sh"

echo "📥 Downloading native overlay app..."
curl -fsSL "$BASE_URL/shortcuts_overlay" -o "$BIN_DIR/shortcuts_overlay"

chmod +x "$BIN_DIR/toggle_overlay.sh" "$BIN_DIR/shortcuts_overlay"

echo "✅ Installed successfully to ~/.config/karabiner/bin/!"
echo "💡 Press Cmd + ? inside Windows App to toggle your floating shortcuts overlay."
