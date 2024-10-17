import run from "aocrunner";
import { Init } from "v8";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let words = input.split("\n");

  function findNums(word: String) {
    let chars = word.split("");
    let first = chars.find((char) => !Number.isNaN(parseInt(char))) || "0";
    let last =
      chars.reverse().find((char) => !Number.isNaN(parseInt(char))) || "0";
    return first + last;
  }

  let numbers = words.map((word) => findNums(word));
  let result = numbers.reduce((partialSum, a) => partialSum + parseInt(a), 0);
  return result;
};

const part2 = (rawInput: string) => {
  let input = parseInput(rawInput);

  const regex = /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g;
  const digitMap: { [char: string]: string } = {
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

  let words = input.split("\n");

  function findNums(word: String) {
    const array = Array.from(word.matchAll(regex), (x) => x[1]);

    let normalizedNums = [array.at(0), array.at(-1)].map((num) => {
      if (Number.isNaN(parseInt(num!))) {
        return digitMap[num!];
      } else {
        return num;
      }
    });

    let result = (normalizedNums[0] || "") + (normalizedNums[1] || "");
    return result;
  }

  let numbers = words.map((word) => findNums(word));

  let result = numbers.reduce((partialSum, a) => partialSum + parseInt(a), 0);
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
