import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  // यहाँ कोई actual token blacklist system implement कर सकते हैं अगर जरूरत हो।
  return {
    status: 'success',
    message: 'Logged out successfully',
  };
});
