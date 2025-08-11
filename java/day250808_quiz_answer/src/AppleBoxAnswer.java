import java.util.*;

public class AppleBoxAnswer
 {
    public static void main(String[] args) throws Exception {
        System.out.println("사과 상자 문제 테스트");

        int[] arr = new int[]{1, 2, 3, 1, 2, 3, 1};
        int k = 3;
        int m = 4;

        int result = Solution.solution(k, m, arr);
        System.out.println("최대 이익: " + result); 

        int[] arr2 = new int[]{4, 1, 2, 2, 4, 4, 4, 4, 1, 2, 4, 2};
        int k2 = 4;
        int m2 = 3;
        int result2 = Solution.solution2(k2, m2, arr2);
        System.out.println("최대 이익2: " + result2);
    }
}

class Solution {
    public static int solution(int k, int m, int[] score) {
        int answer = 0;
        
        Integer[] apples = Arrays.stream(score).boxed().sorted(Comparator.reverseOrder()).toArray(Integer[]::new);

        for(int i=m-1; i<apples.length; i+=m) {
            answer+=apples[i]*m;
        }

        return answer;
    }
    public static int solution2(int k, int m, int[] score) {

        int answer=0;
        
        Arrays.sort(score);

        for(int i=score.length-m; i>=0; i-=m) {
            answer+=score[i]*m;
        }

        return answer;
    }
}