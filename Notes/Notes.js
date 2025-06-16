// Element selectors
const inputTitle = document.querySelector("#title");
const inputTag = document.querySelector("#tags");
const inputContent = document.querySelector("#content");

const addTagBtn = document.querySelector("#add-tag-btn");
const addNoteBtn = document.querySelector("#add-note-btn");

const notesContainer = document.querySelector(".notes-container");
const tagsContainer = document.querySelector(".tags-container");
const inputSearch = document.querySelector("#search");

// Data storage
let notes = [];
let tags = [];

// LocalStorage functions
const saveToLocalStorage = () => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

const loadNotesFromStorage = () => {
  const data = localStorage.getItem("notes");
  notes = data ? JSON.parse(data) : [];
  showNotes(notes);
};

// Display all notes
const showNotes = (notesToDisplay) => {
  notesContainer.innerHTML = "";

  if (!notesToDisplay || notesToDisplay.length === 0) {
    notesContainer.innerHTML = `<p style="text-align:center; grid-column: 1 / -1;">No notes found.</p>`;
    return;
  }

  notesToDisplay.forEach((note) => {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");

    // Title
    noteDiv.innerHTML = `<h3 id="note-title">${note.title}</h3>`;

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.id = "deletebtn";
    deleteBtn.dataset.id = note.id;
    noteDiv.appendChild(deleteBtn);

    // Tags
    const noteTags = document.createElement("div");
    noteTags.classList.add("tags");

    note.tags.forEach((tag) => {
      const tagEl = document.createElement("p");
      tagEl.textContent = tag;
      noteTags.appendChild(tagEl);
    });

    noteDiv.appendChild(noteTags);

    // Content
    const contentEl = document.createElement("div");
    contentEl.id = "note-content";
    contentEl.textContent = note.content;
    noteDiv.appendChild(contentEl);

    notesContainer.appendChild(noteDiv);
  });
};

// Add note to memory + UI
const addNote = (note) => {
  notes.push({
    id: Date.now(), // More robust than length+1
    ...note,
  });

  saveToLocalStorage();
  showNotes(notes);

  // Reset fields
  inputTitle.value = "";
  inputContent.value = "";
  tags = [];
  showTags();

  alert("Note added!");
};

// Delete note
const deleteNote = (id) => {
  notes = notes.filter((n) => n.id != id);
  saveToLocalStorage();
  showNotes(notes);
};

// Display current tags
const showTags = () => {
  tagsContainer.innerHTML = "";
  tags.forEach((tag) => {
    const tagEl = document.createElement("p");
    tagEl.textContent = tag;
    tagEl.classList.add("input-tag");
    tagsContainer.appendChild(tagEl);
  });
};

// Search/filter notes
const updateNotes = (keyword) => {
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase()) ||
    note.content.toLowerCase().includes(keyword.toLowerCase()) ||
    note.tags.some((tag) => tag.toLowerCase().includes(keyword.toLowerCase()))
  );

  showNotes(filteredNotes);
};

// Event Listeners
addTagBtn.addEventListener("click", () => {
  const tag = inputTag.value.trim();
  if (tag && !tags.includes(tag)) {
    tags.push(tag);
    inputTag.value = "";
    showTags();
  }
});

addNoteBtn.addEventListener("click", () => {
  const title = inputTitle.value.trim();
  const content = inputContent.value.trim();

  if (!title) return alert("Please enter a title.");
  if (tags.length === 0) return alert("Please add at least one tag.");

  addNote({ title, tags: [...tags], content });
});

let timer;
inputSearch.addEventListener("input", () => {
  clearTimeout(timer);
  const keyword = inputSearch.value.trim();

  timer = setTimeout(() => {
    if (keyword) updateNotes(keyword);
    else loadNotesFromStorage();
  }, 500);
});

notesContainer.addEventListener("click", (e) => {
  if (e.target.id === "deletebtn") {
    const id = e.target.dataset.id;
    if (confirm("Are you sure you want to delete this note?")) {
      deleteNote(id);
    }
  }
});

// Initial Load
loadNotesFromStorage();
