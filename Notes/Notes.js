let inputTitle = document.querySelector("#title");
let inputTag = document.querySelector("#tags");
let inputContent = document.querySelector("#content");

let addTagBtn = document.querySelector("#add-tag-btn");
let addNoteBtn = document.querySelector("#add-note-btn");

let notesContainer = document.querySelector(".notes-container");
let tagsContainer = document.querySelector(".tags-container");
let inputSearch = document.querySelector("#search");

let notes;
let tags = [];

const saveToLocalStorage = () => {
  localStorage.setItem("notes", JSON.stringify(notes));
  alert("Notes Saved");
};

const getNotes = () => {
  data = localStorage.getItem("notes");

  if (data) {
    notes = JSON.parse(data);
    showNotes(notes);
  } else {
    notes = [];
  }
};

const showNotes = (notes) => {
  notesContainer.innerHTML = "";

  if (notes) {
    console.log("Notes are there");
    notes.forEach((noteItem) => {
      let noteDiv = document.createElement("div");
      noteDiv.classList.add("note");

      noteDiv.innerHTML = `<h3 id="note-title">${noteItem.title}</h3>`;
      let DeleteBtn = document.createElement("button");
      DeleteBtn.textContent = "❌";
      DeleteBtn.id = "deletebtn";
      DeleteBtn.dataset.id = noteItem.id;
      noteDiv.appendChild(DeleteBtn);

      let tagsContainer = document.createElement("div");
      tagsContainer.classList.add("tags");

      if (noteItem.tags)
        noteItem.tags.forEach((tg) => {
          let tagP = document.createElement("p");
          tagP.textContent = tg;
          tagsContainer.appendChild(tagP);
        });

      noteDiv.appendChild(tagsContainer);

      let noteContent = document.createElement("div");
      noteContent.id = "note-content";
      noteContent.textContent = noteItem.content;

      noteDiv.appendChild(noteContent);
      notesContainer.appendChild(noteDiv);
    });
  } else {
    alert("No Notes Available");
  }
};

const addNote = (note) => {
  notes.push({
    id: notes ? notes.length + 1 : 1,
    title: note.title,
    tags: note.tags,
    content: note.content,
  });

  saveToLocalStorage();
  showNotes(notes);
  inputContent.value = "";
  inputTitle.value = "";
};

const deleteNote = (id) => {
  notes = notes.filter((n) => n.id != id);

  saveToLocalStorage();
  showNotes(notes);
};

const showTags = () => {
  tagsContainer.innerHTML = "";
  tags.forEach((tag) => {
    let tagP = document.createElement("p");
    tagP.textContent = tag;
    tagP.classList.add("input-tag");
    tagsContainer.appendChild(tagP);
  });
};

const updateNotes = (keyword) => {
  
  filteredNotes = notes.filter((n) => {
    return n.title.toLowerCase().includes(keyword.toLowerCase()) ||
    n.tags.some((t) => t.toLowerCase().includes(keyword.toLowerCase())) ||
    n.content.toLowerCase().includes(keyword.toLowerCase());
  });

 
  showNotes(filteredNotes);
};

addTagBtn.addEventListener("click", () => {
  tags.push(inputTag.value);
  inputTag.value = "";
  showTags();
});

addNoteBtn.addEventListener("click", () => {
  let newNote = {};
  if (inputTitle.value) {
    newNote.title = inputTitle.value;
  } else {
    alert("Enter a Valid Title");
  }

  if (tags.length >= 1) {
    newNote.tags = tags;
  } else {
    alert("Add Atleast 1 tag");
  }

  newNote.content = inputContent.value;
  addNote(newNote);
  tags = [];
  tagsContainer.innerHTML = "";
});

let timer;
inputSearch.addEventListener("input", () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    updateNotes(inputSearch.value);
  }, 1000);

  if (inputSearch.value == "") {
    getNotes();
  }
});

getNotes();

notesContainer.addEventListener("click", (e) => {
  if (e.target.tagName == "BUTTON") deleteNote(e.target.dataset.id);
});
