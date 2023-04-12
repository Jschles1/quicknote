import type { GetServerSidePropsContext } from 'next';
import { getServerSession, type NextAuthOptions, type DefaultSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { env } from '../env/server.mjs';
import { prisma } from './db';
import { type Prisma } from '@prisma/client';

/**
 * Module augmentation for `next-auth` types
 * Allows us to add custom properties to the `session` object
 * and keep type safety
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/
declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: string;
            // ...other properties
            // role: UserRole;
        } & DefaultSession['user'];
    }

    // interface User {
    //   // ...other properties
    //   // role: UserRole;
    // }
}

/**
 * Options for NextAuth.js used to configure
 * adapters, providers, callbacks, etc.
 * @see https://next-auth.js.org/configuration/options
 **/
export const authOptions: NextAuthOptions = {
    callbacks: {
        session({ session, user, token }) {
            if (session.user && token?.sub) {
                session.user.id = token.sub;
            }
            return session;
        },
        signIn({ user, account, profile, email, credentials }) {
            return true;
        },
    },
    events: {
        async createUser({ user }) {
            console.log('New User Created: ', user);
            const result = await prisma.note.create({
                data: {
                    name: 'Sample Note',
                    content: 'Hello World!',
                    userId: user.id,
                    category: 'Your Notes',
                } as Prisma.NoteUncheckedCreateInput,
            });
            console.log('New Note Created: ', result);
        },
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        }),
        /**
         * ...add more providers here
         *
         * Most other providers require a bit more work than the Discord provider.
         * For example, the GitHub provider requires you to add the
         * `refresh_token_expires_in` field to the Account model. Refer to the
         * NextAuth.js docs for the provider you want to use. Example:
         * @see https://next-auth.js.org/providers/github
         **/
    ],
};

/**
 * Wrapper for getServerSession so that you don't need
 * to import the authOptions in every file.
 * @see https://next-auth.js.org/configuration/nextjs
 **/
export const getServerAuthSession = (ctx: {
    req: GetServerSidePropsContext['req'];
    res: GetServerSidePropsContext['res'];
}) => {
    return getServerSession(ctx.req, ctx.res, authOptions);
};
