"use client";
import {
  apiSlice,
  useDropAdminMutation,
  useGetUsersQuery,
  useSetAdminMutation,
} from "@/app/ReduxGlobals/Features/apiSlice";
import { Button, Spinner, Typography } from "@material-tailwind/react";
import Card, {
  CardBody,
  CardHeader,
} from "@material-tailwind/react/components/Card";

export default function AdminConfig() {
  const { data, isFetching, isSuccess } = useGetUsersQuery(undefined);

  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : (
        data?.map((item) => (
          <UserCard
            isAdmin={item.isAdmin !== undefined ? item.isAdmin : false}
            name={item.name}
            lastname={item.lastname}
            id={item.id}
            key={item.id}
          />
        ))
      )}
    </>
  );
}
function UserCard({
  name,
  lastname,
  isAdmin,
  id,
}: {
  name: string;
  lastname: string;
  isAdmin: boolean;
  id: string;
}) {
  const [setAdmin] = useSetAdminMutation();
  const [dropAdmin] = useDropAdminMutation();
  return (
    <>
      <Card className="mt-6 w-3/5">
        <CardBody className="flex flex-col justify-center items-center">
          <Typography variant="h3">{`${name} ${lastname}`}</Typography>
          <Button
            variant="gradient"
            onClick={isAdmin ? () => dropAdmin(id) : () => setAdmin(id)}
            color={`${isAdmin ? "green" : "blue"}`}
            className="m-4"
          >
            {isAdmin ? "Administrador" : "Usuario"}
          </Button>
        </CardBody>
      </Card>
    </>
  );
}
