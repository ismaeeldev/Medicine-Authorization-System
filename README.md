# Medico | Medicine Authorization System

**Medico** is a modern, production-ready SaaS dashboard designed to verify whether a medicine product is authorized and registered under a specific company using its serial number or barcode.

Built with performance, security, and a beautiful UI in mind, it provides a complete flow for registering manufacturing companies and instantly verifying medicine authenticity through an integrated live camera scanner or image upload.

---

## 🎯 Core Features

### 🏢 Company Registration
- Add a new company manually to the secure database.
- Auto-fill and register unique serial numbers.
- Prevent duplicate serial registrations.
- View and manage a clean data table of all authorized companies.

### 🔎 Product Authorization Scanner
- **Live Camera Scanning**: Instantly scan a medicine's barcode using your device's camera.
- **Image Upload**: Upload a photo of a barcode to extract the serial number.
- **Real-time Verification**: The system queries the database and immediately returns the result:
  - ✅ **Authorized**: Shows the registered Company Name.
  - ❌ **Not Registered**: Alerts that the product is illegitimate or not in the system.

### 🎨 Modern UI/UX
- Premium dark mode aesthetic with frosted glassmorphism cards.
- Fully responsive layout (Mobile, Tablet, Desktop).
- Smooth toast notifications for successes and errors.
- Loading skeletons and animated states for a seamless experience.

---

## 🧱 Tech Stack

This project is built using a modern, scalable, and robust technology stack:

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) for end-to-end type safety
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix primitives)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Database**: [MongoDB](https://www.mongodb.com/) (via Atlas or Local)
- **ODM**: [Mongoose](https://mongoosejs.com/)
- **Barcode Library**: [html5-qrcode](https://github.com/mebjas/html5-qrcode) (Client-side fast scanning)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

---

## 📁 Project Architecture

The codebase follows Next.js App Router best practices, ensuring a clean separation of concerns:

```text
medico/
├── app/
│   ├── api/                 # Backend API routes (REST)
│   │   ├── companies/       # GET (List), POST (Add), DELETE
│   │   └── verify/          # GET (Check serial authorization)
│   ├── dashboard/           # Main application shell
│   │   ├── companies/       # Company management module
│   │   └── scanner/         # Barcode scanning module
│   ├── globals.css          # Theme configuration & Tailwind Base
│   └── layout.tsx           # Root layout with Providers
├── components/
│   ├── layout/              # Sidebar & Topbar
│   └── ui/                  # Reusable shadcn/ui building blocks
├── lib/
│   └── db.ts                # MongoDB connection caching utility
└── models/
    └── Company.ts           # Mongoose Schema definitions
```

---

## 🚀 Getting Started (Beginner Friendly)

Follow these simple steps to run the project on your local machine.

### Prerequisites
Make sure you have the following installed on your computer:
1. [Node.js](https://nodejs.org/en/) (v18 or higher)
2. Git
3. A MongoDB database (You can download [MongoDB Community Server](https://www.mongodb.com/try/download/community) locally, or create a free cloud database on [MongoDB Atlas](https://www.mongodb.com/atlas/database)).

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd medico
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Environment Variables
Create a new file named `.env.local` in the root folder of the project, and add your MongoDB connection string:

```env
# If using Local MongoDB:
MONGODB_URI="mongodb://localhost:27017/medico"

# OR if using MongoDB Atlas (Cloud):
# MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/medico?retryWrites=true&w=majority"
```

### 4. Run the Development Server
```bash
npm run dev
```

### 5. Open the Application
Open [http://localhost:3000](http://localhost:3000) in your browser. You will be automatically redirected to the secure dashboard!

---

## 👨‍💻 Developed By

Built with passion and a focus on clean, scalable architecture by:

**Muhammad Ismaael**  
📧 [m.ismaeel.developer@gmail.com](mailto:m.ismaeel.developer@gmail.com)
 