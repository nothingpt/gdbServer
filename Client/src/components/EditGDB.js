import React, { Component } from 'react'
import Moment from 'react-moment'

class EditGDB extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showHistory: false,      
      editGDB: false
    }
  }

  toggleHistory () {
    this.setState({ showHistory: !this.state.showHistory })
  }

  handleClick () {

  }

  render () {
    const { gdb } = this.props
    const { status } = gdb

    return (
      <div className='container-newGDB'>
        <div>GDB #: { gdb.gdbno }</div>
        <div>Customer: { gdb.customer }</div>
        <div>Created At: <Moment format='DD/MM/YYYY'>{ gdb.creationDate }</Moment></div>
        <div>Created By: { gdb.createdBy }</div>
        <div>
          <span onMouseOver={e => this.toggleHistory(e)} onMouseOut={e => this.toggleHistory(e)} className='history-click'>
            Status: { status[status.length - 1].statusType }
            <span className='status-date'>
              (<Moment format='DD/MM/YYYY'>{ status[status.length - 1].statusDate }</Moment>)
            </span>
          </span>
        </div>
        { this.state.showHistory && // short-circuit
          <div className='history-container' onMouseOver={e => this.toggleHistory(e)} onMouseOut={e => this.toggleHistory(e)}>
            { status.map(s => <div>{s.statusType} <span className='status-date'>(<Moment format='DD/MM/YYYY'>{s.statusDate}</Moment>)</span></div>)}
          </div>
        }
      </div>
    )
  }
}

export default EditGDB
