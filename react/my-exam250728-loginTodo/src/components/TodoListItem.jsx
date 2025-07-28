import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// 이 파일은 todolist 에 들어갈 항목들 즉 테이블 안의 리스트 아이템들 입니다.
function TodoListItem({ todo, onToggleCheck, onCompleteTodo, onDeleteTodo, disabled }) {
    const itemClasses = [
        'd-flex',
        'align-items-center',
        'p-3', // p-2에서 p-3으로 변경하여 세로 높이를 키우기.
        'mb-3', // mb-2에서 mb-3로 변경하여 아이템 간의 세로 간격 늘리기.
        'rounded',
        'shadow-sm'
    ];

    if (todo.isCompleted) {
        // 완료된 항목에 취소선, 회색 배경, 흐린 텍스트 스타일을 적용.
        itemClasses.push('text-decoration-line-through', 'bg-light', 'text-muted');
    } else {
        // 완료되지 않은 항목은 흰색 배경을 유지.
        itemClasses.push('bg-white');
    }

    return (
        <div className={itemClasses.join(' ')}>
            <div style={{ width: '10%' }} className="text-center">
                <input
                    type="checkbox"
                    name="todoChk"
                    checked={todo.isChecked}
                    onChange={() => onToggleCheck(todo.id)}
                    disabled={disabled}
                />
            </div>
            <div style={{ width: '70%' }}>{todo.text}</div>
            <div style={{ width: '10%' }} className="text-center">
                <button
                    className="btn btn-sm btn-primary"
                    disabled={disabled || todo.isCompleted}
                    onClick={() => onCompleteTodo(todo.id)}
                >
                    완료
                </button>
            </div>
            <div style={{ width: '10%' }} className="text-center">
                <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDeleteTodo(todo.id)}
                    disabled={disabled}
                >
                    삭제
                </button>
            </div>
        </div>
    );
}

export default TodoListItem;
