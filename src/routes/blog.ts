import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import {decode , sign , verify } from 'hono/jwt'

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }, Variables: {
        userId: string
    }
}>()


blogRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header("authorization") || ""
    const user = await verify(authHeader, c.env.JWT_SECRET)
    if (user) {
        //@ts-ignore
        c.set("userId", user.id);
        await next(); 
    } else {
        return c.text("not logged IN", 401); 
    }
})


blogRouter.post('/create', async (c) => {

    const prisma = new PrismaClient({ 
        datasourceUrl : c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      const body = await c.req.json()
      const userId = await c.get("userId")
      try{

        const blog = await prisma.blog.create({
            data : {
                title : body.title,
                content : body.content,
                thumbnail : body.thumbnail,
                published : body.published,
                authorId : Number(userId)
            }
          })
        return c.json({
            id : blog.id,
            msg : "blog created"
        })
      }
      catch(e){
        console.log(e) 
        return c.text("error")}
   })

blogRouter.put('/update', async (c) => {

    const prisma = new PrismaClient({ 
        datasourceUrl : c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      const body = await c.req.json()
      try{

        const blog = await prisma.blog.update({
            where : {
                id : body.id
            },
            data : {
                title : body.title,
                content : body.content,
                thumbnail : body.thumbnail
            }
          })
        return c.json({

            id : blog.id,
            msg : "blog updated"
        })
      }
      catch(e){

        console.log(e) 
        return c.text("error")
    }
   })
    
   // pagination daalna hai : limit and skip 
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({ 
        datasourceUrl : c.env.DATABASE_URL,
      }).$extends(withAccelerate())

   try {
    const blogs = await prisma.blog.findMany();

    return c.json({
        blogs
    })
}catch(e){

    console.log(e)
    return c.json({
        msg : "error"
    })
}
})
  
blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({ 
        datasourceUrl : c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      const id = await c.req.param('id')
      try{

        const blog = await prisma.blog.findFirst({
            where : {
                id : Number(id)
            }
          })

        return c.json({
            blog
        })
      }
      catch(e){

        console.log(e) 
        return c.text("error")}
  })
  
