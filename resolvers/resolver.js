import gdbData from '../data/mock'

const resolvers = {
  Query: {
    GDB(root, args) {
      if (args.gdbno) {
        console.log(`gdbno: ${args.gdbno}`)
        var gdbno = args.gdbno
        return gdbData.filter(gdb => {
          return gdb.gdbno == gdbno
        })[0]
      }
    },
    GDBS(root, args) {
      if (args.createdBy) {
        var createdBy = args.createdBy
        return gdbData.filter(gdb => gdb.createdBy === createdBy)
      } else {
        return gdbData
      }
    },
    //getStatus(gdbno: String!): Status!
    getStatus(root, args) {
      const gdb = gdbData.filter(gdb => gdb.gdbno === args.gdbno)
      console.log('GDB: ' + gdb)
      return gdb[0].status
    }
  },
  Mutation: {
    createGDB(root, args) {
      console.log({args})
      const newGDB = {
        gdbno: args.gdbno,
        creationDate: args.creationDate,
        createdBy: args.createdBy,
        customer: args.customer,
        active: true,
        status: [{
          statusType: args.statusType || 'OPEN',
          statusDate: args.statusDate || args.creationDate,
          statusDesc: args.statusDesc || ''
        }]
      }
      gdbData.push(newGDB)
      return newGDB
    },
    // updateStatus(gdbno: String!, statusType: String!, statusDate: String, statusDesc: String)
    updateStatus(root, args) {
      console.log(`gdbno: ${args.gdbno}`)

      let status = {statusType: args.statusType}
      
      if (args.statusDate !== undefined){
        status.statusDate = args.statusDate
      }

      if (args.statusDesc !== undefined){
        status.statusDesc = args.statusDesc
      }      

      gdbData.forEach(gdb => {
        if (gdb.gdbno === args.gdbno) {
          gdb.status.push(status)
        }
      })

      const gdb = gdbData.filter(gdb => {
        if (gdb.gdbno === args.gdbno) {
          return gdb
        }
      })

      console.log('GDB: ' + gdb[0].gdbno)
      return gdb[0]
    },
    //updateGDB(gdbno: String!, creationDate: String, createdBy: String, customer: String, active: Boolean): GDB
    updateGDB (root, args) {
      // find index
      const index = gdbData.findIndex(gdb => gdb.gdbno == args.gdbno)

      // check if property is supplied in the args object, and if so updates the document
      if (args.creationDate !== undefined){
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
