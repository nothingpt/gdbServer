import gdbData from '../data/mock'
import gdbList from '../models/GDB'

const resolvers = {
  Query: {
    getGDB (root, args) {
      if (args.gdbno) {
        const {gdbno} = args
        // TODO: use async/await
        return gdbList.findOne({gdbno}, (err, data) => {
          if (err) {
            return err
          }

          return data
        })
      }
    },
    getGDBS (root, args) {
      if (args.createdBy) {
        const {createdBy} = args.createdBy
        // TODO: use async/await
        return gdbList.find({createdBy}, (err, data) => {
          if (err) {
            return err
          }
          return data
        })
      } else {
        return gdbList.find({}, (err, data) => {
          if (err) {
            return err
          }

          return data
        })
      }
    },
    getStatus (root, args) {
      const gdb = gdbData.filter(gdb => gdb.gdbno === args.gdbno)
      return gdb[0].status
    }
  },
  Mutation: {
    async createGDB (root, args) {      
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
            console.log(err)
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
      // find index
      const index = gdbData.findIndex(gdb => gdb.gdbno == args.gdbno)

      // check if property is supplied in the args object, and if so updates the document
      if (args.creationDate !== undefined) {
        gdbData[index].creationDate = args.creationDate
      }

      if (args.createdBy !== undefined) {
        gdbData[index].createdBy = args.createdBy
      }

      if (args.customer !== undefined) {
        gdbData[index].customer = args.customer
      }

      if (args.active !== undefined) {
        gdbData[index].active = args.active
      }

      return gdbData[index]
    }
  }
}

export default resolvers
