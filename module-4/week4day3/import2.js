import { myFunc1 } from "./export2.js";
import myFunc2 from "./export2.js";
import camelcase from "camelcase";

myFunc1();
myFunc2();
console.log(camelcase("sentence case fixer"));
