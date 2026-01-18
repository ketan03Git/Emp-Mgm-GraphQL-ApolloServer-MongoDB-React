# Employee Management (GraphQL, React, Express, MongoDB)

Overview
- Backend: Express + Apollo Server (GraphQL) + Mongoose (MongoDB)
- Frontend: React + Apollo Client
- Soft delete: deleteEmployee marks status = INACTIVE
- Email uniqueness enforced at DB level (duplicate attempts return a clear error)

Prereqs
- Node 18+ recommended
- MongoDB (local or Atlas)

Setup

1) Clone / place files into a folder with two subfolders: `server` and `client`.

2) Server
   - cd server
   - copy `.env.example` to `.env` and set `MONGODB_URI` (e.g. mongodb://localhost:27017/employee_db)
   - npm install
   - npm start
   - GraphQL playground is available at http://localhost:4000/graphql

3) Client
   - cd client
   - optionally set REACT_APP_GRAPHQL_URL in `.env` (defaults to http://localhost:4000/graphql)
   - npm install
   - npm start
   - Open http://localhost:3000

GraphQL Examples

- Create employee
  mutation {
    createEmployee(input: { name: "Alice", email: "alice@example.com", department: "HR", salary: 70000 }) {
      id name email status
    }
  }

- Get active employees
  query {
    activeEmployees {
      id name email department salary status
    }
  }

- Get employee by id
  query {
    employee(id: "60...") { id name email status }
  }

- Update employee
  mutation {
    updateEmployee(id: "60...", input: { salary: 80000, department: "People" }) {
      id name salary department
    }
  }

- Soft delete (mark INACTIVE)
  mutation {
    deleteEmployee(id: "60...") {
      id status
    }
  }

Notes / Next steps
- Add authentication & role-based access to protect mutations
- Add server-side pagination and filtering (GraphQL connections)
- Add better frontend form validation and nicer UI (Material UI / AntD)
- Add unit & integration tests
