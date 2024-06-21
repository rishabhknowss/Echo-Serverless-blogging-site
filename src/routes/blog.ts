import { PrismaClient } from "@prisma/client/extension";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import {decode , sign , verify } from 'hono/jwt'

export const blogRouter = new Hono<{
    Bindings : {
      DATABASE_URL : string,
      JWT_SECRET : string
    }
}>()

blogRouter.post('/api/v1/blog', (c) => {
    return c.text('Hello Hono!')
  })
  
blogRouter.put('/api/v1/blog', (c) => {
    return c.text('Hello Hono!')
  })
  
blogRouter.get('/api/v1/blog/:id', (c) => {
    return c.text('Hello Hono!')
  })
  
  
blogRouter.get('/api/v1/blog/bulk', (c) => {
    return c.text('Hello Hono!')
  })