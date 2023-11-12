import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // Create a user
    const user = await prisma.user.create({
      data: {
        name: 'Sasi',
        email: 'sasik@prisma.io',
      },
    })

    // get many user
    const users = await prisma.user.findMany()

    console.log(users)

    // Create a user and post
    await prisma.user.create({
      data: {
        name: 'Bob',
        email: 'bob1@prisma.io',
        posts: {
          create: {
            title: 'Hello World',
          },
        },
      },
    })

    // Get a user with post
    const usersWithPosts = await prisma.user.findMany({
      include: {
        posts: true,
      },
    })

    console.dir(usersWithPosts, { depth: null })

  } catch (err) {
    console.log("Error", err)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })