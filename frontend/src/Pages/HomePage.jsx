import React from "react";

export const HomePage = () => {
  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-4xl text-center m-5 text-sky-950 font-bold" >WELCOME TO THE TASKS APP </h1>

      <div className="flex justify-center mt-10 ">
        <img
          src="/landing.avif"
          alt=""
          className=" shadow-md shadow-white w-5/12"
        />
      </div>
    </div>
  );
};
