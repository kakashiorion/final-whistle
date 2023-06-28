import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { sendEmail } from 'src/lib/email'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser: MutationResolvers['createUser'] = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User: UserRelationResolvers = {
  predictions: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).predictions(),
}

export const emailUser = async ({ id }) => {
  const user = await db.user.findUnique({
    where: { id },
  })
  await sendTestEmail(user.email, user.resetToken)
  return user
}

function sendTestEmail(emailAddress: string, userToken: string) {
  const subject = 'Reset Password Link'
  const text =
    `Here is the link to reset your password: localhost:8910/reset-password?resetToken=${userToken}\n\n` +
    `It was sent from Final Whistle application.`
  const html =
    `Here is the link to reset your password: localhost:8910/reset-password?resetToken=${userToken}<br><br>` +
    `It was sent from Final Whistle application.`
  return sendEmail({ to: emailAddress, subject, text, html })
}
