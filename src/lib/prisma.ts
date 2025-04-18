//prevent creation of multiple instances of prisma client
// it’s a Prisma singleton pattern for Next.js (App Router) using TypeScript. Its purpose is to prevent multiple database connections during hot reloads in development, which can crash your app.
import { PrismaClient } from '@prisma/client'



//This is a factory function. Every time you call prismaClientSingleton(), it returns a new Prisma client instance.
const prismaClientSingleton = () => {
    return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined
}

//This prevents creating a new DB connection on every file refresh in dev mode.
const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
