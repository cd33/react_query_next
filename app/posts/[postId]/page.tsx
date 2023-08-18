"use client";
import { Loader } from "@/components/Loader";
import { getPost, getUser } from "@/utils/requests";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FC } from "react";

interface postPageProps {
  params: {
    postId: string;
  };
}
const postPage: FC<postPageProps> = ({ params }) => {
  const { postId } = params;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", postId],
    queryFn: () => getPost(postId),
    enabled: Boolean(postId),
  });

  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useQuery({
    queryKey: ["users", data?.post.userId],
    queryFn: () => getUser(String(data?.post.userId)),
    enabled: Boolean(data?.post.userId),
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>Something went wrong</p>;

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-2xl font-bold">{data.post.name}</h2>
      <p>{data.post.content}</p>
      {isLoadingUser && <Loader />}
      {isErrorUser && <p>Something went wrong</p>}
      {user && (
        <p>
          Author:{" "}
          <Link
            className="hover:underline text-blue-400"
            href={`/users/${user.user.id}`}
          >
            {user.user.name}
          </Link>
        </p>
      )}
    </div>
  );
};

export default postPage;
