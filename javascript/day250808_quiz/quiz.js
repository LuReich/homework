/**
 * 과일 장수가 얻을 수 있는 최대 이익을 계산하는 함수
 * @param {number} k 사과의 최대 점수 (문제 풀이에는 직접 사용되지 않음)
 * @param {number} m 한 상자에 들어가는 사과의 수
 * @param {number[]} score 사과들의 점수 배열
 * @returns {number} 과일 장수가 얻을 수 있는 최대 이익
 */
function solution(k, m, score) {
    // 상자를 만들 수 없는 경우, 이익은 0입니다.
    if (score.length < m) {
        return 0;
    }

    // 1. 사과 점수를 내림차순으로 정렬합니다.
    //    가장 비싼 상자를 만들기 위해 점수가 높은 사과부터 사용합니다.
    score.sort((a, b) => b - a);

    let totalProfit = 0;

    // 2. 만들 수 있는 상자의 개수만큼 반복합니다.
    //    i는 각 상자의 최저 점수 사과의 인덱스를 가리킵니다.
    //    (m-1, 2m-1, 3m-1, ...)
    for (let i = m - 1; i < score.length; i += m) {
        // 3. 각 상자의 가격을 계산합니다.
        //    내림차순 정렬했으므로 score[i]가 해당 상자의 최저 점수(p)가 됩니다.
        //    가격 = p * m
        const price = score[i] * m;
        
        // 4. 총 이익에 더합니다.
        totalProfit += price;
    }

    return totalProfit;
}

// --- 예시 테스트 ---
const k1 = 3, m1 = 4, score1 = [1, 2, 3, 1, 2, 3, 1];
console.log(`예시 1 결과: ${solution(k1, m1, score1)}`); // 예상 결과: 8

const k2 = 4, m2 = 3, score2 = [4, 1, 2, 2, 4, 4, 4, 4, 1, 2, 4, 2];
console.log(`예시 2 결과: ${solution(k2, m2, score2)}`); // 예상 결과: 33
