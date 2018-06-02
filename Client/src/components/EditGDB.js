import React, { Component } from 'react'

class EditGDB extends Component {
  render () {
    const { gdb } = this.props

    return (
      <div className="container-newGDB">
        <div>GDB #: { gdb.gdbno }</div>
        <div>Customer: { gdb.customer }</div>
        <div>Created At: { gdb.creationDate }</div>
        <div>Created By: { gdb.createdBy }</div>
        <button onClick={ e => this.handleClick(e) }>back</button>
      </div>
    )
  }
}

export default EditGDB
