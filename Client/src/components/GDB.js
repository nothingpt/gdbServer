  import React, { Component } from 'react'
  import ReactModal from 'react-modal'
  import Moment from 'react-moment'
  import gql from 'graphql-tag'
  import { Mutation } from 'react-apollo'
  
  import EditGDB from './EditGDB'
  
  const UPDATE_STATUS = gql`
  mutation updateStatus($gdbno: String!, $statusType: String, $statusDate: String, $statusDesc: String) {
    updateStatus(gdbno: $gdbno, statusType: $statusType, statusDate: $statusDate, statusDesc: $statusDesc) {
      gdbno
      statusType
      statusDate
      statusDesc
    }
  }
  ` 
  
  export default class GDB extends Component {
    constructor (props) {
      super(props)
      this.state = {
        editGDB : false,
        showHistory: false, 
        status: ['OPEN', 'CLOSE', 'PREPARE MORE INFO'],
      }
    }
    
    toggleHistory (e) {
      this.setState({
        showHistory: !this.state.showHistory
      })
    }
    
    changeStatus (e, key) {
      e.stopPropagation() // do not activate Modal
      
      if (e.target.name === 'statusSelect') {
        // alert(e.target.value)
        alert('ID: ' + key)
        updateStatus({ variables: { gdbno: key, statusType: 'MUTATED' } })
      }
      
      this.setState({editGDB: !this.state.editGDB})
    }    
    
    render () {
      const { gdb } = this.props
      const { status } = gdb
      const sLen = gdb.status.length
      
      return (
        <Mutation mutation={UPDATE_STATUS}>
        {(updateStatus, { data }) => (
        <div className='gdb-container'>
          <div className='gdb-header'>
            <div className='gdb-customer'>
            {gdb.customer}
            </div>
            <div className='gdb-creationDate'>
            <Moment format='DD/MM/YYYY'>{ gdb.creationDate }</Moment>
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
            { !this.state.editGDB &&
              <div className='gdb-status' onClick={e => this.changeStatus(e)}>
                <span>{ gdb.status[sLen - 1].statusType}</span>            
              </div>
            }
            { this.state.editGDB && 
              <div className='gdb-status' onClick={e => this.changeStatus(e, gdb.gdbno)}>
                <select name='statusSelect' onChange={e => this.handleChange(e)}>
                  { this.state.status.map(s => <option value={s}>{s}</option>)}
                </select>
              </div>
            }
          </div>
        </div>
        )}
        </Mutation>
      )
    }
  }
  