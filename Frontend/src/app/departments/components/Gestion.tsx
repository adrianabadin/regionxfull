"use client";

import TaskManager from "@/app/components/Agenda";
import Agenda from "@/app/components/Agenda";
import { Typography } from "@material-tailwind/react";

function Gestion() {
  return (
    <>
      <TaskManager filter={{ department: "Gestion" }} />
    </>
  );
}

export default Gestion;
