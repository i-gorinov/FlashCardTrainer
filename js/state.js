function createInitialState() {
  return {
    cards: [],
    mode: Mode.SEQUENTIAL,
    order: [],
    cursor: 0,
    currentCardIndex: -1,
    sessionStarted: false,
    cardState: CardState.EMPTY,
    answerStatuses: [],
    navigationFilters: { correct: false, incorrect: false, noMark: false },
    progress: { viewedCount: 0, seenCards: new Set() },
    multiChoice: false,
    hasMultiChoiceColumns: false,
    multiChoiceOptionOrders: [],
  };
}
const state = createInitialState();
function resetCoreState() { state.order = []; state.cursor = 0; state.currentCardIndex = -1; }
function resetProgress() { state.progress.viewedCount = 0; state.progress.seenCards.clear(); }
function resetNavigationFilters() { state.navigationFilters = { correct: false, incorrect: false, noMark: false }; }
function resetAnswerStatuses() { state.answerStatuses = state.cards.map(() => AnswerStatus.UNANSWERED); }
function resetMultiChoiceOptionOrders() { state.multiChoiceOptionOrders = state.cards.map(() => null); }
function resetSessionState() { state.sessionStarted = false; state.answerStatuses = []; state.multiChoice = false; state.multiChoiceOptionOrders = []; resetCoreState(); resetProgress(); resetNavigationFilters(); }
function setCards(cards) { state.cards = cards; resetSessionState(); }
function setHasMultiChoiceColumns(hasMultiChoiceColumns) { state.hasMultiChoiceColumns = hasMultiChoiceColumns; }
function resetAllState(selectedMode = Mode.SEQUENTIAL) {
  state.cards = [];
  state.mode = selectedMode;
  state.cardState = CardState.EMPTY;
  state.hasMultiChoiceColumns = false;
  resetSessionState();
}
function markCardViewed(cardIndex) {
  if (state.progress.seenCards.has(cardIndex)) return;
  state.progress.seenCards.add(cardIndex);
  state.progress.viewedCount += 1;
}

function isCardMultiChoiceCapable(card) {
  if (!card) return false;
  const mcQuestion = (card.mcQuestion || "").trim();
  const mcAnswer = (card.mcAnswer || "").trim();
  const distractors = Array.isArray(card.mcDistractors) ? card.mcDistractors : [];
  return mcQuestion.length > 0 && mcAnswer.length > 0 && distractors.length > 0;
}
