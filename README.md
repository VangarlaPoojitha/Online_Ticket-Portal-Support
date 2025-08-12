# Customer Support Ticket Portal

A full-stack web application for managing customer support tickets built with Angular frontend and Node.js backend.

## Features

- **Authentication**: JWT-based login/logout system
- **Ticket Management**: Create, read, update, delete support tickets
- **Filtering**: Filter tickets by status and category
- **Form Validation**: Client and server-side validation
- **Error Handling**: Graceful error handling with user-friendly messages
- **Logging**: Winston-based logging for backend operations
- **Testing**: Unit tests for both frontend and backend

## Tech Stack

- **Frontend**: Angular 17, TypeScript, RxJS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Testing**: Jest (Backend), Jasmine/Karma (Frontend)
- **Logging**: Winston

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation & Setup

### 1. Database Setup

```bash
# Install PostgreSQL and create database
psql -U postgres
CREATE DATABASE ticket_portal;

# Run the database schema
psql -U postgres -d ticket_portal -f backend/database.sql
```

### 2. Backend Setup

```bash
cd backend
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your database credentials

# Start the server
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install

# Start the development server
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Tickets (Protected Routes)
- `GET /api/tickets` - Get all tickets (with optional filters)
- `POST /api/tickets` - Create new ticket
- `GET /api/tickets/:id` - Get ticket by ID
- `PUT /api/tickets/:id` - Update ticket
- `DELETE /api/tickets/:id` - Delete ticket

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Project Structure

```
online_ticket_portal/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   ├── tests/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── guards/
│   │   │   └── models/
│   │   └── environments/
│   └── package.json
└── README.md
```

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **View Tickets**: See all support tickets in a filterable table
3. **Create Ticket**: Submit new support requests with title, description, category, and priority
4. **Edit Ticket**: Update existing tickets and change status
5. **Filter Tickets**: Filter by status (open, in-progress, resolved, closed) and category
6. **Delete Ticket**: Remove tickets when no longer needed

## Default Credentials

- Email: `admin@example.com`
- Password: `password`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License.## SonarCloud Integration Complete
# Updated
## SonarCloud Integration Complete
# Fix SonarCloud token
