// 콘솔에서 실행 시, 해당 파일 위치에서 node quiz.js 입력

function solution(friends, gifts) {

    const n = friends.length;
    
    // 친구 이름을 인덱스로 매핑.
    const friendIndexMap = new Map();
    friends.forEach((friend, index) => {
        friendIndexMap.set(friend, index);
    });

    // giftMap[a][b]는 a번 친구가 b번 친구에게 준 선물의 수.
    const giftMap = Array.from({ length: n }, () => Array(n).fill(0));

    // 각 친구의 선물 지수 (준 선물 - 받은 선물)를 저장.
    const giftIndex = Array(n).fill(0);

    // 각 친구가 다음 달에 받을 선물의 수를 저장.
    const nextMonthGifts = Array(n).fill(0);

    // 선물 교환 기록을 giftMap에 채움.
    gifts.forEach(gift => {
        const [sender, receiver] = gift.split(' ');
        const senderIndex = friendIndexMap.get(sender);
        const receiverIndex = friendIndexMap.get(receiver);
        giftMap[senderIndex][receiverIndex]++;
    });

    // 각 친구의 선물 지수를 계산.
    for (let a = 0; a < n; a++) {
        // a번 친구가 준 선물의 총합
        const giftsGiven = giftMap[a].reduce((acc, cur) => acc + cur, 0);
        
        // a번 친구가 받은 선물의 총합
        let giftsReceived = 0;
        for (let b = 0; b < n; b++) {
            giftsReceived += giftMap[b][a];
        }
        
        giftIndex[a] = giftsGiven - giftsReceived;
    }

    // 모든 친구 쌍을 비교하여 다음 달에 받을 선물을 결정.
    for (let a = 0; a < n; a++) {
        for (let b = a + 1; b < n; b++) {
            const giftsFromAtoB = giftMap[a][b];
            const giftsFromBtoA = giftMap[b][a];

            // 직접 주고받은 선물 수를 비교.
            if (giftsFromAtoB > giftsFromBtoA) {
                // a가 b에게 더 많이 줬으므로, a가 선물을 받는다.
                nextMonthGifts[a]++;
            } else if (giftsFromBtoA > giftsFromAtoB) {
                // b가 a에게 더 많이 줬으므로, b가 선물을 받는다.
                nextMonthGifts[b]++;
            } else {
                // 주고받은 수가 같으면 선물 지수를 비교.
                const indexA = giftIndex[a];
                const indexB = giftIndex[b];

                if (indexA > indexB) {
                    // a의 선물 지수가 더 높으므로, a가 선물을 받는다.
                    nextMonthGifts[a]++;
                } else if (indexB > indexA) {
                    // b의 선물 지수가 더 높으므로, b가 선물을 받는다.
                    nextMonthGifts[b]++;
                }
                // 선물 지수도 같으면 아무도 선물을 받지 않는다.
            }
        }
    }

    // 받을 선물 수 중 최댓값 반환.
    if (nextMonthGifts.length === 0) {
        return 0;
    }
    
    return Math.max(...nextMonthGifts);
}

function runTest(testNum, friends, gifts, expected) {
    const result = solution(friends, gifts);
    console.log(`--- 예제 ${testNum} ---`);
    console.log("입력 friends:", friends);
    console.log("입력 gifts:", gifts);
    console.log("기대 결과:", expected);
    console.log("실행 결과:", result);
    console.log(result === expected ? "테스트 통과" : "테스트 실패");
    console.log("\n");
}

// 예제 1
const friends1 = ["muzi", "ryan", "frodo", "neo"];
const gifts1 = ["muzi frodo", "muzi frodo", "ryan muzi", "ryan muzi", "ryan muzi", "frodo muzi", "frodo ryan", "neo muzi"];
runTest(1, friends1, gifts1, 2);

// 예제 2
const friends2 = ["joy", "brad", "alessandro", "conan", "david"];
const gifts2 = ["alessandro brad", "alessandro joy", "alessandro conan", "david alessandro", "alessandro david"];
runTest(2, friends2, gifts2, 4);

// 예제 3
const friends3 = ["a", "b", "c"];
const gifts3 = ["a b", "b a", "c a", "a c", "a c", "c a"];
runTest(3, friends3, gifts3, 0);
