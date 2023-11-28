document.addEventListener('DOMContentLoaded', function() {
    // Load existing todos from localStorage when the app starts
    loadTodos();

    // Add a new todo when the 'Save' button is clicked
    document.getElementById('saveButton').addEventListener('click', function() {
        var userInput = document.getElementById('userInput').value;
        if (userInput.trim() !== '') {
            addTodo(userInput);
            document.getElementById('userInput').value = '';
            saveTodos(); // Save the updated list to localStorage
        }
    });
});

function addTodo(userInput) {
    var li = document.createElement('li');

    // Create and add the checkbox to the list item
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function() {
        // When the todo is checked/unchecked, save the updated list
        saveTodos();
    });

    // Create and add the delete button to the list item
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        li.remove(); // Remove the todo item from the DOM
        saveTodos(); // Save the updated list to localStorage
    });

    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(userInput));
    li.appendChild(deleteButton);

    document.getElementById('list').appendChild(li);
}

function saveTodos() {
    var todos = [];
    document.querySelectorAll('#list li').forEach(function(li) {
        todos.push({
            text: li.textContent.replace('Delete', '').trim(), // Assuming 'Delete' is the text of your delete button
            completed: li.querySelector('input[type=checkbox]').checked
        });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    var todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(function(todo) {
        var li = document.createElement('li');

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', function() {
            saveTodos();
        });

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            li.remove();
            saveTodos();
        });

        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(todo.text));
        li.appendChild(deleteButton);

        if (todo.completed) {
            li.classList.add('completed'); // You can define this class in your CSS to style completed tasks
        }

        document.getElementById('list').appendChild(li);
    });
}


