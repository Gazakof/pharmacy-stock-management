# Pharmacy Stock Management System

## Description

This is a **Pharmacy Stock Management System** built with **HTML, CSS, JavaScript, and MongoDB**. The system allows pharmacy staff to **manage medicines**, including adding, updating, deleting, and viewing stock. It also includes **user authentication** with JWT and **image upload** using multer.

## Features

- **User Authentication** (Register, Login, Logout, JWT Token-based Authorization)
- **Manage Medicines** (Add, Update, Delete, View)
- **Image Upload for Medicines** (Stored locally in `assets/img`)
- **Role-based Access Control** (Admin & Staff)

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript (Vanilla JS)
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT, bcrypt.js
- **File Upload:** multer
- **Database:** MongoDB (local instance)

---

## Installation

### 1. Clone the repository

```sh
git clone https://github.com/your-username/pharmacy-stock-management.git
cd pharmacy-stock-management
```

### 2. Install dependencies

```sh
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory and add the following:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/pharma-stock
JWT_SECRET=your_jwt_secret
```

### 4. Start the backend server

```sh
npm start
```

The backend will run on `http://localhost:5000`

### 5. Open `index.html`

Simply open `index.html` in a browser to access the frontend.

---

## API Endpoints

### **Authentication Routes**

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | User login          |

### **Medicine Management**

| Method | Endpoint             | Description                            |
| ------ | -------------------- | -------------------------------------- |
| GET    | `/api/medicines`     | Get all medicines                      |
| POST   | `/api/medicines`     | Add a new medicine (with image upload) |
| PUT    | `/api/medicines/:id` | Update medicine details                |
| DELETE | `/api/medicines/:id` | Delete a medicine                      |

---

## Usage

1. **Register** a new account.
2. **Login** to receive an authentication token.
3. **Manage Medicines** (Add, Update, Delete, View Stock).
4. **Upload Images** for medicines using the form.
5. **Access Protected Routes** using the token in headers.

---

## Testing with Postman

To test API endpoints:

1. **Register/Login** to get a JWT token.
2. Include `Authorization: Bearer <token>` in request headers.
3. Use `form-data` in Postman to upload medicine images.

---

## Folder Structure

```
pharmacy-stock-management/
│── assets/
│   ├── img/  # Stores uploaded images
│── backend/
│   ├── models/    # Mongoose schemas
│   ├── routes/    # Express routes
│   ├── middleware/ # Authentication & Upload
│   ├── server.js  # Main server file
│── frontend/
│   ├── index.html  # Main page
│   ├── login.html  # Login page
│   ├── signup.html # Signup page
│   ├── dashboard.html # Dashboard
│   ├── js/  # Frontend scripts
│── README.md
│── .env   # Environment variables
│── package.json
```
