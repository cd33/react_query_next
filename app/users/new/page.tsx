"use client";
import { Input } from "@/components/Input";
import { Loader } from "@/components/Loader";
import { UserResponseSchema } from "@/schema/user.schema";
import { User } from "@/store/store";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FC, FormEvent } from "react";

const NewUserPage: FC = () => {
  const router = useRouter();
  const queryClient = new QueryClient();

  const mutation = useMutation({
    mutationFn: (user: Omit<User, "id">) =>
      fetch("/api/users", { method: "POST", body: JSON.stringify(user) })
        .then((res) => res.json())
        .then(UserResponseSchema.parse),
    onSuccess: () => {
      router.push("/");
      queryClient.invalidateQueries(["users"]);
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = {
      name: String(formData.get("name")),
      email: String(formData.get("email")),
    };

    // fetch("/api/users", { method: "POST", body: JSON.stringify(user) })
    //   .then((res) => res.json())
    //   .then(UserResponseSchema.parse)
    //   .then(() => router.push("/"));
    mutation.mutate(user);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4 p-4">
      <h2 className="text-2xl">Create</h2>
      <Input name="name" label="Name" />
      <Input name="email" label="Email" />
      <button disabled={mutation.isLoading} type="submit" className="bg-blue-600 p-2 rounded-lg w-full">
        Create User
      </button>
      {mutation.isLoading && <Loader />}
    </form>
  );
};

export default NewUserPage;
