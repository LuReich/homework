function solution(n, w, num) {
    // 층(세로)과 칸(가로) 계산
    const rows = Math.ceil(n / w);
    const cols = w;

    // 2차원 배열을 생성하고 0으로 초기화
    const box = Array.from({ length: rows }, () => Array(cols).fill(0));
    let boxCounter = 1;

    // 규칙에 따라 2차원 배열에 상자 번호 채우기
    for (let i = 0; i < rows; i++) {
        if (i % 2 === 0) { // 짝수 층 (0, 2, ...): 왼쪽 -> 오른쪽
            for (let j = 0; j < cols; j++) {
                if (boxCounter > n) break;
                box[i][j] = boxCounter++;
            }
        } else { // 홀수 층 (1, 3, ...): 오른쪽 -> 왼쪽
            for (let j = cols - 1; j >= 0; j--) {
                if (boxCounter > n) break;
                box[i][j] = boxCounter++;
            }
        }
        if (boxCounter > n) break; // 모든 상자를 다 쌓았으면 루프 종료
    }

    // 목표 상자(num)의 위치(층, 칸) 찾기
    let targetRow = -1;
    let targetCol = -1;
    let found = false;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (box[i][j] === num) {
                targetRow = i;
                targetCol = j;
                found = true;
                break;
            }
        }
        if (found) break;
    }

    // 꺼내야 할 상자의 총 개수 계산
    let removeBoxCount = 0;
    if (targetRow !== -1) {
        for (let i = targetRow; i < rows; i++) {
            // 목표 상자와 그 위층에 있는 상자(0이 아닌 값)들의 개수 세기
            if (box[i][targetCol] !== 0) {
                removeBoxCount++;
            }
        }
    }

    return removeBoxCount;
}

function runTests() {
    console.log("--- 테스트 케이스 1 ---");
    const n1 = 22, w1 = 6, num1 = 8;
    const result1 = solution(n1, w1, num1);
    console.log(`입력: n=${n1}, w=${w1}, num=${num1}`);
    console.log("결과: " + result1);
    console.log("예상 결과: 3\n");

    console.log("--- 테스트 케이스 2 ---");
    const n2 = 13, w2 = 3, num2 = 6;
    const result2 = solution(n2, w2, num2);
    console.log(`입력: n=${n2}, w=${w2}, num=${num2}`);
    console.log("결과: " + result2);
    console.log("예상 결과: 4\n");

    // 추가 테스트 케이스
    console.log("--- 추가 테스트: w=1 ---");
    const n3 = 10, w3 = 1, num3 = 5;
    const result3 = solution(n3, w3, num3);
    console.log(`입력: n=${n3}, w=${w3}, num=${num3}`);
    console.log("결과: " + result3);
    console.log("예상 결과: 6\n");
    
    console.log("--- 추가 테스트: n이 w의 배수 ---");
    const n4 = 12, w4 = 6, num4 = 3;
    const result4 = solution(n4, w4, num4);
    console.log(`입력: n=${n4}, w=${w4}, num=${num4}`);
    console.log("결과: " + result4);
    console.log("예상 결과: 2\n");
}

// 테스트 실행
runTests();
