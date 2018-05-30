import React, { Component } from 'react'

export default class GDB extends Component {
  render () {
    const { gdb } = this.props
    const sLen = gdb.status.length

    return (
      <div className='gdb-container'>
        <div className='gdb-header'>
          <div className='gdb-customer'>
            { gdb.customer }
          </div>
          <div className='gdb-creationDate'>
            { gdb.creationDate }
          </div>
        </div>
        <div className='gdb-main'>
          <div className='gdb-gdbno'>
            { gdb.gdbno }
          </div>
        </div>
        <div className='gdb-footer'>
          <div className='gdb-createdBy'>
            { gdb.createdBy }
          </div>
          <div className='gdb-status'>
            { gdb.status[sLen - 1].statusType}
          </div>
        </div>
      </div>
    )
  }
}
