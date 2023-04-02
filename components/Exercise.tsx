import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormData } from "../pages";
import Image from "next/image";
import Workout from "../Images/workout.svg";
import WorkOut from "../Images/workoutloading.svg";

export const checkData = (Data: string) => {
  if (
    Data.includes("Monday") ||
    Data.includes("Tuesday") ||
    Data.includes("Wednesday") ||
    Data.includes("Thursday") ||
    Data.includes("Friday") ||
    Data.includes("Saturday") ||
    Data.includes("Sunday") ||
    Data.includes("Breakfast") ||
    Data.includes("Lunch") ||
    Data.includes("Dinner") ||
    Data.includes("Ingredients") ||
    Data.includes("Instructions")
  ) {
    return "font-bold text-lg";
  }
};

interface Props {
  formData: FormData;
  setExcerciseData: any;
  excerciseData: any;
}

const Excercise = ({ formData, setExcerciseData, excerciseData }: Props) => {
  console.log(formData.excercise);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchExcerciseData = async () => {
    try {
      setLoading(true);
      const message = `Generate a workout plan to ${formData.excercise} weight targeting different muscle group each day with repitations and sets`;
      await axios
        .post("http://localhost:3000/api/openapi", { message: message })
        .then((res) => {
          console.log(res.data);
          setExcerciseData(res.data);
          setLoading(false);
        })
        .catch((error: any) => {
          console.log(error.message);
          setLoading(false);
        });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (formData.excercise === "Yes") {
      fetchExcerciseData();
    }
  }, [formData.excercise]);
  return (
    <>
      {formData.excercise == "No" ? (
        <div className="border-2 border-blue-200 border-dashed h-full p-2 flex w-full justify-center items-center">
          <div>
            <div className="w-[200px] h-[200px] lg:h-[350px] lg:w-[350px]">
              <Image src={Workout} alt="Workout" className="w-full h-full" />
            </div>
            <p className="w-full mt-2 text-center text-md font-bold text-gray-500">
              Want excercise plan too ?
            </p>
          </div>
        </div>
      ) : (
        <>
          {loading ? (
            <div className="w-full h-full flex  items-center justify-center">
              <div>
                <div className="w-[200px] h-[200px] lg:w-[350px] lg:h-[350px]">
                  <Image
                    src={WorkOut}
                    alt="WorkOut"
                    className="w-full h-full animate-pulse"
                  />
                </div>
                <p className="w-full mt-2 text-center text-md font-bold text-gray-500">
                  Creating your workout plan ...
                </p>
              </div>
              {/* <div>We are preparing diet chat for you, wait...</div> */}
            </div>
          ) : (
            <div className="h-full overflow-scroll">
              {excerciseData.map((data: any, index: number) => (
                <div
                  key={index}
                  className={`${data == "" ? "mt-4" : "mt-2"} ${checkData(
                    data
                  )}`}
                >
                  {data}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Excercise;
