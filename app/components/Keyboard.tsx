import { MouseEventHandler } from "react";

function Keyboard({
  handleLetterSelect,
}: {
  handleLetterSelect: MouseEventHandler<HTMLDivElement>;
}) {
  const alphabet = "qwertyuiopasdfghjklzxcvbnm".split("");

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {alphabet.map((letter) => {
        return (
          <div
            onClick={handleLetterSelect}
            className="uppercase w-8 text-center bg-gray-200"
            key={letter}
            id = {letter}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}

export default Keyboard;
