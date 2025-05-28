##  User Authentication System (React + Node.js + SQLite)
This project is a complete full-stack user authentication system with:

1. User Registration & Login

2. JWT token authentication

3. Password hashing with bcrypt

4. Password reset via token system

5. React frontend with toast notifications

6. SQLite as the database

###  Technologies Used
#### 🔹 Backend:
- Node.js

- Express.js

- SQLite

- bcrypt

- JWT (jsonwebtoken)

- dotenv

#### 🔹 Frontend:
- React.js

- React Router DOM

- Axios

- React Toastify

- TailwindCSS (optional styling)

**Project Structure**

 ```bash
 POSINOVE-PROJECT/
├── backend/
│   ├── controllers/
│   │   └── authController.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── password.js
│   ├── db.js
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LoginPage.js
│   │   │   ├── RegisterPage.js
│   │   │   ├── Dashboard.js
│   │   │   ├── ForgotPasswordPage.js
│   │   │   └── ResetPasswordPage.js
│   │   ├── api.js
│   │   └── App.js
└── README.md
```

**Setup Instructions**

1. Clone the Repository


```bash
git clone https://github.com/Trtheo/User-Auth-System-React-Nodejs.git
cd User-Auth-System-React-Nodejs
```

**Backend Setup (backend/)**

2. Install Dependencies

```bash
cd backend
npm install
```
3. Configure `.env`
Create a `.env` file in backend/:

```bash
PORT=5000
JWT_SECRET=yourSuperSecretKey
```


```bash
PORT=5000
JWT_SECRET=your_jwt_secret_here

```
4. Start the Server
```bash
node server.js
```

The server will run on: `http://localhost:5000`

**Frontend Setup (frontend/)**

5. Install Dependencies

```bash
cd ../frontend
npm install
```
6. Run the React App

```bash
npm start
```

The app will open on: `http://localhost:3000`

####  Features

 **Authentication**
1. Registration

2. Login with JWT

3. Protected Dashboard

4. Password Reset
5. Forgot Password sends a token (shown in console)

6. Reset Password using token from URL

7. Password update and auto-login

###  Testing the Flow

**Register/Login**

- Navigate to /register → fill in details.

- After successful registration, auto-login redirects to /.

**Forgot/Reset Password**

- Go to /forgot-password

- Submit your registered email

- Token appears in console(Terminal) + stored temporarily

- Navigate to /reset-password?token=your_token_here

- Enter new password → redirects to dashboard

###  API Endpoints

#### Auth Routes (/api/auth)
1. POST /auth/register → Create user

2. POST /auth/login → Login with JWT

#### Password Routes (/api/password)
3. POST /password/forgot-password → Generate reset token

4. POST /password/reset-password → Reset password using token

### Database (SQLite)
- The SQLite file will be auto-created in the project root after registration:


```bash
users.db
```

Structure:

```bash
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE,
  password TEXT
);
```




### Author
**Theophile Niyigaba**  
 
 `Portfolio Web:`   https://visittheo.vercel.app/

**GitHub:** https://github.com/Trtheo

`N.B:` Built for academic & production-ready authentication systems



