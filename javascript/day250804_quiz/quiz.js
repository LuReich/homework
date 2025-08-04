function solution(n, w, num) {
    // 1. 꺼내려는 상자(num)의 위치 (row, col) 계산
    // row는 0층(가장 아래)부터 시작
    const targetRow = Math.floor((num - 1) / w);
    let targetCol;

    // 층(row)이 짝수인지 홀수인지에 따라 col 계산 방식이 달라짐
    if (targetRow % 2 === 0) { // 짝수 층: 왼쪽 -> 오른쪽
        targetCol = (num - 1) % w;
    } else { // 홀수 층: 오른쪽 -> 왼쪽
        targetCol = w - 1 - ((num - 1) % w);
    }

    // 2. 꺼내야 할 상자 개수 계산
    // 꺼내려는 상자 자신을 포함하므로 1부터 시작
    let boxesToRemove = 1;

    // 전체 층수 계산
    const totalRows = Math.ceil(n / w);

    // 3. targetRow 바로 위층부터 꼭대기 층까지 반복
    for (let currentRow = targetRow + 1; currentRow < totalRows; currentRow++) {
        // 현재 층, targetCol 위치에 있을 상자의 번호를 계산
        let boxNumberAtPosition;
        if (currentRow % 2 === 0) { // 짝수 층: 왼쪽 -> 오른쪽
            boxNumberAtPosition = (currentRow * w) + targetCol + 1;
        } else { // 홀수 층: 오른쪽 -> 왼쪽
            boxNumberAtPosition = (currentRow * w) + (w - 1 - targetCol) + 1;
        }

        // 계산된 번호의 상자가 실제로 존재한다면(n보다 작거나 같다면)
        // 꺼내야 할 상자이므로 개수를 1 증가
        if (boxNumberAtPosition <= n) {
            boxesToRemove++;
        }
    }

    return boxesToRemove;
}

// --- 테스트를 위한 실행 함수 ---
function runTests() {
    const testCases = [
        // 문제에 주어진 입출력 예
        { n: 22, w: 6, num: 8, expected: 3, description: "입출력 예 #1" },
        { n: 13, w: 3, num: 6, expected: 4, description: "입출력 예 #2" },

        // 제한사항 그룹별 테스트 케이스
        // 그룹 #1: w = 1
        { n: 10, w: 1, num: 1, expected: 10, description: "w=1, 가장 아래 상자" },
        { n: 10, w: 1, num: 10, expected: 1, description: "w=1, 가장 위 상자" },
        { n: 10, w: 1, num: 5, expected: 6, description: "w=1, 중간 상자" },

        // 그룹 #2: n이 w의 배수인 경우
        { n: 12, w: 6, num: 8, expected: 1, description: "n이 w의 배수, 위층" },
        { n: 12, w: 6, num: 3, expected: 2, description: "n이 w의 배수, 아래층" },
        { n: 10, w: 10, num: 5, expected: 1, description: "n=w, 단일 층" },

        // 그룹 #3: 기타 케이스
        { n: 2, w: 10, num: 1, expected: 1, description: "n < w" },
        { n: 100, w: 10, num: 1, expected: 10, description: "최대값, 가장 아래 왼쪽" },
        { n: 100, w: 10, num: 100, expected: 1, description: "최대값, 가장 위 왼쪽" },
        { n: 100, w: 10, num: 95, expected: 1, description: "최대값, 가장 위 중간" },
        { n: 100, w: 10, num: 55, expected: 5, description: "최대값, 중간" },
    ];

    let allPassed = true;

    testCases.forEach((test, index) => {
        console.log(`--- 테스트 #${index + 1}: ${test.description} ---`);
        console.log(`입력: n=${test.n}, w=${test.w}, num=${test.num}`);
        
        const result = solution(test.n, test.w, test.num);
        const passed = result === test.expected;

        console.log(`기대값: ${test.expected}, 결과: ${result}`);
        console.log(`판정: ${passed ? '✅ 통과' : '❌ 실패'}`);
        
        if (!passed) {
            allPassed = false;
        }
    });

    console.log("\n=============================");
    if (allPassed) {
        console.log("🎉 모든 테스트를 통과했습니다!");
    } else {
        console.log("🔥 일부 테스트에 실패했습니다.");
    }
    console.log("=============================");
}

// 테스트 실행
runTests();
