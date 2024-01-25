"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
//import { LoginSchema, LoginType } from "../ReduxGlobals/Features/apiSlice";
import { error } from "console";
import { z } from "zod";
import { useLoginMutation } from "../ReduxGlobals/Features/apiSlice";
const LoginSchema = z.object({
  username: z.string().email({ message: "Debes ingresar un email valido" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener 8 caracteres" }),
});
type LoginType = z.infer<typeof LoginSchema>;
export function LoginModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [login, { isLoading }] = useLoginMutation();
  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
  });
  const onSubmit = (data: LoginType) => {
    login(data)
      .unwrap()
      .then((response) => {
        console.log(response);
        reset();
        setOpen(false);
      })
      .catch((error) => setError("root", { message: error }));
  };
  return (
    <>
      <Dialog
        open={open}
        handler={() => setOpen((prev: boolean) => !prev)}
        placeholder={null}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader placeholder={null}>
            <div className="flex justify-between w-full">
              <Typography placeholder={null} variant="h3" color="blue">
                Ingrese Usuario y Contraseña
              </Typography>
              <Button
                variant="gradient"
                color="white"
                placeholder={null}
                onClick={() => setOpen(false)}
              >
                Cerrar
              </Button>
            </div>
          </DialogHeader>
          <DialogBody className="w-2/3 mx-auto justify-around min-h-40 flex flex-col">
            <Input
              {...register("username")}
              variant="outlined"
              label="e-Mail"
              className=""
              error={errors.username ? true : undefined}
            ></Input>
            {errors.username && (
              <p className="text-red-500">{errors.username?.message}</p>
            )}
            <Input
              {...register("password")}
              variant="outlined"
              label="Contraseña"
              type="password"
              className=""
              error={errors.password ? true : undefined}
            ></Input>
            {errors.password && (
              <p className="text-red-500">{errors.password?.message}</p>
            )}
          </DialogBody>
          <DialogFooter>
            <Button
              variant="gradient"
              type="submit"
              color="blue"
              disabled={isSubmitting}
            >
              {isLoading ? "Ingresando..." : "Ingresar"}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}

export default LoginModal;
