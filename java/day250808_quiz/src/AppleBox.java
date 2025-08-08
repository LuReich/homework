import java.util.Arrays;

public class AppleBox {
    public static void main(String[] args) throws Exception {
        System.out.println("사과 상자 문제 테스트");

        int[] arr = new int[]{1, 2, 3, 1, 2, 3, 1};
        int k = 3;
        int m = 4;

        int result = solution(k, m, arr);
        System.out.println("최대 이익: " + result); 

        int[] arr2 = new int[]{4, 1, 2, 2, 4, 4, 4, 4, 1, 2, 4, 2};
        int k2 = 4;
        int m2 = 3;
        int result2 = solution(k2, m2, arr2);
        System.out.println("최대 이익2: " + result2);

    }

    public static int solution(int k, int m, int[] score) {
        int answer = 0;

        Arrays.sort(score);

        // 마지막에서 m만큼 이동하고 그 값이랑 m을 곱해서 한 상자 가격 정하기
        // 그 후 이동한 배열 순번에서 m 만큼 왼쪽으로 이동해 계산
        for(int i = score.length - 1; i - m + 1 >= 0; i -= m) {
            answer += score[i - m + 1] * m;
        }

        return answer;
    }
}