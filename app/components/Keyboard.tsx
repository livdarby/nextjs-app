import React from "react";

interface KeyboardProps {
  handleLetterSelect: (letter: string) => void;
  letterColourArray: { letter: string; colour: string }[];
}

const Keyboard: React.FC<KeyboardProps> = ({
  handleLetterSelect,
  letterColourArray,
}) => {
  const alphabet = "qwertyuiopasdfghjklzxcvbnm".split("");

  return (
    <div className="flex flex-wrap justify-center gap-2 my-6">
      {alphabet.map((letter) => {
        const letterObject: { letter: string; colour: string } | undefined =
          letterColourArray.find((element) => {
            return element.letter === letter;
          });
        const colour = letterObject ? letterObject.colour : "#e5e7eb";
        return (
          <div
            key={letter}
            id={letter}
            className="uppercase w-12 text-center text-lg font-bold"
            style={{ backgroundColor: colour }}
            onClick={() => handleLetterSelect(letter)} // Use an arrow function here
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
};

export default Keyboard;
