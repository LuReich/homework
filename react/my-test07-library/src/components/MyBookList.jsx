import React from 'react';

// 내가 대여한 도서 목록
function MyBookList({ books, checkedReturnBookIds, onReturnCheckboxChange }) {
    if (books.length === 0) {
        return <p>대여한 도서가 없습니다.</p>;
    }

    return (
        <ul style={{ listStyle: 'none', padding: 0 }}>
            {books.map(book => (
                <li key={book.id}>
                    <input
                        type="checkbox"
                        checked={checkedReturnBookIds.has(book.id)}
                        onChange={() => onReturnCheckboxChange(book.id)}
                        style={{ marginRight: '10px' }}
                    />
                    {book.title}
                </li>
            ))}
        </ul>
    );
}

export default MyBookList;