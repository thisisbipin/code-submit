import type { Problem } from "@/types"

export const problems: Problem[] = [
  {
    id: "4A",
    title: "Watermelon",
    tags: ["brute force", "math"],
    difficulty: "easy",
    statement: `One hot summer day Pete and his friend Billy decided to buy a watermelon. After the watermelon was weighed, the scales showed **w** kilos. They rushed home, dying of thirst, and decided to divide the watermelon, however they faced a hard problem.

Pete and Billy are great fans of even numbers, that's why they want to divide the watermelon in such a way that each of the two parts weighs an even number of kilos, at the same time it is not obligatory that the parts are equal. They are extremely tired and want to start their meal soon, that's why you should help them and find out, whether they can do it.

### Input
A single integer **w** (2 ≤ w ≤ 100) — the weight of the watermelon bought by the boys.

### Output
Print **YES**, if the boys can divide the watermelon into two parts, each of them weighing an even number of kilos; and **NO** in the opposite case.`,
    sampleInput: "8",
    sampleOutput: "YES",
    solvedCount: 263542,
  },
  {
    id: "71A",
    title: "Way Too Long Words",
    tags: ["strings"],
    difficulty: "easy",
    statement: `Sometimes some words like **localization** or **internationalization** are so long that writing them many times in one text is quite tiresome.

Let's consider a word *too long*, if its length is strictly more than 10 characters. All too long words should be replaced with a special abbreviation.

This abbreviation is made like this: we write down the first and the last letter of a word, and between them we write the number of letters between the first and the last letters. For example, **localization** becomes **l10n**, and **internationalization** becomes **i18n**.

### Input
The first line contains an integer **n** (1 ≤ n ≤ 100). Each of the following **n** lines contains one word. All the words consist of lowercase Latin letters and possess the lengths from 1 to 100 characters.

### Output
Print **n** lines — the words after abbreviation.`,
    sampleInput: `4
word
localization
internationalization
pneumonoultramicroscopicsilicovolcanoconiosis`,
    sampleOutput: `word
l10n
i18n
p43s`,
    solvedCount: 245081,
  },
  {
    id: "231A",
    title: "Team",
    tags: ["implementation"],
    difficulty: "easy",
    statement: `One day three best friends Petya, Vasya and Tonya decided to form a team and take part in programming contests. Participants are usually offered several problems to solve. During the contest, before each problem, each of the friends decides whether he or she is confident about solving the problem.

Only if at least two of the three friends are confident about the solution, they will submit it. Otherwise the friends will just skip the problem.

You are given the confidence of all three friends for each problem. Determine the number of problems the team will submit.

### Input
The first line contains an integer **n** (1 ≤ n ≤ 1000) — the number of problems. Then **n** lines follow, each containing three integers, each equal to 0 or 1. If the *j*-th number is 1, then the *j*-th friend is confident, otherwise not.

### Output
Print a single integer — the number of problems the team will submit.`,
    sampleInput: `3
1 1 0
1 1 1
1 0 0`,
    sampleOutput: `2`,
    solvedCount: 227430,
  },
  {
    id: "50A",
    title: "Domino Piling",
    tags: ["greedy", "math"],
    difficulty: "easy",
    statement: `You are given a rectangular board of **M × N** squares. Also you are given an unlimited number of standard domino pieces of 2 × 1 squares. You are allowed to rotate the pieces.

Determine the maximum number of dominoes you can place on the board, such that each domino covers exactly two squares and no two dominoes overlap.

### Input
A single line containing two integers **M** and **N** (1 ≤ M, N ≤ 16).

### Output
Print a single integer — the maximum number of dominoes.`,
    sampleInput: "2 4",
    sampleOutput: "4",
    solvedCount: 210934,
  },
  {
    id: "158A",
    title: "Next Round",
    tags: ["implementation", "sortings"],
    difficulty: "easy",
    statement: `Contestants who earn a score equal to or greater than the *k*-th place finisher's score will advance to the next round, as long as they have a positive score.

You are given the scores of the contestants and the number **k**. Determine how many contestants advance to the next round.

### Input
The first line contains two integers **n** and **k** (1 ≤ k ≤ n ≤ 50), separated by a single space. The second line contains **n** space-separated integers *a*₁, *a*₂, ..., *a*ₙ (0 ≤ *a*ᵢ ≤ 100), where *a*ᵢ is the score of the contestant who got the *i*-th place. The given sequence is non-increasing.

### Output
Print the number of contestants who advance to the next round.`,
    sampleInput: `8 5
10 9 8 7 7 7 5 5`,
    sampleOutput: `6`,
    solvedCount: 189214,
  },
  {
    id: "118A",
    title: "String Task",
    tags: ["strings", "implementation"],
    difficulty: "easy",
    statement: `Petya started to attend programming lessons. On the first lesson his task was to write a simple program.

The program takes a string and produces a new one following these rules:
1. Delete all the vowels from the string.
2. Insert a character "." before each consonant.
3. Replace all uppercase consonants with corresponding lowercase ones.

Vowels are the letters **A, O, Y, E, U, I**.

### Input
The single line contains a string of length from 1 to 100 characters, consisting of uppercase and lowercase Latin letters.

### Output
Print the resulting string.`,
    sampleInput: "tour",
    sampleOutput: ".t.r",
    solvedCount: 181703,
  },
  {
    id: "580A",
    title: "Kefa and First Steps",
    tags: ["dp", "brute force"],
    difficulty: "medium",
    statement: `Kefa decided to make some money doing business on the Internet for exactly **n** days. He knows that on the *i*-th day he will not make more money than on the *i*+1-th day.

Kefa forgot how many days he worked in total, but he remembers the sequence of incomes. He wants to determine the length of the longest non-decreasing subsegment of the sequence, i.e. the maximum number of consecutive days where the income on each day is not less than the income on the previous day.

### Input
The first line contains an integer **n** (1 ≤ n ≤ 10⁵). The second line contains **n** integers *a*₁, *a*₂, ..., *a*ₙ (1 ≤ *a*ᵢ ≤ 10⁹).

### Output
Print a single integer — the length of the longest non-decreasing subsegment.`,
    sampleInput: `6
2 2 1 3 4 1`,
    sampleOutput: `3`,
    solvedCount: 120554,
  },
  {
    id: "1B",
    title: "Spreadsheets",
    tags: ["strings", "implementation"],
    difficulty: "medium",
    statement: `In the popular spreadsheets systems (for example, in Excel) the following numeration of columns is used. The first column has number **A**, the second — **B**, etc. till column 26 that is denoted by **Z**. Then there are two-letter numbers: column 27 is **AA**, 28 is **AB**, column 52 is **AZ** and so on.

Your task is to convert column coordinates between **RC** format (rows and columns are numbered starting from 1, e.g. **R23C55**) and the spreadsheet format (e.g. **BC23**).

### Input
The first line contains an integer **n** (1 ≤ n ≤ 10⁵) — the number of coordinates to convert. Each of the following **n** lines contains a coordinate in one of the two formats described above.

### Output
For each coordinate print the same cell in the other format.`,
    sampleInput: `2
R23C55
BC23`,
    sampleOutput: `BC23
R23C55`,
    solvedCount: 85321,
  },
  {
    id: "466A",
    title: "Cheap Travel",
    tags: ["greedy", "math", "dp"],
    difficulty: "medium",
    statement: `Ann has recently started commuting by subway. She knows that riding one station on the subway costs **a** rubles, and she noticed that purchasing an **m**-ticket (the ticket that allows to make exactly **m** rides) costs **b** rubles. She can buy the *m*-tickets and single rides in any combination.

Ann wants to ride the subway exactly **n** times. Find the minimum sum of money she will have to spend.

### Input
A single line containing four integers **n**, **m**, **a**, **b** (1 ≤ n, m, a, b ≤ 1000).

### Output
Print a single integer — the minimum sum of money spent.`,
    sampleInput: `6 2 1 2`,
    sampleOutput: `6`,
    solvedCount: 61340,
  },
  {
    id: "520B",
    title: "Two Buttons",
    tags: ["greedy", "bfs", "constructive algorithms"],
    difficulty: "hard",
    statement: `Vasya has found a strange device. On the panel of the device there are two buttons: a red one (press it to multiply the displayed value by 2) and a blue one (press it to subtract 1 from the displayed value). If at some point the displayed value is 0, the device loses its power.

The gadget initially displays the number **n**. Vasya wants to display exactly **m** (m > n) on the device. The device will turn off instantly if it displays a value below 0. Determine the minimal number of button presses needed to turn the number **n** into **m**.

### Input
A single line containing two integers **n** and **m** (1 ≤ n, m ≤ 10⁴, m > n).

### Output
Print a single integer — the minimum number of presses.`,
    sampleInput: `4 6`,
    sampleOutput: `2`,
    solvedCount: 31208,
  },
]