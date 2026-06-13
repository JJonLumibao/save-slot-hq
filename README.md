# Save Slot

Save Slot is a full-stack web application that allows users to interact with a collection of games managed by administrators. Users can create accounts, favorite games, leave reviews, and manage their profiles based on their assigned role.

This project was built as a portfolio project to demonstrate full-stack web development skills using React, TypeScript, Express, Prisma, PostgreSQL, authentication, authorization, and role-based access control.

## Features

### Authentication & Security

* User registration and login
* Secure password hashing with bcrypt
* JWT-based authentication
* Protected API routes
* Role-based authorization middleware

### User Features (Regular)

* Create an account
* Log in and log out
* Browse all games
* Favorite and unfavorite games
* View game reviews
* Update account information

### Premium Features

Includes all Regular permissions, plus:

* Create reviews for games
* Delete own reviews
* Previously created reviews remain visible if the user's role is later changed back to "REGULAR"

### Admin Features

Includes all Premium permissions, plus:

* Add new games
* Delete games
* View all reviews across the platform
* Delete any review
* View all users
* Change user roles
* Delete users

### Database & Backend

* PostgreSQL database
* Prisma ORM
* Relational data modeling
* Cascade deletion for related records
* Input validation with Zod

## Tech Stack

### Frontend

* React
* TypeScript
* React Router
* TanStack Query (React Query)
* React Hot Toast
* CSS

### Backend

* Node.js
* Express
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT
* bcrypt
* Zod

## Screenshots
### Login Page
![Login](screenshots/login.png)
### Sign Up Page
![SignUp](screenshots/signup.png)
### Home Page
![Home](screenshots/home.png)
### Regular Member CANNOT Leave Reviews
![RegModal](screenshots/regularmodal.png)
### Premium and Admin Members Can Leave Reviews
![LeaveReview](screenshots/leavereview.png)
### Different Menus of Roles
![RegularMenu](screenshots/regularmenu.png)
![PremiumMenu](screenshots/premiummenu.png)
![AdminMenu](screenshots/adminmenu.png)
### Account Information Page
![AccountInfo](screenshots/accountinfo.png)
### Review Pages (Premium: My Reviews, Admin: All Reviews)
![MyReviews](screenshots/myreviews.png)
![AllReviews](screenshots/allreviews.png)
### Manage Users Page
![ManageUsers](screenshots/manageusers.png)

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

(Optional: seed.ts provided) Seed the database:

```bash
npm run seed
```

After running seed.ts, three accounts of each role are made available. Here's one from each role:

| Role    | Username   | Password    |
| ------- | ---------- | ----------- |
| Regular | ReggieReg  | regpassword |
| Premium | PreeshaPre | prepassword |
| Admin   | AdamAdm    | adapassword |

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
└── screenshots (for README.md)
└── README.md
```

## Business Rules

* Users can only review games while assigned the "PREMIUM" or "ADMIN" role
* Reviews remain visible even if a user's role is later downgraded to "REGULAR"
* "PREMIUM" users can only delete their own reviews unless they are an "ADMIN"
* "ADMIN" users cannot delete their own accounts
* At least one "ADMIN" account must always exist
* Deleting a game automatically removes associated reviews
* Deleting a user automatically removes associated reviews

## API Endpoints

### Authentication

| Method | Endpoint     |
| ------ | ------------ |
| POST   | /auth/signup |
| POST   | /auth/login  |

### Games

| Method | Endpoint                   |
| ------ | -------------------------- |
| GET    | /games                     |
| GET    | /games/:gameId/reviews     |
| GET    | /games/:gameId/favoritedBy |
| POST   | /games                     |
| POST   | /games/:gameId/reviews     |
| DELETE | /games/:gameId             |

### Reviews

| Method | Endpoint           |
| ------ | ------------------ |
| GET    | /reviews           |
| DELETE | /reviews/:reviewId |

### Users

| Method | Endpoint                 |
| ------ | ------------------------ |
| GET    | /users                   |
| GET    | /users/favorites         |
| GET    | /users/:userId/reviews   |
| PATCH  | /users/:userId           |
| PATCH  | /users/:userId/role      |
| PATCH  | /users/favorites/:gameId |
| DELETE | /users/:userId           |
| DELETE | /users/favorites/:gameId |

## License

This project was created for educational and portfolio purposes.
