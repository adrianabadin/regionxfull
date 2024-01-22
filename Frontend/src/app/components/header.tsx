"use client";
import React, { useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
  Collapse,
} from "@material-tailwind/react";
import LoginModal from "./Login";
import SignUpModal from "./Signup";
import { useAppSelector } from "../ReduxGlobals/store";
import {
  apiSlice,
  useLoginMutation,
  useLogoutQuery,
} from "../ReduxGlobals/Features/apiSlice";
import { useDispatch } from "react-redux";
import { clearAuth } from "../ReduxGlobals/Features/authSlice";
import Link from "next/link";

export function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [signUp, setSignUp] = useState(false);
  const { username } = useAppSelector((state) => state.auth);
  const [logout] = apiSlice.endpoints.logout.useLazyQuery();
  const dispatch = useDispatch();
  const handleLogout = () => {
    logout(undefined);
    dispatch(clearAuth());
  };
  const [login, { isLoading }] = useLoginMutation();
  console.log(username);
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal"
      >
        <Link href="/direccion" className="flex items-center">
          Equipo Directivo
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Account
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Blocks
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Docs
        </a>
      </Typography>
    </ul>
  );

  return (
    <header className="bg-blue-500 max-h-[768px] fixed top-0  h-32 w-full overflow-hidden  ">
      <Navbar className="z-10  max-w-full h-full rounded-none px-4  lg:px-8 lg:py-4 bg-blue-500 my-auto">
        <div className="flex items-center justify-between text-blue-gray-900 h-full">
          <Typography
            variant="h2"
            as="a"
            color="white"
            href="/"
            className="mr-4 font-sans cursor-pointer py-1.5 font-medium"
          >
            Region Sanitaria X
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              {username === "" ? (
                <>
                  <Button
                    variant="text"
                    size="sm"
                    className="hidden text-gray-100 lg:inline-block"
                    onClick={() => setOpen(true)}
                  >
                    <span>Log In</span>
                  </Button>
                  <Button
                    variant="gradient"
                    size="sm"
                    className="hidden lg:inline-block text-gray-100"
                    onClick={() => setSignUp(true)}
                  >
                    <span>Sign in</span>
                  </Button>
                </>
              ) : isLoading ? (
                <Typography
                  variant="paragraph"
                  as="p"
                  href="#"
                  color="white"
                  className="font-bold mr-3"
                >
                  Ingresando...
                </Typography>
              ) : (
                <span className="absolute top-2 right-2  flex">
                  <Typography
                    variant="paragraph"
                    as="p"
                    href="#"
                    color="white"
                    className="font-bold mr-3"
                  >
                    {`Bienvenido ${username}`}
                  </Typography>
                  <Typography
                    variant="paragraph"
                    as="button"
                    color="gray"
                    onClick={handleLogout}
                    className="hover:font-bold"
                  >
                    Cerrar Sesion
                  </Typography>
                </span>
              )}
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            <Button
              fullWidth
              variant="text"
              size="sm"
              className=""
              onClick={() => setOpen((prev) => !prev)}
            >
              <span>Log In</span>
            </Button>
            <Button
              fullWidth
              variant="gradient"
              size="sm"
              className=""
              onClick={() => setSignUp((prev) => !prev)}
            >
              <span>Sign in</span>
            </Button>
          </div>
        </Collapse>
      </Navbar>
      <LoginModal open={open} setOpen={setOpen} />
      <SignUpModal open={signUp} setOpen={setSignUp} />
    </header>
  );
}
