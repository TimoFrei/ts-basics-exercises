# 🎵 TypeScript Basics Workshop – Music Viewer

Welcome! In this workshop you'll build a **Music Viewer** web app using TypeScript.  
The backend server is already complete — your job is to write the TypeScript client, the HTML forms, and the styles.

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Build TypeScript + SCSS  (run this after every change)
npm run build

# 3. Start the server
npm start

# 4. Open http://localhost:3000 in your browser
```

> **Tip:** Run `npm run dev` to build AND start in one command.

---

## Project structure

```
├── server.js              ← Backend (complete – don't touch)
├── data/songs.json        ← Song data stored on disk
├── src/
│   ├── interfaces.ts      ← Exercise 1: define the Song interface
│   ├── app.ts             ← Exercises 2, 3, 5, 7: TypeScript logic
│   └── styles.scss        ← Exercise 8: styling
├── public/
│   ├── index.html         ← Exercises 4, 6: HTML forms
│   ├── app.js             ← ⚠️ Generated – do not edit directly
│   └── styles.css         ← ⚠️ Generated – do not edit directly
├── tsconfig.json          ← TypeScript config
└── package.json           ← Scripts & dependencies
```

> Files in `public/` (except `index.html`) are **generated** by `npm run build`.  
> Always edit the files inside `src/`, then rebuild.

---

## API Reference

The server exposes these endpoints (all accept/return JSON):

| Method   | URL          | Description             | Request body                    |
| -------- | ------------ | ----------------------- | ------------------------------- |
| `GET`    | `/songs`     | Get all songs           | –                               |
| `POST`   | `/songs`     | Add a new song          | `{ "title", "artist", "year" }` |
| `PUT`    | `/songs/:id` | Update an existing song | `{ "title", "artist", "year" }` |
| `DELETE` | `/songs/:id` | Delete a song           | –                               |

---

## Exercises

Work through these in order. **Run `npm run build` after each exercise** to compile and test your changes.

---

### Exercise 1 – Define the Song interface

📄 **File:** `src/interfaces.ts`

Create a TypeScript `interface` called `Song` with these properties:

| Property | Type     | Required? |
| -------- | -------- | --------- |
| `id`     | `number` | Optional  |
| `title`  | `string` | Yes       |
| `artist` | `string` | Yes       |
| `year`   | `number` | Yes       |

---

### Exercise 2 – Fetch songs from the server (GET)

📄 **File:** `src/app.ts` → look for **EXERCISE 2**

Write an `async` function called `getSongs` that:

1. Calls `fetch("/songs")` and stores the response
2. Parses it with `response.json()`
3. Returns the result typed as `Song[]`
4. Has the return type `Promise<Song[]>`

> 📖 Study the `deleteSong()` function already in the file for reference!

**✅ Test:** After this exercise + build, the song list should load on the page.

---

### Exercise 3 – Render the song list

📄 **File:** `src/app.ts` → look for **EXERCISE 3**

Write a function `renderSongs(songs: Song[]): void` that:

1. Gets the `<ul>` element: `getElement<HTMLUListElement>("song-list")`
2. Clears it: `list.innerHTML = ""`
3. Loops through `songs` with `.forEach()`
4. For each song, creates an `<li>` and sets its `innerHTML` (template provided in the comment)
5. Appends the `<li>` to the list

**✅ Test:** You should now see the 4 songs listed. Delete buttons should already work!

---

### Exercise 4 – Add the "Add Song" form (HTML)

📄 **File:** `public/index.html` → look for **EXERCISE 4**

Add the HTML for the add-song UI. You need:

1. A `<button>` with `id="btn-show-add"` and `onclick="onShowAddForm()"` — text: `+ Add Song`
2. A `<div id="add-form">` with:
   - `<h2>Add Song</h2>`
   - Three `<input>` fields (`id="title"`, `id="artist"`, `id="year"`)
   - Two buttons in a `<div class="form-row">`: one calls `onAddSong()`, the other `onCancelAdd()`

---

### Exercise 5 – Add a new song (POST)

📄 **File:** `src/app.ts` → look for **EXERCISE 5**

Write an `async` function `addSong(song: Song): Promise<Song>` that:

1. Calls `fetch("/songs", { ... })` with method `"POST"`
2. Sets headers: `{ "Content-Type": "application/json" }`
3. Sets body: `JSON.stringify(song)`
4. Parses and returns the response as `Song`

**✅ Test:** The "+ Add Song" button should open a form. Add a song and see it appear!

---

### Exercise 6 – Add the "Edit Song" form (HTML)

📄 **File:** `public/index.html` → look for **EXERCISE 6**

Add the HTML for the edit form. You need a `<div id="edit-form">` with:

- `<h2>Edit Song</h2>`
- A **hidden** input: `<input id="edit-id" type="hidden" />`
- Three inputs: `id="edit-title"`, `id="edit-artist"`, `id="edit-year"`
- Two buttons: `onSaveEdit()` ("Save Changes") and `onCancelEdit()` ("Cancel")

---

### Exercise 7 – Update a song (PUT)

📄 **File:** `src/app.ts` → look for **EXERCISE 7**

Write `updateSong(id: number, changes: Song): Promise<Song>` — just like `addSong` but:

- Method: `"PUT"`
- URL: `` `/songs/${id}` ``

**✅ Test:** Click "Edit" on a song, change the title, save → the list should update!

---

### Exercise 8 – Style the app (SCSS)

📄 **File:** `src/styles.scss`

Make it look good! Some ideas:

- **`main`**: white card with rounded corners and a shadow
- **`#song-list li`**: flex row, gap between text and buttons
- **Buttons**: rounded, colored borders (blue for edit, red for delete)
- **Inputs**: padding, border-radius, focus outline
- **`#add-form` / `#edit-form`**: hidden by default (`display: none`), distinct background colors

> 💡 SCSS lets you **nest** selectors — try it!

---

## 🎉 Done!

Once all exercises are complete, you have a fully working Music Viewer app.  
Compare your solution with the `workshop-ts-basics` folder to see the reference implementation.
