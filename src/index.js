import Phrase from "language_phrase";
import ManagePaneHandler from "./managePaneHandler";
import LearnPaneHandler from "./LearnPaneHandler";
import hideableMixin from "./HideableMixin";

let learnButton = document.querySelector("#learnBtn");
let manageButton = document.querySelector("#manageBtn");
let checkButton = document.querySelector("#checkBtn");
let learnPane = document.querySelector("#learnPane");
let managepane = document.querySelector("#managePane");

let learning = new LearnPaneHandler(learnPane);
let manage = new ManagePaneHandler(managePane)

learnButton.addEventListener("click", () => {
  learning.show();
  manage.hide();
  learnButton.classList.add("activeNavBtn");
  manageButton.classList.remove("activeNavBtn");

  learning.processOnePhrase();
});

manageButton.addEventListener("click", () => {
  manage.show();
  learning.hide();
  manageButton.classList.add("activeNavBtn");
  learnButton.classList.remove("activeNavBtn");
});

learning.processOnePhrase();
