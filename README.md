SolarCRM — Backend

REST API powering SolarCRM, a CRM platform built for solar companies. Handles auth, role-based access, leads, proposals, payroll, training, and audit logging.

🔗 Frontend Repo: https://github.com/ZAHIDHOSEN/CRM-Dashboard-Client
🔗 Live API: https://crm-dashboard-server.vercel.app

Features


JWT authentication with httpOnly cookies
6 role-based access levels (Admin, Leader, Closer, Setter, Installer,Client)
Lead & proposal pipeline management
Payroll and commission balance sync
Training modules with server-side quiz grading
Audit logging with TTL indexing
Automatic data scoping per role


Tech Stack

Node.js, Express, TypeScript, MongoDB, Mongoose, JWT

Models

User, Lead, Proposal, Payroll, TrainingModule, Message, Team, Organization, AuditLog

Getting Started

bashgit clone https://github.com/ZAHIDHOSEN/CRM-Dashboard-Server
cd solarcrm-backend
npm install
npm run dev

Create a .env file:

PORT=5000
DB_URL=your_mongodb_connection_string
NODE_ENV=development
JWT_ACCESS_SECRECT = jwt secrect
JWT_REFRESH_SECRECT = jwt secrect
JWT_ACCESS_EXPIRES=30m
JWT_REFRESH_EXPIRES=15d



Author

Zahid Hosen
GitHub: @ZAHIDHOSEN
Portfolio: https://my-portfolio-lovat-beta-19.vercel.app/
