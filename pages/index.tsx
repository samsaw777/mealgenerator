import type { NextPage } from "next";
import MealInput from "../components/MealInputs";

const Home: NextPage = () => {
  return (
    <div className="p-2">
      <MealInput />
    </div>
  );
};

export default Home;
