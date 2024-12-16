"use client";
import Button from "@/components/Button";
import React, { useState, useEffect } from "react";
import Keyboard from "./components/Keyboard";

export default function Home() {
  const [word, setWord] = useState<null | string>(null);
  const [splitWord, setSplitWord] = useState<string[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [colours, setColours] = useState<{ [key: string]: string }>({
    0: "gray",
    1: "gray",
    2: "gray",
    3: "gray",
    4: "gray",
  });
  console.log(colours);

  async function handleClick() {
    try {
      const resp = await fetch(
        "https://random-word-api.vercel.app/api?words=1&length=5"
      );
      const data = await resp.json();
      setWord(data[0]);
      setColours({
        0: "gray",
        1: "gray",
        2: "gray",
        3: "gray",
        4: "gray",
      });
      setSelectedLetters([]);
    } catch (error) {
      console.log(error);
    }
  }

  async function checkWord() {
    try {
      const resp = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedLetters.join(
          ""
        )}`
      );
      if (!resp.ok) {
        setErrorMessage("Not a valid word");
        return;
      } else if (selectedLetters.join("") === word) {
        console.log("correct guess");
      }
    } catch (error) {
      console.log(error);
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
    } else if (selectedLetters.length < 5) {
      setSelectedLetters([...selectedLettersCopy, letter]);
    }
  }

  function handleSubmit() {
    checkWord();

    const coloursCopy = structuredClone(colours) as { [key: string]: string };
    const usedLetters = Array(splitWord.length).fill(false); // Track used letters in splitWord

    // First pass: Mark greens
    for (let i = 0; i < splitWord.length; i++) {
      if (selectedLetters[i] === splitWord[i]) {
        coloursCopy[i.toString()] = "green";
        usedLetters[i] = true; // Mark this letter as used
      }
    }

    // Second pass: Mark yellows and reds
    for (let i = 0; i < splitWord.length; i++) {
      if (coloursCopy[i.toString()] === "green") {
        continue; // Skip greens
      }

      const currentLetter = selectedLetters[i];

      if (splitWord.includes(currentLetter)) {
        // Check for an unused match in splitWord
        const unusedIndex = splitWord.findIndex(
          (letter, idx) => letter === currentLetter && !usedLetters[idx]
        );

        if (unusedIndex !== -1) {
          coloursCopy[i.toString()] = "yellow";
          usedLetters[unusedIndex] = true; // Mark as used
        } else {
          coloursCopy[i.toString()] = "slate"; // No unused match
        }
      } else {
        coloursCopy[i.toString()] = "slate"; // Letter doesn't exist in splitWord
      }
    }

    setColours(coloursCopy);
  }

  function handleBack() {
    const newLetters = selectedLetters.slice(0, selectedLetters.length - 1);
    setSelectedLetters(newLetters);
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <Button
          handleClick={handleClick}
          text={"Generate Word"}
          disabled={false}
        />
      </div>
      <div className="flex justify-around my-5">
        <div
          className={`uppercase bg-${colours[0]}-200 w-16 h-16 flex items-center justify-center`}
        >
          {selectedLetters && selectedLetters[0]}
        </div>
        <div
          className={`uppercase bg-${colours[1]}-200 w-16 h-16 flex items-center justify-center`}
        >
          {" "}
          {selectedLetters && selectedLetters[1]}
        </div>
        <div
          className={`uppercase bg-${colours[2]}-200 w-16 h-16 flex items-center justify-center`}
        >
          {" "}
          {selectedLetters && selectedLetters[2]}
        </div>
        <div
          className={`uppercase bg-${colours[3]}-200 w-16 h-16 flex items-center justify-center`}
        >
          {" "}
          {selectedLetters && selectedLetters[3]}
        </div>
        <div
          className={`uppercase bg-${colours[4]}-200 w-16 h-16 flex items-center justify-center`}
        >
          {" "}
          {selectedLetters && selectedLetters[4]}
        </div>
      </div>
      <p className="uppercase text-center tracking-widest font-bold">{word}</p>
      <Keyboard handleLetterSelect={handleLetterSelect} />
      <div className="flex justify-center gap-4 my-5">
        <Button
          handleClick={handleSubmit}
          text={"ENTER"}
          disabled={selectedLetters.length !== 5}
        />
        <Button handleClick={handleBack} text={"BACK"} disabled={false} />
      </div>
      <p>{errorMessage}</p>
    </>
  );
}
