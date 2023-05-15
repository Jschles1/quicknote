# QuickNote

QuickNote is a simple iOS Notes app clone I built to familiarize myself with the [T3 Stack](https://create.t3.gg/).

Users can create, update and delete notes using a rich text editor. Notes can be flagged by the user to be starred, archived, or trash.

![QuickNote Editor](https://images2.imgbox.com/70/6f/UHzVb5LD_o.png)

Users can then sort their notes by these flags.

![QuickNote Home Page](https://images2.imgbox.com/a1/c8/U3kjZaYT_o.png)

App design is inspired by [Nulis Notes App](https://dribbble.com/shots/19726217-Nulis-Notes-Desktop-App) design by Rayfan Tio Saputro.

Visit the live website [here](https://quicknote-app.vercel.app/).

## Technologies Used

-   [Next.js](https://nextjs.org)
-   [NextAuth.js](https://next-auth.js.org)
-   [Prisma](https://prisma.io)
-   [Tailwind CSS](https://tailwindcss.com)
-   [tRPC](https://trpc.io)
-   [Quill Text Editor](https://github.com/zenoamaro/react-quill)
-   [Shadcn Component Library](https://ui.shadcn.com/)

## Supported Authentication Methods

QuickNote currently only supports Google authentication for user sign up and login. More authentication methods are planned to be added in the future.

## Post MVP TODO

-   Optimistic updates w/ TRPC
-   Dark mode
-   End to end and integration testing
-   Editor updates
    -   Image upload functionality
    -   Performance improvements
-   Interactive tutorial for new users
-   Add more authentication options
