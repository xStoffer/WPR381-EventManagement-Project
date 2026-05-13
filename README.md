# Smart Event Management & Ticketing Platform

## Overview
A full-stack web application built for Advanced Events (Pty) Ltd to manage events, ticket bookings, and customer enquiries. The system supports secure authentication, role-based access control, and an admin analytics dashboard.

## Technologies Used
- **Backend:** Node.js, Express.js
- **Frontend:** EJS, HTML5, CSS3, Bootstrap 5
- **Database:** MongoDB, Mongoose ODM
- **Authentication:** express-session, bcrypt
- **Security:** csurf, express-rate-limit, cors
- **Other:** dotenv, winston, nodemon

## Original Roles: 
•	P1 – Team Lead / Project Coordinator : Riegardt Weich
•	P2 – Backend Developer : Nkosana Mtsweni
•	P3 – Frontend Developer : Tristan Roets
•	P4 – Database Engineer : Rian Christoffel Lombard
•	P5 – Security / DevOps Engineer : David Takudzwa

## Team Members and Roles
| Name | Role |
|------|------|
| Riegardt Weich | Team Lead / Project Coordinator |
| Riegardt Weich and Rian Lombard | Backend Developer |
| Riegardt Weich and Tristan Roets | Frontend Developer |
| Riegardt Weich | Database Engineer |
| Riegardt Weich and David Takudzwa | Security / DevOps Engineer |

## Additional Members
| Nkosana Mtsweni | |

## Setup Instructions

### 1. Clone the repository
```bash
git clone <your-github-repo-url>
cd smart-events
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create your environment file
Create a `.env` file in the `smart-events` folder with the following:
MONGO_URI=mongodb://riegardtwwork_db_user:Password1@ac-yzkpbv6-shard-00-00.hgsfvli.mongodb.net:27017,ac-yzkpbv6-shard-00-01.hgsfvli.mongodb.net:27017,ac-yzkpbv6-shard-00-02.hgsfvli.mongodb.net:27017/?ssl=true&replicaSet=atlas-12hazv-shard-0&authSource=admin&appName=MainCluster
SESSION_SECRET=pickAnythingHereAsASecretKey

### 4. Run the app
```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

### 5. Open in browser
http://localhost:3000/

### 6. Create an admin account
Run this once to seed an admin user:
```bash
node createAdmin.js
```

## GitHub Repository
https://github.com/xStoffer/WPR381-EventManagement-Project
