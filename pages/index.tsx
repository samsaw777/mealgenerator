import type { NextPage } from "next";
import React, { useState } from "react";
import MealInput from "../components/MealInputs";
import NewComponent from "../components/NewComponent";
import Landing from "../components/Landing";
import Logo from "../Images/logo.svg";
import Image from "next/image";

export interface FormData {
  age: number | "";
  weight: number | "";
  weightStatus: string;
  unit: string;
  mealType: string;
  meal: string;
  incdecweight: number | "";
  excercise: string;
}

const Home: NextPage = () => {
  const [openMealCard, setOpenMealCard] = useState<boolean>(false);
  const [mealResponse, setMealResponse] = useState<any>([]);
  const [formData, setFormData] = useState<FormData>({
    age: "",
    weight: "",
    weightStatus: "Increase",
    unit: "",
    mealType: "Veg",
    meal: "",
    incdecweight: "",
    excercise: "No",
  });
  return (
    <div className="p-2 h-screen">
      <div className="w-full px-6 py-2 flex items-center space-x-2">
        <div className="w-[50px] h-[50px]">
          <Image src={Logo} alt="Logo" className="w-full h-full" />
        </div>
        <span className="text-3xl italic decoration-4 font-bold text-gray-600">
          FitBit
        </span>
      </div>
      {openMealCard ? (
        <NewComponent
          setOpenMealCard={setOpenMealCard}
          openMealCard={openMealCard}
          setMealResponse={setMealResponse}
          formData={formData}
          setFormData={setFormData}
        />
      ) : (
        <Landing
          setOpenMealCard={setOpenMealCard}
          openMealCard={openMealCard}
          mealResponse={mealResponse}
          formData={formData}
        />
      )}
    </div>
  );
};

export default Home;
