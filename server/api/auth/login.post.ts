import { defineEventHandler, readBody, createError } from 'h3';
import db from '~/server/utils/db';
import User from '~/server/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  await db();  // Connection ensure karo

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email and password are required' });
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid email or password' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid email or password' });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || 'your_secret_key',
    { expiresIn: '1h' }
  );

  return { token, role: user.role };
});
