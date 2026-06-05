# Save Slot

Save Slot is a full-stack web application that allows users to browse games, create accounts, and save their favorite games to a personalized collection.

THIS PROJECT IS CURRENTLY UNDER DEVELOPMENT

## Features

* User registration and authentication
* Secure password hashing with bcrypt
* JWT-based authentication
* Browse available games
* Add and remove favorite games
* Role-based user system
  * Regular
  * Premium
  * Admin
* PostgreSQL database with Prisma ORM
* React + TypeScript frontend
* Express + TypeScript backend

## Tech Stack

### Frontend

* React
* TypeScript
* React Router
* React Hot Toast

### Backend

* Node.js
* Express
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT
* bcrypt

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd save-slot
```

### 2. Install dependencies

Frontend:

```bash
cd client
npm install
```

Backend:

```bash
cd server
npm install
```

## Environment Variables

Create a `.env` file inside the server directory.

You can copy the provided `.env.example` file:

```bash
cp .env.example .env
```

Example:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"
JWT_SECRET="your-secret-key-here"
```

### Environment Variable Descriptions

| Variable     | Description                               |
| ------------ | ----------------------------------------- |
| DATABASE_URL | PostgreSQL connection string              |
| JWT_SECRET   | Secret used to sign and verify JWT tokens |

## Database Setup

Run Prisma migrations:

```bash
npx prisma migrate dev
```

(Optional) Seed the database (I provided a seed.ts to fill user and game databases):

```bash
npm run seed
```

Generate Prisma Client:

```bash
npx prisma generate
```

## Running the Application

Backend:

```bash
npm run dev
```

Frontend:

```bash
npm run dev
```

## Project Structure

```text
save-slot/
├── client/
│   ├── src/
│   └── package.json
│
├── server/
│   ├── prisma/
│   ├── src/
│   ├── .env.example
│   └── package.json
│
└── README.md
```

## API Endpoints

### Authentication

| Method | Endpoint     |
| ------ | ------------ |
| POST   | /auth/signup |
| POST   | /auth/login  |

### Games

| Method | Endpoint |
| ------ | -------- |
| GET    | /games   |

### Favorites

| Method | Endpoint                 |
| ------ | ------------------------ |
| GET    | /users/favorites         |
| PATCH  | /users/favorites/:gameId |
| DELETE | /users/favorites/:gameId |


## License

This project was created for educational and portfolio purposes.
