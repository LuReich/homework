import React from 'react';

// 개별 책 정보
function BookItem({ book, isRented, renterName, isChecked, onCheckboxChange }) {
    return (
        <li style={{ margin: '5px 0', color: isRented ? 'grey' : 'black' }}>
            <input
                type="checkbox"
                disabled={isRented}
                checked={isChecked}
                onChange={() => onCheckboxChange(book.id)}
                style={{ marginRight: '10px' }}
            />
            {book.title} {isRented && `(대여 중: ${renterName})`}
        </li>
    );
}

export default BookItem;