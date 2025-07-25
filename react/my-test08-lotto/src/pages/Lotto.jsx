import React, { useState, useCallback } from 'react';
import '../assets/css/lotto.css'; // 스타일을 위한 CSS 파일 임포트

// 1~45 사이의 중복되지 않는 숫자 7개(보너스 포함)를 생성하는 헬퍼 함수
const generateNumbers = () => {
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        // 후보 배열에서 무작위로 하나를 뽑아 셔플 배열로 이동
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    // 마지막 7번째 숫자를 보너스 번호로
    const bonusNumber = shuffle[6];
    // 앞 6개 숫자를 당첨 번호로 하고 오름차순 정렬
    const winNumbers = shuffle.slice(0, 6).sort((a, b) => a - b);
    return [...winNumbers, bonusNumber];
};

// 랜덤 색상을 생성하는 헬퍼 함수
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

// 로또 번호 공을 표시하는 재사용 가능한 컴포넌트
const LottoBall = ({ number, isMatch }) => {
    // isMatch가 true일 경우에만 랜덤 배경색 적용
    const style = isMatch ? { backgroundColor: getRandomColor(), color: 'white' } : {};
    return (
        <div className="ball" style={style}>
            {number}
        </div>
    );
};

function Lotto(props) {
    // 시스템 번호 (6개 당첨번호 + 1개 보너스번호)
    const [systemNumbers, setSystemNumbers] = useState([]);
    // 유저 로또 번호 5세트
    const [userLottos, setUserLottos] = useState([]);
    // 5세트의 당첨 결과
    const [results, setResults] = useState([]);

    // 시스템 로또 번호 생성
    const generateSystem = useCallback(() => {
        const newSystemNumbers = generateNumbers();
        setSystemNumbers(newSystemNumbers);
        // 시스템 번호가 새로 생성되면 유저 번호와 결과는 초기화
        setUserLottos([]);
        setResults([]);
    }, []);

    // 유저 로또 번호 5세트 생성
    const generateUser = useCallback(() => {
        // 5번 반복하여 6개의 숫자로 이루어진 로또 세트 5개를 생성
        const newUserLottos = Array(5).fill().map(() => generateNumbers().slice(0, 6).sort((a, b) => a - b));
        setUserLottos(newUserLottos);
        // 유저 번호가 새로 생성되면 결과는 초기화
        setResults([]);
    }, []);

    // 당첨 결과 비교
    const compare = useCallback(() => {
        if (systemNumbers.length === 0) {
            alert('먼저 시스템 로또 번호를 생성해주세요.');
            return;
        }
        if (userLottos.length === 0) {
            alert('먼저 유저 로또 번호를 생성해주세요.');
            return;
        }

        const winNumbers = systemNumbers.slice(0, 6);
        const bonusNumber = systemNumbers[6];

        const newResults = userLottos.map(userLotto => {
            // 유저 로또와 당첨 번호가 일치하는 개수
            const matchCount = userLotto.filter(num => winNumbers.includes(num)).length;

            if (matchCount === 6) {
                return '1등';
            }
            if (matchCount === 5) {
                // 5개가 일치하고, 보너스 번호도 포함하는지 확인
                if (userLotto.includes(bonusNumber)) {
                    return '2등';
                }
                return '3등';
            }
            if (matchCount === 4) {
                return '4등';
            }
            if (matchCount === 3) {
                return '5등';
            }
            return '꽝';
        });

        setResults(newResults);
    }, [systemNumbers, userLottos]);

    return (
        <main className="lotto-container">
            <header>
                <h2>로또 시스템</h2>
            </header>
            <div className="controls">
                <button onClick={generateSystem}>시스템 로또 생성</button>
                <button onClick={generateUser}>유저 로또 생성</button>
                <button onClick={compare}>결과 비교</button>
            </div>

            <section className="contents">
                <div className="ball-box">
                    <h2>이번주 당첨 번호</h2>
                    {systemNumbers.length > 0 && (
                        <div className="ball-items">
                            {systemNumbers.slice(0, 6).map(num => (
                                <LottoBall key={`system-${num}`} number={num} isMatch={false} />
                            ))}
                            <div className="bonus-area">
                                <span className="bonus-label">보너스 번호:</span>
                                <LottoBall key="system-bonus" number={systemNumbers[6]} isMatch={false} />
                            </div>
                        </div>
                    )}
                </div>

                <h2>사용자 로또</h2>
                {userLottos.map((lotto, index) => (
                    <div className="ball-box" key={`user-lotto-${index}`}>
                        <div className="ball-items">
                            {lotto.map(num => {
                                // 결과가 있고, 현재 번호가 당첨 번호에 포함되면 true
                                const isMatch = results.length > 0 && systemNumbers.slice(0, 6).includes(num);
                                return <LottoBall key={`user-${index}-${num}`} number={num} isMatch={isMatch} />;
                            })}
                        </div>
                        {results[index] && <div className="lotto-result">결과 등수: {results[index]}</div>}
                    </div>
                ))}
            </section>
        </main>
    );
}

export default Lotto;