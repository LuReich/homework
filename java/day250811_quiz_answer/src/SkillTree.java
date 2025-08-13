public class SkillTree {
    public static void main(String[] args) throws Exception {

        String skill="CBD";
        String[] skill_trees={"BACDE", "CBADF", "AECB", "BDA"};

        System.out.println("답: "+solution(skill, skill_trees));
        
    }

    public static int solution(String skill, String[] skill_trees) {

        int answer=0;

        for(String s: skill_trees) {
            
            int pos=0;

            for(int i=0; i<s.length();  i++) {
                // 스킬 순서가 맞아야 하니까 skill_trees 의 단어를 하나씩 비교해서 순서 찾기

                char ch=s.charAt(i);

                // 없으면 패스
                if(skill.indexOf(ch)==-1) continue;

                if(skill.indexOf(ch)==pos) {
                    // 같은 단어가 있고, 순서도 맞음
                    pos++;
                } else {
                    // 같은 단어는 있는데, 순서가 안맞음
                    pos=-1;
                    break;
                }
            }

            // 스킬 단어가 하나도 없는 스킬 트리라면 pos 가 0이 나올 수 도 있음
            if(pos>=0) answer++;

        }
        return answer;
    }
}
