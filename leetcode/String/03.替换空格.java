package leetcode.String;

class Solution {
    public String replaceSpace(String s) {
        if (s == null && s.length() == 0)
            return s;
        StringBuffer stringBuffer = new StringBuffer();
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == ' ') {
                stringBuffer.append("  ");
            }
        }
        if (stringBuffer.length() == 0)
            return s;

        int left = s.length() - 1;
        s += stringBuffer.toString();
        int right = s.length() - 1;
        char[] chars = s.toCharArray();
        while (left >= 0) {
            if (s.charAt(left) == ' ') {
                chars[right] = '0';
                chars[--right] = '2';
                chars[--right] = '%';
            } else {
                chars[right] = s.charAt(left);
            }
            left--;
            right--;
        }
        return new String(chars);
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        System.out.println(solution.replaceSpace("We are happy."));
    }
}