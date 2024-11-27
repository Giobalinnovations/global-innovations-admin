import type { NextAuthConfig } from 'next-auth';
import { LoginSchema } from './schemas';
import Credentials from 'next-auth/providers/credentials';
import { getUserByEmailAndPassword } from './data/user';
import bcrypt from 'bcryptjs';
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials);

        if (!validateFields.success) {
          console.log('step 2 current');
          return null;
        }
        if (validateFields.success) {
          const { email, password } = validateFields.data;
          const user = await getUserByEmailAndPassword({ email, password });
          console.log(user);
          if (!user) {
            console.log(user);
            console.log('step 4 current');
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            console.log('step 5 current');
            return user;
          }
        }
        // console.log('step 6 current');`
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
