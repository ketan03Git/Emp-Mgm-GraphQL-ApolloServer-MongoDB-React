import Employee from '../models/Employee.js';
import { isValidEmail } from '../utilis/validators.js';

import { GraphQLError } from 'graphql';

const toResult = (doc) => {
  if (!doc) return null;
  const obj = doc.toObject();
  obj.id = doc._id.toString();
  return obj;
};

const badUserInput = (message, argumentName) =>
  new GraphQLError(message, { extensions: { code: 'BAD_USER_INPUT', argumentName } });

const conflictError = (message, detail) =>
  new GraphQLError(message, { extensions: { code: 'CONFLICT', detail } });

const notFoundError = (message) =>
  new GraphQLError(message, { extensions: { code: 'NOT_FOUND' } });

const internalError = (message) =>
  new GraphQLError(message, { extensions: { code: 'INTERNAL_SERVER_ERROR' } });

const resolvers = {
  Query: {
    employee: async (_, { id }) => {
      const doc = await Employee.findById(id).exec();
      return toResult(doc);
    },

    activeEmployees: async () => {
      const docs = await Employee.find({ status: 'ACTIVE' }).sort({ createdAt: -1 }).exec();
      return docs.map(toResult);
    },
  },

  Mutation: {
    createEmployee: async (_, { input }) => {
      const { name, email, department = '', salary } = input;

      if (!isValidEmail(email)) {
        throw new GraphQLError('Invalid email format', {
          extensions: { code: 'BAD_USER_INPUT' }
        });
      }

      if (!name || !email || salary === undefined || salary === null) {
        throw badUserInput('name, email and salary are required');
      }
      if (salary < 0) throw badUserInput('salary must be >= 0', 'salary');

      try {
        const emp = new Employee({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          department: (department || '').trim(),
          salary,
        });
        const saved = await emp.save();
        return toResult(saved);
      } catch (err) {
        if (err && err.code === 11000) {
          // duplicate key (e.g. email unique)
          throw conflictError('Email already exists', 'EMAIL_EXISTS');
        }
        if (err && err.name === 'ValidationError') {
          throw badUserInput(err.message);
        }
        throw internalError(err.message || 'Failed to create employee');
      }
    },

    updateEmployee: async (_, { id, input }) => {
      if (input?.salary !== undefined && input.salary < 0) {
        throw badUserInput('Salary must be >= 0', 'salary');
      }
      if (input?.email) input.email = input.email.trim().toLowerCase();

      try {
        const updated = await Employee.findByIdAndUpdate(id, input, {
          new: true,
          runValidators: true,
        }).exec();
        if (!updated) throw notFoundError('Employee not found');
        return toResult(updated);
      } catch (err) {
        if (err && err.code === 11000) {
          throw conflictError('Email already exists', 'EMAIL_EXISTS');
        }
        if (err && err.name === 'ValidationError') {
          throw badUserInput(err.message);
        }
        throw internalError(err.message || 'Failed to update employee');
      }
    },

    deleteEmployee: async (_, { id }) => {
      const updated = await Employee.findByIdAndUpdate(
        id,
        { status: 'INACTIVE' },
        { new: true }
      ).exec();
      if (!updated) throw notFoundError('Employee not found');
      return toResult(updated);
    },
  },
};

export default resolvers;