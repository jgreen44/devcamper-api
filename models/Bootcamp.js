const mongoose = require('mongoose');
const slugify = require('slugify');

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'], // Validation
    unique: true,
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters'],
  },
  slug: String, // Slug is a url friendly version of the name
  description: {
    type: String,
    required: [true, 'Please add a description'], // Validation
    maxlength: [500, 'Description can not be more than 500 characters'],
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
      'Please use a valid URL with HTTP or HTTPS', // Validation
    ],
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone number can not be longer than 20 characters'], // Validation
  },
  email: {
    type: String,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please use a valid email address', // Validation
    ],
  },
  address: {
    type: String,
    required: [true, 'Please add an address'], // Validation
  },
  location: {
    // GeoJSON Point
    type: {
      type: String,
      enum: ['Point'], // Validation
      required: false,
    },
    coordinates: {
      type: [Number],
      required: false,
      index: '2dsphere', // Index for geospatial queries
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  careers: {
    // Array of strings
    type: [String],
    required: true,
    enum: [
      // Validation
      'Web Development',
      'Mobile Development',
      'UI/UX',
      'Data Science',
      'Business',
      'Other',
    ],
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'], // Validation
    max: [10, 'Rating must can not be more than 10'], // Validation
  },
  averageCost: Number,
  photo: {
    type: String,
    default: 'no-photo.jpg',
  },
  housing: {
    type: Boolean,
    default: false, // Validation
  },
  jobAssistance: {
    type: Boolean,
    default: false, // Validation
  },
  jobGuarantee: {
    type: Boolean,
    default: false, // Validation
  },
  acceptGi: {
    type: Boolean,
    default: false, // Validation
  },
  createdAt: {
    type: Date,
    default: Date.now, // Validation
  },
});

// Create bootcamp slug from the name
BootcampSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Bootcamp', BootcampSchema);
