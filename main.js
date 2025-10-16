import './style.css';

const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
renderTodos();

addBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (text === '') return;

    todos.push({ text, completed: false });
    input.value = '';
    saveAndRender();
});

function renderTodos() {
    list.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        if (todo.completed) li.classList.add('completed');

        const span = document.createElement('span');
        span.textContent = todo.text;
        span.addEventListener('click', () => {
            todo.completed = !todo.completed;
            saveAndRender();
        });

        const delBtn = document.createElement('button');
        delBtn.textContent = 'حذف';
        delBtn.className = 'delete-btn';
        delBtn.addEventListener('click', () => {
            todos.splice(index, 1);
            saveAndRender();
        });

        li.appendChild(span);
        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

function saveAndRender() {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
}
