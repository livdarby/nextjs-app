import React, {useState} from "react";

export default function Button() {
    const [word, setWord] = useState(null)
    console.log(word)

    async function handleClick() {
        try {
          const resp = await fetch(
            "https://random-word-api.vercel.app/api?words=1&length=5"
          );
          const data = await resp.json();
          setWord(data)
        } catch (error) {
          console.log(error);
        }
    }

    return (
        <button onClick={handleClick} className="border border-2 rounded px-2 w-max">Generate Word</button>
    )
}