<div align="center">

# 🚀 ERPTA
### Enterprise Resource Planning System for Industry 4.0

A modern, AI-powered Enterprise Resource Planning (ERP) platform built with **Next.js**, **TypeScript**, and a **Hybrid Storage Architecture**. Designed to streamline procurement, inventory, warehouse, finance, CRM, and project management within a single integrated system.

<p>
    <a href="https://github.com/lafatha/ERPTA/stargazers">
        <img src="https://img.shields.io/github/stars/lafatha/ERPTA?style=for-the-badge">
    </a>
    <a href="https://github.com/lafatha/ERPTA/network/members">
        <img src="https://img.shields.io/github/forks/lafatha/ERPTA?style=for-the-badge">
    </a>
    <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js">
    <img src="https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript">
    <img src="https://img.shields.io/badge/OpenRouter-AI-purple?style=for-the-badge">
    <img src="https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel">
</p>

</div>

---

# 🎥 Project Demonstration

<p align="center">
<a href="https://www.youtube.com/watch?v=RB4og3ITs5I">
<img src="https://img.youtube.com/vi/RB4og3ITs5I/maxresdefault.jpg" width="900">
</a>
</p>

<div align="center">

## ▶️ Watch Full Demo

https://www.youtube.com/watch?v=RB4og3ITs5I

</div>

---

# ✨ Features

### 📦 Inventory Management
- Product Management
- Category Management
- Warehouse Management
- Stock Tracking
- Stock Adjustment
- Real-time Inventory Monitoring

### 🛒 Procurement
- Purchase Request
- Purchase Order
- Vendor Management
- Goods Receipt
- Approval Workflow

### 💰 Finance
- Revenue Dashboard
- Expense Tracking
- Financial Analytics
- Transaction History

### 👥 Customer Relationship Management
- Customer Database
- Sales Pipeline
- Customer Analytics
- Contact Management

### 📁 Project Management
- Task Assignment
- Team Collaboration
- Progress Monitoring
- Timeline Management

### 🤖 AI Assistant
- Powered by OpenRouter
- AI Business Consultation
- Smart Recommendation
- Report Assistance

### 📊 Analytics Dashboard
- Sales Analytics
- Procurement Analytics
- Financial Reports
- Warehouse Reports
- KPI Dashboard

---

# 🏗 System Architecture

```
                    Users
                      │
                      ▼
                Next.js Frontend
                      │
     ┌────────────────┼─────────────────┐
     ▼                ▼                 ▼
 Authentication    API Layer      AI Assistant
     │                │                 │
     ▼                ▼                 ▼
 Supabase Auth      MySQL          OpenRouter API
                      │
                      ▼
             Hybrid Storage Service
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
      Supabase               S3 Storage
```

---

# 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | Next.js |
| Language | TypeScript |
| Backend | Next.js API |
| Database | MySQL |
| Authentication | Supabase |
| Storage | Supabase + Custom S3 |
| AI | OpenRouter |
| Hosting | Vercel |
| Styling | Tailwind CSS |

---

# 📂 Project Structure

```
ERPTA/
│
├── app/
├── components/
├── hooks/
├── lib/
├── services/
├── types/
├── utils/
├── public/
├── middleware.ts
├── package.json
└── README.md
```

---

# 🚀 Installation

Clone repository

```bash
git clone https://github.com/lafatha/ERPTA.git
```

Go to project

```bash
cd ERPTA
```

Install dependencies

```bash
npm install
```

Configure environment

```bash
cp .env.example .env.local
```

Run development server

```bash
npm run dev
```

---

# 🔑 Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

DATABASE_URL=

OPENROUTER_API_KEY=

S3_ENDPOINT=
S3_BUCKET=
S3_ACCESS_KEY=
S3_SECRET_KEY=
```

---

# 🌐 Open Source Projects

### ERP Application

https://github.com/lafatha/ERPTA

### Hybrid Storage Service

https://github.com/lafatha/s3

---

# 📸 Screenshots

| Dashboard | Inventory |
|-----------|-----------|
| Add Screenshot | Add Screenshot |

| Procurement | CRM |
|--------------|-----|
| Add Screenshot | Add Screenshot |

---

# 🎯 Roadmap

- ✅ Authentication
- ✅ Dashboard
- ✅ Inventory
- ✅ Procurement
- ✅ Finance
- ✅ CRM
- ✅ Warehouse
- ✅ AI Assistant
- ✅ Analytics
- ⏳ Mobile Version
- ⏳ Notification Service
- ⏳ Multi-company Support

---

# 🤝 Contributing

Contributions are welcome!

```bash
Fork the repository

Create a feature branch

Commit your changes

Open a Pull Request
```

---

# 📜 License

This project is released as an **Open Source Project** under the MIT License.

---

<div align="center">

### ⭐ If you found this project useful, consider giving it a Star!

Made with ❤️ by **Gagah Athallah Fatha**

</div>
