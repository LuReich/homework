import React, { useState, useMemo } from 'react';
import Login from '../components/Login';
import MyBookList from '../components/MyBookList';
import BookList from '../components/BookList';
import 'bootstrap/dist/css/bootstrap.min.css';

// 초기 데이터
const initialUsers = [
    { id: 1, name: '철수' },
    { id: 2, name: '영희' },
    { id: 3, name: '준호' },
];

const initialBooks = [
    { id: 1, title: '리액트', rentedBy: 1 },
    { id: 2, title: '자바스크립트', rentedBy: null },
    { id: 3, title: '파이썬', rentedBy: 2 },
    { id: 4, title: 'flutter', rentedBy: null },
];

// 스타일 객체 선언
const styles = {
    layoutContainer: { padding: '20px', maxWidth: '600px', margin: 'auto' },
    loginContainer: { display: 'flex', alignItems: 'center', marginBottom: '10px' },
    loggedInUser: { marginLeft: '10px', color: 'red', fontWeight: 'bold' },
    loggedOutUser: { marginLeft: '10px' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    addBookContainer: { marginBottom: '10px', display: 'flex', justifyContent: 'space-between' },
    newBookInput: { marginRight: '5px', flex: 1 },
    button: { marginRight: '5px' },
    bookListWrapper: { border: '1px solid red', padding: '10px', borderRadius: '5px' },
};

function BookLayout(props) {
    const [users, setUsers] = useState(initialUsers);
    const [books, setBooks] = useState(initialBooks);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [selectedUser, setSelectedUser] = useState(users[0]?.id || null);

    const [newBookTitle, setNewBookTitle] = useState('');
    const [checkedBookIds, setCheckedBookIds] = useState(new Set());
    const [checkedReturnBookIds, setCheckedReturnBookIds] = useState(new Set());

    const loggedInUserName = useMemo(() => {
        if (!loggedInUser) return null;
        return users.find(u => u.id === loggedInUser)?.name;
    }, [loggedInUser, users]);

    const myBooks = useMemo(() => {
        if (!loggedInUser) return [];
        return books.filter(book => book.rentedBy === loggedInUser);
    }, [loggedInUser, books]);

    const userMap = useMemo(() => {
        const map = new Map();
        users.forEach(user => map.set(user.id, user.name));
        return map;
    }, [users]);

    const changeLogin = () => {
        if (selectedUser) setLoggedInUser(selectedUser);
    };

    const returnSelectedBooks = () => {
        if (checkedReturnBookIds.size === 0) {
            alert('반납할 책을 선택해주세요.');
            return;
        }
        setBooks(prevBooks =>
            prevBooks.map(book =>
                checkedReturnBookIds.has(book.id) ? { ...book, rentedBy: null } : book
            )
        );
        setCheckedReturnBookIds(new Set());
    };

    const addBook = () => {
        if (!newBookTitle.trim()) {
            alert('책 제목을 입력해주세요.');
            return;
        }
        const newBook = { id: Date.now(), title: newBookTitle, rentedBy: null };
        setBooks(prevBooks => [...prevBooks, newBook]);
        setNewBookTitle('');
    };

    const deleteSelectedBooks = () => {
        if (checkedBookIds.size === 0) {
            alert('삭제할 책을 선택해주세요.');
            return;
        }
        const isAnyBookRented = books.some(book => checkedBookIds.has(book.id) && book.rentedBy !== null);
        if (isAnyBookRented) {
            alert('대여 중인 책은 삭제할 수 없습니다. 선택을 확인해주세요.');
            return;
        }
        setBooks(prevBooks => prevBooks.filter(book => !checkedBookIds.has(book.id)));
        setCheckedBookIds(new Set());
    };

    const checkboxChange = (bookId) => {
        setCheckedBookIds(prev => {
            const newChecked = new Set(prev);
            newChecked.has(bookId) ? newChecked.delete(bookId) : newChecked.add(bookId);
            return newChecked;
        });
    };

    const returnCheckboxChange = (bookId) => {
        setCheckedReturnBookIds(prev => {
            const newChecked = new Set(prev);
            newChecked.has(bookId) ? newChecked.delete(bookId) : newChecked.add(bookId);
            return newChecked;
        });
    };

    const rentBooks = () => {
        if (!loggedInUser) {
            alert('로그인 후 이용해주세요.');
            return;
        }
        if (checkedBookIds.size === 0) {
            alert('대여할 책을 선택해주세요.');
            return;
        }
        setBooks(prevBooks =>
            prevBooks.map(book =>
                checkedBookIds.has(book.id) ? { ...book, rentedBy: loggedInUser } : book
            )
        );
        setCheckedBookIds(new Set());
    };

    return (
        <div style={styles.layoutContainer}>
            <h1>도서 대여 시스템</h1>
            <div style={styles.loginContainer}>
                <Login
                    users={users}
                    selectedUser={selectedUser}
                    onSelectUser={setSelectedUser}
                    onLogin={changeLogin}
                />
                {(loggedInUser && <span style={styles.loggedInUser}>{loggedInUserName}</span>)
                    || <span style={styles.loggedOutUser}>로그인 상태가 아닙니다.</span>}
            </div>
            <hr />
            <div style={styles.header}>
                <h2>나의 대여 목록</h2>
                <button onClick={returnSelectedBooks} className='btn btn-primary' disabled={!loggedInUser || checkedReturnBookIds.size === 0}>반납</button>
            </div>
            {loggedInUser ? (
                <MyBookList
                    books={myBooks}
                    checkedReturnBookIds={checkedReturnBookIds}
                    onReturnCheckboxChange={returnCheckboxChange}
                />
            ) : (
                <p>로그인 상태가 아닙니다.</p>
            )}
            <hr />
            <h2>전체 도서 목록</h2>
            <div style={styles.addBookContainer}>
                <input
                    type="text"
                    className='form-control'
                    value={newBookTitle}
                    onChange={(e) => setNewBookTitle(e.target.value)}
                    placeholder="새 책 제목"
                    style={styles.newBookInput}
                />
                <div>
                    <button onClick={addBook} className='btn btn-primary' style={styles.button}>추가</button>
                    <button onClick={rentBooks} className='btn btn-secondary' style={styles.button} disabled={checkedBookIds.size === 0 || !loggedInUser}>대여</button>
                    <button onClick={deleteSelectedBooks} className='btn btn-danger' disabled={checkedBookIds.size === 0}>삭제</button>
                </div>
            </div>
            <div style={styles.bookListWrapper}>
                <BookList
                    books={books}
                    userMap={userMap}
                    checkedBookIds={checkedBookIds}
                    onCheckboxChange={checkboxChange}
                />
            </div>
        </div>
    );
}

export default BookLayout;