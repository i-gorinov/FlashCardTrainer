---
description: 'JavaScript coding standards for the Flashcard Trainer project.'
applyTo: '**/*.js'
---

# JavaScript Coding Standards

## Style

Use a consistent JavaScript style across all files:

- Use semicolons.
- Use double quotes for strings.
- Use `const` by default.
- Use `let` only when reassignment is required.
- Prefer early returns over deeply nested conditionals.
- Prefer descriptive function and variable names.
- Keep functions focused on one responsibility.

## DRY Rules

Before adding new logic:

1. Check whether similar logic already exists.
2. Reuse or extend existing helpers where appropriate.
3. Avoid copying reset, rendering, navigation, or formatting logic into multiple places.

Prefer central helpers such as:

```javascript
getNavigationState();
resetCoreState();
formatProgressText();
```

## Collections and DOM Lists

Use native iterable APIs where appropriate.

Prefer:

```javascript
nodeList.forEach((node) => {
  // ...
});
```

Avoid unnecessary conversions such as:

```javascript
Array.from(nodeList).forEach((node) => {
  // ...
});
```

Use array spreading only when an actual array operation is required, such as `.find()` or `.filter()` on a `NodeList`.

## Class Handling

Avoid verbose repeated class removals.

Prefer central class lists or mappings, for example:

```javascript
indicator.classList.remove(...ANSWER_STATUS_CLASSES, "is-animating", "is-readonly");
```

## Error Handling

When a required DOM element or invalid CSV structure is detected, fail clearly with a useful error message.

Do not silently ignore structural errors that would leave the UI in an inconsistent state.
