import { getInputValue } from "./search";
import { highlightWords } from "./utils";

export function getNotes() {
	const inputValue = getInputValue();

	fetch(`http://localhost:3000/notes?q=${inputValue}`)
		.then((response) => response.json())
		.then((json) => {
			const notes = json.map((note) => {
				const title = highlightWords(note.title, inputValue);
				const description = highlightWords(note.description, inputValue);

				return `
					<div class="note">
						<h2>${title}</h2>
						<p>${description}</p>
					</div>
				`;
			});
			document.querySelector("#notes").innerHTML = notes.join("");
		});
}

function getAllNotes() {
	fetch("http://localhost:3000/notes")
		.then((response) => response.json())
		.then((json) => {
			const notes = json.map((note) => {
				return `
					<div class="note">
						<h2>${note.title}</h2>
						<p>${note.description}</p>
					</div>
				`;
			});
			document.querySelector("#notes").innerHTML = notes.join("");
		});
}

getAllNotes();
// document.querySelector("#note").innerHTML = `
// 	<h2>No results ;(</h2>`;

// function throttle(callee, timeout) {
// 	let timer = null;

// 	return function perform(...args) {
// 		if (timer) return;

// 		timer = setTimeout(() => {
// 			callee(...args);

// 			clearTimeout(timer);
// 			timer = null;
// 		}, timeout);
// 	};
// }

// export const throttledGetNotes = throttle(getNotes, 1000);
