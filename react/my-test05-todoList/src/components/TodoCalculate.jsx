import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// 이 파일은 input 창에 값을 입력 받고, 일괄 완료나 일괄 삭제 기능이 있는 곳 입니다.

function TodoCalculate({
    remainingCount,
    completedCount,
    completionRate,
    onAddTodo,
    onCompleteSelected,
    onDeleteSelected,
}) {
    const [inputValue, setInputValue] = useState('');

    const handleAdd = (e) => {
        e.preventDefault();
        if (inputValue.trim().length === 0) {
            alert('등록할 일을 입력하십시오.');
        } else {
            onAddTodo(inputValue);
            // setInputValue('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAdd(e);
        }
    };

    return (
        <>
            {/* 통계 표시 영역 */}
            <div className="todo-stats">
                <div>남은 할 일: <span>{remainingCount}</span></div>
                <div>완료한 일: <span>{completedCount}</span></div>
                <div>달성률: <span>{completionRate}</span>%</div>
            </div>

            {/* 컨트롤 영역 */}
            <div className="control-container">
                <div className="todo-input-container">
                    <form onSubmit={handleAdd} className="d-flex">
                        <input
                            type="text"
                            className="form-control"
                            style={{ width: '250px', marginRight: '5px' }}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button type="submit" className="btn btn-primary">
                            추가
                        </button>
                    </form>
                </div>
                <div className="confirm-container">
                    <button type="button" className="btn btn-success me-2" onClick={onCompleteSelected}>일괄 완료</button>
                    <button type="button" className="btn btn-danger" onClick={onDeleteSelected}>일괄 삭제</button>
                </div>
            </div>
        </>
    );
}

export default TodoCalculate;