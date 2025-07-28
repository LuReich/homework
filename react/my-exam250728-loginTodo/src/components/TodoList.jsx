import React from 'react';
import TodoListItem from './TodoListItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/todoList.css'; // 이 파일도 여전히 필요함
import 'simplebar-react/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';

// 이 파일은 테이블로 보여주는 영역 입니다.
function TodoList({ todos, onToggleCheck, onCompleteTodo, onDeleteTodo, disabled }) {
    return (

        <div className="todo-list-container">
            {todos.map(todo => (
                <TodoListItem
                    key={todo.id}
                    todo={todo}
                    onToggleCheck={onToggleCheck}
                    onCompleteTodo={onCompleteTodo}
                    onDeleteTodo={onDeleteTodo}
                    disabled={disabled}
                />
            ))}
        </div >
    );
}

export default TodoList;