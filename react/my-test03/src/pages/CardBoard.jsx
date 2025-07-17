import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Card from './Card';


const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: sans-serif;
  background-color: #f7f9fc;
  height: 800px;
`;

const CardArea = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 20px 0;
  min-height: 180px; /* Prevent layout shift */
  height: 200px;
  width: 1200px;
`;

const ButtonArea = styled.div`
  margin-bottom: 20px;
  & > button {
    margin: 0 10px;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 8px;
    border: none;
    color: white;
    background-color: #007bff;
    transition: background-color 0.2s;

    &:hover:not(:disabled) {
      background-color: #0056b3;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;

const ResultArea = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #ffffff;
  text-align: center;
  min-width: 300px;

  & > h3 {
    margin-top: 0;
    font-size: 24px;
    color: #dc3545;
  }

  & > p {
    font-size: 18px;
  }
`;

// 중복 없는 숫자 배열 생성, count 는 개수, 1부터 max 까지가 숫자 범위
const generateNumbers = (count, max) => {
    const numbers = [];
    while (numbers.length < count) {
        const newNumber = Math.floor(Math.random() * max) + 1;
        if (!numbers.includes(newNumber)) {
            numbers.push(newNumber);
        }
    }
    return numbers;
};


function CardBoard() {
  
    // 현재 게임 상태
    const [gameStatus, setGameStatus] = useState('ready'); // 'ready', 'started', 'finished'
    const [userCards, setUserCards] = useState([]);         // 사용자 카드
    const [pcCards, setPcCards] = useState([]);             // PC 카드
    const [selectedCards, setSelectedCards] = useState([]);   // 사용자가 선택한 카드
    const [result, setResult] = useState('');               // 게임 결과
    const [scores, setScores] = useState({ user: 0, pc: 0 });   // 사용자와 PC의 카드 합
    const [isSelectionDisabled, setIsSelectionDisabled] = useState(false); // 카드 선택 가능 여부

    // 게임 시작, 사용자에게 5장의 카드를, PC 에게 2개의 숫자를 부여
    // 사용자와 PC 가 받은 카드는 중복이 있을 수 있다. 단 사용자나 PC 의 개인 카드는 중복값이 없다.
    const gameStart = useCallback(() => {
        const userNumbers = generateNumbers(5, 20); // PC 2장, 사용자 5장 -> 총 7장
        const pcNumbers=generateNumbers(2, 20);
        setUserCards(userNumbers);
        setPcCards(pcNumbers);
        setSelectedCards([]);
        setResult('');
        setScores({ user: 0, pc: 0 });
        setIsSelectionDisabled(false); // 게임 시작 시 선택 가능하도록 설정
        setGameStatus('started');
    }, []);

    // 게임 초기화, 사용자와 PC 카드들 초기화, 및 게임 상태 변경
    const gameReset = useCallback(() => {
        setUserCards([]);
        setPcCards([]);
        setSelectedCards([]);
        setResult('');
        setGameStatus('ready');
        setIsSelectionDisabled(false);  // 리셋 시 선택 가능하도록 설정
        setScores({ user: 0, pc: 0 });
    }, []);

    // 카드 선택 과정: 사용자가 2개의 카드 선택 시, 다른 카드 선택 불가
    const cardSelect = useCallback((cardNumber, isChecked) => {
        if (isSelectionDisabled) return; // 선택이 비활성화된 경우, 즉시 함수를 종료.
        if (isChecked) {
            if (selectedCards.length < 2) {
              setSelectedCards(prev => [...prev, cardNumber]);
            }
        } else {
            setSelectedCards(prev => prev.filter(card => card !== cardNumber));
        }
    }, [selectedCards.length, isSelectionDisabled]);

    // 선택 버튼 누를 시, 2장 미만이면 경고
    // 사용자와 PC 의 각 합을 구한 후, 결과창 출력
    const selectConfirm = useCallback(() => {
        if (selectedCards.length !== 2) {
            alert('2장의 카드를 선택해주세요.');
            return;
        }
        const userSum = selectedCards.reduce((sum, num) => sum + num, 0);
        const pcSum = pcCards.reduce((sum, num) => sum + num, 0);
        setScores({ user: userSum, pc: pcSum });

        setIsSelectionDisabled(true); // 선택 후 카드 선택 불가
        setResult(userSum > pcSum ? '승리!' : userSum < pcSum ? '패배!' : '무승부!');
        setGameStatus('finished');
    }, [pcCards, selectedCards]);
    
    return (
        <GameContainer>
            <h1>카드 합계 게임</h1>
            <p>5장의 카드 중 2장을 선택하여 PC와 합계를 비교하세요.</p>
            <CardArea>
                {userCards.map(card => (
                    <Card
                        key={card}
                        number={card}
                        onSelect={cardSelect}
                        isSelected={selectedCards.includes(card)}
                        isDisabled={isSelectionDisabled || (selectedCards.length >= 2 && !selectedCards.includes(card))}
                    />
                ))}
            </CardArea>
            <ButtonArea>
                <button onClick={gameStart} disabled={gameStatus === 'started'}>시작</button>
                <button onClick={selectConfirm} disabled={gameStatus !== 'started' || selectedCards.length !== 2}>선택</button>
                <button onClick={gameReset}>리셋</button>
            </ButtonArea>
            {result && (
                <ResultArea>
                    <h3>게임 결과: {result}</h3>
                    <p>내 카드: {selectedCards.join(', ')} (합계: {scores.user})</p>
                    <p>PC 카드: {pcCards.join(', ')} (합계: {scores.pc})</p>
                </ResultArea>
            )}
        </GameContainer>
    );
}

export default CardBoard;
