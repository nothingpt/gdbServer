  import React, { Component } from 'react'
  import ReactModal from 'react-modal'

  import EditGDB from './EditGDB'

  export default class GDB extends Component {
    constructor (props) {
      super(props)
      this.state = {
        editGDB : false,
        showModal : false
      }
      // handleClick = this.bind.handleClick(this)
    }

    handleClick () {
      this.setState({
        editGDB: !this.state.editGDB,
        showModal : true
       })
      this.props.dirty = true;
    }

    closeModal () {
      this.setState({
        editGDB: !this.state.editGDB,
        showModal : false
      })
    }

    render () {
      const { gdb, dirty } = this.props
      const sLen = gdb.status.length

      if (this.state.showModal) {
        return (
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="Edit GDB">
            <EditGDB gdb={ gdb } />
            <button onClick={e => this.closeModal(e)}>close</button>
          </ReactModal>
        )
      } else {
        return (
          <span onClick={ e => this.handleClick(e) }>
          <div className='gdb-container'>
          <div className='gdb-header'>
          <div className='gdb-customer'>
          { gdb.customer } - { dirty ? 'dirty' : 'not dirty'}
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
          </span>
        )
      }
    }
  }
