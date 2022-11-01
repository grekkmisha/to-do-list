'use strict';

const todoControl = document.querySelector('.todo-control'),
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

            li.querySelector('.todo-complete').addEventListener('click', function () {
                item.completed = !item.completed;
                render();
            });
        });
    };

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();

    const newToDo = {
        text: headerInput.value,
        completed: false
    };
    todoData.push(newToDo);
    headerInput.value = '';
    render();
});