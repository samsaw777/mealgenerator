import React, { useState } from "react";
import axios from "axios";

interface Input {
  age: number | "";
  weight: number | "";
  increaseweight: number | "";
  unit: string;
  meal: string;
  isveg: boolean;
}

const MealInput = () => {
  const [mealInput, setMealInput] = useState<Input>({
    age: "",
    weight: "",
    increaseweight: "",
    unit: "",
    meal: "",
    isveg: false,
  });

  const onMealValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = event.target;
    const newValue =
      type === "checkbox"
        ? checked
        : type === "number"
        ? parseInt(value, 10)
        : value;
    setMealInput((prevState) => ({ ...prevState, [name]: newValue }));
  };

  const onMealSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const message = `Hello chat GPT my age is ${
        mealInput.age
      } and I want to increase my weight by ${mealInput.increaseweight} ${
        mealInput.unit
      }, please suggest me daily ${mealInput.meal} ${
        mealInput.isveg ? "vegetarian" : "non-vegetarian"
      } meal`;

      await axios
        .post("http://localhost:3000/api/openapi", { message })
        .then((response) => {
          console.log(response.data);
        });
    } catch (error: any) {
      console.error(error);
    }
  };
  console.log(mealInput);
  return (
    <div>
      <form className="flex space-x-3" onSubmit={(e) => onMealSubmit(e)}>
        <div className="flex flex-col space-y-2">
          <label>Age</label>
          <input
            className="p-2 border-2 border-gray-300 bg-gray-200 rounded-md focus:outline-none focus:border-blue-300 focus:bg-white"
            name="age"
            type="number"
            value={mealInput.age}
            onChange={onMealValueChange}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label>Weight</label>
          <input
            className="p-2 border-2 border-gray-300 bg-gray-200 rounded-md focus:outline-none focus:border-blue-300 focus:bg-white"
            name="weight"
            type="number"
            value={mealInput.weight}
            onChange={onMealValueChange}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label>Meal</label>
          <input
            className="p-2 border-2 border-gray-300 bg-gray-200 rounded-md focus:outline-none focus:border-blue-300 focus:bg-white"
            name="meal"
            type="string"
            value={mealInput.meal}
            onChange={onMealValueChange}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label>Weight To Increase</label>
          <input
            className="p-2 border-2 border-gray-300 bg-gray-200 rounded-md focus:outline-none focus:border-blue-300 focus:bg-white"
            name="increaseweight"
            type="number"
            value={mealInput.increaseweight}
            onChange={onMealValueChange}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label>Unit</label>
          <input
            className="p-2 border-2 border-gray-300 bg-gray-200 rounded-md focus:outline-none focus:border-blue-300 focus:bg-white"
            name="unit"
            type="string"
            value={mealInput.unit}
            onChange={onMealValueChange}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label>Meal</label>
          <input
            className="p-2 border-2 border-gray-300 bg-gray-200 rounded-md focus:outline-none focus:border-blue-300 focus:bg-white"
            name="meal"
            type="string"
            value={mealInput.meal}
            onChange={onMealValueChange}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label>Veg</label>
          <input
            type="checkbox"
            className="h-5 w-5 text-blue-600 bg-gray-200 border-gray-300 checked:bg-blue-300 checked:border-blue-300 checked:text-gray-300"
            name="isveg"
            checked={mealInput.isveg}
            onChange={onMealValueChange}
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-green-300 rounded-ld cursor-pointer"
        >
          Generate Diet
        </button>
      </form>
    </div>
  );
};

export default MealInput;
