#!/bin/bash
if pgrep -x "shortcuts_overlay" > /dev/null; then
    pkill -x "shortcuts_overlay"
else
    "$HOME/.config/karabiner/bin/shortcuts_overlay" &
fi
