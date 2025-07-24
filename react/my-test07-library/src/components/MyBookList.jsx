import React from 'react';

const MyBookList = ({ books, checkedReturnBookIds, onReturnCheckboxChange }) => {
    if (books.length === 0) {
        return <p>대여한 책이 없습니다.</p>;
    }

    return (
        <ul className="list-group">
            {books.map(book => (
                <li key={book.id} className="list-group-item">
                    <input
                        type="checkbox"
                        className="form-check-input me-2"
                        checked={checkedReturnBookIds.has(book.id)}
                        onChange={() => onReturnCheckboxChange(book.id)}
                    />
                    {book.title}
                </li>
            ))}
        </ul>
    );
};

export default MyBookList;