import React, { useState, useMemo, useEffect } from 'react';
import TodoList from '../components/TodoList';
import '../assets/css/todo.css';
import TodoCalculate from '../components/TodoCalculate';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../components/Login'; // Login 컴포넌트 import
import TodoListHeader from '../components/TodoListHeader';

// 초기 사용자 데이터
const initialUsers = [
  { id: 0, name: '' },
  { id: 1, name: '철수' },
  { id: 2, name: '영희' },
  { id: 3, name: '기존유저' },
];

function TodoListLayout() {
  const [users, setUsers] = useState(initialUsers);
  // 런타임에만 존재하는 로그인 상태
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(users[0]?.id || null);

  // 모든 사용자의 할 일 목록을 런타임에만 저장하는 상태
  const [allUserTodos, setAllUserTodos] = useState({});

  // 현재 로그인한 사용자의 할 일 목록을 파생 상태로 관리
  const todos = useMemo(() => {
    if (!loggedInUser) return [];
    return allUserTodos[loggedInUser] || [];
  }, [loggedInUser, allUserTodos]);

  // 할 일이 없을 때 '전체 선택' 체크박스의 상태를 관리하기 위한 state
  const [isAllCheckedWhenEmpty, setIsAllCheckedWhenEmpty] = useState(false);

  // 현재 로그인한 사용자의 todos 배열을 업데이트하는 헬퍼 함수
  const updateCurrentUserTodos = (updater) => {
    if (!loggedInUser) return;
    setAllUserTodos(prevAllTodos => {
      const currentUserTodos = prevAllTodos[loggedInUser] || [];
      return {
        ...prevAllTodos,
        [loggedInUser]: updater(currentUserTodos),
      };
    });
  };

  // 할 일 추가
  const addTodo = (text) => {
    const newTodo = {
      // Date.now() 는 현재 시간을 기준으로 밀리초 단위 까지 가져와 id 값으로 설정
      id: Date.now(),
      text: text,
      isCompleted: false,
      isChecked: false,
    };
    updateCurrentUserTodos(prevTodos => [...prevTodos, newTodo]);
  };

  // 로그인 처리
  const handleLogin = () => {
    // selectedUser가 0 (공란 유저)이면 falsy 값으로 취급됩니다.
    if (selectedUser) {
      setLoggedInUser(selectedUser);
    } else {
      alert('로그인할 유저를 선택해주세요.');
    }
  };

  // 로그아웃 처리
  const handleLogout = () => {
    setLoggedInUser(null);
    setSelectedUser(0); // 로그아웃 시 select를 공란 유저로 초기화합니다.
  };

  // 할 일 삭제 (단일)
  // 언체크 한 요소의 id 값과 불일치 하는 것들만 배열에 남긴다.
  const deleteTodo = (id) => {
    if (confirm('정말로 이 항목을 삭제하시겠습니까?')) {
      updateCurrentUserTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    }
  };

  // id 값이 일치하는 것만 완료 시킨다.
  const completeTodo = (id) => {
    updateCurrentUserTodos(prevTodos =>
      prevTodos.map(todo => // 완료 처리 시 isCompleted를 true로, isChecked를 false로 변경하여 체크를 해제합니다.
        todo.id === id ? { ...todo, isCompleted: true, isChecked: false } : todo
      ) 
    );
  };

  // 체크박스 토글 (단일)
  const toggleCheck = (id) => {
    updateCurrentUserTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo
      )
    );
  };

  // 전체 선택/해제
  const checkAll = (isChecked) => {
    updateCurrentUserTodos(prevTodos =>
      prevTodos.map(todo => ({ ...todo, isChecked: isChecked }))
    );
    // 할 일이 없을 때 '전체 선택' 체크박스의 상태를 관리
    if (todos.length === 0) {
      setIsAllCheckedWhenEmpty(isChecked);
    }
  };

  // 선택 항목 일괄 완료
  const completeSelected = () => {
    updateCurrentUserTodos(prevTodos =>
      prevTodos.map(todo => // 선택된 항목들을 완료 처리하고, isChecked를 false로 변경하여 체크를 해제합니다.
        todo.isChecked ? { ...todo, isCompleted: true, isChecked: false } : todo
      ) 
    );
  };

  // 선택 항목 일괄 삭제
  const deleteSelected = () => {
    // 삭제할 항목이 선택되었는지 확인합니다.
    const isAnyTodoChecked = todos.some(todo => todo.isChecked);
    if (!isAnyTodoChecked) {
      alert('삭제할 항목을 선택해주세요.');
      return;
    }
    if (confirm('선택된 항목들을 정말로 삭제하시겠습니까?')) {
      updateCurrentUserTodos(prevTodos => prevTodos.filter(todo => !todo.isChecked));
    }
  };

  // 통계 계산, useMemo로 값만 가져오기
  // 남은 일 개수, 한 일, 달성률
  const { remainingCount, completedCount, completionRate } = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.isCompleted).length;
    const remaining = total - completed;
    const rate = total === 0 ? 0 : ((completed / total) * 100).toFixed(2);
    return { remainingCount: remaining, completedCount: completed, completionRate: rate };
  }, [todos]);

  // 전체 선택 체크박스 상태 계산
  const isAllChecked = useMemo(() => {
    if (todos.length === 0) {
      return isAllCheckedWhenEmpty;
    }
    // 할일이 하나라도 있고, 모든 할일이 체크되었는지 여부를 반환
    return todos.every(todo => todo.isChecked);
  }, [todos, isAllCheckedWhenEmpty]);

  // '전체 선택' 체크박스는 로그인 시 항상 활성화 상태로 둔다.
  const isCheckAllDisabled = !loggedInUser;

  return (
    <>
      {/* width를 지정하고 margin: '0 auto'를 사용하여 페이지 중앙에 위치 */}
      <div style={{ width: '1200px', margin: '0 auto' }}>
        <main className="pt-4">
          <section className="contents mt-4">
            <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Todo List</h2>
            <div className="d-flex justify-content-end my-3">
              <Login
                users={users}
                selectedUser={selectedUser}
                onSelectUser={setSelectedUser}
                onLogin={handleLogin}
                onLogout={handleLogout}
                loggedInUser={loggedInUser}
              />
            </div>
            {/* 스크롤 시 상단에 고정될 제어 영역 */}
            <div className="sticky-top bg-white pt-3" style={{ zIndex: 10 }}>
              <TodoCalculate
                remainingCount={remainingCount}
                completedCount={completedCount}
                completionRate={completionRate}
                onAddTodo={addTodo}
                onCompleteSelected={completeSelected}
                onDeleteSelected={deleteSelected}
                disabled={!loggedInUser}
              />
            </div>
            {/* 할 일 목록과 헤더를 포함하는 컨테이너 */}




            {/* TodoListHeader 주석 처리 시, 레이아웃 영향 덜가도록 함. */}
            <TodoListHeader
                onCheckAll={checkAll}
                isAllChecked={isAllChecked}
                isCheckAllDisabled={isCheckAllDisabled}
              />





            {/* TodoList를 감싸는 div에 스타일을 적용하여 스크롤 및 디자인을 개선합니다. */}
            <div style={{
              backgroundColor: '#f2f2f2', // 연한 회색 배경
              borderRadius: '8px',       // 둥근 모서리
              padding: '16px',           // 내부 여백
              height: '350px',           
              overflowY: 'auto',         // 내용이 div 영역을 넘어가면 스크롤바를 표시합니다.
              margin: '10px 20px',
            }}>
              <TodoList
                todos={todos}
                onToggleCheck={toggleCheck}
                onCompleteTodo={completeTodo}
                onDeleteTodo={deleteTodo}
                disabled={!loggedInUser}
              />
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default TodoListLayout;
