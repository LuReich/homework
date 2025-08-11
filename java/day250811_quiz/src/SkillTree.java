import java.util.Arrays;

public class SkillTree {

    public int solution(String skill, String[] skill_trees) {
        int answer = 0;
        
        for (String skill_tree : skill_trees) {

            StringBuilder sb = new StringBuilder();
            
            // skill_tree 의 한 문자씩 skill에 들어가는지 판단
            for (char c : skill_tree.toCharArray()) {

                // skill 에 들어가있는 문자가 skill_tree 에 있다면 sb 안에 넣기
                // skill 에 들어가있는 문자가 아니면 -1이 반환되기 때문
                if (skill.indexOf(c) != -1) {
                    sb.append(c);
                }
            }

            // 만들어진 sb 문자열이 skill 문자열에 포함된다면 answer 값 증가
            if (skill.startsWith(sb.toString())) {
                answer++;
            }
        }
        return answer;
    }

    public static void main(String[] args) {
        // 테스트를 위한 코드
        SkillTree st = new SkillTree();
        String skill = "CBD";
        String[] skill_trees = {"BACDE", "CBADF", "AECB", "BDA"};
        int result = st.solution(skill, skill_trees);

        System.out.println("스킬 순서: " + skill);
        System.out.println("스킬 트리: " + Arrays.toString(skill_trees));
        System.out.println("가능한 개수: " + result); // 예상 결과: 2
    }
}//aa