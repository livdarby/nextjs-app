"use client";
import Button from "@/components/Button";
import React from "react";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center">
        Hello World!
        <Button />
      </div>
     <div className="flex justify-around my-5">
      <div className="bg-gray-200 w-16 h-16 flex items-center justify-center">A</div>
      <div className="bg-gray-200 w-16 h-16 flex items-center justify-center">B</div>
      <div className="bg-gray-200 w-16 h-16 flex items-center justify-center">C</div>
      <div className="bg-gray-200 w-16 h-16 flex items-center justify-center">D</div>
      <div className="bg-gray-200 w-16 h-16 flex items-center justify-center">E</div>
     </div>
    </>
  );
}
