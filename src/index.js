import Phrase from "language_phrase";
import ManagePaneHandler from "./managePaneHandler";
import LearnPaneHandler from "./LearnPaneHandler";
import hideableMixin from "./HideableMixin";
import PhraseInputDialog from "./phraseInputDialog";

let learnButton = document.querySelector(".nav-btn:first-child");
let manageButton = document.querySelector(".nav-btn:nth-child(2)");
let checkButton = document.querySelector(".nav-btn:last-child");
let learnPane = document.querySelector("#learn-pane");
let managepane = document.querySelector("#manage-pane");
/*
let learning = new LearnPaneHandler(learnPane);
Object.assign(learning, hideableMixin);
let manage = new ManagePaneHandler(managePane)
Object.assign(maange, hideableMixin);*/

let currentPane = "learning";

learnButton.addEventListener("click", () => {
  if (currentPane === "learning") {
    return;
  }
  currentPane = "learning";
  //learning.show();
  //manage.hide();
  learnButton.classList.add("active-nav-btn");
  manageButton.classList.remove("active-nav-btn");

//  learning.processOnePhrase();
});

manageButton.addEventListener("click", () => {
  if (currentPane === "manage") {
    return;
  }
  currentPane = "manage";
//  manage.show();
//  learning.hide();
  manageButton.classList.add("active-nav-btn");
  learnButton.classList.remove("active-nav-btn");
});

//learning.processOnePhrase();
