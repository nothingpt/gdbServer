import gdbList from '../models/GDB'

const resolvers = {
  Query: {
    getGDB (root, args) {
      if (args.gdbno) {
        const {gdbno} = args
        const res = new Promise((resolve, reject) => {
          console.log('res')
          gdbList.findOne({gdbno}, (err, gdb) => {
            if (err) {
              reject(err)
            }

            resolve(gdb)
          })
        })
        return res
      }
    },
    getGDBS (root, args) {
      if (args.createdBy) {
        const {createdBy} = args.createdBy
        const res = new Promise((resolve, reject) => {
          gdbList.find({createdBy}, (err, gdb) => {
            if (err) {
              reject(err)
            }
            resolve(gdb)
          })
        })
        return res
      } else {
        const res = new Promise((resolve, reject) => {
          gdbList.find({}, (err, gdb) => {
            if (err) {
              console.log('err: ' + err)
              reject(err)
            }

            resolve(gdb)
          })
        })
        return res
      }
    },
    getStatus (root, args) {
      const res = new Promise((resolve, reject) => {
        gdbList.findOne({gdbno: args.gdbno}, (err, gdb) => {
          if (err) {
            reject(err)
          }
          resolve(gdb)
        })
      })
      return res.status
    }
  },
  Mutation: {
    createGDB (root, args) {
      // Todo: use date
      const newGDB = {
        gdbno: args.gdbno,
        creationDate: new Date(),
        createdBy: args.createdBy,
        customer: args.customer,
        active: true,
        status: [{
          statusType: args.statusType || 'OPEN',
          statusDate: args.statusDate || new Date(),
          statusDesc: args.statusDesc || ''
        }]
      }

      const res = new Promise((resolve, reject) => {
        gdbList.create(newGDB, (err, gdb) => {
          if (err) {
            reject(err)
          }
          resolve(gdb._doc)
        })
      })

      return res
    },
    // updateStatus(gdbno: String!, statusType: String!, statusDate: String, statusDesc: String)
    updateStatus (root, args) {
      let status = {statusType: args.statusType}
      // Create an object with only the fields supplied by the args
      if (args.statusDate !== undefined) {
        status.statusDate = args.statusDate || new Date()
      }

      if (args.statusDesc !== undefined) {
        status.statusDesc = args.statusDesc
      }

      const res = new Promise((resolve, reject) => {
        gdbList.update({gdbno: args.gdbno}, {$push: {status}}, (err, doc) => {
          if (err) {
            reject(err)
          }

          const gdb = new Promise((resolve, reject) => {
            gdbList.findOne({gdbno: args.gdbno}, (err, doc) => {
              if (err) {
                reject(err)
              }
              resolve(doc)
            })
          })
          resolve(gdb)
        })
      })

      return res
    },
    // updateGDB(gdbno: String!, creationDate: String, createdBy: String, customer: String, active: Boolean): GDB
    updateGDB (root, args) {
      // create object to store args
      let gdb = {...args}

      const res = new Promise((resolve, reject) => {
        gdbList.findOneAndUpdate({gdbno: gdb.gdbno}, gdb, {new: true}, (err, doc) => {
          if (err) {
            reject(err)
          }
          resolve(doc)
        })
      })

      return res
    }
  }
}

export default resolvers
