"use client"
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      className="bg-blue-600 p-2 w-fit rounded-full"
      onClick={() => router.back()}
    >
      Back
    </button>
  );
};

export default BackButton;
