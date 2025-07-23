import React from 'react';

const BookList = ({ books, userMap, checkedBookIds, onCheckboxChange }) => {
    return (
        <ul className="list-group">
            {books.map(book => {
                const isRented = book.rentedBy !== null;
                const renterName = isRented ? userMap.get(book.rentedBy) : '대여 가능';
                return (
                    <li key={book.id} className={`list-group-item d-flex justify-content-between align-items-center ${isRented ? 'bg-light' : ''}`}>
                        <div>
                            <input
                                type="checkbox"
                                className="form-check-input me-2"
                                checked={checkedBookIds.has(book.id)}
                                onChange={() => onCheckboxChange(book.id)}
                                disabled={isRented} // 대여된 책은 체크박스 비활성화
                            />
                            {book.title} {isRented && ' (대여 중)'}
                        </div>
                        <span className={`badge ${isRented ? 'bg-secondary' : 'bg-success'}`}>
                            {renterName}
                        </span>
                    </li>
                );
            })}
        </ul>
    );
};

export default BookList;