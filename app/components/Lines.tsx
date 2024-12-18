type LinesProps = {
  //   handleClick: () => void;
  colours: { [key: string]: string };
  letters: string[];
};

const Lines = ({ colours, letters }: LinesProps) => {
  return (
    <div className="flex justify-center gap-2 my-2">
      <div
        className={`uppercase w-16 h-16 flex items-center justify-center`}
        style={
          colours
            ? { backgroundColor: colours[0] }
            : { backgroundColor: "#e5e7eb" }
        }
      >
        {letters && letters[0]}
      </div>
      <div
        className={`uppercase bg-${colours[1]}-200 w-16 h-16 flex items-center justify-center`}
        style={
          colours
            ? { backgroundColor: colours[1] }
            : { backgroundColor: "#e5e7eb" }
        }
      >
        {" "}
        {letters && letters[1]}
      </div>
      <div
        className={`uppercase bg-${colours[2]}-200 w-16 h-16 flex items-center justify-center`}
        style={
          colours
            ? { backgroundColor: colours[2] }
            : { backgroundColor: "#e5e7eb" }
        }
      >
        {" "}
        {letters && letters[2]}
      </div>
      <div
        className={`uppercase bg-${colours[3]}-200 w-16 h-16 flex items-center justify-center`}
        style={
          colours
            ? { backgroundColor: colours[3] }
            : { backgroundColor: "#e5e7eb" }
        }
      >
        {" "}
        {letters && letters[3]}
      </div>
      <div
        className={`uppercase bg-${colours[4]}-200 w-16 h-16 flex items-center justify-center`}
        style={
          colours
            ? { backgroundColor: colours[4] }
            : { backgroundColor: "#e5e7eb" }
        }
      >
        {" "}
        {letters && letters[4]}
      </div>
    </div>
  );
};

export default Lines;
