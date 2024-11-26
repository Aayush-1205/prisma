import PostDetails from "@/app/_comp/PostDetails";
import { use } from "react";

// Cache from next unstable
// const getCachedPost = cache((slug) => {
//   return prisma.post.findUnique({ where: { slug } });
// });

interface PageProps {
  params: Promise<{ postSlug: string }>;
}

const Page = ({ params }: PageProps) => {
  const { postSlug } = use(params);

  return (
    <div>
      <PostDetails postSlug={postSlug} />
    </div>
  );
};

export default Page;
