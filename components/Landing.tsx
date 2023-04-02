import React, { useState } from "react";
import Excercise from "./Exercise";
import { checkData } from "./Exercise";
import { FormData } from "../pages";
import Diet from "../Images/diet.svg";
import Image from "next/image";

interface Props {
  setOpenMealCard: React.Dispatch<React.SetStateAction<boolean>>;
  openMealCard: boolean;
  mealResponse: any;
  formData: FormData;
}

const LandingPage = ({
  setOpenMealCard,
  openMealCard,
  mealResponse,
  formData,
}: Props) => {
  const [currentTab, setCurrentTab] = useState<string>("Diet");
  const [excerciseData, setExcerciseData] = useState<any>([]);

  return (
    <div className="w-full flex flex-col justify-center items-center h-[90%]">
      <div className="w-[75%] flex justify-end">
        <button
          className="p-2 bg-blue-500 text-white rounded-md font-bold hover:bg-blue-600"
          onClick={() => setOpenMealCard(!openMealCard)}
        >
          Plan Your Diet
        </button>
      </div>

      <div className="w-[75%] h-[75%] py-2 bg-white border-2 border-gray-100 rounded-lg shadow-lg mt-2">
        <div className="flex space-x-3 w-full px-4 mt-2">
          <span
            className={`w-[50%] text-center p-1 cursor-pointer border-2 border-gray-200 rounded-md ${
              currentTab == "Diet" && "bg-blue-500 text-white font-bold"
            }`}
            onClick={() => setCurrentTab("Diet")}
          >
            Diet
          </span>
          <span
            className={`w-[50%] text-center p-1 cursor-pointer border-2 border-gray-200 rounded-md ${
              currentTab == "Excercise" && "bg-blue-500 text-white font-bold"
            }`}
            onClick={() => setCurrentTab("Excercise")}
          >
            Excercise
          </span>
        </div>
        <div className="px-4 mt-2 h-[90%] py-2">
          {currentTab === "Diet" ? (
            <>
              {mealResponse?.length > 0 ? (
                <div className="h-full overflow-scroll">
                  {mealResponse.map((data: any, index: number) => (
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
              ) : (
                <div className="border-2 border-blue-200 border-dashed h-full p-2 flex w-full justify-center items-center">
                  <div>
                    <div className="w-[200px] h-[200px] lg:h-[350px] lg:w-[350px]">
                      <Image src={Diet} alt="Diet" className="w-full h-full" />
                    </div>
                    <p className="w-full text-center text-md font-bold text-gray-500">
                      Want to create a diet...
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <Excercise
              formData={formData}
              setExcerciseData={setExcerciseData}
              excerciseData={excerciseData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
