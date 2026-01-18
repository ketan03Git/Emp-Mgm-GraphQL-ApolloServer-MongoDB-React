import { Schema, model } from 'mongoose';

const EmployeeSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true, unique: true },
  department: { type: String, trim: true, default: '' },
  salary: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' }
}, { timestamps: true });

export default model('Employee', EmployeeSchema);