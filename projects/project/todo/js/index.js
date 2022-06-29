let mainContainer = document.querySelector('.container');
let pendingToDoBtn = document.querySelector('.pending');
let completedToDoBtn = document.querySelector('.completed');
let toDoInput = document.querySelector('.todo-input');
let addBtn = document.querySelector('.add-btn');
let form = document.querySelector('.form');
let alert = document.querySelector('.alert');
let confirm = document.querySelector('.confirm');
let clearAll = document.querySelector('.clear');
let confirmationBtns = document.querySelectorAll('.btn22');

let id = 0;
let idArr = [];
let editing = false;

// Saving data to local storage
let saveData = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}


// getting data from local storage
let getData = () => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach((todo) => {
        // create list from comming data
        creatList(todo);

        // Checked items in localStorage
        setTimeout(() => {
            let storedTodoIds = JSON.parse(localStorage.getItem("todo-ids"));
            if (localStorage.getItem("todo-ids") !== null) {
                storedTodoIds.forEach((currId) => {
                    let checkedTodo = document.getElementById(currId);
                    if (checkedTodo !== null) {
                        checkedTodo.classList.replace("no-check", "checked");
                        checkedTodo.classList.add("hide");
                        checkedTodo.children[0].classList.add("checked-box");
                        checkedTodo.children[1].classList.add("check");
                        checkedTodo.children[1].children[0].style.display = "none";
                        checkedTodo.children[1].children[1].style.display = "block";
                    }

                });
            } else {
                let todoIds = [];
                localStorage.setItem("todo-ids", JSON.stringify(todoIds));
            }
        }, 0);
    });

}


// Create Todos List
function creatList(val) {
    ++id;
    // Creating new todo element
    let toDoOutput = document.createElement('div');
    toDoOutput.classList.add("to_do-inputs", "no-check");
    toDoOutput.id = `id-${id}`;

    let htmlData = `
        <input class="input-box" type="text" readonly>
        <label class="checkbox-lable">
        <span class="check-sign2"><i class="fa fa-check"></i></span>
        <span class="check-sign"><i class="fa fa-check-double"></i></span>
        </label>
        <button class="delete"><i class="fa fa-trash-alt"></i></button>
        <button class="edit"><i class="fa fa-edit"></i></button>
        <br> <br> <br> `;

    toDoOutput.insertAdjacentHTML("beforeend", htmlData);
    // References
    let deleteBtn = toDoOutput.querySelector('.delete');
    let editBtn = toDoOutput.querySelector('.edit');
    let outputBox = toDoOutput.querySelector(".input-box");
    let checkBox = toDoOutput.querySelector(".checkbox-lable");
    let checkSign = toDoOutput.querySelector(".check-sign");
    let checkSign2 = toDoOutput.querySelector(".check-sign2");

    // Adding Check Sign

    checkBox.addEventListener('click', () => {
        // Move unchecked todo to pending task
        setTimeout(() => {
            checkPending();
            setTimeout(() => {
                checkForChecked();
                checkPendLeng();
            }, 0);
            completedToDoBtn.classList.remove('active');
            pendingToDoBtn.classList.add('active');
        }, 500);

        // Adding Check Sign
        checkBox.classList.toggle('check');
        outputBox.classList.toggle('checked-box');

        if (checkBox.classList.contains('check')) {
            setTimeout(() => {
                toDoOutput.classList.replace('no-check', 'checked');
                toDoOutput.classList.add('hide');

            }, 500);

            checkSign.style.display = "block";
            checkSign2.style.display = "none";
            displayAlert("Todo Compeleted", "success");

        } else {
            setTimeout(() => {
                toDoOutput.classList.replace('checked', 'no-check');
                toDoOutput.classList.remove('hide');
            }, 500);

            checkSign.style.display = "none";
            checkSign2.style.display = "block";
            displayAlert("Todo Again in Pending", "danger");
        }
    });

    // Delete Button
    deleteBtn.addEventListener("click", () => {
        toDoOutput.classList.add('fall');

        toDoOutput.addEventListener("transitionend", () => {
            removeTodo();
            setTimeout(() => {
                checkForChecked();
                checkPendLeng();
                displayAlert("Todo Is Deleted", "danger");
            }, 0);
            toDoOutput.remove();
        });
    });

    editBtn.addEventListener('click', editTodo);

    outputBox.value = val;

    // Adding todo to body
    mainContainer.appendChild(toDoOutput);

}

// Check for checked or not from local storage
function checkForChecked() {
    let todoIds = [];
    let checkedTodos = document.querySelectorAll(".checked");
    if (checkedTodos.length == 0) {
        localStorage.removeItem("todo-ids");
    } else {
        checkedTodos.forEach((currTodo) => {
            if (!todoIds.includes(currTodo.id)) {
                todoIds.push(currTodo.id);
                localStorage.setItem("todo-ids", JSON.stringify(todoIds));
            }
        });
    }
}

// Remove todo when press delete btn
function removeTodo() {
    let todoElm = document.querySelectorAll(".to_do-inputs");
    let todos = [];

    if (todoElm.length !== 0) {
        todoElm.forEach((currElm) => {
            let value = currElm.children[0].value;
            todos.push(value);
            localStorage.setItem('todos', JSON.stringify(todos));
        })
    } else {
        localStorage.removeItem("todos");
    }

}

// Editing todo when press edit btn
function editTodo() {
    let todoID = this.parentElement.id;
    idArr = [];
    idArr.push(todoID);
    let outputBox = document.getElementById(todoID).children[0];
    toDoInput.value = outputBox.value;
    addBtn.value = "Edit";
    editing = true;
}

// Checking For Compeleted todo
function checkComplete() {
    let toDoOutput = document.querySelectorAll('.to_do-inputs');
    let pendingToDo = document.querySelectorAll('.no-check');
    let completedToDo = document.querySelectorAll('.checked');

    toDoOutput.forEach((elm) => {
        if (elm.classList.contains('checked')) {
            completedToDo.forEach((todo) => {
                todo.classList.remove('hide');
            });

            pendingToDo.forEach((todo) => {
                todo.classList.add('hide');
            });
        }

        pendingToDo.forEach((todo) => {
            todo.classList.add('hide');
        });
    });
}

// Checking For Pending todo
function checkPending() {
    let toDoOutput = document.querySelectorAll('.to_do-inputs');
    let pendingToDo = document.querySelectorAll('.no-check');
    let completedToDo = document.querySelectorAll('.checked');
    if (pendingToDo.length !== 0) {
        toDoOutput.forEach((elm) => {
            if (elm.classList.contains('no-check')) {
                completedToDo.forEach((todo) => {
                    todo.classList.add('hide');
                });

                pendingToDo.forEach((todo) => {
                    todo.classList.remove('hide');
                });
            }
        });
    } else {
        completedToDo.forEach((todo) => {
            todo.classList.add('hide');
        });
    }

}

// Make An Alert
function displayAlert(msg, action) {
    alert.innerText = msg;
    alert.classList.remove('hide');
    alert.classList.add(`alert-${action}`);
    setTimeout(() => {
        alert.classList.add('hide');
    }, 2500);
}

// Adding pendings value in title
function checkPendLeng() {
    let pending = document.querySelectorAll('.no-check');
    document.title = "";
    document.title = `To Do List (${pending.length})`;

}

// Compeleted todo
completedToDoBtn.addEventListener('click', () => {
    checkComplete();
    completedToDoBtn.classList.add('active');
    pendingToDoBtn.classList.remove('active');
});

// Pending todo
pendingToDoBtn.addEventListener('click', () => {
    checkPending();
    completedToDoBtn.classList.remove('active');
    pendingToDoBtn.classList.add('active');

});

// When any value is added
form.addEventListener('submit', (e) => {
    // Prevent from submitting
    e.preventDefault();
    // increament id every time new value added
    id++;

    // Check for pending
    checkPending();

    // If input box is not empty
    if (toDoInput.value !== '' && editing !== true) {
        // Creating list of input data
        creatList(toDoInput.value);

        // Adding Input value to local storage
        saveData(toDoInput.value);

        // Displaying alert
        displayAlert("Todo Added Successfully", "success");
        setTimeout(() => {
            checkPendLeng();
        }, 0);
        toDoInput.value = '';
    } else if (toDoInput.value !== '' && editing === true) {
        // Displaying alert and editing
        document.getElementById(idArr[0]).children[0].value = toDoInput.value;
        toDoInput.value = "";
        addBtn.value = "Add";
        editing = false;
        displayAlert("Todo Edited Successfully", "success");
        removeTodo();
    } else {
        displayAlert("Please Enter Some Value...", "danger");
    }

});

// When clear btn is presses
clearAll.addEventListener('click', () => confirm.classList.add('active'));

// Choose weather delete or not
confirmationBtns.forEach((currBtn) => {
    currBtn.addEventListener('click', () => {
        if (currBtn.classList.contains('btnConfirm')) {
            let allTodos = document.querySelectorAll('.to_do-inputs');
            if (allTodos.length !== 0) {
                allTodos.forEach((currTodo) => {
                    currTodo.remove();
                    removeTodo();
                    localStorage.removeItem("todo-ids");
                    checkPendLeng();
                    displayAlert("All Todos Are Deleted", "danger");
                });
            }
            confirm.classList.remove('active');
        } else {
            confirm.classList.remove('active');
        }
    });
})

// Check for pendings and update title status
setTimeout(() => {
    checkPendLeng();
}, 1000);

// When document get loads fetch data from localStorage
document.addEventListener("load", getData());