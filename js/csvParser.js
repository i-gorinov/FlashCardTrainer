const PARSE_YIELD_INTERVAL = 20000;

async function parseCardsFromCsv(csvText) {
  const rows = await parseCsvRows(csvText);
  const nonEmptyRows = rows.filter((row) => row.some((cell) => cell.trim().length > 0));

  if (nonEmptyRows.length < 2) {
    throw new Error("CSV must include the header row and at least one data row in the Flashcard Trainer format.");
  }

  const header = nonEmptyRows[0].map(normalizeHeaderCell);
  const questionIndex = header.indexOf("question");
  const answerIndex = header.indexOf("answer");
  const topicIndex = header.indexOf("topic");
  const legacyCategoryIndex = header.indexOf("category");
  const mcQuestionIndex = header.indexOf("mc-question");
  const mcAnswerIndex = header.indexOf("mc-answer");
  const mcDistractorIndices = ["mc-distractor-1", "mc-distractor-2", "mc-distractor-3"]
    .map((col) => header.indexOf(col))
    .filter((i) => i !== -1);

  if (questionIndex === -1 || answerIndex === -1) {
    throw new Error("CSV header must include 'Question' and 'Answer'. Naming convention: 'Topic', 'Question', 'Answer', 'MC-Question', 'MC-Answer', 'MC-Distractor-1', 'MC-Distractor-2', 'MC-Distractor-3'.");
  }

  const hasMultiChoiceColumns = mcQuestionIndex !== -1 && mcAnswerIndex !== -1 && mcDistractorIndices.length > 0;

  const cards = [];

  for (const row of nonEmptyRows.slice(1)) {
    const question = (row[questionIndex] || "").trim();
    const answer = (row[answerIndex] || "").trim();
    const topic = topicIndex === -1
      ? (legacyCategoryIndex === -1 ? "" : (row[legacyCategoryIndex] || "").trim())
      : (row[topicIndex] || "").trim();
    const mcQuestion = mcQuestionIndex === -1 ? "" : (row[mcQuestionIndex] || "").trim();
    const mcAnswer = mcAnswerIndex === -1 ? "" : (row[mcAnswerIndex] || "").trim();
    const mcDistractors = mcDistractorIndices.map((i) => (row[i] || "").trim()).filter(Boolean);

    if (question && answer) {
      const card = { question, answer };
      if (topic) card.topic = topic;
      if (mcQuestion && mcAnswer && mcDistractors.length > 0) {
        card.mcQuestion = mcQuestion;
        card.mcAnswer = mcAnswer;
        card.mcDistractors = mcDistractors;
      }
      cards.push(card);
    }
  }

  return { cards, hasMultiChoiceColumns };
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
