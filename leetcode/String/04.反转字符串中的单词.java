package String;

class SolutionReverse {

    public String replaceSpace(String s) {
        StringBuffer s1 = removeSpend(s);
        reverseString(s1, 0, s1.length() - 1);
        reverseWords(s1);
        return s1.toString();
    }

    public void reverseWords(StringBuffer s){
        int left = 0;
        int right = 0;
        int len = s.length();
        while (left < len){
            while (right < len && s.charAt(right) != ' ') {
                right++;
            }
            reverseString(s, left, right - 1);
            left = right + 1;
            right = left + 1;
        }
    }

    /**
     * reverseString 反转字符串
     * @param s StringBuffer
     * @param start int
     * @param end int
     */
    public void reverseString(StringBuffer s, int start, int end){
        while (start < end){
            char temp = s.charAt(start);
            s.setCharAt(start, s.charAt(end));
            s.setCharAt(end, temp);
            start++;
            end--;
        }
    }

    /**
     * removeSpend
     * @param s
     * @return
     */
    public StringBuffer removeSpend(String s) {
        int left = 0;
        int right = s.length() - 1;
        while (s.charAt(left) == ' ')
            left++;
        while (s.charAt(right) == ' ')
            right--;
        StringBuffer stringBuffer = new StringBuffer();
        while (left < right) {
            if (s.charAt(left) != ' ' || s.charAt(left - 1) != ' ') {
                stringBuffer.append(s.charAt(left));
            }
            left++;
        }
        return stringBuffer;
    }

    public static void main(String[] args) {
        SolutionReverse solutionReverse = new SolutionReverse();
        System.out.println(solutionReverse.replaceSpace("this sky is blue!"));
    }

}
