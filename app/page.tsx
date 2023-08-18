"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader } from "@/components/Loader";
import { UserLine } from "@/components/UserLine";
import { UsersResponseSchema } from "@/schema/user.schema";
import { User } from "@/store/store";
import { useQuery } from "@tanstack/react-query";

const getUsers = async () =>
  fetch("/api/users")
    .then((res) => res.json())
    .then(UsersResponseSchema.parse);

export default function Home() {
  // const [users, setUsers] = useState<User[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);

  // useEffect(() => {
  //   setIsLoading(true);

  //   let isCancelled = false;
  //   getUsers()
  //     .then((data) => {
  //       if (isCancelled) return;
  //       setUsers(data.users);
  //     })
  //     .catch(() => {
  //       if (isCancelled) return;
  //       setIsError(true);
  //     })
  //     .finally(() => {
  //       if (isCancelled) return;
  //       setIsLoading(false);
  //     });

  //   return () => {
  //     isCancelled = true;
  //   };
  // }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold">Users</h1>
      <Link href="/users/new" className="bg-blue-600 p-2 w-fit rounded-full">
        New user
      </Link>
      <ul className="flex flex-col gap-2">
        {data.users.map((user) => (
          <UserLine key={user.id} user={user} />
        ))}
      </ul>
    </div>
  );
}
