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
					
						<div class="note" data-note-id="${note.id}">
						<div class="buttons">
							<button class='delete-button' id="delete-button${note.id}">
								<img src="./src/assets/delete.svg" alt="delete">
							</button>
							<button class="edit-button" id='edit-button'>
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

			const deleteButtons = document.querySelectorAll(".delete-button");
			deleteButtons.forEach((button) => {
				button.addEventListener("click", deleteNote);
			});

			const editButtons = document.querySelectorAll(".edit-button");
			editButtons.forEach((button) => {
				button.addEventListener("click", editNote);
			});
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
					<div class="note" data-note-id="${note.id}">
						<div class="buttons">
							<button class='delete-button' id="delete-button${note.id}" >
								<img src="./src/assets/delete.svg" alt="delete">
							</button>
							<button class='edit-button' id="edit-button">
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

			const deleteButtons = document.querySelectorAll(".delete-button");
			deleteButtons.forEach((button) => {
				button.addEventListener("click", deleteNote);
			});

			const editButtons = document.querySelectorAll(".edit-button");
			editButtons.forEach((button) => {
				button.addEventListener("click", editNote);
			});
		});
}

function deleteNote() {
	const noteId = this.parentNode.parentNode.getAttribute("data-note-id");

	fetch(`http://localhost:3000/notes/${noteId}`, {
		method: "DELETE",
	})
		.then((response) => {
			if (response.ok) {
				const noteToDelete = this.parentNode.parentNode;
				noteToDelete.remove();
			} else {
				console.error("Error deleting note");
			}
		})
		.catch((error) => {
			console.error("Error deleting note", error);
		});
}

function editNote() {
	const noteId = this.parentNode.parentNode.getAttribute("data-note-id");

	const noteTitle = this.parentNode.parentNode.querySelector("h2").textContent;
	const noteDescription =
		this.parentNode.parentNode.querySelector("p").textContent;

	const modal = document.createElement("div");
	modal.classList.add("modal");
	modal.innerHTML = `
	<div class="modal-content" id="modal-content">
		<div class="edit-name">
			<h3>Edit Note</h3>
			<button id="cancel-edit-button"><img src="./src/assets/close.svg" alt="close"></button>
		</div>
		<form id="edit-note-form">
			<label for="note-title">Title:</label>
			<input type="text" id="note-title" value="${noteTitle}">
			<label for="note-description">Description:</label>
			<textarea id="note-description" cols="10" rows="4">${noteDescription}</textarea>
			<button type="submit">Save Changes</button>
		</form>
		</div>
	</div>
	`;
	document.body.appendChild(modal);

	const editNoteForm = document.querySelector("#edit-note-form");
	editNoteForm.addEventListener("submit", (event) => {
		event.preventDefault();

		const newTitle = document.querySelector("#note-title").value;
		const newDescription = document.querySelector("#note-description").value;

		fetch(`http://localhost:3000/notes/${noteId}`, {
			method: "PUT",
			body: JSON.stringify({
				title: newTitle,
				description: newDescription,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((response) => {
			if (response.ok) {
				const noteToEdit = this.parentNode.parentNode;
				noteToEdit.querySelector("h2").textContent = newTitle;
				noteToEdit.querySelector("p").textContent = newDescription;
				modal.remove();
			}
		});
	});
	const cancelEditButton = document.querySelector("#cancel-edit-button");
	cancelEditButton.addEventListener("click", (event) => {
		event.preventDefault();
		modal.remove();
	});
}
