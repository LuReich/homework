import java.util.HashMap;
import java.util.Map;
import java.util.Set;

class Friend {

    // 나의 선물 지수
    private int myPoint;
    // 내가 준 사람과 횟수
    private Map<String, Integer> toGive = new HashMap<>();

    public void setMyPoint(int point) {
        this.myPoint+= point;
    }

    public int getMyPoint() {
        return this.myPoint;
    }

    public void setToGive(String name) {
        toGive.put(name, toGive.getOrDefault(name, 0) + 1);
    }

    // 내가 상대방에게 준 선물 개수
    public int getGiveCount(String name) {
        return toGive.containsKey(name) ? toGive.get(name) : 0;
    }
}

public class Present {

    public static int solution(String[] friends, String[] gifts) {

        int answer=0;

        // 선물 주고받는 목록
        Map<String, Friend> userMap = new HashMap<>();

        for (String me : friends) {
            Friend friend = new Friend();

            for (String gift : gifts) {
                String[] person = gift.split(" ");

                if (me.equals(person[0])) {
                    // 준 사람
                    friend.setMyPoint(1);
                    friend.setToGive(person[1]);
                } else if(me.equals(person[1])) {
                    // 내가 받은 사람
                    friend.setMyPoint(-1);
                }
            }
            userMap.put(me, friend);
        }

        // 비교
        for(String me: userMap.keySet()) {
            // 내가 받은 선물 개수
            int myPresentCount=0;
            // 내가 선물 준 애들 (내가 받아야할 대상)
            Friend myPresentInfo=userMap.get(me);

            // 비교하기 위해서 친구 목록 가져오기.
            for(String compare: friends) {
                if(me.equals(compare)) {
                    continue;
                }

                // 비교 대상이 선물 준 정보
                Friend comparePerson=userMap.get(compare);

                // 내가 상대방한테 준 선물 개수가 많을 경우
                if(myPresentInfo.getGiveCount(compare)-comparePerson.getGiveCount(me)>0) {
                    myPresentCount++;
                } else if(myPresentInfo.getGiveCount(compare)-comparePerson.getGiveCount(me)==0) {
                    // 둘이 동등할 경우 선물지수를 비교
                    if(myPresentInfo.getMyPoint()>comparePerson.getMyPoint()) {
                        myPresentCount++;
                    }   // 선물 지수가 상대방과 같거나 적으면 포인트 없음
                }
            }
            answer=Math.max(answer, myPresentCount);
        }

        return answer;
    }

    public static void main(String[] args) {

        String[] friends = { "muzi", "ryan", "frodo", "neo" };
        String[] gifts = { "muzi frodo", "muzi frodo", "ryan muzi", "ryan muzi", "ryan muzi", "frodo muzi",
                "frodo ryan", "neo muzi" };

        System.out.println("가장 많이 받은 개수: "+Present.solution(friends, gifts));
    }
}
