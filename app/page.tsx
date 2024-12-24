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
  const [letterColourArray, setletterColourArray] = useState<
    {
      letter: string;
      colour: string;
    }[]
  >([]);

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
      setletterColourArray([]);
      setErrorMessage("");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleClick();
  }, []);

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
    try {
      const resp = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${lettersToCheck.join(
          ""
        )}`
      );
      const data = await resp.json();
      console.log(data);
      if (data.title === "No Definitions Found") {
        setErrorMessage("Not a valid word");
        return false;
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

  function handleLetterSelect(letter: string) {
    const selectedLettersCopy = structuredClone(selectedLetters);
    if (!selectedLettersCopy) {
      setSelectedLetters([letter]);
    } else if (selectedLetters.length < 25) {
      setSelectedLetters([...selectedLettersCopy, letter]);
    }
  }

  async function handleSubmit() {
    const wordDefinition = await checkWord();
    if (wordDefinition === false) {
      return false;
    }

    const coloursCopy = [] as string[];
    const usedLetters = Array(splitWord.length).fill(false); // Track used letters in splitWord
    const letterColourArrayCopy = structuredClone(letterColourArray);

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

    for (let i = 0; i < lettersToCheck.length; i++) {
      if (lettersToCheck[i] === splitWord[i]) {
        coloursCopy[i] = "#7bb778"; // Green
        usedLetters[i] = true; // Mark this letter as used
        // check if letterColourArray already contains the letter
        // If it does, update its colour to green
        const letterAlreadyFound = letterColourArrayCopy.find((element) => {
          return element.letter === lettersToCheck[i];
        });
        if (letterAlreadyFound) {
          const objIndex = letterColourArrayCopy.findIndex(
            (obj) => obj.letter === lettersToCheck[i]
          );
          letterColourArrayCopy[objIndex].colour = "#7bb778";
          setletterColourArray(letterColourArrayCopy);
        } else {
          letterColourArrayCopy.push({
            letter: lettersToCheck[i],
            colour: "#7bb778",
          });
          setletterColourArray(letterColourArrayCopy);
        }
      }
    }

    // Second pass: Mark yellows and reds
    for (let i = 0; i < lettersToCheck.length; i++) {
      if (coloursCopy[i] === "#7bb778") {
        continue; // Skip greens
      }

      const currentLetter = lettersToCheck[i];

      if (splitWord.includes(currentLetter)) {
        // Check for an unused match in splitWord
        const unusedIndex = splitWord.findIndex(
          (letter, idx) => letter === currentLetter && !usedLetters[idx]
        );

        if (unusedIndex !== -1) {
          // if letter has already been found and the colour is green,
          // leave the colour as green
          // else the colour is yellow

          coloursCopy[i] = "#dbbd42"; // yellow
          usedLetters[unusedIndex] = true; // Mark as used
          const letterAlreadyFound = letterColourArrayCopy.find((element) => {
            return element.letter === lettersToCheck[i];
          });
          if (!letterAlreadyFound) {
            letterColourArrayCopy.push({
              letter: lettersToCheck[i],
              colour: "#dbbd42", // yellow
            });
          }
        } else {
          coloursCopy[i] = "#787d80"; // No unused match
        }
      } else {
        coloursCopy[i] = "#787d80"; // Letter doesn't exist in splitWord
        // if letter already exists, leave the colour
        // if not, update the colour to gray
        const letterAlreadyFound = letterColourArrayCopy.find((element) => {
          return element.letter === lettersToCheck[i];
        });
        if (!letterAlreadyFound) {
          letterColourArrayCopy.push({
            letter: lettersToCheck[i],
            colour: "#787d80", // gray
          });
          setletterColourArray(letterColourArrayCopy);
        }
      }
    }
    setPreviousGuesses([selectedLetters.join("")]);
    if (colours.length === 0) {
      setColours(coloursCopy);
    } else {
      setColours([...colours, ...coloursCopy]);
    }
    setletterColourArray(letterColourArrayCopy);
  }

  function handleBack() {
    setErrorMessage("");
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
      <p className="text-center text-lg">{errorMessage}</p>
      {/* <p className="uppercase text-center tracking-widest font-bold">{word}</p> */}
      <Keyboard
        handleLetterSelect={handleLetterSelect}
        letterColourArray={letterColourArray}
      />
      <div className="flex justify-center gap-4 my-5">
        <Button
          handleClick={handleSubmit}
          text={"ENTER"}
          // disabled={selectedLetters.length !== 5}
          disabled={false}
        />
        <Button handleClick={handleBack} text={"BACK"} disabled={false} />
      </div>
    </>
  );
}
