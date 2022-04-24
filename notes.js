const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note saved!"));
  } else {
    console.log(chalk.red.inverse("Note title taken!"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notesToKeep.length === notes.length) {
    console.log(chalk.red.inverse("No note found!"));
  } else {
    console.log(chalk.green.inverse("Note removed!"));
    saveNotes(notesToKeep);
  }
};

const listNotes = () => {
  const notes = loadNotes();

  console.log(
    chalk.inverse.bold.green("Your") +
      chalk.inverse.bold.yellow(" no") +
      chalk.inverse.bold.red("tes:")
  );
  notes.filter((note) => console.log(note.title));
};

const readNotes = (title) => {
  const notes = loadNotes();
  const searchNote = notes.find((note) => note.title === title);

  if (searchNote) {
    console.log(chalk.inverse.blue(searchNote.title));
    console.log(searchNote.body);
  } else {
    console.log(chalk.red.bold.inverse("Note not found!"));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNotes: readNotes,
};
