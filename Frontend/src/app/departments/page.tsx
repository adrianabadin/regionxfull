"use client";

import { useState } from "react";
import Gestion from "./components/Gestion";
import Practicas from "./components/Practicas";
import Cronicos from "./components/Cronicos";
import { Button } from "@material-tailwind/react";
import AsignDepartment from "./config/components/AsignDepartment";
import Protesis from "./components/Protesis";
import { useGetUsersQuery } from "../ReduxGlobals/Features/apiSlice";
import { useAppSelector } from "../ReduxGlobals/store";
import Item from "./components/MenuItem";

export default function Departments() {
  const [choice, setChoice] = useState<
    "" | "gestion" | "cronicos" | "protesis" | "practicas"
  >("");
  const { departments } = useAppSelector((state) => state.auth);
  return (
    <>
      <main className="grid grid-cols-12  gap-3 min-h-screen  flex-col  ">
        <nav className="col-span-3  bg-blue-500 w-full flex flex-col">
          <Item name="gestion" setChoice={setChoice} />
          <Button
            variant="gradient"
            color="white"
            className="m-2 justify-center px-2  hover:bg-blue-200 hover:text-white hover:outline-dashed hover:outline-1"
            onClick={() => setChoice("cronicos")}
          >
            Cronicos y alto costo
          </Button>
          <Button
            variant="gradient"
            color="white"
            className="m-2 justify-center px-2  hover:bg-blue-200 hover:text-white hover:outline-dashed hover:outline-1"
            onClick={() => setChoice("protesis")}
          >
            Protesis
          </Button>
          <Button
            variant="gradient"
            color="white"
            className="m-2 justify-center px-2  hover:bg-blue-200 hover:text-white hover:outline-dashed hover:outline-1 "
            onClick={() => setChoice("practicas")}
          >
            Practicas
          </Button>
        </nav>
        <div className="col-span-9  w-full items-center mx-auto mt-4 flex flex-col">
          {choice === "gestion" ? (
            <Gestion />
          ) : choice === "practicas" ? (
            <Practicas />
          ) : choice === "cronicos" ? (
            <Cronicos />
          ) : choice === "protesis" ? (
            <Protesis />
          ) : null}
        </div>
      </main>
    </>
  );
}
