import React from 'react';
import BookItem from './BookItem';

// 스타일 객체 선언
const listStyle = { listStyle: 'none', padding: 0, margin: 0 };

// 전체 도서 목록
function BookList({ books, userMap, checkedBookIds, onCheckboxChange }) {
    return (
        <ul style={listStyle}>
            {books.map(book => {
                const isRented = book.rentedBy !== null;
                const renterName = isRented ? userMap.get(book.rentedBy) : '';
                return (
                    <BookItem
                        key={book.id}
                        book={book}
                        isRented={isRented}
                        renterName={renterName}
                        isChecked={checkedBookIds.has(book.id)}
                        onCheckboxChange={onCheckboxChange}
                    />
                );
            })}
        </ul>
    );
}

export default BookList;