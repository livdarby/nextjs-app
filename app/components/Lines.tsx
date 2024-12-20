type LinesProps = {
  //   handleClick: () => void;
  colours: string[];
  letters: string[];
};

const Lines = ({ colours, letters }: LinesProps) => {
  return (
    <div className="flex justify-center gap-2 my-2 text-2xl font-bold" >
      <div
        className={`uppercase w-16 h-16 flex items-center justify-center`}
        style={
          colours[0]
            ? { backgroundColor: colours[0] }
            : { backgroundColor: "#e5e7eb" }
        }
      >
        {letters && letters[0]}
      </div>
      <div
        className={`uppercase w-16 h-16 flex items-center justify-center`}
        style={
          colours[1]
            ? { backgroundColor: colours[1] }
            : { backgroundColor: "#e5e7eb" }
        }
      >
        {letters && letters[1]}
      </div>
      <div
        className={`uppercase w-16 h-16 flex items-center justify-center`}
        style={
          colours[2]
            ? { backgroundColor: colours[2] }
            : { backgroundColor: "#e5e7eb" }
        }
      >
        {letters && letters[2]}
      </div>
      <div
        className={`uppercase w-16 h-16 flex items-center justify-center`}
        style={
          colours[3]
            ? { backgroundColor: colours[3] }
            : { backgroundColor: "#e5e7eb" }
        }
      >
        {letters && letters[3]}
      </div>
      <div
        className={`uppercase w-16 h-16 flex items-center justify-center`}
        style={
          colours[4]
            ? { backgroundColor: colours[4] }
            : { backgroundColor: "#e5e7eb" }
        }
      >
        {letters && letters[4]}
      </div>
    </div>
  );
};

export default Lines;
