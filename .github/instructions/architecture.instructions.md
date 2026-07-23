---
description: 'Architecture rules for preserving the modular Flashcard Trainer structure.'
applyTo: '**/*.js, **/*.html, **/*.css'
---

# Flashcard Trainer Architecture Instructions

## Purpose

Preserve the modular structure of the Flashcard Trainer application when generating, refactoring, or reviewing code.

## Module Responsibilities

Keep responsibilities separated by module:

- `js/main.js`
  - Application bootstrap only.
  - Should initialise the app and avoid feature logic.

- `js/constants.js`
  - Shared constants, enums, labels, and static configuration.
  - Do not place runtime state or DOM logic here.

- `js/state.js`
  - Central application state.
  - State reset helpers.
  - State mutation helpers.

- `js/csvParser.js`
  - CSV parsing.
  - CSV validation.
  - CSV import rules.

- `js/navigation.js`
  - Card order generation.
  - Previous/next navigation calculations.
  - Filtered navigation logic.
  - Random card selection.

- `js/dom.js`
  - Required DOM lookups.
  - DOM lookup validation.
  - Cached DOM element collection.

- `js/ui.js`
  - Event wiring.
  - Event handlers.
  - Rendering.
  - User interaction orchestration.

- `css/styles.css`
  - Shared visual design system.
  - Shared button styles.
  - Shared interaction states.

## Shared UI Patterns

Visual patterns that are reused throughout the application should remain centralised.

Examples include:
- button styles
- dialog close controls
- navigation controls
- focus-visible behaviour
- disabled-state styling

Before introducing new UI patterns, check whether an existing shared implementation should be reused or extended.

## Separation of Concerns

When adding or changing functionality:

1. Identify whether the change affects state, navigation, CSV parsing, DOM lookups, or UI rendering.
2. Update the module responsible for that concern.
3. Avoid placing unrelated functionality into `ui.js` just because it is convenient.
4. Do not reintroduce a monolithic `app.js` pattern.

## File Size Guideline

Keep modules focused and reasonably small.

If a module grows beyond roughly 500 lines, consider extracting a dedicated module such as:

- `answerStatus.js`
- `progress.js`
- `tabs.js`
- `filters.js`

Only create a new module when it has a clear responsibility.

## Dependency Rules

Do not add build tools, package managers, frameworks, or runtime dependencies unless the user explicitly requests them.

The app is intended to remain a standalone browser app that can be opened directly from `index.html`.

## Keyboard Navigation

Keyboard navigation has intentionally been removed.

Do not add keyboard shortcuts, `keydown` handlers, arrow-key behaviour, Space-key behaviour, or Enter-key behaviour unless explicitly requested.

If keyboard navigation is requested in future, implement it in a dedicated module and keep it isolated from general UI rendering logic.
