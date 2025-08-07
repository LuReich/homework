import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class Package {

    public static int solution(int n, int w, int num) {

        int answer = 0;
        int totalRow=(int)Math.ceil((double)n/w);
        List<List<Integer>> box = IntStream.range(0, totalRow)
            .mapToObj(i -> IntStream.range(0, w).mapToObj(j -> 0).collect(Collectors.toList()))
            .collect(Collectors.toList());
        
        int count=1;
        int targetRow= 0;
        int targetCol=0;

        for(int i=totalRow-1; i>=0; i--) {
            
            List<Integer> row=new ArrayList<>();

            for(int j=0; j<w; j++)  {
                
                if(count>n) {
                    row.add(0);
                    continue;
                }
                row.add(count++);
            }
            
            int reverseCount=totalRow%2==0? 0:1;
            if(i%2==reverseCount) Collections.reverse(row);
            
            box.set(i, row);

            // 찾아야할 숫자의 위치 찾기
            if(row.contains(num)) {
                targetRow=i;
                targetCol=row.indexOf(num);
            }
        }
        
        // 내 위치에서 위로 몇개가 있는지 찾기
        for(int i=0; i<=targetRow; i++) {

            if(box.get(i).get(targetCol)!=0) {
                answer++;
            }
        }

        // for(int i=0; i<totalRow; i++) {
        //     System.out.println(box.get(i));
        // }

        return answer;
    }

    public static void main(String[] args) throws Exception {
        System.out.println("Hello, World!");
        System.out.println(solution(22, 6, 8));
        System.out.println(solution(13, 3, 6));
    }
}
