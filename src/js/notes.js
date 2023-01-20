import { getInputValue } from "./search";
import { highlightWords } from "./utils";

export function getNotes() {
	const inputValue = getInputValue();
	input.setAttribute(
		"style",
		"background: url(./src/assets/load.gif)  no-repeat center right; background-size: 20px;",
	);

	fetch(`http://localhost:3000/notes?q=${inputValue}`)
		.then((response) => response.json())
		.then((json) => {
			if (json.length === 0) {
				document.getElementById("notes").innerHTML = `
					<h1>
						No Results;(
					</h1>
				`;
			} else {
				const notes = json.map((note) => {
					const title = highlightWords(note.title, inputValue);
					const description = highlightWords(note.description, inputValue);

					return `
					
						<div class="note">
							<div class="buttons">
								<button id='delete-button'>
									<img src="./src/assets/close.svg" alt="delete">
								</button>
								<button id='edit-button'>
									<img src="/src/assets/pencil.svg" alt="edit">
								</button>
							</div>
							<h2>${title}</h2>
							<p>${description}</p>
						</div>
					`;
				});
				document.querySelector("#notes").innerHTML = notes.join("");
			}
			input.setAttribute("style", "background: none;");
		});
}

export function getAllNotes() {
	input.setAttribute(
		"style",
		"background: url(./src/assets/load.gif)  no-repeat center right; background-size: 20px;",
	);

	fetch("http://localhost:3000/notes")
		.then((response) => response.json())
		.then((json) => {
			const notes = json.map((note) => {
				return `
					<div class="note">
						<div class="buttons">
							<button id='delete-button'>
								<img src="./src/assets/close.svg" alt="delete">
							</button>
							<button id='edit-button'>
								<img src="/src/assets/pencil.svg" alt="edit">
							</button>
						</div>
						<h2>${note.title}</h2>
						<p>${note.description}</p>
					</div>
				`;
			});
			document.querySelector("#notes").innerHTML = notes.join("");
			input.setAttribute("style", "background: none;");
		});
}

btn.onclick = () => {
	modalView.open();
	modalView.btnNoElement.addEventListener("mouseover", mouseOverHandler);
};

let btn = document.getElementById("btn-op");
let count = 0;
