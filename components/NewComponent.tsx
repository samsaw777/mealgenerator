import axios from "axios";
import React, { useState } from "react";
import Breakfast from "../Images/breakfast.svg";
import Image from "next/image";

interface FormData {
  age: number | "";
  weight: number | "";
  weightStatus: string;
  unit: string;
  mealType: string;
  meal: string;
  incdecweight: number | "";
  excercise: string;
}

interface Props {
  setOpenMealCard: React.Dispatch<React.SetStateAction<boolean>>;
  openMealCard: boolean;
  setMealResponse: React.Dispatch<React.SetStateAction<string>>;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  formData: FormData;
}

function Form({
  setOpenMealCard,
  openMealCard,
  setMealResponse,
  setFormData,
  formData,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleWeightStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setFormData((prevState) => ({ ...prevState, weightStatus: value }));
  };

  const onMealSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      // const message = `Hello chat GPT my age is ${
      //   formData.age ? formData.age : 20
      // }  and I want to ${
      //   formData.weightStatus ? formData.weightStatus : "increase"
      // } my weight by ${formData.incdecweight ? formData.incdecweight : 10} ${
      //   formData.unit ? formData.unit : "kg"
      // }, please suggest me weekly ${
      //   formData.meal != "" ? formData.meal : "Indian"
      // } ${
      //   formData.mealType == "Veg" ? "vegetarian" : "non-vegetarian"
      // } meal with ingredient and instructions`;

      const message = `Generate a ${
        formData.meal != "" ? formData.meal : "Indian"
      } ${
        formData.mealType == "Veg" ? "vegetarian" : "non-vegetarian"
      } diet plan for me, my age is ${
        formData.age ? formData.age : 20
      }  and i want to ${
        formData.weightStatus ? formData.weightStatus : "increase"
      } my weight by ${formData.incdecweight ? formData.incdecweight : 10} ${
        formData.unit ? formData.unit : "kg"
      }. Also ingredients and instructions. `;

      await axios
        .post("http://localhost:3000/api/openapi", { message })
        .then((response) => {
          console.log(response.data);
          setOpenMealCard(!openMealCard);
          setMealResponse(response.data);
          setLoading(false);
        });
    } catch (error: any) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center h-full">
      <div className="w-[60%] h-[70%] bg-gray-100 border-2 border-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {loading ? (
          <div className="w-full h-full flex  items-center justify-center">
            <div>
              <div className="w-[200px] h-[200px] lg:w-[400px] lg:h-[400px]">
                <Image
                  src={Breakfast}
                  alt="Breakfast"
                  className="w-full h-full animate-pulse"
                />
              </div>
              <p className="w-full text-center text-md font-bold text-gray-500">
                We are preparing diet chat for you, wait...
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={(e) => onMealSubmit(e)}>
            <div className="text-lg font-bold w-full text-center text-blue-600 mb-6">
              Tell us about yourself
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="">
                <label
                  htmlFor="age"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  placeholder="Eg: 20"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full p-2 border-2 border-gray-300 bg-white rounded-md focus:outline-none focus:border-blue-300 focus:bg-white"
                />
              </div>
              <div className="">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="weightStatus"
                >
                  Weight Status
                </label>
                <select
                  className="block appearance-none w-full bg-white border border-gray-300  px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline focus:border-blue-300 focus:bg-white"
                  id="weightStatus"
                  name="weightStatus"
                  value={formData.weightStatus}
                  onChange={handleWeightStatusChange}
                >
                  <option value="Increase">Increase weight</option>
                  <option value="Decrease">Decrease weight</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="weight"
                >
                  Weight
                </label>
                <input
                  className="w-full p-2 border-2 border-gray-300 bg-white rounded-md focus:outline-none focus:border-blue-300 focus:bg-white"
                  id="weight"
                  name="weight"
                  type="number"
                  placeholder="60"
                  value={formData.weight}
                  onChange={handleChange}
                />
              </div>

              <div className="">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="unit"
                >
                  Unit
                </label>
                <input
                  className="w-full p-2 border-2 border-gray-300 bg-white rounded-md focus:outline-none focus:border-blue-300 focus:bg-white"
                  id="unit"
                  name="unit"
                  type="text"
                  placeholder="Eg: Kg"
                  value={formData.unit}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="mealType"
                >
                  Meal
                </label>
                <input
                  className="p-2 border-2 border-gray-300 bg-white rounded-md focus:outline-none focus:border-blue-300 focus:bg-white"
                  name="meal"
                  type="string"
                  placeholder="Eg: Indian"
                  value={formData.meal}
                  onChange={handleChange}
                />
              </div>
              <div className="">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="mealType"
                >
                  Meal Type
                </label>
                <select
                  className="block appearance-none w-full bg-white border border-gray-300  px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline focus:border-blue-300 focus:bg-white"
                  id="mealType"
                  name="mealType"
                  value={formData.mealType}
                  onChange={handleChange}
                >
                  <option value="Veg">Veg</option>
                  <option value="Non-veg">Non-veg</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="mealType"
                >
                  Weight To {formData.weightStatus}
                </label>
                <input
                  className="p-2 border-2 border-gray-300 bg-white rounded-md focus:outline-none focus:border-blue-300 focus:bg-white"
                  name="incdecweight"
                  type="string"
                  placeholder="Eg: 10"
                  value={formData.incdecweight}
                  onChange={handleChange}
                />
              </div>
              <div className="">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="mealType"
                >
                  Show Excercise ?
                </label>
                <select
                  className="block appearance-none w-full bg-white border border-gray-300  px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline focus:border-blue-300 focus:bg-white"
                  id="excercise"
                  name="excercise"
                  value={formData.excercise}
                  onChange={handleChange}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex space-x-4 justify-end">
              <button
                onClick={() => setOpenMealCard(!openMealCard)}
                className="hover:bg-gray-200 p-2 rounded-md hover:font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded-md cursor-pointer font-medium"
              >
                Create Meal
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Form;
