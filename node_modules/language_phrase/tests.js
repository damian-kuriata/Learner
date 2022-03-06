import Phrase from "./phrase.js";

let phrase = new Phrase("orig,other", "tran");
alert(phrase.checkTranslation("orig", "to"));
alert(phrase.checkTranslation("other", "to"));
alert(phrase.checkTranslation("orig,other", "to"));
alert(phrase.checkTranslation("orig,othe", "to"));