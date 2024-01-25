// "use client";
// import { Button } from "@material-tailwind/react";
// import React, { useState } from "react";
// import AdminConfig from "./components/AdminConfig";
// import AddDepartment from "./components/AddDepartment";
// import AddState from "./components/AddState";
// import AsignDepartment from "./components/AsignDepartment";

// function Config() {
//   const [choice, setChoice] = useState<
//     "admin" | "addProgram" | "asignProgram" | "addCity" | ""
//   >("");
//   return (
//     <main className="grid grid-cols-12  gap-3 min-h-screen  flex-col  ">
//       <nav className="col-span-3  bg-blue-500 w-full flex flex-col">
//         <Button
//           variant="gradient"
//           color="white"
//           className="m-2 justify-center px-2 hover:bg-blue-200 hover:text-white hover:outline-dashed hover:outline-1"
//           onClick={() => setChoice("admin")}
//         >
//           Asignar Administrador
//         </Button>
//         <Button
//           variant="gradient"
//           color="white"
//           className="m-2 justify-center px-2  hover:bg-blue-200 hover:text-white hover:outline-dashed hover:outline-1"
//           onClick={() => setChoice("addProgram")}
//         >
//           Agregar Programa
//         </Button>
//         <Button
//           variant="gradient"
//           color="white"
//           className="m-2 justify-center px-2  hover:bg-blue-200 hover:text-white hover:outline-dashed hover:outline-1"
//           onClick={() => setChoice("asignProgram")}
//         >
//           Asignar Programa
//         </Button>
//         <Button
//           variant="gradient"
//           color="white"
//           className="m-2 justify-center px-2  hover:bg-blue-200 hover:text-white hover:outline-dashed hover:outline-1 "
//           onClick={() => setChoice("addCity")}
//         >
//           Agregar Partido
//         </Button>
//       </nav>
//       <div className="col-span-9  w-full items-center mx-auto mt-4 flex flex-col">
//         {choice === "admin" ? (
//           <AdminConfig />
//         ) : choice === "addProgram" ? (
//           <AddDepartment />
//         ) : choice === "addCity" ? (
//           <AddState />
//         ) : choice === "asignProgram" ? (
//           <AsignDepartment />
//         ) : null}
//       </div>
//     </main>
//   );
// }

// export default Configs;
