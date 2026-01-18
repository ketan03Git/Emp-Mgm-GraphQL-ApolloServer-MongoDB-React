🔗 Live Demo: https://emp-mgm-graph-ql-apollo-server-mong.vercel.app/

# Employee Management (GraphQL + ApolloServer, Express, MongoDB, React + ApolloClient)
- Backend: Express + Apollo Server (GraphQL) + Mongoose (MongoDB)
- Frontend: React + Apollo Client
- Email uniqueness enforced at DB level (duplicate attempts return a clear error)
- Prereqs
- Node 18+ recommended
- MongoDB (local or Atlas)
----------------------------------------------------------------------------------
- Setup
1) Clone / place files into a folder with two subfolders: `server` and `client`.

2) Server:
   - cd server
   - change `.env` relevant data
   - npm install
   - npm start
  
3) Client:
   - cd client
   - optionally set REACT_APP_GRAPHQL_URL in `.env` (defaults to http://localhost:4000/graphql)
   - npm install
   - npm start
   - Open http://localhost:3000
   --------------------------------------------------------------------------------
   --GraphQL Examples--

- Create employee
  mutation {
    createEmployee(input: { name: "", email: "", department: "", salary:  }) {
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
    employee(id: " ") { id name email status }
  }

- Update employee
  mutation {
    updateEmployee(id: " ", input: { salary: , department: " " }) {
      id name salary department
    }
  }

- Soft delete (mark INACTIVE)
  mutation {
    deleteEmployee(id: " ") {
      id status
    }
  }
