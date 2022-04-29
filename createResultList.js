import { ped } from "./ped.js";
import fuzz from "./fuzz.js";
import { list, fuzzyMode } from "./index.js";

export default function createResultList(inputWordValue) {
  if (!inputWordValue || inputWordValue.length <= 2) {
    list.innerHTML = "";
  } else if (inputWordValue && inputWordValue.length > 2) {
    let htmlList = `<ul class="results">`;
    let resultCount = 0;
    if (fuzzyMode === true) {
      ped.forEach((item, index) => {
        if (new RegExp(fuzz(inputWordValue), "i").test(fuzz(item[0]))) {
          htmlList += `<li class="item" id="${index}">${item[0]}</li>`;
          resultCount++;
        }
      });
    } else if (fuzzyMode === false) {
      ped.forEach((item, index) => {
        if (new RegExp(inputWordValue, "i").test(item[0])) {
          htmlList += `<li class="item" id="${index}">${item[0]}</li>`;
          resultCount++;
        }
      });
    }
    htmlList += "</ul>";

    return { htmlList, resultCount };
  }
}
