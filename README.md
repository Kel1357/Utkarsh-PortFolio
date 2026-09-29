# Utkarsh Vijay — Portfolio

Personal portfolio for Utkarsh Vijay, a first-year B.Tech Computer Science & Engineering student at Bennett University.

## Current goal
- Master Data Structures & Algorithms
- Build a personal website independently, without relying on AI-generated solutions

## Current stack
- Python — Intermediate+
- C — Beginner+
- MATLAB — Beginner+
- SQL — Beginner
- C++ — Learning
- HTML — Learning
- Git & GitHub
- Linux / Ubuntu Terminal

## Profiles
- GitHub: https://github.com/Kel1357
- LinkedIn: https://www.linkedin.com/in/utkarsh-vijay-00a5452b4/
- LeetCode: https://leetcode.com/u/Utkarsh_online/
- Codeforces: https://codeforces.com/profile/Utkarsh1_2_3
- GeeksforGeeks: https://www.geeksforgeeks.org/profile/vijaym2jny

## Deploy on GitHub Pages
1. Upload the contents of this folder to your repository.
2. Keep `index.html` at the repository root.
3. In GitHub: Settings → Pages → Deploy from branch.
4. Select the branch containing the portfolio and `/root`.
### Contact form
The contact form uses FormSubmit to forward submissions to the configured college email. On first use, FormSubmit may require the recipient email to be confirmed before submissions are delivered.



## v16 UI/UX final polish
- Added verified University of Michigan certificate details for Problem Solving Using Computational Thinking.
- Added scroll progress, active navigation state, skip link, responsive navigation, focus states, and refined interaction styling.
- Contact and support controls now better match the warm gold visual system.

## v22 Archive Code Quiz
- `quiz.html` is a separate untimed coding test linked from the main portfolio, and the `UTK1357` wordmark Easter egg.
- Each run randomly selects 10 coding problems from a fixed 20-problem easy pool spanning LeetCode, GeeksforGeeks and Codeforces.
- The questions are code-writing tasks, not multiple-choice/objective questions.
- `RUN CODE` checks the visible sample suite before submission; `SUBMIT ANSWER` runs the complete configured suite through Judge0 CE.
- Only an accepted submission unlocks the next question. The final report shows accepted/not-passed results and source attribution.
- There is no countdown. Starting the test attempts browser fullscreen and normal site navigation is locked while the attempt is active; browser-level exits remain under browser control.
- The main portfolio now has a dedicated Code Testing section with the Code Quiz option.

### Archive Code Quiz sources
- LeetCode: Two Sum, Contains Duplicate, Valid Parentheses, Binary Search, Best Time to Buy and Sell Stock, Move Zeroes, Valid Anagram, Merge Sorted Array, Maximum Subarray.
- GeeksforGeeks: Reverse an Array, Missing Number, Check Palindrome, Palindrome Array.
- Codeforces: Bit++, Next Round, Wrong Subtraction, Beautiful Matrix, Team, Watermelon, Petya and Strings.
- Judge0 CE: remote sandbox execution API.


## v21 updates
- `SUBMIT MISSION` performs the full Judge0 run and only an accepted result enables the next mission.
- The coding prompt for Two Sum now explicitly requires the smaller index first so the judge's exact-output check is unambiguous.
- Credentials section updated from the supplied September/August 2026 screenshots: Digital Electronics — Online Digital Electronics Courses (Infosys Springboard), Symbolic Math Onramp (MathWorks), Problem Solving Using Computational Thinking (University of Michigan, credential ID 3B3H46BV5WGD), Introduction to Python (Infosys Springboard), and MATLAB Onramp (MathWorks).


### Quiz judging
- The untimed quiz accepts any correct algorithm/implementation in any language offered by the language selector.
- The judge is result-based rather than method-based: Two Sum uses a semantic validator so either index order and different valid implementation strategies are accepted. Deterministic-output problems are checked against their required output.
- Visible samples can be run before submission; the full hidden suite is used on submit.

### Certificate images
- Added the provided Infosys Springboard certificate image for **Introduction to Python**.
- Added the provided Infosys Springboard certificate image for **Digital Electronics — Online Digital Electronics Courses**.
- Images are stored under `assets/certificates/` and open at full size when selected from the Credentials section.


## v26 Quiz reliability updates
- The Archive Code Quiz requires fullscreen before an attempt starts.
- If fullscreen is exited, including through Escape, the attempt is immediately sealed and the current accepted score is shown. A website cannot technically prevent a browser from honoring its fullscreen-exit control, so the quiz treats that event as an automatic finish instead.
- Code is saved continuously to localStorage while typing, with separate saved drafts per language for each question.
- All 10 selected questions can be revisited through the question navigator.
- The Compile & Run action executes the current program against visible sample cases without submitting the question.
- Submit Answer executes the visible plus hidden test suite.
- A failed or edited accepted solution can be revised and resubmitted; editing an accepted solution clears its accepted state until it is checked again.
- Reloads/navigation/browser exits preserve the current saved attempt and show the partial result when the quiz is reopened.
- Judge output is validated client-side after Judge0 execution so whitespace differences are normalized and Two Sum accepts either index order.

## v28 Quiz UX updates
- The quiz opens directly into the active test; there is no separate start screen.
- The page makes a best-effort automatic Fullscreen API request immediately. No fullscreen button or fullscreen permission gate is shown. Browser security can still reject a programmatic fullscreen request when there is no user gesture; in that case the test continues rather than asking the candidate to click through a fullscreen prompt.
- If fullscreen is active and the candidate exits it, including with Escape, the attempt is sealed and the current score is shown.
- The coding workspace is now side-by-side on desktop: the full problem statement, input/output format, visible sample test cases, constraints and hint are shown beside a large editor.
- Four visible sample cases are shown for each selected question, with expected output, so candidates can understand the required behavior before running code.
- `COMPILE & RUN` executes the visible sample suite; `SUBMIT ANSWER` executes the visible and hidden suite.
- Code remains continuously saved per question and per language, and all ten selected questions remain revisitable through the question navigator.
