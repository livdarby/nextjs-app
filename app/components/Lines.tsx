type LinesProps = {
  //   handleClick: () => void;
  colours: { [key: string]: string };
  letters: string[];
};

const Lines = ({ colours, letters }: LinesProps) => {
  return (
    <div className="flex justify-center gap-2 my-2">
      <div
        className={`uppercase bg-${colours[0]}-200 w-16 h-16 flex items-center justify-center`}
      >
        {letters && letters[0]}
      </div>
      <div
        className={`uppercase bg-${colours[1]}-200 w-16 h-16 flex items-center justify-center`}
      >
        {" "}
        {letters && letters[1]}
      </div>
      <div
        className={`uppercase bg-${colours[2]}-200 w-16 h-16 flex items-center justify-center`}
      >
        {" "}
        {letters && letters[2]}
      </div>
      <div
        className={`uppercase bg-${colours[3]}-200 w-16 h-16 flex items-center justify-center`}
      >
        {" "}
        {letters && letters[3]}
      </div>
      <div
        className={`uppercase bg-${colours[4]}-200 w-16 h-16 flex items-center justify-center`}
      >
        {" "}
        {letters && letters[4]}
      </div>
    </div>
  );
};

export default Lines;
