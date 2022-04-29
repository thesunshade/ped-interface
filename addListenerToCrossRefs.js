import { ped } from "./ped.js";
import renderDefinition from "./renderDefinition.js";

export default function addListenerToCrossRefs() {
  const crossRefs = document.getElementsByClassName("cross-ref");
  for (let i = 0; i < crossRefs.length; i++) {
    crossRefs[i].addEventListener("click", e => {
      console.log(e.target.text);
      // find the index of current word
      const index = () => {
        for (let i = 0; i < ped.length; i++) {
          if (e.target.text === ped[i][0]) {
            return i;
          }
        }
      };
      const thisIndex = index();
      renderDefinition(thisIndex);
    });
  }
}
