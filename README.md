# 📝 Blogging Platform

A full-featured blogging platform built with **React**, **Tailwind CSS**, **Node.js**, **Express**, and **MongoDB**.  
Users can create, edit, and publish blogs with rich text editing, authentication, categories, comments, and a modern responsive UI.

---

## 🚀 Features

### 🔐 **User & Auth**
- Register & Login (JWT authentication)
- Secure password hashing (bcrypt)
- User profile update

### 📝 **Blog Management**
- Create, edit, delete blog posts  
- Rich text blog content  
- Add categories / tags  
- Upload images (if implemented)  
- Pagination support  

### 💬 **Comments**
- Add comments on blog posts  
- Delete or update own comments  

### 🎨 **Frontend**
- Built using React (CRA)
- Tailwind CSS for styling
- Modern UI / responsive layout

### ⚙️ **Backend**
- REST APIs using Express.js
- MongoDB using Mongoose
- Middleware for auth & validation

---

## 📂 Folder Structure

```
Blogging-platform/
│
├── backend/                # Node.js + Express API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/               # React + Tailwind UI
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── tailwind.config.js
│
└── README.md
```

---

## 🛠️ Tech Stack

### **Frontend**
- React  
- Tailwind CSS  
- Axios  
- React Router  

### **Backend**
- Node.js  
- Express.js  
- MongoDB  
- JWT Authentication  
- bcrypt  

---

## ⚙️ Installation & Setup

### 🔧 Clone the repository
```bash
git clone https://github.com/Jyoti1-pog/Blogging-platform.git
cd Blogging-platform
```

---

## 📦 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start the backend:

```bash
npm start
```

---

## 💻 Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

Backend runs on:

```
http://localhost:5000
```

---

## 🔗 API Endpoints (Basic)

### Auth
| Method | Endpoint        | Description          |
|--------|----------------|----------------------|
| POST   | `/api/auth/register` | Register user |
| POST   | `/api/auth/login`    | Login user |

### Posts
| Method | Endpoint            | Description      |
|--------|---------------------|------------------|
| GET    | `/api/posts/`       | Get all posts |
| POST   | `/api/posts/`       | Create post |
| PUT    | `/api/posts/:id`    | Update post |
| DELETE | `/api/posts/:id`    | Delete post |
| GET    | `/api/posts/:id`    | Get single post |

---

## 📸 Screenshots (Optional)

(Add your project screenshots here)

```
![Home Page](screenshots/home.png)
![Create Post](screenshots/create.png)
![Blog Page](screenshots/blog.png)
```

---

## 🤝 Contributing

Pull requests are welcome!  
If you’d like to improve the platform, feel free to fork and submit a PR.

---

## 📄 License

This project is **open-source** and available under the MIT License.

---

## 💙 Author

**Jyoti Kumari**  
GitHub: https://github.com/Jyoti1-pog  


