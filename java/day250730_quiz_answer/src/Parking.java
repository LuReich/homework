// package day250730_quiz_answer;

import java.time.LocalTime;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;
import java.util.Arrays;

public class Parking {

    public static int[] solution(int[] fees, String[] records) {

        Map<String, String> carMap=new HashMap<>();
        Map<String, Integer> carTimeMap=new TreeMap<>();

        for(String record: records) {
            String[] carInfo=record.split(" ");

            if(!carMap.containsKey(carInfo[1])) {
                // 입차
                carMap.put(carInfo[1], carInfo[0]);
                continue;
            } else {
                // 출차
                String inTime=carMap.get(carInfo[1]);
                String outTime=carInfo[0];
                
                // 머문 시간을 분으로 계산
                int stayTime=timeToMins(outTime)-timeToMins(inTime);
                
                // 차량 시간을 등록
                carTimeMap.put(carInfo[1], carTimeMap.getOrDefault(carInfo[1], 0)+stayTime);
                carMap.remove(carInfo[1]);      // 출차된 차 정보 삭제

            }
        }

        for(String key: carMap.keySet()) {

            int inTime=timeToMins(carMap.get(key));
            int outTime=timeToMins("23:59");

            int stayTime=outTime-inTime;

            carTimeMap.put(key, carTimeMap.getOrDefault(key, 0)+ stayTime);
        }

        int[] answer=new int[carTimeMap.size()];
        int i=0;    // answer index 처리용 변수

        for(String key: carTimeMap.keySet()) {
            int stayTime=carTimeMap.get(key);

            // 주차 시간이 기본시간을 넘지 않으면
            if(stayTime<=fees[0]) {
                answer[i++]=fees[1];
                continue;
            }

            // 기본 시간 초과
            int overTime=stayTime-fees[0];
            int charge=fees[1]+(int)(Math.ceil((double)overTime/fees[2])*fees[3]);

            answer[i++]=charge;

        }

        return answer;

    }

    // 시간 계산하기
    public static int timeToMins(String time) {

        String[] times=time.split(":");
        LocalTime localTime=LocalTime.of(Integer.parseInt(times[0]), Integer.parseInt(times[1]));

        int totalMins=localTime.getHour()*60+localTime.getMinute();

        return totalMins;
    }

    public static void main(String[] args) {
        

        String[] records={"05:34 5961 IN", "06:00 0000 IN", "06:34 0000 OUT", "07:59 5961 OUT", "07:59 0148 IN", "18:59 0000 IN", "19:09 0148 OUT", "22:59 5961 IN", "23:00 5961 OUT"};
        int[] fees={180, 5000, 10, 600};

        int[] answer=Parking.solution(fees, records);
        

        System.out.println(Arrays.toString(answer));
    }
}