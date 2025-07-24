import React from 'react';

// 스타일 객체 선언
const styles = {
    select: { width: 'auto' },
    button: { marginLeft: '10px' },
};

function Login({ users, selectedUser, onSelectUser, onLogin }) {
    return (
        <div>
            <select className="form-select d-inline-block" style={styles.select} onChange={(e) => onSelectUser(Number(e.target.value))} value={selectedUser || ''}>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>
            <button onClick={onLogin} className="btn btn-primary" style={styles.button}>로그인</button>
        </div>
    );
}

export default Login;