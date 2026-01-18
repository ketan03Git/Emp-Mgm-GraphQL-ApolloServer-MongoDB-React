import { gql } from 'graphql-tag';

const typeDefs = gql`
  enum Status {
    ACTIVE
    INACTIVE
  }

  type Employee {
    id: ID!
    name: String!
    email: String!
    department: String
    salary: Float!
    status: Status!
    createdAt: String
    updatedAt: String
  }

  input CreateEmployeeInput {
    name: String!
    email: String!
    department: String
    salary: Float!
  }

  input UpdateEmployeeInput {
    name: String
    email: String
    department: String
    salary: Float
    status: Status
  }

  type Query {
    # fetch by ID (returns employee even if INACTIVE)
    employee(id: ID!): Employee

    # fetch all active employees (default)
    activeEmployees: [Employee!]!

    # fetch all employees (admin/debug)
    allEmployees: [Employee!]!
  }

  type Mutation {
    createEmployee(input: CreateEmployeeInput!): Employee!
    updateEmployee(id: ID!, input: UpdateEmployeeInput!): Employee!
    deleteEmployee(id: ID!): Employee! # soft delete -> returns updated employee
  }
`;

export default typeDefs;