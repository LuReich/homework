import React from 'react';
import styled from 'styled-components';

const CardBoarder = styled.div`
  border: 1px solid black;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  width: 120px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: ${props => props.$isSelected ? 'lightblue' : '#ffffff'};
  border-color: ${props => props.$isSelected ? '#007bff' : 'black'};
  cursor: pointer;

  opacity: ${props => props.$isDisabled ? 0.6 : 1};
  cursor: ${props => props.$isDisabled ? 'not-allowed' : 'pointer'};
`;

const CardNumber = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  color: black;
  margin: 0;
`;

function Card({ number, onSelect, isSelected: $isSelected, isDisabled: $isDisabled }) {

    // 체크 박스 상태 변경 시 호출, 어떤 카드가 체크인지 언체크인지 알려주는 역할.
    const handleChange = (e) => {
        onSelect(number, e.target.checked);
    };

    return (
        <CardBoarder $isSelected={$isSelected} $isDisabled={$isDisabled}>
            <input type="checkbox" onChange={handleChange} checked={$isSelected} disabled={$isDisabled} />
            <CardNumber>{number}</CardNumber>
        </CardBoarder>
    );
}

export default Card;
