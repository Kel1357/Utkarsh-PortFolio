const JUDGE='https://ce.judge0.com';
const LANG={113:'Python 3.14',105:'C++ GCC 14.1',103:'C GCC 14.1',102:'JavaScript Node 22',91:'Java 17',106:'Go 1.22',108:'Rust 1.85'};
const STORAGE='utk1357_archive_code_quiz_v2';
const $=id=>document.getElementById(id);
const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shuffle=a=>[...a].sort(()=>Math.random()-.5);

// Twenty coding problems. Ten are selected randomly for each run.
const POOL=[
{id:'two-sum',title:'Two Sum',source:'LeetCode #1',url:'https://leetcode.com/problems/two-sum/',topic:'ARRAY / HASH MAP',prompt:'For each test case, read an integer array and a target. Print the zero-based indices of two different elements whose values add to the target. Every case has exactly one valid pair. The two indices may be printed in either order.',input:'T\nFor each case:\nn\na1 a2 ... an\ntarget',output:'One line per case: i j',constraints:['2 ≤ n ≤ 10⁴','Values fit signed 32-bit integers','Do not reuse the same element'],hint:'For each value x, think about the partner target − x and how to remember values already seen.',tests:[['4\n2 7 11 15\n9','0 1'],['3\n3 2 4\n6','1 2'],['5\n-4 9 2 7 5\n3','0 2'],['4\n1 5 3 7\n8','1 2']],hidden:[['6\n10 4 6 2 9 1\n8','1 2'],['5\n-5 12 7 3 8\n3','0 3'],['7\n4 1 9 2 6 8 3\n10','0 2']],explain:'This problem can be solved in several valid ways, including checking pairs directly, sorting values while preserving original indices, or using a hash map. The judge validates whether the submitted pair is actually valid for each test case, so brute force, sorting with original indices, hashing, or any other correct implementation is accepted.'},
{id:'duplicate',title:'Contains Duplicate',source:'LeetCode #217',url:'https://leetcode.com/problems/contains-duplicate/',topic:'ARRAY / HASH SET',prompt:'For each test case, determine whether any value appears at least twice. Print true when a duplicate exists and false otherwise.',input:'T\nFor each case:\nn\na1 a2 ... an',output:'true or false per case',constraints:['1 ≤ n ≤ 10⁵','Values fit signed 32-bit integers'],hint:'Keep a set of values already encountered. A repeated value decides the case immediately.',tests:[['4\n1 2 3 1','true'],['4\n1 2 3 4','false'],['6\n5 5 2 7 8 2','true'],['3\n-1 0 1','false']],hidden:[['7\n8 4 2 9 7 6 3','false'],['8\n1 4 8 4 2 9 7 6','true'],['5\n-2 -1 -2 4 5','true']],explain:'A hash set records each value as it appears. Seeing an existing value means the array contains a duplicate.'},
{id:'parentheses',title:'Valid Parentheses',source:'LeetCode #20',url:'https://leetcode.com/problems/valid-parentheses/',topic:'STRING / STACK',prompt:'For each test case, read a string containing only (), {}, and []. Print true only if every opening bracket is closed by the matching type in the correct order.',input:'T\nFor each case: one bracket string',output:'true or false per case',constraints:['1 ≤ length ≤ 10⁴','Only (), {}, [] occur'],hint:'The most recently opened bracket must be the first one closed.',tests:[['()','true'],['([])','true'],['([)]','false'],['{[()]}','true']],hidden:[['(]','false'],['([{}])','true'],['(((','false'],['{[]}()','true']],explain:'Use a stack for opening brackets. Each closing bracket must match the stack top, and the stack must be empty at the end.'},
{id:'binary-search',title:'Binary Search',source:'LeetCode #704',url:'https://leetcode.com/problems/binary-search/',topic:'ARRAY / BINARY SEARCH',prompt:'For each sorted array, find the zero-based index of target. Print -1 if target is absent.',input:'T\nFor each case:\nn\na1 a2 ... an\ntarget',output:'One index per case',constraints:['Array is strictly increasing','1 ≤ n ≤ 10⁴'],hint:'Compare the target with the middle element and discard the half that cannot contain it.',tests:[['6\n-1 0 3 5 9 12\n9','4'],['6\n-1 0 3 5 9 12\n2','-1'],['5\n1 4 8 13 20\n1','0'],['5\n1 4 8 13 20\n20','4']],hidden:[['7\n-9 -4 -1 2 6 11 18\n-9','0'],['7\n-9 -4 -1 2 6 11 18\n11','5'],['7\n-9 -4 -1 2 6 11 18\n5','-1']],explain:'Maintain a search interval and repeatedly inspect its midpoint. The sorted order lets each comparison discard half the remaining elements.'},
{id:'stock',title:'Best Time to Buy and Sell Stock',source:'LeetCode #121',url:'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',topic:'ARRAY / GREEDY',prompt:'For each price array, choose one day to buy and a later day to sell. Print the maximum profit. If no positive profit is possible, print 0.',input:'T\nFor each case:\nn\np1 p2 ... pn',output:'Maximum profit per case',constraints:['1 ≤ n ≤ 10⁵','0 ≤ price ≤ 10⁴','Buy must happen before sell'],hint:'Remember the cheapest price seen so far and compare today as a possible selling day.',tests:[['6\n7 1 5 3 6 4','5'],['5\n7 6 4 3 1','0'],['5\n2 4 1 8 3','7'],['1\n9','0']],hidden:[['6\n3 8 2 9 1 7','7'],['5\n10 2 5 1 6','5'],['6\n1 2 3 4 5 6','5']],explain:'Track the minimum price seen so far and the best profit produced by selling at each later price. This gives an O(n) scan.'},
{id:'move-zeroes',title:'Move Zeroes',source:'LeetCode #283',url:'https://leetcode.com/problems/move-zeroes/',topic:'ARRAY / TWO POINTERS',prompt:'For each test case, move every zero to the end while preserving the relative order of all non-zero values. Print the resulting array.',input:'T\nFor each case:\nn\na1 a2 ... an',output:'One transformed array per case',constraints:['1 ≤ n ≤ 10⁴','Do not sort the values','Preserve non-zero order'],hint:'Think of a write position for the next non-zero value while another pointer scans the array.',tests:[['5\n0 1 0 3 12','1 3 12 0 0'],['1\n0','0'],['6\n1 0 2 0 0 4','1 2 4 0 0 0'],['4\n5 6 7 8','5 6 7 8']],hidden:[['7\n0 0 5 0 2 8 0','5 2 8 0 0 0 0'],['5\n3 0 4 0 5','3 4 5 0 0'],['6\n0 1 2 3 0 4','1 2 3 4 0 0']],explain:'Compact non-zero values toward the front with a write pointer, then fill the remaining positions with zeros.'},
{id:'anagram',title:'Valid Anagram',source:'LeetCode #242',url:'https://leetcode.com/problems/valid-anagram/',topic:'STRING / FREQUENCY',prompt:'For each test case, read two lowercase strings. Print true if they contain exactly the same letters with the same frequencies, otherwise print false.',input:'T\nFor each case:\ns\nt',output:'true or false per case',constraints:['1 ≤ length ≤ 10⁴','Lowercase English letters only'],hint:'Compare the frequency of every character in the two strings.',tests:[['anagram\nnagaram','true'],['rat\ncar','false'],['listen\nsilent','true'],['abc\nabd','false']],hidden:[['aacc\nccac','true'],['hello\nolleh','true'],['abcd\nabce','false']],explain:'Two strings are anagrams when every character occurs the same number of times in both strings.'},
{id:'merge-array',title:'Merge Sorted Arrays',source:'LeetCode #88',url:'https://leetcode.com/problems/merge-sorted-array/',topic:'ARRAY / TWO POINTERS',prompt:'For each test case, read two sorted arrays and print one sorted array containing every value from both arrays.',input:'T\nFor each case:\nn m\nfirst array\nsecond array',output:'Merged values in non-decreasing order',constraints:['1 ≤ n,m ≤ 10⁴','Both arrays are already sorted'],hint:'Use one pointer in each sorted array and repeatedly take the smaller current value.',tests:[['3 3\n1 2 3\n2 5 6','1 2 2 3 5 6'],['3 2\n1 4 9\n2 8','1 2 4 8 9'],['2 4\n0 5\n-1 2 3 7','-1 0 2 3 5 7'],['1 1\n4\n4','4 4']],hidden:[['4 3\n1 3 7 10\n2 2 9','1 2 2 3 7 9 10'],['2 5\n5 8\n1 2 3 4 9','1 2 3 4 5 8 9']],explain:'Because both inputs are sorted, two moving pointers can merge them in linear time without sorting the combined array.'},
{id:'reverse-array',title:'Reverse an Array',source:'GeeksforGeeks — Reverse an Array',url:'https://www.geeksforgeeks.org/problems/reverse-an-array/1',topic:'ARRAY / TWO POINTERS',prompt:'Reverse each input array and print the resulting sequence.',input:'T\nFor each case:\nn\na1 a2 ... an',output:'One reversed array per case',constraints:['1 ≤ n ≤ 10⁵','Elements are integers'],hint:'Place one pointer at each end and swap while the pointers move toward the center.',tests:[['6\n1 4 3 2 6 5','5 6 2 3 4 1'],['3\n4 5 2','2 5 4'],['1\n9','9'],['5\n10 20 30 40 50','50 40 30 20 10']],hidden:[['4\n-2 0 7 8','8 7 0 -2'],['7\n1 2 3 4 5 6 7','7 6 5 4 3 2 1']],explain:'Two pointers from the ends let you swap each mirrored pair and reverse the array in O(n) time.'},
{id:'missing-number',title:'Missing Number',source:'GeeksforGeeks — Missing in Array',url:'https://www.geeksforgeeks.org/problems/missing-number-in-array1416/1',topic:'ARRAY / MATH',prompt:'For each test case, the input contains n−1 distinct integers from 1 through n. Print the one missing value.',input:'T\nFor each case:\nn\na1 a2 ... a(n−1)',output:'Missing value per case',constraints:['2 ≤ n ≤ 10⁵','Values are distinct and lie in 1..n'],hint:'Compare the complete 1..n range with the values that actually appear.',tests:[['5\n1 2 3 5','4'],['4\n1 2 4','3'],['6\n1 2 3 4 6','5'],['3\n1 3','2']],hidden:[['7\n1 2 3 4 6 7','5'],['8\n2 3 4 5 6 7 8','1'],['9\n1 2 3 4 5 6 8 9','7']],explain:'The missing value can be found from the complete 1..n range and the values present, using a sum or XOR-based approach.'},
{id:'palindrome-string',title:'Check Palindrome',source:'GeeksforGeeks — Check Palindrome',url:'https://www.geeksforgeeks.org/problems/check-palindrome--141628/1',topic:'STRING / TWO POINTERS',prompt:'For each test case, read a lowercase string and print true if it reads the same forward and backward, otherwise print false.',input:'T\nFor each case: one lowercase string',output:'true or false per case',constraints:['1 ≤ length ≤ 10⁴','Lowercase letters only'],hint:'Compare characters symmetrically from the two ends toward the center.',tests:[['tenet','true'],['hello','false'],['level','true'],['coding','false']],hidden:[['a','true'],['abba','true'],['abcba','true'],['abca','false']],explain:'A palindrome has matching characters at equal distances from the two ends.'},
{id:'palindrome-array',title:'Palindrome Array',source:'GeeksforGeeks — Palindrome Array',url:'https://www.geeksforgeeks.org/problems/perfect-arrays4645/1',topic:'ARRAY / TWO POINTERS',prompt:'For each test case, determine whether the integer array reads the same from left to right and right to left.',input:'T\nFor each case:\nn\na1 a2 ... an',output:'true or false per case',constraints:['1 ≤ n ≤ 10⁴','Elements are integers'],hint:'Check mirrored pairs: first with last, second with second-last, and so on.',tests:[['5\n1 2 3 2 1','true'],['5\n1 2 3 4 5','false'],['4\n1 2 2 1','true'],['3\n1 2 1','true']],hidden:[['6\n4 7 8 8 7 4','true'],['4\n1 2 3 1','false'],['1\n9','true']],explain:'Only mirrored pairs need to be compared; a single mismatch makes the array non-palindromic.'},
{id:'bit-plus',title:'Bit++',source:'Codeforces 282A — Bit++',url:'https://codeforces.com/problemset/problem/282/A',topic:'IMPLEMENTATION / SIMULATION',prompt:'Start x at 0. Each statement is ++X, X++, --X or X--. After all statements, print x.',input:'T\nFor each case:\nn\nn lines of operations',output:'Final x per case',constraints:['1 ≤ n ≤ 150','Only ++X, X++, --X, X-- occur'],hint:'The position of X does not matter; only ++ versus -- changes the value.',tests:[['2\n++X\n--X','0'],['4\nX++\n++X\n--X\nX++','2'],['3\n--X\n--X\nX++','-1'],['1\n++X','1']],hidden:[['5\n++X\n++X\nX--\n--X\nX++','1'],['3\nX++\nX++\nX++','3']],explain:'Each operation changes one integer by exactly one. Count increments and decrements while reading the statements.'},
{id:'next-round',title:'Next Round',source:'Codeforces 158A — Next Round',url:'https://codeforces.com/problemset/problem/158/A',topic:'ARRAY / IMPLEMENTATION',prompt:'Scores are sorted from highest to lowest. A participant advances if their score is positive and at least the score of the participant in position k. Print the number who advance.',input:'T\nFor each case:\nn k\ns1 s2 ... sn',output:'Number of advancing participants',constraints:['1 ≤ k ≤ n ≤ 50','Scores are non-increasing','Only positive scores advance'],hint:'The k-th score is the threshold. Count scores that meet it and are greater than zero.',tests:[['8 5\n10 9 8 7 7 7 5 5','6'],['4 2\n0 0 0 0','0'],['5 3\n5 4 4 3 1','3'],['5 2\n9 8 8 8 7','4']],hidden:[['6 3\n10 8 8 7 5 1','3'],['5 1\n5 4 3 2 1','5']],explain:'Use the k-th score as the cutoff, then count every positive score at or above that cutoff.'},
{id:'wrong-subtraction',title:'Wrong Subtraction',source:'Codeforces 977A — Wrong Subtraction',url:'https://codeforces.com/problemset/problem/977/A',topic:'SIMULATION',prompt:'Repeat k times: if the last digit is non-zero, subtract 1; otherwise divide the number by 10. Print the final value.',input:'T\nFor each case: n k',output:'Final value per case',constraints:['2 ≤ n ≤ 10⁹','1 ≤ k ≤ 50'],hint:'Inspect the last digit before each operation. Zero means divide by 10; otherwise subtract one.',tests:[['512 4','50'],['12345 3','12342'],['20 2','18'],['100 2','9']],hidden:[['1000000000 9','1'],['99 5','94'],['1000 3','7']],explain:'This problem is a direct k-step simulation based only on the current last digit.'},
{id:'beautiful-matrix',title:'Beautiful Matrix',source:'Codeforces 263A — Beautiful Matrix',url:'https://codeforces.com/problemset/problem/263/A',topic:'MATRIX / MANHATTAN DISTANCE',prompt:'Each test case contains a 5×5 matrix with exactly one 1. Print the minimum adjacent row/column moves needed to bring the 1 to the center cell.',input:'T\nFor each case: 5 lines, each with 5 integers',output:'Minimum moves per case',constraints:['Exactly one cell contains 1','Center is row 3, column 3 using 1-based indexing'],hint:'Only the row distance from 3 and column distance from 3 matter.',tests:[['0 0 0 0 0\n0 0 0 0 1\n0 0 0 0 0\n0 0 0 0 0\n0 0 0 0 0','3'],['0 0 0 0 0\n0 0 0 0 0\n0 1 0 0 0\n0 0 0 0 0\n0 0 0 0 0','1'],['1 0 0 0 0\n0 0 0 0 0\n0 0 0 0 0\n0 0 0 0 0\n0 0 0 0 0','4'],['0 0 0 0 0\n0 0 0 0 0\n0 0 1 0 0\n0 0 0 0 0\n0 0 0 0 0','0']],hidden:[['0 0 0 0 0\n0 0 0 0 0\n0 0 0 0 0\n0 0 0 1 0\n0 0 0 0 0','1'],['0 0 0 0 0\n0 0 0 0 0\n0 0 0 0 0\n0 0 0 0 0\n0 0 0 0 1','4']],explain:'Each adjacent move changes the row or column by one, so the answer is the Manhattan distance to (3,3).'},
{id:'team',title:'Team',source:'Codeforces 231A — Team',url:'https://codeforces.com/problemset/problem/231/A',topic:'IMPLEMENTATION / COUNTING',prompt:'For each test case, read n problems. Each problem has three 0/1 confidence values. Count how many problems have at least two values equal to 1.',input:'T\nFor each case:\nn\nthree values per problem, one line each',output:'Number of selected problems per case',constraints:['1 ≤ n ≤ 1000','Each confidence value is 0 or 1'],hint:'For each row, add the three values and check whether the total reaches two.',tests:[['3\n1 1 0\n1 0 0\n1 1 1','2'],['2\n0 0 0\n1 1 0','1'],['4\n1 1 1\n0 1 1\n1 0 0\n0 0 0','2']],hidden:[['5\n1 0 1\n0 0 0\n1 1 0\n0 1 1\n1 0 0','3'],['1\n1 1 0','1']],explain:'A problem is selected when the sum of its three confidence values is at least two.'},
{id:'watermelon',title:'Watermelon',source:'Codeforces 4A — Watermelon',url:'https://codeforces.com/problemset/problem/4/A',topic:'MATH / PARITY',prompt:'For each test case, read an integer weight w. Print YES if w can be split into two positive even integers, otherwise print NO.',input:'T\nFor each case: w',output:'YES or NO per case',constraints:['1 ≤ w ≤ 100','Both resulting parts must be positive and even'],hint:'A sum of two positive even integers has a particular parity, and the smallest possible split matters.',tests:[['8','YES'],['2','NO'],['7','NO'],['10','YES']],hidden:[['4','YES'],['6','YES'],['1','NO'],['3','NO']],explain:'The weight must be even and greater than 2 so that it can be split into two positive even parts.'},
{id:'petya-strings',title:'Petya and Strings',source:'Codeforces 112A — Petya and Strings',url:'https://codeforces.com/problemset/problem/112/A',topic:'STRING / LEXICOGRAPHIC ORDER',prompt:'For each test case, read two lowercase-or-uppercase strings. Compare them case-insensitively and print -1 if the first is smaller, 1 if it is larger, or 0 if they are equal.',input:'T\nFor each case:\nfirst string\nsecond string',output:'-1, 0, or 1 per case',constraints:['1 ≤ length ≤ 100','Letters only','Comparison ignores letter case'],hint:'Normalize the case first, then compare the two strings lexicographically.',tests:[['aaaa\naaaA','0'],['aaaa\naaaB','-1'],['abcd\nAbca','1'],['Hello\nhello','0']],hidden:[['Code\ncode','0'],['apple\nApply','1'],['abc\nabcd','-1']],explain:'Convert both strings to the same case and then perform ordinary lexicographic comparison.'},
{id:'max-subarray',title:'Maximum Subarray',source:'LeetCode #53',url:'https://leetcode.com/problems/maximum-subarray/',topic:'ARRAY / DYNAMIC PROGRAMMING',prompt:'For each test case, find the largest possible sum of a non-empty contiguous subarray and print that sum.',input:'T\nFor each case:\nn\na1 a2 ... an',output:'Maximum contiguous-subarray sum',constraints:['1 ≤ n ≤ 10⁵','Values fit signed 32-bit integers','The chosen subarray must be non-empty'],hint:'At each position, decide whether extending the previous segment is better than starting fresh at the current value.',tests:[['9\n-2 1 -3 4 -1 2 1 -5 4','6'],['5\n1 2 3 4 5','15'],['5\n-1 -2 -3 -4 -5','-1'],['4\n5 -2 3 -1','5']],hidden:[['6\n-5 4 -1 7 -8 2','10'],['5\n-3 -1 -2 -4 -1','-1'],['6\n2 -1 2 3 -9 4','6']],explain:'Maintain the best subarray ending at the current position and the best answer seen overall. This gives an O(n) dynamic-programming scan.'}
];

const APPROACHES={
'two-sum':['Brute-force pair scan O(n²)','Sort + two pointers while retaining original indices O(n log n)','Hash map / complement lookup O(n)'],
'duplicate':['Nested comparison O(n²)','Sort then compare adjacent values O(n log n)','Hash set O(n)'],
'parentheses':['Stack of opening brackets O(n)','Equivalent counter/state logic for restricted bracket sets'],
'binary-search':['Iterative binary search O(log n)','Recursive binary search O(log n)','Linear scan O(n) for the same required result'],
'stock':['Brute-force buy/sell pairs O(n²)','Track minimum-so-far and maximum profit O(n)','Equivalent prefix-minimum formulation O(n)'],
'move-zeroes':['Build a second array O(n) extra space','Stable write-pointer compaction O(n)','Repeated swaps/two pointers O(n)'],
'anagram':['Sort both strings O(n log n)','Frequency table O(n)','Hash-map frequency counting O(n)'],
'merge-array':['Two-pointer merge O(n+m)','Concatenate then sort O((n+m) log(n+m))','Repeated minimum selection O((n+m)²)'],
'reverse-array':['Temporary reversed array O(n) extra space','Two-pointer swaps O(n) time, O(1) extra space','In-place library reverse'],
'missing-number':['Arithmetic-sum difference','XOR cancellation','Boolean/set marking'],
'palindrome-string':['Reverse and compare','Two-pointer comparison','Recursive comparison'],
'palindrome-array':['Reverse/copy and compare','Two-pointer comparison','Recursive comparison'],
'bit-plus':['Inspect each statement for ++/--','Count increments and decrements separately'],
'next-round':['Direct loop/count','Filter valid scores then count'],
'wrong-subtraction':['Simulate each operation','Apply the final digit rule with a loop'],
'beautiful-matrix':['Scan for 1 then Manhattan distance','Record row/column during traversal'],
'team':['Count statements with at least two confident votes','Sum each row then count sums ≥ 2'],
'watermelon':['Direct parity check','Check possible positive even split'],
'petya-strings':['Normalize case then lexicographically compare','Character-by-character case-insensitive comparison'],
'max-subarray':['Brute-force subarrays O(n²) or O(n³)','Kadane-style running best O(n)','Prefix-sum based scan O(n)']
};

let questions=[],index=0,answers=[],active=false,submitted=false,ending=false;
const startScreen=$('startScreen'),testScreen=$('testScreen'),resultScreen=$('resultScreen');
function show(id){[startScreen,testScreen,resultScreen].forEach(x=>x.classList.add('hidden'));$(id).classList.remove('hidden');}
function blankAnswer(){return {status:'draft',language:Number($('language').value),code:'',drafts:{},lastRun:null};}
function save(){
  const current=answers[index]||{};
  if(active && $('codeEditor')){
    const lang=Number($('language').value);
    current.drafts=current.drafts||{};
    current.drafts[lang]=$('codeEditor').value;
    current.language=lang;
    current.code=$('codeEditor').value;
    answers[index]=current;
  }
  localStorage.setItem(STORAGE,JSON.stringify({version:3,questions:questions.map(q=>q.id),answers,index,active,submitted,savedAt:Date.now()}));
}
function clearSaved(){localStorage.removeItem(STORAGE)}
function loadSaved(){try{return JSON.parse(localStorage.getItem(STORAGE)||'null')}catch{return null}}
function starter(){const lang=Number($('language').value);if(lang===113)return '# Read T and solve each test case.\nT = int(input())\nfor _ in range(T):\n    # write your solution here\n    pass\n';if(lang===102)return '// Read T and solve each test case.\nconst fs = require("fs");\nconst data = fs.readFileSync(0,"utf8").trim().split(/\\s+/);\nlet p=0;\nconst T=Number(data[p++]);\nconst out=[];\nfor(let tc=0;tc<T;tc++){\n  // write your solution here\n}\nconsole.log(out.join("\\n"));\n';if(lang===105)return '#include <bits/stdc++.h>\nusing namespace std;\nint main(){ios::sync_with_stdio(false);cin.tie(nullptr);\n int T; cin>>T; while(T--){\n   // write your solution here\n }\n}\n';if(lang===103)return '#include <stdio.h>\nint main(){ int T; scanf("%d",&T); while(T--){\n // write your solution here\n } return 0; }\n';if(lang===91)return 'import java.io.*;\nimport java.util.*;\npublic class Main { public static void main(String[] args) throws Exception {\n // read stdin and solve\n } }\n';if(lang===106)return 'package main\nimport "fmt"\nfunc main(){ var T int; fmt.Scan(&T); for(;T>0;T--){\n // write your solution here\n }}\n';return 'fn main() {\n    // read stdin and solve\n}\n';}
function currentAnswer(){return answers[index]||(answers[index]=blankAnswer())}
function currentCode(){const a=currentAnswer(),lang=Number($('language').value);return a.drafts?.[lang] ?? (a.language===lang&&a.code ? a.code : starter())}
function saveCurrentCode(markDraft=true){if(!active)return;const a=currentAnswer(),lang=Number($('language').value);a.drafts=a.drafts||{};a.drafts[lang]=$('codeEditor').value;a.language=lang;a.code=$('codeEditor').value;if(markDraft&&a.status!=='checking'){a.status='draft';a.lastRun=null}save()}
function renderQuestion(){
  const q=questions[index],a=currentAnswer();
  $('questionTitle').textContent=q.title;
  $('questionMeta').textContent=`${q.source}  //  EASY  //  ${q.topic}  //  ANY CORRECT SOLUTION ACCEPTED`;
  $('questionIndex').textContent=String(index+1).padStart(2,'0');
  $('progressText').textContent=`${String(index+1).padStart(2,'0')} / 10`;
  $('progressBar').style.width=`${((index+1)/10)*100}%`;
  $('questionSource').textContent=q.source;
  $('questionPrompt').textContent=q.prompt;
  $('questionTitleInline').textContent=q.title;
  $('questionTaskDetail').textContent=`Write a complete ${LANG[Number(a.language||$('language').value)] || 'program'} that reads every test case exactly as described and prints one result for each case. Your implementation can use any correct algorithm.`;
  $('sampleTests').innerHTML=q.tests.slice(0,4).map((t,i)=>`<div class="sample-test"><div class="sample-case"><span>CASE ${String(i+1).padStart(2,'0')}</span><small>INPUT</small><pre>${escapeHtml(t[0])}</pre></div><div class="sample-case expected"><span>EXPECTED OUTPUT</span><pre>${escapeHtml(t[1])}</pre></div></div>`).join('');
  $('questionInput').textContent=q.input;
  $('questionOutput').textContent=q.output;
  $('questionConstraints').innerHTML=q.constraints.map(x=>`<li>${escapeHtml(x)}</li>`).join('');
  $('questionSourceLink').href=q.url;
  $('questionHint').textContent=q.hint;
  $('questionHint').hidden=true;
  $('hintToggle').textContent='REVEAL HINT';
  const lang=Number(a.language||$('language').value);
  $('language').value=String(lang);
  $('codeEditor').value=currentCode();
  const last=a.lastRun;
  $('judgeState').textContent=a.status==='accepted'?'ACCEPTED':last?.label||'READY';
  $('judgeOutput').className=`judge-output ${last?.className||''}`;
  $('judgeOutput').innerHTML=`<span class="terminal-dot"></span><span>${escapeHtml(last?.message||'Compile & run the visible samples before submitting.')}</span>`;
  $('nextQuestion').disabled=a.status!=='accepted';
  $('nextQuestion').textContent=index===9?'VIEW REPORT →':'NEXT QUESTION →';
  $('answerState').textContent=a.status==='accepted'?'MISSION ACCEPTED':'WRITE → RUN → SUBMIT';
  renderQuestionNav();
}
function renderQuestionNav(){
  const nav=$('questionNav');
  nav.innerHTML=questions.map((q,i)=>{const a=answers[i]||{};const cls=[i===index?'current':'',a.status==='accepted'?'done':''].filter(Boolean).join(' ');return `<button type="button" class="${cls}" data-question="${i}" aria-label="Question ${i+1}">${String(i+1).padStart(2,'0')}</button>`}).join('');
  nav.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>{if(!active||submitted)return;saveCurrentCode(false);index=Number(btn.dataset.question);renderQuestion();save();window.scrollTo({top:0,behavior:'smooth'});}));
}
function buildInput(tests){return `${tests.length}\n${tests.map(t=>t[0]).join('\n')}`;}
function buildExpected(tests){return tests.map(t=>t[1]).join('\n');}
function normalizeOutput(s){return String(s??'').trim().split(/\s+/).filter(Boolean).join(' ');}
function validateTwoSumOutput(stdout,tests){
  const tokens=String(stdout??'').trim().split(/\s+/).filter(Boolean);
  if(tokens.length!==tests.length*2)return {ok:false,message:`Expected ${tests.length} index pairs, received ${Math.floor(tokens.length/2)} pair(s).`};
  for(let i=0;i<tests.length;i++){
    const lines=tests[i][0].trim().split(/\s+/).map(Number),n=lines[0],nums=lines.slice(1,1+n),target=lines[1+n];
    const a=Number(tokens[i*2]),b=Number(tokens[i*2+1]);
    if(!Number.isInteger(a)||!Number.isInteger(b)||a<0||b<0||a>=n||b>=n||a===b||nums[a]+nums[b]!==target)return {ok:false,message:`Pair ${i+1} is not a valid solution for its target.`};
  }
  return {ok:true,message:'All submitted index pairs are valid.'};
}
function validateJudgeOutput(q,stdout,tests){
  if(q.id==='two-sum')return validateTwoSumOutput(stdout,tests);
  const expected=normalizeOutput(buildExpected(tests)),actual=normalizeOutput(stdout);
  return actual===expected?{ok:true,message:'Output matches the required result.'}:{ok:false,message:'Output does not match the required result.'};
}
async function execute(q,code,lang,tests){
  const body={language_id:Number(lang),source_code:code,stdin:buildInput(tests),cpu_time_limit:3,memory_limit:128000};
  const post=async wait=>fetch(`${JUDGE}/submissions?base64_encoded=false&wait=${wait}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
  let res=await post('true');
  if(res.ok)return res.json();
  if(![400,429,503].includes(res.status))throw new Error(`Judge service returned HTTP ${res.status}`);
  res=await post('false');
  if(!res.ok)throw new Error(`Judge service returned HTTP ${res.status}`);
  const created=await res.json();
  if(!created.token)throw new Error('Judge did not return a submission token');
  for(let i=0;i<35;i++){
    await new Promise(r=>setTimeout(r,600));
    const poll=await fetch(`${JUDGE}/submissions/${created.token}?base64_encoded=false`);
    if(!poll.ok)throw new Error(`Judge polling returned HTTP ${poll.status}`);
    const result=await poll.json();
    if(result.status?.id&&!([1,2].includes(result.status.id)))return result;
  }
  throw new Error('Judge timed out while waiting for the sandbox result');
}
function setJudge(text,cls=''){const el=$('judgeOutput');el.className=`judge-output ${cls}`;el.innerHTML=`<span class="terminal-dot"></span><span>${escapeHtml(text)}</span>`;}
function recordRun(label,message,cls=''){currentAnswer().lastRun={label,message,className:cls,at:Date.now()};save();setJudge(message,cls);}
$('runCode').addEventListener('click',async()=>{
  if(!active||submitted)return;
  saveCurrentCode(false);const code=$('codeEditor').value.trim();if(!code){recordRun('EMPTY','EMPTY RUN // write a solution first','fail');return}
  $('runCode').disabled=true;$('submitCode').disabled=true;$('judgeState').textContent='COMPILING…';setJudge('COMPILE & RUN // compiling, executing visible samples, then checking their output…');
  try{const q=questions[index],r=await execute(q,code,$('language').value,q.tests);const check=r.status?.id===3?validateJudgeOutput(q,r.stdout,q.tests):{ok:false,message:r.status?.description||'Execution failed'};const ok=check.ok;const details=r.compile_output?` // ${r.compile_output}`:r.stderr?` // ${r.stderr}`:'';recordRun(ok?'SAMPLE PASS':'SAMPLE FAILED',ok?`SAMPLE PASS // ${r.time||'?'}s // ${r.memory||'?'} KB // ${check.message}`:`${check.message}${details}`,ok?'pass':'fail');$('judgeState').textContent=ok?'SAMPLE PASS':'SAMPLE FAILED';}
  catch(e){recordRun('OFFLINE',`COMPILE & RUN UNAVAILABLE // ${e.message}. Your code is still saved.`,'fail');$('judgeState').textContent='OFFLINE';}
  $('runCode').disabled=false;$('submitCode').disabled=false;
});
$('submitCode').addEventListener('click',async()=>{
  if(!active||submitted)return;
  saveCurrentCode(false);const code=$('codeEditor').value.trim();if(!code){recordRun('EMPTY','EMPTY SUBMISSION // write a solution first','fail');return}
  const a=currentAnswer();a.status='checking';a.code=code;a.language=Number($('language').value);save();
  $('runCode').disabled=true;$('submitCode').disabled=true;$('judgeState').textContent='JUDGING…';setJudge('FULL SUBMIT // compiling and running visible + hidden tests…');
  try{const q=questions[index],suite=q.tests.concat(q.hidden),r=await execute(q,code,$('language').value,suite),check=r.status?.id===3?validateJudgeOutput(q,r.stdout,suite):{ok:false,message:r.status?.description||'Execution failed'},ok=check.ok;
    a.status=ok?'accepted':'failed';a.time=r.time||null;a.memory=r.memory||null;a.lastRun={label:ok?'ACCEPTED':'REJECTED',message:ok?`ACCEPTED // full test suite passed // ${r.time||'?'}s // ${r.memory||'?'} KB // ${check.message}`:`${check.message}${r.compile_output?' // '+r.compile_output:''}${r.stderr?' // '+r.stderr:''}`,className:ok?'pass':'fail',at:Date.now()};save();
    $('judgeState').textContent=ok?'ACCEPTED':'REJECTED';setJudge(a.lastRun.message,a.lastRun.className);$('nextQuestion').disabled=!ok;$('answerState').textContent=ok?'MISSION ACCEPTED':'WRITE → RUN → FIX → SUBMIT';renderQuestionNav();
  }catch(e){a.status='draft';a.lastRun={label:'OFFLINE',message:`JUDGE UNAVAILABLE // ${e.message}. Code is saved; no score was assigned.`,className:'fail',at:Date.now()};save();$('judgeState').textContent='OFFLINE';setJudge(a.lastRun.message,'fail');}
  $('runCode').disabled=false;$('submitCode').disabled=false;
});
$('nextQuestion').addEventListener('click',()=>{if(answers[index]?.status!=='accepted')return;saveCurrentCode(false);if(index===9){finish('COMPLETED');return}index++;renderQuestion();save();window.scrollTo({top:0,behavior:'smooth'});});
$('hintToggle').addEventListener('click',()=>{$('questionHint').hidden=!$('questionHint').hidden;$('hintToggle').textContent=$('questionHint').hidden?'REVEAL HINT':'HIDE HINT';});
$('language').addEventListener('change',()=>{if(!active)return;saveCurrentCode(false);const a=currentAnswer(),lang=Number($('language').value);a.language=lang;$('codeEditor').value=a.drafts?.[lang] ?? starter();a.status=a.status==='accepted'?'draft':a.status;a.lastRun=null;$('nextQuestion').disabled=true;$('answerState').textContent='WRITE → RUN → SUBMIT';save();});
$('codeEditor').addEventListener('input',()=>{if(!active||submitted)return;saveCurrentCode(true);$('nextQuestion').disabled=currentAnswer().status!=='accepted';$('answerState').textContent='CODE SAVED LOCALLY → RUN → SUBMIT';});
function score(){return answers.filter(a=>a?.status==='accepted').length*10}
function finish(reason='COMPLETED'){
  if(submitted||ending)return;
  ending=true;saveCurrentCode(false);submitted=true;active=false;
  save();
  if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});
  renderResults(reason);
}
function renderResults(reason='COMPLETED'){
  show('resultScreen');document.body.classList.remove('quiz-active');
  const passed=answers.filter(a=>a?.status==='accepted').length,sc=passed*10,answered=answers.filter(a=>a?.code&&a.code.trim()).length;
  $('resultScore').textContent=`${sc}%`;
  const reasonText=reason==='FULLSCREEN_EXIT'?'FULLSCREEN EXIT DETECTED — TEST SEALED AT YOUR CURRENT PROGRESS.':reason==='BROWSER_EXIT'?'PAGE EXIT DETECTED — TEST SEALED AT YOUR SAVED PROGRESS.':'TEST COMPLETE — RESULTS SEALED.';
  $('resultSummary').textContent=`${reasonText} ${passed} of 10 missions were accepted. ${answered} questions had saved code. Score reflects only accepted submissions; unanswered or unaccepted work remains visible in the report.`;
  $('resultStats').innerHTML=`<div><b>${sc}/100</b><small>SCORE</small></div><div><b>${passed}</b><small>ACCEPTED</small></div><div><b>${10-passed}</b><small>NOT PASSED</small></div>`;
  $('resultList').innerHTML=questions.map((q,i)=>{const a=answers[i]||{},ok=a.status==='accepted',has=!!(a.code&&a.code.trim()),status=ok?'ACCEPTED':has?'IN PROGRESS':'NOT STARTED';return `<div class="result-row"><div class="r-num">${String(i+1).padStart(2,'0')}</div><div><h3>${escapeHtml(q.title)}</h3><p>${escapeHtml(q.explain)} · <strong>${escapeHtml(status)}</strong> · <a href="${q.url}" target="_blank" rel="noopener">${escapeHtml(q.source)} ↗</a></p></div><div class="verdict ${ok?'':'fail'}">${ok?'ACCEPTED':has?'SAVED':'NOT PASSED'}</div></div>`}).join('');
}
async function requestFullscreen(){
  if(document.fullscreenElement)return true;
  if(!document.documentElement.requestFullscreen)return false;
  try{
    await document.documentElement.requestFullscreen({navigationUI:'hide'});
    return !!document.fullscreenElement;
  }catch(e){
    return false;
  }
}
async function startNew(){
  clearSaved();questions=shuffle(POOL).slice(0,10);index=0;answers=questions.map(()=>blankAnswer());submitted=false;ending=false;
  active=true;show('testScreen');document.body.classList.add('quiz-active');history.replaceState({quiz:true},'',location.href);renderQuestion();save();window.scrollTo(0,0);
  // Best-effort automatic fullscreen. Browsers may reject programmatic fullscreen without a user gesture;
  // the test never asks the candidate to click a fullscreen button and continues normally if rejected.
  requestFullscreen();
}
function restore(){
  const s=loadSaved(),ids=s?.questions||[],restored=ids.map(id=>POOL.find(q=>q.id===id)).filter(Boolean);
  if(s?.autoExit&&restored.length===10){questions=restored;answers=s.answers||Array(10).fill(null);index=Math.min(s.index||0,9);submitted=true;active=false;ending=false;show('resultScreen');document.body.classList.remove('quiz-active');renderResults(s.exitReason||'BROWSER_EXIT');return true;}
  if(!s?.active||s.submitted||restored.length!==10)return false;
  questions=restored;answers=s.answers||Array(10).fill(null);index=Math.min(s.index||0,9);active=true;submitted=false;ending=false;show('testScreen');document.body.classList.add('quiz-active');renderQuestion();requestFullscreen();return true;
}
window.addEventListener('beforeunload',()=>{
  if(active&&!submitted){saveCurrentCode(false);localStorage.setItem(STORAGE,JSON.stringify({version:3,questions:questions.map(q=>q.id),answers,index,active:false,submitted:true,autoExit:true,exitReason:'BROWSER_EXIT',savedAt:Date.now()}));}
});
window.addEventListener('pagehide',()=>{if(active&&!submitted){saveCurrentCode(false);localStorage.setItem(STORAGE,JSON.stringify({version:3,questions:questions.map(q=>q.id),answers,index,active:false,submitted:true,autoExit:true,exitReason:'BROWSER_EXIT',savedAt:Date.now()}));}});
window.addEventListener('popstate',()=>{if(active&&!submitted){history.pushState({quiz:true},'',location.href);finish('BROWSER_EXIT');}});
document.addEventListener('click',e=>{const link=e.target.closest?.('a[href]');if(!link||!active||submitted)return;const href=link.getAttribute('href');if(!href||href.startsWith('#')||href.startsWith('javascript:'))return;e.preventDefault();finish('BROWSER_EXIT');setTimeout(()=>{window.location.href=link.href},150);});
document.addEventListener('fullscreenchange',()=>{if(active&&!submitted&&!document.fullscreenElement){finish('FULLSCREEN_EXIT');}});
document.addEventListener('keydown',e=>{if(active&&!submitted&&e.key==='Escape'){e.preventDefault();/* Escape exits browser fullscreen before JS can reliably block it; fullscreenchange seals the attempt immediately. */}});
if(!restore())startNew();
