'use strict';

let todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed'),
    todoData = [],
    render = function () {
        todoList.innerHTML = '';
        todoCompleted.innerHTML = '';
        todoData.forEach(function (item) {
            const li = document.createElement('li');
            li.classList.add('todo-item');
            li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
                '<div class="todo-buttons">' +
                '<button class="todo-remove"></button>' +
                '<button class="todo-complete"></button>' +
                '</div>';
            if (item.completed) {
                todoCompleted.append(li);
            } else {
                todoList.append(li);
            }

            li.querySelector('.todo-remove').addEventListener('click', function () {
                li.remove();
                for (let i = 0; i < todoData.length; i++) {
                    if (todoData[i] === item) {
                        todoData.splice(i, 1);
                    }
                }
                localStorage.removeItem('toDo', JSON.stringify(todoData));
            });

            li.querySelector('.todo-complete').addEventListener('click', function () {
                item.completed = !item.completed;
                localStorage.setItem('toDo', JSON.stringify(todoData));
                render();
            });
        });
    },

    validation = function () {
        if (headerInput.value === '') {
            return false;
        } else {
            return true;
        }
    };

if (localStorage.getItem('toDo')) {
    todoData = JSON.parse(localStorage.getItem('toDo'));
    render();
}

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();

    if (validation() === true) {
        const newToDo = {
            text: headerInput.value,
            completed: false,
        };
        todoData.push(newToDo);
        localStorage.setItem('toDo', JSON.stringify(todoData));
        render();
    }
    headerInput.value = '';
});