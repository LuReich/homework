import React from 'react';

// 스타일 객체 선언
const checkboxStyle = { marginRight: '10px' };

// 개별 책 정보
function BookItem({ book, isRented, renterName, isChecked, onCheckboxChange }) {

    const listItemStyle = {
        margin: '5px 0',
        color: isRented ? 'red' : 'black',
    };

    return (
        <li style={listItemStyle}>
            <input
                type="checkbox"
                disabled={isRented}
                checked={isChecked}
                onChange={() => onCheckboxChange(book.id)}
                style={checkboxStyle}
            />
            {book.title} {isRented && `(대여중: ${renterName})`}
        </li>
    );
}

export default BookItem;