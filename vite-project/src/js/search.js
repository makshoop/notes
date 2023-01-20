import { getNotes } from "./notes";
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
