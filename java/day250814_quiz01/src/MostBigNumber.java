import java.util.Arrays;
import java.util.Comparator;

public class MostBigNumber {
    public static void main(String[] args) throws Exception {
        Solution s = new Solution();

        int[] numbers1 = { 6, 10, 2 };
        System.out.println("입력: " + Arrays.toString(numbers1));
        System.out.println("결과: " + s.solution(numbers1)); // 예상 결과: "6210"

        System.out.println("---");

        int[] numbers2 = { 3, 30, 34, 5, 9 };
        System.out.println("입력: " + Arrays.toString(numbers2));
        System.out.println("결과: " + s.solution(numbers2)); // 예상 결과: "9534330"
    }
}

class Solution {
    
    public String solution(int[] numbers) {
        
        String[] numsAsStrings = new String[numbers.length];
        for (int i = 0; i < numbers.length; i++) {
            numsAsStrings[i] = String.valueOf(numbers[i]);
        }

        // 정렬 기준: 두 문자열 a, b를 합쳤을 때 (b+a)가 (a+b)보다 사전적으로 크면 b가 a보다 앞에 오도록
        
        // 예: "3"과 "30"이 있을 때, "303"과 "330"을 비교. "330"이 더 크므로 "3"이 "30"보다 앞에
        // 결과: ["9", "5", "34", "3", "30"] 순서로 정렬
        Arrays.sort(numsAsStrings, new Comparator<String>() {
            @Override
            public int compare(String o1, String o2) {
                return (o2 + o1).compareTo(o1 + o2);
            }
        });

        // 정렬 후 첫 번째 원소가 "0"인 경우, 모든 원소가 0
        if (numsAsStrings[0].equals("0")) {
            return "0";
        }

        // 정렬된 문자열 배열을 하나의 문자열로 합치기
        StringBuilder sb = new StringBuilder();
        for (String s : numsAsStrings) {
            sb.append(s);
        }
        return sb.toString();
    }
}
