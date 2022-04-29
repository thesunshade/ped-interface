import createResultList from "./createResultList.js";
import renderDefinition from "./renderDefinition.js";

export const list = document.getElementById("list");
export const definitionArea = document.getElementById("definition");
const inputWord = document.getElementById("word-input");
const fuzzyBox = document.getElementById("fuzzy-box");
export const countArea = document.getElementById("count");

export let fuzzyMode;

inputWord.focus(); // puts cursor in input box
inputWord.addEventListener("input", () => {
  renderResultListToScreen(inputWord.value);
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
  renderResultListToScreen(inputWord.value);
});

function renderResultListToScreen(inputWordValue) {
  const { htmlList, resultCount } = createResultList(inputWordValue);
  list.innerHTML = htmlList;
  countArea.innerHTML = resultCount;
  const resultList = document.querySelectorAll(".item");
  resultList.forEach(listItem => {
    listItem.addEventListener("click", e => {
      renderDefinition(e.currentTarget.id);
    });
  });
}
