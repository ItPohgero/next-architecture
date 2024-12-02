### Next Architecture Project Overview

**Created with ❤️ by [Wahyu Agus Arifin](https://github.com/itpohgero)**

This project leverages a modern stack to enhance development efficiency, code consistency, and performance. It is built using powerful libraries and tools for optimal experience in managing state, handling forms, and formatting code.

---

### Tech Stack & Tools Included

1. **Biome**  
   A blazing-fast formatter for JavaScript, TypeScript, JSX, TSX, JSON, CSS, and GraphQL files. It provides 97% compatibility with Prettier, offering consistent formatting while saving CI and developer time.

2. **Redux Toolkit**  
   A powerful library for state management that simplifies setup and helps manage complex state across the app. Redux Toolkit provides optimized patterns for managing state in a scalable and maintainable way.

3. **React Hook Form**  
   Lightweight and performant library for form validation in React. It reduces re-renders and provides simple API for handling complex form use cases.

4. **Shadcn UI**  
   A component library for building beautiful and accessible user interfaces in React. It provides a set of pre-built components that are easy to use and customize. 

5. **Day.js**  
   A small and fast library for handling dates and times in JavaScript. It offers an immutable API similar to Moment.js, with support for plugins and internationalization.

6. **Jose**  
   A JavaScript library for cryptographic operations, useful for JSON Web Tokens (JWT) and handling cryptography securely in the app.

7. **Lodash**  
   A utility library that provides helpful functions for common programming tasks, improving readability and efficiency.

8. **Iconify**  
   A comprehensive icon framework that offers thousands of icons in a single package, allowing for easy use and customization.

9. **Axios**  
   A popular library for making HTTP requests, providing promise-based methods for handling API requests and responses.

10. **Next Themes**
   A library for handling dark mode and light mode in Next.js applications, making it easy to toggle between themes.

11. **Next.js Toploader**
   A library for loading content in Next.js applications, providing a loading indicator while content is being fetched.

12. **dotenv-cli**
   A CLI tool for loading environment variables from .env files. (pnpm add -d dotenv-cli)

13. **obfuscated**
   The obfuscated command is used to obfuscate the static files in the Next.js app. It uses the JavaScript Obfuscator library to obfuscate the code and reduce the size of the files.
   
---

### Getting Started

To run this project locally:

1. Clone this repository: ```git clone <repository-url>```
2. Make file in folder envs (.env.development, .env.production, .env.staging)
2. Install dependencies with pnpm: ```pnpm install```
3. Run the development server: ```pnpm run dev```


## Using Docker and Makefile

### Development environment - for doing testing

```
make build-development
make start-development
```

Open http://localhost:3001

### Staging environment - for doing UAT testing

```
make build-staging
make start-staging
```

Open http://localhost:3002

### Production environment - for users

```
make build-production
make start-production
```

Open http://localhost:3003


Credit to [Wahyu Agus Arifin](https://github.com/itpohgero)
- itpohgero@gmail.com
- ig : @wahyuagusarifin
- linkedin : [wahyuagusarifin](https://id.linkedin.com/in/wahyu-agus-arifin-8a6992215)