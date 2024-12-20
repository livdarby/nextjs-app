// app/error.js
"use client";
type ErrorProps = {
  error: { message: string };
  reset: () => void;
};

export default function Error({ error, reset } : ErrorProps) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
