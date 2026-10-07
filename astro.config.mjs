// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://avd-mac-tricks.pages.dev',
	integrations: [
		starlight({
			title: 'AVD Mac Tricks',
			description: 'The definitive guide to making Microsoft Windows App & Azure Virtual Desktop work seamlessly on macOS.',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com' }
			],
			editLink: {
				baseUrl: 'https://github.com',
			},
			customCss: [
				'./src/styles/custom.css',
			],
			components: {
				Pagination: './src/components/CommentsPagination.astro',
			},
			sidebar: [
				{
					label: 'Start Here',
					items: [
						{ label: 'Introduction & Architecture', slug: 'getting-started/overview' },
						{ label: 'Why Keyboard Maestro Fails for Modifiers', slug: 'getting-started/hid-problem' },
					],
				},
				{
					label: 'Karabiner DriverKit Fixes',
					items: [
						{ label: 'Quick Start: Complete Config', slug: 'karabiner/complete-config' },
						{ label: 'Left vs. Right Command Split', slug: 'karabiner/command-to-control' },
						{ label: 'Window Snapping & Display Hopping', slug: 'karabiner/window-snapping' },
						{ label: 'Cmd + Tab Window Switcher', slug: 'karabiner/cmd-tab-switcher' },
						{ label: 'Shift + Cmd + V Clipboard History', slug: 'karabiner/clipboard-history' },
						{ label: 'macOS Hotkey Pass-Throughs (Alfred & Todoist)', slug: 'karabiner/global-passthrough' },
					],
				},
				{
					label: 'Keyboard Maestro Automations',
					items: [
						{ label: 'Overview & Strengths', slug: 'keyboard-maestro/overview' },
						{ label: 'Rock-Solid Remote Pasting (⌥⌘V)', slug: 'keyboard-maestro/paste-to-avd' },
						{ label: 'Microsoft Teams Power Workflows', slug: 'keyboard-maestro/teams-workflows' },
						{ label: 'Smart Split Macros (macOS vs AVD)', slug: 'keyboard-maestro/context-aware-macros' },
						{ label: 'Anti-Idle & Routine Utilities', slug: 'keyboard-maestro/utilities' },
					],
				},
				{
					label: 'Reference & Downloads',
					items: [
						{ label: 'Downloadable JSON & Recipes', slug: 'reference/downloads' },
						{ label: 'Troubleshooting & FAQ', slug: 'reference/troubleshooting' },
					],
				},
			],
		}),
	],
});
