import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import NextAuth from 'next-auth';
import { User } from '@/models/User';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        try {
          await mongoose.connect(process.env.MONGO_URL);
          const user = await User.findOne({ email });
          const passwordOk = user && bcrypt.compareSync(password, user.password);

          if (passwordOk) {
            console.log({passwordOk})
            return Promise.resolve(user);
            
          }

          return Promise.resolve(null);
        } catch (error) {
          console.error('MongoDB connection error:', error);
          return Promise.resolve(null);
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
