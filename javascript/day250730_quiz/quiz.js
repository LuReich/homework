// 실행 시 해당 파일 위치에서 터미널에서
// node quiz.js

function solution(fees, records) {

    const [baseTime, baseFee, unitTime, unitFee] = fees;

    // 차량별 주차 데이터 관리를 위한 Map 생성
    // Key: 차량 번호
    // Value: { totalTime: 총 누적 주차 시간(분), inTime: 마지막 입차 시간(분) }
    // inTime이 null이면 현재 주차장에 없는 상태, 값이 있으면 주차 중인 상태를 의미합니다.
    const parkingData = new Map();

    // "HH:MM" 형식의 시간을 분 단위로 변환
    // 모든 시간을 분으로 통일
    const hourToMinutes = (timeStr) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    };

    // 모든 입/출차 기록을 순회하며 차량별 데이터 처리
    records.forEach(record => {
        // 시간, 차량 번호, in or out
        const [timeStr, carNumber, type] = record.split(' ');
        const minutes = hourToMinutes(timeStr);

        // Map에 해당 차량 정보가 처음 등록되는 것이라면, 초기 데이터를 설정.
        if (!parkingData.has(carNumber)) {
            parkingData.set(carNumber, { totalTime: 0, inTime: null });
        }

        // 해당 차량의 데이터를 가져옵니다.
        const car = parkingData.get(carNumber);

        // IN
        if (type === 'IN') {
            // 현재 입차 시간을 기록합니다.
            car.inTime = minutes;
        } else { // 출차(OUT) 기록일 경우
            // 입차 기록이 있는 경우에만 (정상적인 출차)
            if (car.inTime !== null) {
                // 현재 출차 시간에서 마지막 입차 시간을 빼서 이번 주차 시간을 계산하고, 총 누적 시간에 더하기.
                car.totalTime += minutes - car.inTime;
                // 출차가 완료되었으므로, 입차 시간을 null로 초기화하여 주차장에 없음을 표시.
                car.inTime = null;
            }
        }
    });

    // 출차 기록이 없는 차량에 대한 후처리
    // 모든 기록을 처리한 후에도 여전히 주차장에 남아있는(inTime이 null이 아닌) 차량을 처리합니다.
    const endOfDay = hourToMinutes("23:59");
    for (const car of parkingData.values()) {
        // 입차 시간 기록이 남아있다면, 23:59에 출차한 것으로 간주합니다.
        if (car.inTime !== null) {
            // 23:59에서 마지막 입차 시간을 빼서 주차 시간을 계산하고, 총 누적 시간에 더합니다.
            car.totalTime += endOfDay - car.inTime;
        }
    }

    // 차량 번호 순으로 정렬하고, 최종 요금을 계산하여 반환
    // Map을 배열로 변환([차량번호, 차량데이터])한 뒤, 차량번호(a[0], b[0])를 기준으로 오름차순 정렬합니다.
    return [...parkingData.entries()]
        .sort((a, b) => a[0] - b[0])
        // 정렬된 배열을 순회하며 각 차량의 최종 요금을 계산합니다.
        .map(([, carData]) => {
            const { totalTime } = carData;
            // 누적 시간이 기본 시간 이하이면, 기본 요금을 청구.
            if (totalTime <= baseTime) return baseFee;
                        // 추가 시간 = (총 시간 - 기본 시간)을 단위 시간으로 나눈 값. 올림(Math.ceil) 처리를 통해 단위 시간보다 적게 주차해도
                        //  요금을 부과합니다.
            // 추가 요금 = 추가 시간 * 단위 요금
            return baseFee + Math.ceil((totalTime - baseTime) / unitTime) * unitFee;
        });
}

const fees1 = [180, 5000, 10, 600];
const records1 = ["05:34 5961 IN", "06:00 0000 IN", "06:34 0000 OUT", "07:59 5961 OUT", "07:59 0148 IN", "18:59 0000 IN", "19:09 0148 OUT", "22:59 5961 IN", "23:00 5961 OUT"];

const fees2 = [120, 0, 60, 591];
const records2 = ["16:00 3961 IN","16:00 0202 IN","18:00 3961 OUT","18:00 0202 OUT","23:58 3961 IN"];

const fees3 = [1, 461, 1, 10];
const records3 = ["00:00 1234 IN"];

// 함수 실행 및 결과 출력
const result1 = solution(fees1, records1);
const result2= solution(fees2, records2);
const result3 = solution(fees3, records3);

console.log(result1);
console.log(result2);
console.log(result3);
