import React from 'react';

function Login({ users, selectedUser, onSelectUser, onLogin }) {
    return (
        <div>
            <select onChange={(e) => onSelectUser(Number(e.target.value))} value={selectedUser || ''}>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>
            <button onClick={onLogin} style={{ marginLeft: '10px' }}>로그인</button>
        </div>
    );
}

export default Login;