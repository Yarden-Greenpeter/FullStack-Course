const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phoneValidator = (phone) => {
  const phoneRegex = /^\d{2,3}-\d+$/
  
  if (!phoneRegex.test(phone)) {
    return false
  }
  
  // Check minimum length of 8 characters
  if (phone.length < 8) {
    return false
  }
  
  return true
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Name must be at least 3 characters long'],
    required: [true, 'Name is required']
  },
  number: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: phoneValidator,
      message: 'Phone number must be at least 8 characters long and formatted as XX-XXXXXXX or XXX-XXXXXXX (e.g., 09-1234556 or 040-22334455)'
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)