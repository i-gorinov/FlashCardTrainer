const PARSE_YIELD_INTERVAL = 20000;

async function parseCardsFromCsv(csvText) {
  const rows = await parseCsvRows(csvText);
  const nonEmptyRows = rows.filter((row) => row.some((cell) => cell.trim().length > 0));

  if (nonEmptyRows.length < 2) {
    throw new Error("CSV must include a header row and at least one data row.");
  }

  const header = nonEmptyRows[0].map(normalizeHeaderCell);
  const questionIndex = header.indexOf("question");
  const answerIndex = header.indexOf("answer");

  if (questionIndex === -1 || answerIndex === -1) {
    throw new Error("CSV header must include both 'question' and 'answer' columns.");
  }

  const cards = [];

  for (const row of nonEmptyRows.slice(1)) {
    const question = (row[questionIndex] || "").trim();
    const answer = (row[answerIndex] || "").trim();

    if (question && answer) {
      cards.push({ question, answer });
    }
  }

  return cards;
}

function normalizeHeaderCell(value) {
  return value.replace(/^\uFEFF/, "").trim().toLowerCase();
}

async function parseCsvRows(csvText) {
  const rows = [];
  let currentRow = [];
  let currentCell = "";
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i += 1) {
    if (i > 0 && i % PARSE_YIELD_INTERVAL === 0) {
      await yieldToBrowser();
    }

    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentCell += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      currentRow.push(currentCell);
      currentCell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") {
        i += 1;
      }
      currentRow.push(currentCell);
      rows.push(currentRow);
      currentRow = [];
      currentCell = "";
      continue;
    }

    currentCell += char;
  }

  if (inQuotes) {
    throw new Error("CSV contains an unterminated quoted field.");
  }

  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell);
    rows.push(currentRow);
  }

  return rows;
}

function yieldToBrowser() {
  return new Promise((resolve) => window.setTimeout(resolve, 0));
}
