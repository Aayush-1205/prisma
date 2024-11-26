import { createPost } from "@/actions/actions";
import prisma from "@/lib/db";
import Link from "next/link";

const page = async () => {
  const postsData = await prisma.post.findMany({
    // where: {
    //   title: {
    //     contains: "the",
    //     // gt
    //     // lt
    //     // endsWith
    //   }
    // },
    // orderBy: {
    //   createdAt: 'desc',
    // },
    // select: {
    //   id: true,
    //   title: true,
    //   slug: true,
    // },
    // take: 1,
    // skip: 1,
  });

  const postsCount = await prisma.post.count();
  console.log(postsData);

  const user = await prisma.user.findUnique({
    where: {
      email: "example.123@gmail.com",
    },
    include: {
      posts: true,
    },
  });

  return (
    <div className="flex flex-col items-center justify-center gap-y-5 w-full h-full">
      <h1 className="text-3xl font-semibold">All Posts ({postsCount})</h1>

      <ul className="border-y border-black/10 py-5 leading-8">
        {user?.posts.map(({ id, title, slug }) => {
          return (
            <li key={id} className="">
              <Link href={`/posts/${slug}`} className="text-lg">
                {title}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-12">
        <form
          action={createPost}
          className="flex flex-col items-center gap-4 w-full"
        >
          <input
            type="text"
            className="px-4 py-2 rounded-lg border border-white bg-transparent"
            placeholder="Title"
            name="title"
          />

          <textarea
            placeholder="Content"
            name="content"
            className="px-4 py-2 rounded-lg border border-white bg-transparent"
            rows={4}
          ></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default page;
