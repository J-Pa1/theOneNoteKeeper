// this class is structure for every single note
class Note {
    constructor(){
        this.CreatedOn = new Date().toDateString();
        this.Id = 0;
        this.Title = '';
        this.NoteDesc = '';
    }
}

// this method takes the list of all existing notes and returns unique id (largest existing id +1)
function generateId(Notes){
    max = 0
    Notes.forEach(note =>{
        if(note.Id > max){
            max=note.Id
        }
    })
    return max+1
}

// this method takes id and returns the note which contains the exact same id
function getNoteById(id){
    let Notes = getAllNotes()
    return Notes.find(note => note.Id == id)
}

// this method returns list of all notes present from local storage
function getAllNotes(){
    let Notes = JSON.parse(localStorage.getItem('Notes'))
    return Notes == null ? [] : Notes
}

// this method updates the value of list of notes in local storage
function updateNotesInLocalStorage(Notes){
    localStorage.setItem('Notes',JSON.stringify(Notes))
}

// this method creates a new note
function addNote(){
    let newNote = new Note();
    newNote.Title = document.getElementById('title').value.trim()
    newNote.NoteDesc = document.getElementById('note').value.trim()
    if(newNote.Title == ''){
        alert('Note title cannot be empty')
    }
    else{
           let Notes = getAllNotes()
           newNote.Id = generateId(Notes)
           Notes.push(newNote)
           updateNotesInLocalStorage(Notes)
           displayNotes()
           document.getElementById('title').value = ''
           document.getElementById('note').value = ''
    }
}

// this method updates the existing note
function updateNote(id){
    let newTitle = document.getElementById('edit-title-'+id).value.trim()
    let newNote = document.getElementById('edit-note-'+id).value.trim()
    if(newTitle == ''){
        alert('Note title cannot be empty')
    }
    else{
        let Notes = getAllNotes()
        Notes.forEach(note => {
            if(note.Id == id){
                note.Title = newTitle
                note.NoteDesc = newNote
            }
        })
        updateNotesInLocalStorage(Notes)
        displayNotes()
    }

}

// this method changes the ui to enable the user to edit note
function editNote(id){
    let note = getNoteById(id)
    let noteCard = document.getElementById('note-'+id)
    noteCard.innerHTML = ''
    noteCard.innerHTML += `
        <input class="form-control" id="edit-title-${id}" value="${note.Title}" placeholder="title">
        <textarea class="form-control" id="edit-note-${id}" rows="3" placeholder="note<optional>">${note.NoteDesc}</textarea>
        <div>
            <a class="btn btn-primary" onclick="updateNote(${note.Id})">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
                <span>Update</span>
            </a>
            <a class="btn btn-danger" onclick="displayNotes()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-skip-backward" viewBox="0 0 16 16">
                    <path d="M.5 3.5A.5.5 0 0 1 1 4v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v2.94l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L8.5 8.752v2.94c0 .653-.713.998-1.233.696L1 8.752V12a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm7 1.133L1.696 8 7.5 11.367V4.633zm7.5 0L9.196 8 15 11.367V4.633z"/>
                </svg>
                <span>Back</span>
            </a>
        </div>
    `
}

// this method deletes an existing note
function deleteNote(id){
    let Notes = getAllNotes()
    let index = -1
    for(let i=0; i < Notes.length; i++){
        if(Notes[i].Id == id){
            index = i;
        }
    }
    if(index != -1){
        Notes.splice(index,1)
        updateNotesInLocalStorage(Notes)
        displayNotes()
    }
    else{
        alert('Note doesnt exist')
        displayNotes()
    }
}

// this method displays all the notes on browser
function displayNotes(){
    let notesContainer = document.getElementById('notes-container')
    notesContainer.innerHTML = ''
    Notes = getAllNotes()
    if(Notes.length == 0){
        notesContainer.innerHTML += 
        `
            <div class="card note-card">
                <h6>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-exclamation-octagon" viewBox="0 0 16 16">
                        <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z"/>
                        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                        </svg>
                    </span>
                    Oops! No notes to display</h6>
                <p>
                    Go to the Add New Note section to create a new note
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                        </svg>
                    </span>
                </p>
            </div>
        `
    }
    else{
        Notes.forEach(note => {
            notesContainer.innerHTML += 
            `
                <div class="card note-card" id="note-${note.Id}">
                    <h6 class="display-title">${note.Title}</h6>
                    <p class="display-note">${note.NoteDesc}</p>
                    <p class="display-date">${note.CreatedOn}
                    <div>
                        <a class="btn btn-primary" onclick="editNote(${note.Id})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                            <span>Edit</span>
                        </a>
                        <a class="btn btn-danger" onclick="deleteNote(${note.Id})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                            </svg>
                            <span>Remove</span>
                        </a>
                    </div>
                </div>
            `
        })
    }
}