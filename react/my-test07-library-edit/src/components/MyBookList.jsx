import React from 'react';

// 스타일 객체 선언
const styles = {
    container: { background: '#e0f2ff', padding: '15px', borderRadius: '5px', marginTop: '10px' },
    list: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '20px' },
    checkbox: { marginRight: '10px' },
};

// 내가 대여한 도서 목록
function MyBookList({ books, checkedReturnBookIds, onReturnCheckboxChange }) {
    if (books.length === 0) {
        return <p>대여한 도서가 없습니다.</p>;
    }

    return (
        <div style={styles.container}>
            <ul style={styles.list}>
                {books.map(book => (
                    <li key={book.id}>
                        <input
                            type="checkbox"
                            checked={checkedReturnBookIds.has(book.id)}
                            onChange={() => onReturnCheckboxChange(book.id)}
                            style={styles.checkbox}
                        />
                        {book.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyBookList;