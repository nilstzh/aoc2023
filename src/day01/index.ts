import run from "aocrunner";

function parseInput(input: string): string[] {
  return input.split("\n");
}

const part1 = (rawInput: string) => {
  function findNums(word: string): string {
    const firstDigit = word.match(/\d/);
    const lastDigit = word.match(/\d(?!.*\d)/);

    return (firstDigit?.[0] ?? "0") + (lastDigit?.[0] ?? "0");
  }

  const input = parseInput(rawInput);
  const numbers = input.map((word) => findNums(word));
  const result = numbers.reduce((sum, num) => sum + parseInt(num, 10), 0);

  return result;
};

const part2 = (rawInput: string) => {
  type DigitMap = { [key: string]: string };

  const digitMap: DigitMap = {
    one: "1",
    two: "2",
    six: "6",
    four: "4",
    five: "5",
    nine: "9",
    three: "3",
    seven: "7",
    eight: "8",
  };

  const regex = /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g;

  function findNums(word: string): string {
    const matches = Array.from(word.matchAll(regex), (match) => match[1]);

    const normalizedNums = matches
      .slice(0, 1)
      .concat(matches.slice(-1))
      .map((num) => {
        return digitMap[num] ?? num;
      });

    return (normalizedNums[0] || "") + (normalizedNums[1] || "");
  }

  const input = parseInput(rawInput);
  const numbers = input.map(findNums);
  const result = numbers.reduce(
    (sum, current) => sum + parseInt(current, 10),
    0,
  );

  return result;
};

run({
  part1: {
    tests: [
      {
        input: `
          1abc2
          pqr3stu8vwx
          a1b2c3d4e5f
          treb7uchet
        `,
        expected: 142,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        two1nine
        eighthree
        abcone2threexyz
        xtwone3four
        4nineeightseven2
        zoneight234
        7pqrstsixteen
        `,
        expected: 281,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
