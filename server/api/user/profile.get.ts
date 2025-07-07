import { defineEventHandler } from 'h3';
import { verifyToken } from '~/server/utils/verifyToken';
import connectDB from '~/server/utils/db';
import User from '~/server/models/User';

export default defineEventHandler(async (event) => {
  await connectDB();

  const decoded = verifyToken(event);

  const user = await User.findById(decoded.id).select('-password');

  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' });
  }

  return user;
});
