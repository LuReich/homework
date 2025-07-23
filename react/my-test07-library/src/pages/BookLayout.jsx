import React, { useState, useMemo, useEffect } from 'react';
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

function BookLayout(props) {

    // useState의 초기값으로 함수를 전달(Lazy initial state)하여, 컴포넌트가 처음 렌더링될 때 한 번만 실행
    // localStorage에서 데이터를 불러오고, 없으면 초기 데이터를 사용
    const [users, setUsers] = useState(() => {
        const savedUsers = localStorage.getItem('users');
        return savedUsers ? JSON.parse(savedUsers) : initialUsers;
    });
    const [books, setBooks] = useState(() => {
        const savedBooks = localStorage.getItem('books');
        return savedBooks ? JSON.parse(savedBooks) : initialBooks;
    });
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [selectedUser, setSelectedUser] = useState(initialUsers[0]?.id || null); // 로그인 드롭다운에서 선택한 사용자

    const [newBookTitle, setNewBookTitle] = useState(''); // 새 책 제목 입력
    const [checkedBookIds, setCheckedBookIds] = useState(new Set()); // 대여/삭제를 위해 선택된 책들
    const [checkedReturnBookIds, setCheckedReturnBookIds] = useState(new Set()); // 반납을 위해 선택된 책들

    // useEffect를 사용하여 books 상태가 변경될 때마다 localStorage에 자동으로 저장
    useEffect(() => {
        localStorage.setItem('books', JSON.stringify(books));
    }, [books]);

    // 현재 로그인한 사용자의 이름
    const loggedInUserName = useMemo(() => {
        if (!loggedInUser) return null;
        return users.find(u => u.id === loggedInUser)?.name;
    }, [loggedInUser, users]);

    // 현재 로그인한 사용자가 대여한 책 목록
    const myBooks = useMemo(() => {
        if (!loggedInUser) return [];
        return books.filter(book => book.rentedBy === loggedInUser);
    }, [loggedInUser, books]);

    // 사용자 id 를 이름으로 매핑
    const userMap = useMemo(() => {
        const map = new Map();
        users.forEach(user => map.set(user.id, user.name));
        return map;
    }, [users]);

    // 로그인 처리
    const changeLogin = () => {
        if (selectedUser) {
            setLoggedInUser(selectedUser);
        }
    };

    // 로그아웃 처리
    const handleLogout = () => {
        setLoggedInUser(null);
        setCheckedReturnBookIds(new Set()); // 로그아웃 시 반납 체크박스 초기화
    };

    // 선택된 책들 반납
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

    // 새 책 추가
    const addBook = () => {
        if (!newBookTitle.trim()) {
            alert('책 제목을 입력해주세요.');
            return;
        }
        const newBook = {
            id: Date.now(),
            title: newBookTitle,
            rentedBy: null,
        };
        setBooks(prevBooks => [...prevBooks, newBook]);
        setNewBookTitle('');
    };

    // 선택된 책들 삭제
    const deleteSelectedBooks = () => {
        if (checkedBookIds.size === 0) {
            alert('삭제할 책을 선택해주세요.');
            return;
        }

        setBooks(prevBooks => prevBooks.filter(book => !checkedBookIds.has(book.id)));
        setCheckedBookIds(new Set());
    };

    // 전체 도서 목록 체크박스 상태 변경
    const checkboxChange = (bookId) => {
        setCheckedBookIds(prevChecked => {
            const newChecked = new Set(prevChecked);
            if (newChecked.has(bookId)) {
                newChecked.delete(bookId);
            } else {
                newChecked.add(bookId);
            }
            return newChecked;
        });
    };

    // 나의 대여 목록 체크박스 상태 변경
    const returnCheckboxChange = (bookId) => {
        setCheckedReturnBookIds(prevChecked => {
            const newChecked = new Set(prevChecked);
            if (newChecked.has(bookId)) {
                newChecked.delete(bookId);
            } else {
                newChecked.add(bookId);
            }
            return newChecked;
        });
    };

    // 선택된 책들 대여
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
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h1>도서 대여 시스템</h1>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                {loggedInUser ? (
                    <>
                        <span style={{ marginRight: '10px' }}><strong>{loggedInUserName}</strong></span>
                        <button onClick={handleLogout} className="btn btn-secondary">로그아웃</button>
                    </>
                ) : (
                    <Login
                        users={users}
                        selectedUser={selectedUser}
                        onSelectUser={setSelectedUser}
                        onLogin={changeLogin}
                    />
                )}
            </div>

            <hr />

            {/* 나의 대여 목록 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
            <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                {/* 도서 추가, 대여, 삭제 */}
                <input
                    type="text"
                    className='text-body'
                    value={newBookTitle}
                    onChange={(e) => setNewBookTitle(e.target.value)}
                    placeholder="새 책 제목"
                    style={{ marginRight: '5px' }}
                />
                <div>
                    <button onClick={addBook} className='btn btn-primary' style={{ marginRight: '5px' }}>추가</button>
                    <button onClick={rentBooks} className='btn btn-secondary' disabled={checkedBookIds.size === 0 || !loggedInUser} style={{ marginRight: '5px' }}>대여</button>
                    <button onClick={deleteSelectedBooks} className='btn btn-danger' disabled={checkedBookIds.size === 0}>삭제</button>
                </div>
            </div>
            {/* 전체 도서 목록 리스트 */}
            <BookList
                books={books}
                userMap={userMap}
                checkedBookIds={checkedBookIds}
                onCheckboxChange={checkboxChange}
            />
        </div>
    );
}

export default BookLayout;