# 🛒 E-commerce Website
This is a full-stack E-commerce Website built with modern web technologies, providing a seamless shopping experience. The project includes user authentication, product listing, cart functionality, and order management.

# 🚀 Tech Stack
## Frontend:
React.js – Component-based UI development
Tailwind CSS

## Backend:
Node.js – JavaScript runtime
Express.js – Server framework
MySQL – Relational database
Prisma ORM – Type-safe database client
JWT (JSON Web Token) – For secure authentication

## Deployment:
Vercel – For frontend and serverless backend deployment

## 🔐 Authentication
Authentication is handled using JWT. The backend issues tokens upon successful login/registration, which are then stored on the client (usually in localStorage or httpOnly cookies). These tokens are used for protecting routes and verifying user sessions.

# 🧰 Features
✅ User registration and login with JWT

🛍️ Product listing and search

🛒 Add to cart & manage cart

📦 Checkout & order summary

🔐 Secure API routes

🗂️ Admin features (optional: product management, order tracking)

# ⚙️ Installation
## 1. Clone the Repository
```
git clone https://github.com/Apisak-1o1/E-commerce.git
cd ecommerce-app
```
## 2. Backend Setup
```
cd server
npm install
```

## Create a .env file in the server/ directory:
```
env
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
JWT_SECRET="your_jwt_secret"
```

## Run Prisma:
```
npx prisma generate
npx prisma migrate dev --name init
```
## Start the backend:
```
npm run dev
```
## 3. Frontend Setup
```
cd client
npm install
npm run dev
```
