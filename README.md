# 🛒 RM Store

**RM Store** is a modern, full-featured e-commerce web application that allows users to browse products, add items to a mini cart, and securely checkout. Built using **React**, **Redux**, and **Firebase**, it supports both user and admin roles and offers a responsive, seamless shopping experience with real-time functionality.

---

## ✨ Features

- **User Authentication**  
  Sign up, log in, and log out securely using Firebase Authentication.

- **Mini Cart Functionality**  
  Add products to the basket, update quantities, and remove items easily.

- **Product Display**  
  Browse recommended products and detailed product listings.

- **Secure Checkout Flow**  
  Subtotal calculation and validation during checkout.

- **Admin Restriction**  
  Admin users are restricted from using cart and checkout functionality.

- **Responsive UI**  
  Mobile-friendly layout that adapts to all screen sizes.

---

## 🧰 Technologies Used

- **Frontend**: React, JavaScript, HTML5, CSS3  
- **State Management**: Redux  
- **Routing**: React Router  
- **Authentication & Database**: Firebase  
- **Styling**: SCSS, CSS Modules, Tailwind CSS (if used)  
- **Icons**: Ant Design Icons

---

## ⚙️ Installation & Setup

1. **Extract the ZIP file** into a folder of your choice.

2. **Open a terminal** in the extracted folder.

3. Run the following commands:

```bash
npm install
npm run dev
```

4. Open your browser and go to:  
   👉 `http://localhost:3000`

> Make sure Node.js and npm are installed before running the commands.

---

## 🔐 Firebase Configuration

Create a Firebase project and enable:

- **Authentication** (Email/Password)
- **Firestore** (or Realtime Database)

Then, create a `.env` file in the project root and add the following:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

---

## 🌐 Hosted Version (Demo)

You can preview the deployed version here:  
🔗 [https://software-engineering-project-tawny.vercel.app](https://software-engineering-project-tawny.vercel.app)

---

## 📦 Code Submission

- ✅ **Complete codebase** is included in this ZIP file.
- 📄 **README.md** includes:
  - Setup instructions
  - Required libraries and dependencies
  - Firebase configuration details

> Please ensure you configure your own Firebase keys as described above before running the application locally.