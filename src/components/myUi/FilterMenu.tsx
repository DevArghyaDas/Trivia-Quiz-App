import { useState } from "react";

import { categories, difficulty } from "@/utils/request";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const FilterMenu = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: "",
    difficulty: "",
  });

  //eslint-disable-next-line
  const selectCategory = (event: any) => {
    setFormData((prev) => ({
      ...prev,
      category: event.target.value,
    }));
  };

  //eslint-disable-next-line
  const selectDifficulty = (event: any) => {
    setFormData((prev) => ({
      ...prev,
      difficulty: event.target.value,
    }));
  };

  return (
    <>
      <div className="container flex flex-column items-center justify-center h-[80dvh] mx-auto py-5 text-white">
        <form
          className="flex flex-col gap-3 border p-4 rounded-lg w-75 bg-neutral-800/10 backdrop-blur-md"
          onSubmit={(e) => e.preventDefault()}>
          <div>
            <div className="text-xl font-bold my-3">Select Category</div>
            <RadioGroup
              defaultValue="sports"
              onChange={selectCategory}>
              {categories.map((val, index) => (
                <div
                  className="flex items-center space-x-2"
                  key={index}>
                  <RadioGroupItem
                    value={val.value.toString()}
                    id={val.value.toString()}
                    className="cursor-pointer"
                  />
                  <Label htmlFor={val.label}>{val.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <div className="text-xl font-bold my-3">Select Difficulty</div>
            <RadioGroup
              defaultValue="sports"
              onChange={selectDifficulty}>
              {difficulty.map((val, index) => (
                <div
                  className="flex items-center space-x-2"
                  key={index}>
                  <RadioGroupItem
                    value={val}
                    id={val}
                    className="cursor-pointer"
                  />
                  <Label htmlFor={val}>{val}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Button
            className="cursor-pointer"
            disabled={
              formData.category === "" || (formData.difficulty === "" && true)
            }
            onClick={() =>
              navigate({
                to: `/quiz/${formData.category}/${formData.difficulty}/`,
                replace: true,
              })
            }>
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default FilterMenu;
