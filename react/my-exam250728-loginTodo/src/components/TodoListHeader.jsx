import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Todo 리스트의 헤더 컴포넌트입니다.
 * Flexbox를 사용하여 TodoListItem과 정렬을 맞춥니다.
 */
function TodoListHeader({ onCheckAll, isAllChecked, isCheckAllDisabled }) {
    return (
        // d-flex와 align-items-center를 사용하여 TodoListItem과 동일한 레이아웃 구조를 가집니다.
        // border-bottom으로 헤더와 목록을 시각적으로 구분합니다.
        <div className="d-flex align-items-center p-2 mb-2 fw-bold border-bottom">
            <div style={{ width: '10%' }} className="text-center">
                <input
                    type="checkbox"
                    id="chkAll"
                    onChange={(e) => onCheckAll(e.target.checked)}
                    checked={isAllChecked}
                    disabled={isCheckAllDisabled}
                />
            </div>
            <div style={{ width: '50%' }}>할 일</div>
            <div style={{ width: '20%' }} className="text-center">확인</div>
            <div style={{ width: '20%' }} className="text-center">삭제</div>
        </div>
    );
}

export default TodoListHeader;