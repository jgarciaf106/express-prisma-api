import { Request, Response } from 'express'
import { Prisma, PrismaClient } from '@prisma/client'
//import { Exception } from '../utils'

const prisma = new PrismaClient()

export const hello = async (req: Request, res: Response): Promise<Response> => {
  return res.json({ message: "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request" })
}

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, posts } = req.body

  const postData = posts?.map((post: Prisma.PostCreateInput) => {
    return { title: post?.title, content: post?.content }
  })

  const result = await prisma.user.create({
    data: {
      name,
      email,
      posts: {
        create: postData,
      },
    },
  })
  return res.json(result)
}

export const createPost =  async (req: Request, res: Response): Promise<Response> => {
  const { title, content, authorEmail } = req.body
  const result = await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { email: authorEmail } },
    },
  })
  return res.json(result)
}

export const getFeed = async (req: Request, res: Response): Promise<Response> => {
  const { searchString, skip, take, orderBy } = req.query

  const or: Prisma.PostWhereInput = searchString
    ? {
        OR: [
          { title: { contains: searchString as string } },
          { content: { contains: searchString as string } },
        ],
      }
    : {}

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      ...or,
    },
    include: { author: true },
    take: Number(take) || undefined,
    skip: Number(skip) || undefined,
    orderBy: {
      updatedAt: orderBy as Prisma.SortOrder,
    },
  })

  return res.json(posts)
}

