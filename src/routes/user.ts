import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import {decode , sign , verify } from 'hono/jwt'

export const userRouter = new Hono<{
    Bindings : {
      DATABASE_URL : string,
      JWT_SECRET : string
    }
}>()

userRouter.post('/signup', async (c) => {

    const prisma = new PrismaClient({ 
        datasourceUrl : c.env.DATABASE_URL,
      }).$extends(withAccelerate())
  
    const body = await c.req.json();

    try {
      const user = await prisma.user.create({
        data : {
          userName : body.userName, 
          password : body.password,
          name : body.name
        }
      })
  
      const jwt = await sign({
        id : user.id
      }, c.env.JWT_SECRET)
  
      return c.json({
        message : "SignedIn" ,
        token : jwt})
    }
    catch(e){
      c.status(411)
      console.log(e)
      return c.text('Invalid')
    }
  })
  
userRouter.post('/signin', async (c) => {

    const prisma = new PrismaClient({ 
        datasourceUrl : c.env.DATABASE_URL,
      }).$extends(withAccelerate())
  
    const body = await c.req.json();

    try {
      const user = await prisma.user.findFirst({
        where : {
          userName : body.userName, 
          password : body.password
        }
      })
  
      if (!user){
        return c.text("User not found")
      }
  
      const jwt = await sign({
        id : user.id
      }, c.env.JWT_SECRET)
  
      return c.json({
        message : "SignedIn" ,
        token : jwt})
    }
    catch(e){
      c.status(411)
      console.log(e)
      return c.text('Invalid')
    }
  })
  