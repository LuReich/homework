import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// 이 파일은 todolist 에 들어갈 항목들 즉 테이블 안의 리스트 아이템들 입니다.
function TodoListItem({ todo, onToggleCheck, onToggleComplete, onDeleteTodo }) {
    return (
        <tr className={todo.isCompleted ? 'completed' : ''}>
            <td className="text-center">
                <input
                    type="checkbox"
                    name="todoChk"
                    checked={todo.isChecked}
                    disabled={todo.isCompleted}
                    onChange={() => onToggleCheck(todo.id)}
                />
            </td>
            <td>{todo.text}</td>
            <td className="text-center">
                <button
                    className="btn btn-sm btn-primary"
                    disabled={todo.isCompleted}
                    onClick={() => onToggleComplete(todo.id)}
                >
                    완료
                </button>
            </td>
            <td className="text-center">
                <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDeleteTodo(todo.id)}
                >
                    삭제
                </button>
            </td>
        </tr>
    );
}

export default TodoListItem;

