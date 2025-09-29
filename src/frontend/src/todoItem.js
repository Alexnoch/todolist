import trash from './trash.png'

export const TodoItem = (props) => {
    const { id, title, deleteTodo, done, changeTodoDone } = props;
    return (
        <div className="todo__item">
            <input type="checkbox" id="scales" name="scales" checked={done} onClick={(e) => changeTodoDone({ id, title }, !done)} />
            <div>{title}</div>
            <img className="todo__item-delete-btn" src={trash} onClick={() => deleteTodo(id)} />
        </div>
    )
}