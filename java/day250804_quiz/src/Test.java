package day250804_quiz;

public class Test {
	
	public static void main(String[] args) {
		
		System.out.println("--- 테스트 케이스 1 ---");
		int n1 = 22, w1 = 6, num1 = 8;
		int result1 = Solution.solution(n1, w1, num1);
		System.out.println("입력: n=" + n1 + ", w=" + w1 + ", num=" + num1);
		System.out.println("결과: " + result1);
		System.out.println("예상 결과: 3\n");

		System.out.println("--- 테스트 케이스 2 ---");
		int n2 = 13, w2 = 3, num2 = 6;
		int result2 = Solution.solution(n2, w2, num2);
		System.out.println("입력: n=" + n2 + ", w=" + w2 + ", num=" + num2);
		System.out.println("결과: " + result2);
		System.out.println("예상 결과: 4\n");
	}
}

class Solution {
    public static int solution(int n, int w, int num) {

		int a = (n + w - 1) / w; // 층(세로)
        int b = w;               // 칸(가로)
        int[][] arr = new int[a][b];
        int c = 1; // 상자 번호

        // 상자 배열 만들기
        for (int i = 0; i < a; i++) {
            // 0층으로 시작해 짝수 층은 좌에서 우로
            if (i % 2 == 0) {
                for (int j = 0; j < b; j++) {
                    if (c > n) break;
                    arr[i][j] = c++;
                }
            } else { // 홀수 층: 오른쪽 -> 왼쪽
                for (int j = b - 1; j >= 0; j--) {
                    if (c > n) break;
                    arr[i][j] = c++;
                }
            }
            if (c > n) break; // 모든 상자를 다 쌓았으면 루프 종료
        }

        // 목표 상자(num)의 위치(층, 칸) 찾기
        int targetRow = -1;
        int targetCol = -1;
        loop:
        for (int i = 0; i < a; i++) {
            for (int j = 0; j < b; j++) {
                if (arr[i][j] == num) {
                    targetRow = i;
                    targetCol = j;
                    break loop;
                }
            }
        }

        // 꺼내야 할 상자의 총 개수 계산
        int removeBoxCount = 0;
        if (targetRow != -1) { // 상자를 찾은 경우에만 계산
            for (int i = targetRow; i < a; i++) {
                // 목표 상자와 그 위층에 있는 상자(0이 아닌 값)들의 개수를 카운트
                if (arr[i][targetCol] != 0) {
                    removeBoxCount++;
                }
            }
        }

        return removeBoxCount;
    }
}
