---
description: 'CSV parsing and import rules for the Flashcard Trainer project.'
applyTo: 'js/csvParser.js, js/ui.js'
---

# CSV Handling Instructions

## Ownership

CSV parsing and validation belong in `js/csvParser.js`.

Do not implement CSV parsing directly in UI event handlers.

UI code may:

- read the uploaded file as text
- call `parseCardsFromCsv()`
- display success or error messages

## Supported CSV Behaviour

Preserve support for:

- `question` and `answer` columns
- case-insensitive header matching
- extra columns
- quoted fields
- embedded commas inside quoted fields
- escaped double quotes inside quoted fields
- blank line filtering

## Header Rules

The parser should accept headers in any form of capitalisation or lowercase such as:

```csv
question,answer
Question,Answer
QUESTION,ANSWER
question,answer,category
```

The parser must still require both a question column and an answer column.

The category column is optional

## Row Rules

Skip rows that do not contain both a usable question and a usable answer.

Do not create partial flashcards.

## Dependencies

Do not add CSV libraries or other dependencies unless the user explicitly requests them.

If a dependency is requested in future, prefer a proven CSV parser and update the README accordingly.

## Large Files

Preserve non-blocking behaviour where practical.

For large files, prefer yielding back to the browser periodically during parsing rather than performing one long blocking loop.
