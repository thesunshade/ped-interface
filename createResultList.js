import { ped } from "./ped.js";
import fuzz from "./fuzz.js";
import renderDefinition from "./renderDefinition.js";
import { inputWord, list, fuzzyMode, countArea } from "./index.js";

export default function createResultList() {
  if (!inputWord.value || inputWord.value.length <= 2) {
    list.innerHTML = "";
  } else if (inputWord.value && inputWord.value.length > 2) {
    let htmlList = `<ul class="results">`;
    let resultCount = 0;
    if (fuzzyMode === true) {
      ped.forEach((item, index) => {
        if (new RegExp(fuzz(inputWord.value), "i").test(fuzz(item[0]))) {
          htmlList += `<li class="item" id="${index}">${item[0]}</li>`;
          resultCount++;
        }
      });
    } else if (fuzzyMode === false) {
      ped.forEach((item, index) => {
        if (new RegExp(inputWord.value, "i").test(item[0])) {
          htmlList += `<li class="item" id="${index}">${item[0]}</li>`;
          resultCount++;
        }
      });
    }
    htmlList += "</ul>";

    const resultList = document.querySelectorAll(".item");
    resultList.forEach(listItem => {
      listItem.addEventListener("click", e => {
        renderDefinition(e.currentTarget.id);
      });
    });

    return { htmlList, resultCount };
  }
}
