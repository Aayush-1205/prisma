import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const InitialPosts: Prisma.PostCreateInput[] = [
  {
    title: "Post 1",
    content: "This is the content of post 1",
    slug: "post-1",
    author: {
      connectOrCreate: {
        where: { email: "example.123@gmail.com" },
        create: {
          email: "example.123@gmail.com",
          hashedPassword: "suyfboushajurnqpwi65",
        },
      },
    },
  },
];

async function main() {
  console.log("Seeding starting...");
  for (const post of InitialPosts) {
    const createdPost = await prisma.post.create({
      data: post,
    });
    console.log(`Created post with id: ${createdPost.id}`);
  }

  console.log("Seeding ended!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
