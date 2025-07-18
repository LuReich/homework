import React from 'react';
import TodoListItem from './TodoListItem';
import '../assets/css/todo.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// 이 파일은 테이블로 보여주는 영역 입니다.
function TodoList({ todos, onToggleCheck, onToggleComplete, onDeleteTodo, onCheckAll, isAllChecked, isCheckAllDisabled }) {
    return (
        <div className="todo-list-container">
            <div className="todo-list">
                <table className="table table-hover mb-0">
                    <colgroup>
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '50%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '20%' }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th className="text-center">
                                <input
                                    type="checkbox"
                                    id="chkAll"
                                    onChange={(e) => onCheckAll(e.target.checked)}
                                    checked={isAllChecked}
                                    disabled={isCheckAllDisabled}
                                />
                            </th>
                            <th>할 일</th>
                            <th className="text-center">확인</th>
                            <th className="text-center">삭제</th>
                        </tr>
                    </thead>
                    <tbody id="todoBody">
                        {(
                            todos.map(todo => (
                                <TodoListItem
                                    key={todo.id}
                                    todo={todo}
                                    onToggleCheck={onToggleCheck}
                                    onToggleComplete={onToggleComplete}
                                    onDeleteTodo={onDeleteTodo}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TodoList;
