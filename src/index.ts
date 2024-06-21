import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import {decode , sign , verify } from 'hono/jwt'

const app = new Hono<{
    Bindings : {
      DATABASE_URL : string,
      JWT_SECRET : string
    }
}>()

app.post('/api/v1/user/signup', async (c) => {
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

app.post('/api/v1/user/signin', async (c) => {
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

app.post('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})

app.put('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/v1/blog/:id', (c) => {
  return c.text('Hello Hono!')
})


app.get('/api/v1/blog/bulk', (c) => {
  return c.text('Hello Hono!')
})

export default app
