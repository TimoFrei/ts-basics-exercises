// ============================================================
//  app.ts  –  TypeScript client
//
//  This file is partially complete. Look for EXERCISE comments
//  and follow the instructions to build the app step by step.
// ============================================================

// =====================  EXERCISE 1  =================================
//  Import the created interface
// ====================================================================

// ====================================================================
// 1. API functions
// ====================================================================

// =====================  EXERCISE 2  =================================
//  Implement getSongs():
//    - It should be an async function
//    - Use fetch() to GET "/songs"
//    - Call response.json() to parse the body
//    - The return type should be Promise<Song[]>
//
//  Example skeleton:
//    async function getSongs(): Promise<Song[]> {
//      const response = ...
//      const songs: Song[] = ...
//      return songs;
//    }
// ====================================================================

// =====================  EXERCISE 5  =================================
//  Implement addSong(song):
//    - It should be an async function that takes a Song parameter
//    - Use fetch() to POST to "/songs"
//    - Set the headers: { "Content-Type": "application/json" }
//    - Set the body: JSON.stringify(song)
//    - Parse the response as JSON and return it
//    - The return type should be Promise<Song>
//
//  Hint: Look at deleteSong() below for how fetch options work.
// ====================================================================

// =====================  EXERCISE 7  =================================
//  Implement updateSong(id, changes):
//    - It should be an async function
//    - Parameters: id (number) and changes (Song)
//    - Use fetch() to PUT to `/songs/${id}`
//    - Set the headers: { "Content-Type": "application/json" }
//    - Set the body: JSON.stringify(changes)
//    - Parse the response as JSON and return it
//    - The return type should be Promise<Song>
// ====================================================================

// REFERENCE EXAMPLE: This DELETE function is complete.
// Study it to understand how async/await, fetch, and type annotations work.
async function deleteSong(id: number): Promise<void> {
  await fetch(`/songs/${id}`, { method: "DELETE" });
}

// ====================================================================
// 2. DOM helpers  (provided – no changes needed)
// ====================================================================

/** Read the .value of an <input> element by its id */
function getInput(id: string): string {
  return (document.getElementById(id) as HTMLInputElement).value;
}

/** Set the .value of an <input> element by its id */
function setInput(id: string, value: string): void {
  (document.getElementById(id) as HTMLInputElement).value = value;
}

/** Get any HTML element by id, with a generic type cast */
function getElement<T extends HTMLElement>(id: string): T {
  return document.getElementById(id) as T;
}

// ====================================================================
// 3. Render
// ====================================================================

// =====================  EXERCISE 3  =================================
//  Implement renderSongs(songs):
//    - Parameter: songs (Song[]), return type: void
//    - Get the <ul> element with id "song-list"
//      → use: getElement<HTMLUListElement>("song-list")
//    - Clear its content: list.innerHTML = ""
//    - Loop through each song with .forEach()
//    - For each song, create an <li> element and set its innerHTML to:
//
//        <span>
//          <strong>${song.title}</strong>
//          &mdash; ${song.artist}
//          <em>(${song.year})</em>
//        </span>
//        <button class="btn-edit"   onclick="onEdit(${song.id})">Edit</button>
//        <button class="btn-delete" onclick="onDelete(${song.id})">Delete</button>
//
//    - Append each <li> to the list
//
//  Bonus: If the array is empty, show a message like "No songs yet"
// ====================================================================

// Keep a local copy so onEdit can look up a song by id without another fetch
let currentSongs: Song[] = [];

async function loadSongs(): Promise<void> {
  //currentSongs = await getSongs();
  //renderSongs(currentSongs);
}

// ====================================================================
// 4. Click handlers  (provided – these call YOUR functions above)
// ====================================================================

async function onDelete(id: number): Promise<void> {
  await deleteSong(id);
  await loadSongs();
}

function onShowAddForm(): void {
  getElement("add-form").style.display = "flex";
  getElement("btn-show-add").style.display = "none";
  getElement<HTMLInputElement>("title").focus();
}

function onCancelAdd(): void {
  getElement("add-form").style.display = "none";
  getElement("btn-show-add").style.display = "";
  setInput("title", "");
  setInput("artist", "");
  setInput("year", "");
}

function onEdit(id: number): void {
  const song = currentSongs.find((s) => s.id === id);
  if (!song) return;

  setInput("edit-id", String(song.id));
  setInput("edit-title", song.title);
  setInput("edit-artist", song.artist);
  setInput("edit-year", String(song.year));

  getElement("edit-form").style.display = "flex";
  getElement("edit-title").focus();
}

async function onAddSong(): Promise<void> {
  const newSong: Song = {
    title: getInput("title"),
    artist: getInput("artist"),
    year: Number(getInput("year")),
  };

  //await addSong(newSong);
  onCancelAdd();
  await loadSongs();
}

async function onSaveEdit(): Promise<void> {
  const id: number = Number(getInput("edit-id"));
  const changes: Song = {
    title: getInput("edit-title"),
    artist: getInput("edit-artist"),
    year: Number(getInput("edit-year")),
  };

  //await updateSong(id, changes);
  getElement("edit-form").style.display = "none";
  await loadSongs();
}

function onCancelEdit(): void {
  getElement("edit-form").style.display = "none";
}

// ====================================================================
// 5. Boot – start the app
// ====================================================================
loadSongs();
