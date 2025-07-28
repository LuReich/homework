import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/todo.css';


// 이 파일은 input 창에 값을 입력 받고, 일괄 완료나 일괄 삭제 기능이 있는 곳 입니다.

function TodoCalculate({
    remainingCount,
    completedCount,
    completionRate,
    onAddTodo,
    onCompleteSelected,
    onDeleteSelected,
    disabled,
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
                {/* 입력 필드와 버튼들을 그룹화하여 수직으로 배치. */}
                <div>
                    <div className="todo-input-container mb-2">
                        <form onSubmit={handleAdd} className="d-flex">
                            <input
                                type="text"
                                className="form-control"
                                style={{ width: '500px', marginRight: '120px' }}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder='할 일 입력'
                            />
                            <button type="submit" className="btn btn-primary" disabled={disabled}>
                                추가
                            </button>
                        </form>
                    </div>
                    <div className="confirm-container text-end mt-5">
                        <button type="button" className="btn btn-success me-2" onClick={onCompleteSelected} disabled={disabled}>일괄 완료</button>
                        <button type="button" className="btn btn-danger" onClick={onDeleteSelected} disabled={disabled}>일괄 삭제</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TodoCalculate;