import java.util.Arrays;

public class OvertimeFatigue {
    public static void main(String[] args) throws Exception {
        Solution solution = new Solution();

        int[] works1 = {4, 3, 3};
        int n1 = 4;
        long result1 = solution.solution(n1, works1);
        System.out.println("--- 예제 1 ---");
        System.out.println("Works: [4, 3, 3], N: 4");
        System.out.println("결과: " + result1); // 예상: 12
        System.out.println();

        int[] works2 = {2, 1, 2};
        int n2 = 1;
        long result2 = solution.solution(n2, works2);
        System.out.println("--- 예제 2 ---");
        System.out.println("Works: [2, 1, 2], N: 1");
        System.out.println("결과: " + result2); // 예상: 6
        System.out.println();

       
        int[] works3 = {1, 1};
        int n3 = 3;
        long result3 = solution.solution(n3, works3);
        System.out.println("--- 예제 3 ---");
        System.out.println("Works: [1, 1], N: 3");
        System.out.println("결과: " + result3); // 예상: 0
        System.out.println();
    }
}

class Solution {
    public long solution(int n, int[] works) {

        // works 배열을 내림차순으로 정렬
        // 가장 큰 작업량을 효율적으로 찾기 위해 정렬을 먼저 수행

        // 오름차순으로 정렬
        Arrays.sort(works);

        // 배열의 요소를 직접 뒤집어 내림차순으로
        // 배열의 절반만 순회하면서 맨 앞과 맨 뒤의 요소를 교환
        for (int i = 0; i < works.length / 2; i++) {
            int temp = works[i];
            works[i] = works[works.length - 1 - i];
            works[works.length - 1 - i] = temp;
        }

        // 남은 시간(n) 동안 가장 큰 작업량들을 줄여나감
        // 1시간씩 일하는 것을 시뮬레이션하면 비효율적이므로,
        // 가장 큰 작업량들을 그룹으로 묶어 처리하여 효율을 높입니다.

        int time = n;
        while (time > 0) {
            // 현재 가장 큰 작업량은 배열의 첫 번째 요소
            int maxVal = works[0];

            // 만약 가장 큰 작업량이 0이라면, 모든 일이 끝났다는 의미이므로 루프를 종료합니다.
            if (maxVal == 0) {
                break;
            }

            // 가장 큰 작업량과 동일한 값을 가진 모든 요소들을 1씩 감소
            for (int i = 0; i < works.length; i++) {
                // 현재 요소가 가장 큰 작업량과 같을 때만 처리합니다.
                if (works[i] == maxVal) {
                    // 남은 시간이 있다면 1 감소하고, 남은 시간을 1 차감합니다.
                    if (time > 0) {
                        works[i]--;
                        time--;
                    } else {
                        // 남은 시간이 없으면 종료
                        break;
                    }
                } else {
                    // works 배열은 내림차순이므로, maxVal보다 작은 값을 만나면
                    // 그 뒤에는 더 이상 maxVal과 같은 값이 없으므로 종료
                    break;
                }
            }

            // 바깥 while 루프도 남은 시간이 없으면 즉시 종료
            if (time == 0) {
                break;
            }
        }

        // 남은 작업량으로 야근 피로도를 계산
        long fatigue = 0;
        for (int work : works) {
            // work의 최댓값은 50,000 이므로, 제곱하면 int의 표현 범위를 초과할 수 있어 long 으로 형변환
            fatigue += (long) work * work;
        }

        return fatigue;
    }
}

// https://school.programmers.co.kr/learn/courses/30/lessons/12927