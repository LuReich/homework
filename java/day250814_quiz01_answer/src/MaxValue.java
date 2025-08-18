
import java.util.Arrays;

public class MaxValue {
    public static void main(String[] args) throws Exception {
        
        System.out.println(MaxValue.solution(new int[] {6, 10, 2}));
    }
    public static String solution(int[] numbers) {

        String[] arr=new String[numbers.length];

        for(int i=0; i<numbers.length; i++) {
            arr[i]=String.valueOf(numbers[i]);
        }

        // sort 는 비교 조건이 0보다 커야 변경한다.
        Arrays.sort(arr, (a, b)->(b+a).compareTo(a+b));

        // 0일 때
        if(arr[0].equals("0")) return "0";

        String answer=String.join("", arr);

        return answer;
    }
}
