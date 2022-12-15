import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message, lets gooooo!";
  }),
  postSecretMessage: protectedProcedure.input(z.object({
    message: z.string()
  })
  ).mutation(async ({input, ctx}) => {
    await ctx.prisma.message.create({
      data: {
        message: input.message,
        userId: ctx.session.user.id
      }
    })
  }
  )
});