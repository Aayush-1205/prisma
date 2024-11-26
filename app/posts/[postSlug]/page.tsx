import prisma from "@/lib/db";
import { Suspense } from "react";

// Cache from next unstable
// const getCachedPost = cache((slug) => {
//   return prisma.post.findUnique({ where: { slug } });
// });

const page = async ({ params }: { params: { postSlug: string } }) => {
  
  const postData = await prisma.post.findUnique({
    where: {
      slug: params?.postSlug,
    },
    // cacheStrategy: {ttl: 60}
  });
  console.log(postData);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex flex-col items-center justify-center gap-y-5 w-full h-full">
          <h1 className="text-3xl font-semibold">{postData?.title}</h1>

          <p className="border-y border-black/10 py-5 leading-8">
            {postData?.content}
          </p>
        </div>
      </Suspense>
    </div>
  );
};

export default page;
