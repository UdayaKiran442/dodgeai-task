To install dependencies:
```sh
bun install
```

To run:
```sh
bun run dev
```

open http://localhost:3000

npx drizzle-kit generate

**About Repository**
This repository consists of core API's for querying, storing messages, responses in sql database. Uses python repository as proxy.

**Setup instructions**
- Before setting the repository, download and run the dependency python service.
```sh
https://github.com/UdayaKiran442/dodgeai-task-python
```
- After setting up python service, clone the repository using
```sh
git clone https://github.com/UdayaKiran442/dodgeai-task
```
- Open project folder in any code editor of your choice.
- To install dependencies:
```sh
bun install
```

**Running the project**
- Create account in neon.tech and create database.
- Create .env file in the root project folder.
- In .env file fill the values as mentioned in .env.example file.
- To run:
```sh
bun run dev
```
- Project will be ruuning in port 3000

**About the project**
- User prompt and response generated is stored in sql database.
- Neon is used for sql db and drizzle-orm to write sql queries.