export const transitionVariants = [
  { id: "diagonal", artwork: "/transitions/torn-diagonals.png", pieces: 3, enter: .64, stagger: .085, hold: 680, exit: .72, exitStagger: .08 },
  { id: "poster", artwork: "/transitions/poster-press.png", pieces: 5, enter: .58, stagger: .07, hold: 740, exit: .68, exitStagger: .06 },
  { id: "signal", artwork: "/transitions/signal-cut.png", pieces: 4, enter: .62, stagger: .08, hold: 700, exit: .66, exitStagger: .07 },
] as const;

export type TransitionVariant = typeof transitionVariants[number];

export const transitionAscii = {
  diagonal: [
    "##             /##/",
    "##            /####/",
    "##           /##  ##/",
    "##          /##    ##/",
    "##         /##########/",
    "##        /##        ##/",
    "######## /##          ##/",
    "########/##            ##/",
    "    //////  +  //////",
  ].join("\n"),
  poster: [
    "       .:############:.       ",
    "    .:##/            /##:.    ",
    "  .:##/    .:####:.     /##:. ",
    "<###/    .:##/  /##:.    /###>",
    "  ':##.    ':####:'    .##:'  ",
    "    ':##.            .##:'    ",
    "       ':############:'       ",
    "   +  / / / / / / / /  +     ",
  ].join("\n"),
  signal: [
    "       .:########:.       ",
    "     .##############.     ",
    "    /####        ####/    ",
    "   |###  X    X  ###|     ",
    "   |###   /##/   ###|     ",
    "    /###        ###/      ",
    "     |## | || | ##|       ",
    "      /##########/        ",
    "       /# # # #/          ",
    "    ///   +++   ///       ",
  ].join("\n"),
};

// A shuffled bag gives every composition a turn, without immediate repeats.
export function createTransitionPicker(random: () => number = Math.random) {
  let bag: TransitionVariant[] = [];
  let previous: TransitionVariant | undefined;
  return () => {
    if (!bag.length) {
      bag = [...transitionVariants];
      for (let index = bag.length - 1; index > 0; index--) {
        const other = Math.floor(random() * (index + 1));
        [bag[index], bag[other]] = [bag[other], bag[index]];
      }
      if (bag[0] === previous) [bag[0], bag[1]] = [bag[1], bag[0]];
    }
    previous = bag.shift()!;
    return previous;
  };
}
