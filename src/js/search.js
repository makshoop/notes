import { getNotes, getAllNotes } from "./notes";
import { throttle } from "./utils";

const inputValue = document.getElementById("input");

export function getInputValue() {
	const valueInput = inputValue.value;
	return valueInput;
}

const getNotesThrottled = throttle(getNotes, 2000);

document.getElementById("but").addEventListener("click", () => {
	getNotesThrottled();
	getInputValue();
});

getAllNotes();

const window = document.getElementById("add-note");
const addButton = document.getElementById("add-button");
const closeButton = document.getElementById("close-button");

addButton.onclick = () => {
	window.style.display = "flex";
};

closeButton.onclick = () => {
	window.style.display = "none";
};
