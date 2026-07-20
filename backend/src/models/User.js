import mongoose from 'mongoose';

// ─── User Model ────────────────────────────────────────
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  phone: { type: String, trim: true },
  addresses: [{
    label: { type: String, default: 'Home' },
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    country: { type: String, default: 'India' },
    phone: String,
    isDefault: { type: Boolean, default: false },
  }],
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
}, { timestamps: true });

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model('User', userSchema);
