---
description: 'State management rules for the Flashcard Trainer project.'
applyTo: 'js/state.js, js/ui.js, js/navigation.js'
---

# State Management Instructions

## Single Source of Truth

All application state must remain centralised in `js/state.js`.

Do not introduce duplicate state in UI, navigation, parser, or DOM modules.

## Adding State

When adding a new state field:

1. Add the field to the initial state object in `state.js`.
2. Update the relevant reset helper.
3. Add mutation helpers if the field is changed from multiple locations.
4. Ensure rendering code reads from state rather than maintaining separate UI-only state.

## Reset Logic

Do not manually reset the same group of fields in multiple files or functions.

Prefer existing shared reset helpers:

```javascript
resetCoreState();
resetProgress();
resetSessionState();
resetAllState();
```

Avoid duplicated reset blocks such as:

```javascript
state.order = [];
state.cursor = 0;
state.currentCardIndex = -1;
```

## Session State

Preserve the distinction between:

- loaded card data
- current traversal position
- answer statuses
- viewed-card progress
- UI card state

Do not reset loaded cards when only the session or traversal state should be reset.

## State and Rendering

State helpers should update state only.

Rendering functions should read state and update the DOM.

Avoid mixing DOM manipulation into `state.js`.
