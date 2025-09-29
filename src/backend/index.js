const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json())

const http = require('http');
const fs = require('fs');
const path = require('path');

// const todos = require('./todos');
const TODO_FILE = path.join(__dirname, 'todos.txt');


function writeTodosToFile(todos) {
    try {
        fs.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2));
        return true;
    } catch (error) {
        console.error('Ошибка при записи файла:', error);
        return false;
    }
}

const readFile = () => {
    const data = fs.readFileSync(TODO_FILE, 'utf8');
    return JSON.parse(data);
}

app.get('/todos', (req, res) => {
    // Получаем весь список дел из файла
    const todos = readFile();
    res.send({ ok: true, data: todos });
});

app.post('/todos', (req, res) => {
    // Создаём новое дело, формат: {id:number, title:string}
    const newTodo = req.body;
    const todos = readFile();
    todos.push({ id: todos.length + 1, title: newTodo.title });
    writeTodosToFile(todos);

    res.send({ ok: true, data: todos })
})

app.patch('/todos', (req, res) => {
    // Обновляем задачу формат: {id:number, title:string}
    const editTodo = req.body;
    const todos = readFile();
    const newTodos = todos.map((todo) => (todo.id === editTodo.id) ? { ...todo, title: editTodo.title, done: editTodo?.done } : todo)
    writeTodosToFile(newTodos);
    res.send({ ok: true, data: newTodos })
})

app.delete('/todos/:id', (req, res) => {
    // Обновляем задачу формат: /todos/3 - id статьи
    const deleteTodoId = req.params.id;
    const todos = readFile();
    const newTodos = todos.filter((todo)=>todo.id != deleteTodoId);
    writeTodosToFile(newTodos);
    res.send({ ok: true, data: newTodos })
})

app.listen(3001)





