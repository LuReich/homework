function solution(k, m, score) {

    if (score.length < m) {
        return 0;
    }

    score.sort((a, b) => b - a);

    let answer = 0;

    
    for (let i = m - 1; i < score.length; i += m) {
        
        const price = score[i] * m;
        
        answer += price;
    }

    return answer;
}

// --- 예시 테스트 ---
const k1 = 3, m1 = 4, score1 = [1, 2, 3, 1, 2, 3, 1];
console.log(`예시 1 결과: ${solution(k1, m1, score1)}`); // 예상 결과: 8

const k2 = 4, m2 = 3, score2 = [4, 1, 2, 2, 4, 4, 4, 4, 1, 2, 4, 2];
console.log(`예시 2 결과: ${solution(k2, m2, score2)}`); // 예상 결과: 33
