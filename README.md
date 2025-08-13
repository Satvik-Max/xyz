# GDGC-GCOEN Admin

This repository contains the **Next.js Admin Dashboard** for **GDGC-GCOEN** (Google Developer Group at Government College of Engineering, Nagpur).  
It is designed for administrators to manage **content, events, users, hackathon activities, and communication** in one central hub.

---

## 🚀 Project Overview

The **GDGC-GCOEN Admin Panel** is a **Next.js** application powered by **Appwrite** for backend services.  
It allows admins to:

- **Content Management**: Create, update, and delete blogs & events.  
- **User Management**: View registered users, track attendance, and manage event participation.  
- **Hackathon Management**: Manage teams, members, scores, and validate participants using QR codes.  
- **Storage Management**: Upload, view, and manage documents/images.  
- **Communication Tools**: Send bulk emails, manage templates.  
- **Study Jam Tracking**: Monitor swag distribution and participation.  

---

## 🛠️ Technologies Used

**Frontend**
- Next.js  
- React  
- Material-UI (MUI)  
- Lucide React (Icons)  
- SunEditor (Rich Text Editor)  

**Backend**
- Appwrite (Database, Authentication, Storage)  

**Utilities**
- React Hot Toast  
- XLSX (Excel Export)  
- Moment.js  
- `html5-qrcode` (QR Code Scanning)  
- Nodemailer (Email Sending)  
- Razorpay (Payment Records)  

---
## 📁 Project Structure

```plaintext
.
├── public/
├── src/
│   ├── app/                      # Next.js routing & pages
│   │   ├── (root)/
│   │   ├── Blogs/
│   │   ├── Events/
│   │   ├── Contacts/
│   │   ├── EventRegisterUsers/
│   │   ├── StudyJam/
│   │   ├── Users/
│   │   ├── SendCusEmail/
│   │   ├── Storage/
│   │   ├── api/                  # API Routes (Email, Razorpay)
│   │   ├── globals.css
│   │   └── layout.js
│   ├── components/               # Reusable UI components
│   │   ├── Authentication/
│   │   ├── Blogs/
│   │   ├── Events/
│   │   ├── Hack-On/
│   │   ├── Modals/
│   │   ├── Utility/
│   │   └── TextEditor.jsx
│   ├── Context/                   # React Context for global state
│   ├── Function/                  # Utility functions
│   ├── Layout/                    # Dashboard layouts
│   ├── SampleData/                 # Templates & sample datasets
│   └── config/                     # Appwrite configuration
├── baseurl.js
├── eslint.config.mjs
├── next.config.mjs
├── tailwind.config.mjs
└── .env.local                      # Environment variables (ignored in Git)

---
```

## ⚙️ Environment Variables (`.env.local`)

Create a `.env.local` file in the root directory with the following:

```dotenv
# Email (Nodemailer)
GMAIL_USER=###
GMAIL_PASS=###

# Appwrite Project Config
NEXT_PUBLIC_DATABASEID=###
NEXT_PUBLIC_PROJECTID=###

# Appwrite Collection IDs
NEXT_PUBLIC_USERS_ID=###
NEXT_PUBLIC_EVENTS_ID=###
NEXT_PUBLIC_BLOGS_ID=###
NEXT_PUBLIC_CONTACT_ID=###
NEXT_PUBLIC_EVENTREGISTRATION_ID=###
NEXT_PUBLIC_STUDENT_DISTRO=###
NEXT_PUBLIC_HACK_ON_TEAMS=###
NEXT_PUBLIC_HACK_ON_MEMBERS=###
NEXT_PUBLIC_COUPANS=###

# Appwrite Endpoint
NEXT_PUBLIC_APPWRITE_ENDPOINT=###

# Razorpay Configuration
NEXT_PUBLIC_RAZORPAY_KEY_ID=###
RAZORPAY_SECRET_ID=###
```

## 🔑 Core Functionalities

### 1. **Data Management (CRUD)**
Uses `AppWriteContext.js` to handle create, read, update, and delete operations.

**Example: Creating a blog post**
```javascript
await AddDataToCollection(
  process.env.NEXT_PUBLIC_BLOGS_ID,
  postData,
  sanitizeTitle(title)
);
```
### 2. **File Uploads**
- Uploads are handled via **Appwrite Storage Buckets**.
- Permissions are set dynamically for read, update, and delete access.

---

### 3. **Email Sending**
- Bulk email sender via `SendEmailCom.js` and **Nodemailer API route**.
- Supports HTML templates and attachments.

---

### 4. **Hackathon Features**
- **Teams & Members**: Create, list, and manage participants.  
- **Score Validation**: Judges can assign scores in real-time.  
- **QR Attendance**: Validate users using QR scanning.

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```
git clone <repository-url>
cd GDGC-GCOEN-Admin
```
### 2️⃣ Install dependencies
``` 
npm install
# or
yarn install
```

### 3️⃣ Configure environment variables
Create a .env.local file in the root directory with the variables provided above.

### 4️⃣ Run the development server
``` bash
npm run dev
# or
yarn dev
```

### 5️⃣ Open the application
```
http://localhost:3000
```

