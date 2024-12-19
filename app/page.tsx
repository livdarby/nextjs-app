"use client";
import Button from "@/components/Button";
import Lines from "./components/Lines";
import React, { useState, useEffect } from "react";
import Keyboard from "./components/Keyboard";

export default function Home() {
  const [word, setWord] = useState<null | string>(null);
  const [splitWord, setSplitWord] = useState<string[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [colours, setColours] = useState<string[]>([]);
  const [previousGuesses, setPreviousGuesses] = useState<string[]>([]);
  console.log(colours);

  async function handleClick() {
    try {
      const resp = await fetch(
        "https://random-word-api.vercel.app/api?words=1&length=5"
      );
      const data = await resp.json();
      setWord(data[0]);
      setColours([]);
      setPreviousGuesses([]);
      setSelectedLetters([]);
    } catch (error) {
      console.log(error);
    }
  }

  async function checkWord() {
    const guessIndices = [
      [0, 5],
      [5, 10],
      [10, 15],
      [15, 20],
      [20, 25],
    ];
    let currentGuessIndices = null;
    if (!previousGuesses[0]) {
      currentGuessIndices = guessIndices[0];
    } else {
      currentGuessIndices = guessIndices[previousGuesses[0].length / 5];
    }
    const lettersToCheck = selectedLetters.slice(
      currentGuessIndices[0],
      currentGuessIndices[1]
    );
    // console.log("letters to check ", lettersToCheck)
    try {
      const resp = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${lettersToCheck.join(
          ""
        )}`
      );
      console.log(resp);
      if (!resp.ok) {
        setErrorMessage("Not a valid word");
        return;
      } else if (lettersToCheck.join("") === word) {
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
    } else if (selectedLetters.length < 25) {
      setSelectedLetters([...selectedLettersCopy, letter]);
    }
  }

  function handleSubmit() {
    checkWord();

    const coloursCopy = structuredClone(colours) as string[];
    const usedLetters = Array(splitWord.length).fill(false); // Track used letters in splitWord

    // First pass: Mark greens

    let lettersToCheck = null;
    if (!previousGuesses[0]) {
      lettersToCheck = selectedLetters;
    } else {
      lettersToCheck = selectedLetters.slice(
        previousGuesses[0].length,
        previousGuesses[0].length + 5
      );
    }

    console.log("letters to check: ", lettersToCheck);

    for (let i = 0; i < lettersToCheck.length; i++) {
      if (lettersToCheck[i] === splitWord[i]) {
        coloursCopy[i] = "green";
        usedLetters[i] = true; // Mark this letter as used
      }
    }

    // Second pass: Mark yellows and reds
    for (let i = 0; i < lettersToCheck.length; i++) {
      if (coloursCopy[i] === "green") {
        continue; // Skip greens
      }

      const currentLetter = lettersToCheck[i];

      if (splitWord.includes(currentLetter)) {
        // Check for an unused match in splitWord
        const unusedIndex = splitWord.findIndex(
          (letter, idx) => letter === currentLetter && !usedLetters[idx]
        );

        if (unusedIndex !== -1) {
          coloursCopy[i] = "yellow";
          usedLetters[unusedIndex] = true; // Mark as used
        } else {
          coloursCopy[i] = "gray"; // No unused match
        }
      } else {
        coloursCopy[i] = "gray"; // Letter doesn't exist in splitWord
      }
    }
    setPreviousGuesses([selectedLetters.join("")]);
    if (colours.length === 0) {
      setColours(coloursCopy);
    } else {
      setColours([...colours, ...coloursCopy]);
    }
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
      <>
        <Lines
          colours={colours.slice(0, 5)}
          letters={selectedLetters.slice(0, 5)}
        />
        <Lines
          colours={colours.slice(5, 10)}
          letters={selectedLetters.slice(5, 10)}
        />
        <Lines
          colours={colours.slice(10, 15)}
          letters={selectedLetters.slice(10, 15)}
        />
        <Lines
          colours={colours.slice(15, 20)}
          letters={selectedLetters.slice(15, 20)}
        />
        <Lines
          colours={colours.slice(20, 25)}
          letters={selectedLetters.slice(20, 25)}
        />
      </>

      <p className="uppercase text-center tracking-widest font-bold">{word}</p>
      <Keyboard handleLetterSelect={handleLetterSelect} />
      <div className="flex justify-center gap-4 my-5">
        <Button
          handleClick={handleSubmit}
          text={"ENTER"}
          // disabled={selectedLetters.length !== 5}
          disabled={false}
        />
        <Button handleClick={handleBack} text={"BACK"} disabled={false} />
      </div>
      <p>{errorMessage}</p>
    </>
  );
}
