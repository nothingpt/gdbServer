import React, { Component } from 'react'

export default class GDB extends Component {
  render () {
    const { gdb } = this.props
    const sLen = gdb.status.length

    return (
      <div className='gdb-container'>
        { gdb.gdbno } - { gdb.customer } - { gdb.createdBy } - { gdb.creationDate } - { gdb.status[sLen - 1].statusType}
      </div>
    )
  }
}
