import React from 'react';

const Login = ({ users, selectedUser, onSelectUser, onLogin, onLogout, loggedInUser }) => {
    const loggedInUserName = loggedInUser ? users.find(u => u.id === loggedInUser)?.name : '';

    return (
        // d-flex와 align-items-center를 사용하여 모든 요소를 한 줄에 정렬하고 수직 중앙 정렬합니다.
        <div className="d-flex align-items-center me-3">
            <select
                className="form-select"
                style={{ width: '120px' }} // select 박스에 고정 너비 부여
                value={selectedUser || ''}
                onChange={(e) => onSelectUser(Number(e.target.value))}
                disabled={!!loggedInUser}
            >
                {users.map(user => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>

            {loggedInUser ? (
                <>
                    <button onClick={onLogout} className="btn btn-danger ms-2" style={{ width: '90px' }}>로그아웃</button>
                    <span className="ms-3 fw-bold text-nowrap">{loggedInUserName}</span>
                </>
            ) : (
                <button onClick={onLogin} className="btn btn-success ms-2" style={{ width: '80px' }}>로그인</button>
            )}
        </div>
    );
};

export default Login;