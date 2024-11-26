import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-5 text-center">
      <h1 className="text-3xl font-semibold">Welcome</h1>

      <Link href={`/posts`}>Posts</Link>
    </div>
  );
};

export default Home;
