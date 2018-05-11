import mongoose from 'mongoose'

const Schema = mongoose.Schema

const gdbSchema = new Schema({
  gdbno: {
    type: String,
    required: true,
    unique: true
  },
  creationDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  customer: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  status: [
    {
      statusType: {
        type: String,
        required: true
      },
      statusDate: {
        type: Date,
        default: Date.now
      },
      statusDesc: {
        type: String
      }
    }
  ]
})

const gdbModel = mongoose.model('GDB', gdbSchema)

export default gdbModel
