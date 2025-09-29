import React, { useState } from 'react';

export const Options = (props) => {
    const { addNewTodo } = props;
    const [newTodoDesc, setNewTodoDesc] = useState("");

    return (
        <div>
            <input type="text" name="newTodo" value={newTodoDesc} onChange={(e) => { setNewTodoDesc(e.target.value) }} />
            <button type="button" title="Добавить" onClick={() => addNewTodo(newTodoDesc)} > Добавить </button>
        </div>
    )
}