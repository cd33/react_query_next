"use client";
import { Loader } from "@/components/Loader";
import { getPost, getPosts, getUser } from "@/utils/requests";
import { QueryClient, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FC } from "react";

interface UserPageProps {
  params: {
    userId: string;
  };
}

const UserPage: FC<UserPageProps> = ({ params }) => {
  const queryClient = new QueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", params.userId],
    queryFn: () => getUser(params.userId),
    enabled: params.userId !== undefined,
  });

  const {
    data: posts,
    isLoading: isLoadingPost,
    isError: isErrorPost,
  } = useQuery({
    queryKey: ["users", params.userId, "posts"],
    queryFn: () => getPosts(params.userId),
    enabled: params.userId !== undefined,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-4xl font-bold">{data.user.name}</h1>
      <p>{data.user.email}</p>
      <hr />
      <ul className="flex flex-col gap-2 list-disc p-4">
        {isLoadingPost && <Loader />}
        {isErrorPost && <p>Something went wrong</p>}
        {posts?.posts.map((post) => (
          <li
            key={post.id}
            onMouseEnter={() => {
              queryClient.prefetchQuery({
                queryKey: ["posts", post.id],
                queryFn: () => getPost(String(post.id)),
              });
            }}
          >
            <Link className="hover:underline" href={`/posts/${post.id}`}>{post.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
