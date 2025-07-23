import React from 'react';

const Login = ({ users, selectedUser, onSelectUser, onLogin }) => {
    return (
        <>
            <select
                className="form-select"
                style={{ width: '150px', marginRight: '10px' }}
                value={selectedUser || ''}
                onChange={(e) => onSelectUser(Number(e.target.value))}
            >
                {users.map(user => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>
            <button onClick={onLogin} className="btn btn-success">로그인</button>
        </>
    );
};

export default Login;