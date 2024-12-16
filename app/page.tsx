"use client";
import Button from "@/components/Button";
import React, { useState, useEffect } from "react";
import Keyboard from "./components/Keyboard";

export default function Home() {
  const [word, setWord] = useState<null | string>(null);
  const [splitWord, setSplitWord] = useState<string[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  console.log(word, splitWord, selectedLetters);

  async function handleClick() {
    try {
      const resp = await fetch(
        "https://random-word-api.vercel.app/api?words=1&length=5"
      );
      const data = await resp.json();
      setWord(data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async function checkWord() {
    try {
      const resp= await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${selectedLetters.join('')}`)
      const data = await resp.json()
      console.log(data, resp)
      if (!resp.ok) {
        setErrorMessage("Not a valid word")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (word) {
      setSplitWord(word.split(""));
    }
  }, [word]);

  function handleLetterSelect(e: React.MouseEvent<HTMLDivElement>) {
    const letter = (e.target as HTMLDivElement).id;
    const selectedLettersCopy = structuredClone(selectedLetters);
    if (!selectedLettersCopy) {
      setSelectedLetters([letter]);
    } else {
      setSelectedLetters([...selectedLettersCopy, letter]);
    }
  }

  function handleSubmit() {
    checkWord()
  }

  return (
    <>
      <div className="flex flex-col items-center">
        Hello World!
        <Button
          handleClick={handleClick}
          text={"Generate Word"}
          disabled={false}
        />
      </div>
      <div className="flex justify-around my-5">
        <div className="uppercase bg-gray-200 w-16 h-16 flex items-center justify-center">
          {selectedLetters && selectedLetters[0]}
        </div>
        <div className="uppercase bg-gray-200 w-16 h-16 flex items-center justify-center">
          {" "}
          {selectedLetters && selectedLetters[1]}
        </div>
        <div className="uppercase bg-gray-200 w-16 h-16 flex items-center justify-center">
          {" "}
          {selectedLetters && selectedLetters[2]}
        </div>
        <div className="uppercase bg-gray-200 w-16 h-16 flex items-center justify-center">
          {" "}
          {selectedLetters && selectedLetters[3]}
        </div>
        <div className="uppercase bg-gray-200 w-16 h-16 flex items-center justify-center">
          {" "}
          {selectedLetters && selectedLetters[4]}
        </div>
      </div>
      <p className="uppercase text-center tracking-widest font-bold">{word}</p>
      <Keyboard handleLetterSelect={handleLetterSelect} />
      <div className="flex flex-col items-center my-5">
        <Button
          handleClick={handleSubmit}
          text={"ENTER"}
          disabled={selectedLetters.length !== 5}
        />
        <p>{errorMessage}</p>
      </div>
    </>
  );
}
