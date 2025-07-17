import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

class Solution {
    public int[] solution(int[] lottos, int[] win_nums) {
        
        // 로또 번호가 당첨 번호에 포함되는지 반복적으로 확인할 때 효율적입니다.
        Set<Integer> winSet = new HashSet<>();
        for (int winNum : win_nums) {
            winSet.add(winNum);
        }

        int zeroCount = 0;
        int matchCount = 0;

        // 로또 번호를 확인하며 0의 개수와 일치하는 번호의 개수 카운트
        for (int lottoNum : lottos) {
            if (lottoNum == 0) {
                zeroCount++;
            } else if (winSet.contains(lottoNum)) {
                matchCount++;
            }
        }

        // 최고 순위와 최저 순위를 계산
        // 최고 순위: 현재 일치하는 개수 + 0의 개수 (0이 모두 당첨 번호라고 가정)
        int maxCorrect = matchCount + zeroCount;
        // 최저 순위: 현재 일치하는 개수 (0이 모두 꽝이라고 가정)
        int minCorrect = matchCount;

        // 일치 개수를 순위로 변환하여 결과 배열에 담기
        int[] answer = {getRank(maxCorrect), getRank(minCorrect)};
        
        return answer;
    }

    // 일치하는 번호의 개수를 받아 순위를 반환하는 함수
    private int getRank(int count) {
        switch (count) {
            case 6:
                return 1;
            case 5:
                return 2;
            case 4:
                return 3;
            case 3:
                return 4;
            case 2:
                return 5;
            default: // 1개 또는 0개 일치
                return 6;
        }
    }
}

// 테스트용 main
public class Test {
    public static void main(String[] args) {
        Solution sol = new Solution();

        // 예제 1
        int[] lottos1 = {44, 1, 0, 0, 31, 25};
        int[] win_nums1 = {31, 10, 45, 1, 6, 19};
        int[] result1 = sol.solution(lottos1, win_nums1);
        System.out.println("예제 1 결과: " + Arrays.toString(result1)); // [3, 5]

        // 예제 2
        int[] lottos2 = {0, 0, 0, 0, 0, 0};
        int[] win_nums2 = {38, 19, 20, 40, 15, 25};
        int[] result2 = sol.solution(lottos2, win_nums2);
        System.out.println("예제 2 결과: " + Arrays.toString(result2)); // [1, 6]

        // 예제 3
        int[] lottos3 = {45, 4, 35, 20, 3, 9};
        int[] win_nums3 = {20, 9, 3, 45, 4, 35};
        int[] result3 = sol.solution(lottos3, win_nums3);
        System.out.println("예제 3 결과: " + Arrays.toString(result3)); // [1, 1]
    }
}
