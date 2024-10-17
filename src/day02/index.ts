import run from "aocrunner";

function parseInput(input: string): string[] {
  return input.split("\n");
}

type CubeSet = {
  blue: number;
  red: number;
  green: number;
};

type Game = {
  id: number;
  plays: CubeSet[];
};

const totalCubes: CubeSet = {
  red: 12,
  green: 13,
  blue: 14,
};

const part1 = (rawInput: string) => {
  function parsePlay(playData: string): CubeSet {
    const set = playData.split(",").map((setData) => setData.trim().split(" "));

    return set.reduce<CubeSet>(
      (acc, [count, color]) => {
        acc[color as keyof CubeSet] = parseInt(count, 10);
        return acc;
      },
      { blue: 0, red: 0, green: 0 },
    );
  }

  function parseGame(line: string): Game {
    const [gameInfo, playInfo] = line.split(":");
    const plays = playInfo.trim().split(";").map(parsePlay);
    const match = gameInfo.match(/\d+/);
    const id = parseInt(match?.[0] ?? "0", 10);

    return { id, plays };
  }

  function isGamePossible(game: Game): boolean {
    return game.plays.every((play) =>
      Object.keys(totalCubes).every(
        (color) =>
          play[color as keyof CubeSet] <= totalCubes[color as keyof CubeSet],
      ),
    );
  }

  const lines = parseInput(rawInput);
  const games = lines.map(parseGame);
  const possibleGames = games.filter(isGamePossible);
  return possibleGames.reduce((sum, game) => sum + game.id, 0);
};

const part2 = (rawInput: string) => {
  function parsePlay(playData: string): CubeSet {
    const set = playData.split(",").map((setData) => setData.trim().split(" "));

    return set.reduce<CubeSet>(
      (acc, [count, color]) => {
        acc[color as keyof CubeSet] = parseInt(count, 10);
        return acc;
      },
      { blue: 0, red: 0, green: 0 },
    );
  }

  function parseGame(line: string): Game {
    const [gameInfo, playInfo] = line.split(":");
    const plays = playInfo.trim().split(";").map(parsePlay);
    const match = gameInfo.match(/\d+/);
    const id = parseInt(match?.[0] ?? "0", 10);

    return { id, plays };
  }

  function calculateMinimumCubes(game: Game): CubeSet {
    return game.plays.reduce<CubeSet>(
      (minResult, play) => ({
        blue: Math.max(minResult.blue, play.blue),
        red: Math.max(minResult.red, play.red),
        green: Math.max(minResult.green, play.green),
      }),
      { blue: 0, red: 0, green: 0 },
    );
  }

  const lines = parseInput(rawInput);
  const games = lines.map(parseGame);
  const minimumSets = games.map(calculateMinimumCubes);
  const powers = minimumSets.map((set) => set.blue * set.red * set.green);
  const result = powers.reduce((sum, power) => sum + power, 0);

  return result;
};

run({
  part1: {
    tests: [
      {
        input: `
        Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
        `,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
        `,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
