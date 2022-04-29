import createResultList from "./createResultList.js";

export const list = document.getElementById("list");
export const definitionArea = document.getElementById("definition");
export const inputWord = document.getElementById("word-input");
const fuzzyBox = document.getElementById("fuzzy-box");
export const countArea = document.getElementById("count");

export let fuzzyMode;

inputWord.focus(); // puts cursor in input box
inputWord.addEventListener("input", () => {
  renderResultListToScreen();
});

// Fuzzy search setting
if (localStorage.fuzzyMode === null) {
  localStorage.fuzzyMode === true;
} else if (localStorage.fuzzyMode === false) {
  fuzzyBox.checked = false;
  fuzzyMode = false;
} else {
  fuzzyMode = true;
}
fuzzyBox.addEventListener("click", () => {
  fuzzyMode = fuzzyBox.checked;
  localStorage.fuzzyMode = fuzzyBox.checked;
  renderResultListToScreen();
});

function renderResultListToScreen() {
  const { htmlList, resultCount } = createResultList();
  list.innerHTML = htmlList;
  countArea.innerHTML = resultCount;
}
