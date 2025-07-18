import React, { useState, useMemo } from 'react';
import TodoList from '../components/TodoList';
import '../assets/css/Todo.css';
import TodoCalculate from '../components/TodoCalculate';
import 'bootstrap/dist/css/bootstrap.min.css';

// 넘기고 받아와야할 데이터 값들
// 체크, 완료 및 삭제, 통계

function TodoListLayout() {
  const [todos, setTodos] = useState([]);

  // 할 일 추가
  const addTodo = (text) => {
    const newTodo = {
      // Date.now() 는 현재 시간을 기준으로 밀리초 단위 까지 가져와 id 값으로 설정
      id: Date.now(),
      text: text,
      isCompleted: false,
      isChecked: false,
    };
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  // 할 일 삭제 (단일)
  // 언체크 한 요소의 id 값과 불일치 하는 것들만 배열에 남긴다.
  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  // id 값이 일치하는 것만 완료 시킨다.
  const toggleComplete = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: true, isChecked: false } : todo
      )
    );
  };

  // 체크박스 토글 (단일)
  const toggleCheck = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo
      )
    );
  };

  // 전체 선택/해제
  const checkAll = (isChecked) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        !todo.isCompleted ? { ...todo, isChecked: isChecked } : todo
      )
    );
  };

  // 선택 항목 일괄 완료
  const completeSelected = () => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.isChecked ? { ...todo, isCompleted: true, isChecked: false } : todo
      )
    );
  };

  // 선택 항목 일괄 삭제
  const deleteSelected = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.isChecked));
  };

  // 통계 계산, useMemo로 값만 가져오기
  // 남은 일 개수, 한 일, 달성률
  const { remainingCount, completedCount, completionRate } = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.isCompleted).length;
    const remaining = total - completed;
    const rate = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { remainingCount: remaining, completedCount: completed, completionRate: rate };
  }, [todos]);

  // 전체 선택 체크박스 상태 계산
  const { isAllChecked, isCheckAllDisabled } = useMemo(() => {
    const activeTodos = todos.filter(todo => !todo.isCompleted);
    const isCheckAllDisabled = activeTodos.length === 0;
    const isAllChecked = !isCheckAllDisabled && activeTodos.every(todo => todo.isChecked);
    return { isAllChecked, isCheckAllDisabled };
  }, [todos]);

  return (
    <main className="container pt-4">
      <section className="contents mt-4">
        <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Todo List</h2>
        <TodoCalculate
          remainingCount={remainingCount}
          completedCount={completedCount}
          completionRate={completionRate}
          onAddTodo={addTodo}
          onCompleteSelected={completeSelected}
          onDeleteSelected={deleteSelected}
        />
        <TodoList
          todos={todos}
          onToggleCheck={toggleCheck}
          onToggleComplete={toggleComplete}
          onDeleteTodo={deleteTodo}
          onCheckAll={checkAll}
          isAllChecked={isAllChecked}
          isCheckAllDisabled={isCheckAllDisabled}
        />
      </section>
    </main>
  );
}

export default TodoListLayout;
