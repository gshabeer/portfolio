let addButton = document.querySelector('#add');


let updateData = () => {
    let textAreaData = document.querySelectorAll('textarea');
    let notes = [];
    textAreaData.forEach((note) => {
        return notes.push(note.value);
    });

    localStorage.setItem('notes', JSON.stringify(notes));
};


let addNote = (text = '') => {

    // Text Note

    let textNote = document.createElement('div');
    textNote.classList.add('note');

    let htmlData = `
        <div class = "operation">
        <button class = "edit"> <i class ="fas fa-edit"> </i></button>
        <button class = "delete"> <i class ="fas fa-trash-alt"> </i></button>
        </div>

        <div class = "main ${text ? "" : "hidden" } "> </div> 
        <textarea class="${text ? "hidden" : "" }"></textarea> `;

    textNote.insertAdjacentHTML('afterbegin', htmlData);


    // References
    let editButton = textNote.querySelector('.edit');
    let deleteButton = textNote.querySelector('.delete');
    let mainDiv = textNote.querySelector('.main');
    let textArea = textNote.querySelector('textarea');


    // Deleting Note
    deleteButton.addEventListener('click', () => {
        textNote.remove();
        updateData();
    });

    // Deleting Note


    textArea.value = text;
    mainDiv.innerHTML = text;

    // Editing Note

    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });

    textArea.addEventListener('change', (event) => {
        let value = event.target.value;
        mainDiv.innerHTML = value;

        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');

        updateData();
    });

    document.body.appendChild(textNote);
}


let notes = JSON.parse(localStorage.getItem('notes'));
if (notes) {
    notes.forEach((note) => addNote(note));
}


addButton.addEventListener('click', () => addNote());