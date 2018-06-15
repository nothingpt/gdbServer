  import React, { Component } from 'react'
  import ReactModal from 'react-modal'
  import Moment from 'react-moment'
  import gql from 'graphql-tag'
  import { Mutation } from 'react-apollo'
  
  import EditGDB from './EditGDB'
  
  const UPDATE_STATUS = gql`
  mutation updateStatus($gdbno: String!, $statusType: String!) {
    updateStatus(gdbno: $gdbno, statusType: $statusType) {
      gdbno
      status {
        statusType
        statusDate
        statusDesc
      }
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
    
    changeStatus (e, key, value) {
      e.stopPropagation() // do not activate Modal
      this.setState({editGDB: !this.state.editGDB})
      if (e.target.name === 'statusSelect') {        
        this.updateStatus({ variables: { gdbno: key, statusType: value } })
        
      }      
    }    
    
    render () {
      const { gdb } = this.props
      const { status } = gdb
      const sLen = gdb.status.length
      
      return (
        <Mutation mutation={UPDATE_STATUS}>
        {(updateStatus, { loading, error }) => (         
        <div className='gdb-container'>
          {loading && <div>loading...</div>} 
          { error && <div>Error</div>}
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
              <div className='gdb-status mainselection'>
                <select id='statusSelect' name='statusSelect' onChange={e => {
                    updateStatus({ variables: { gdbno: gdb.gdbno, statusType: document.getElementById('statusSelect').value } })
                    this.setState({editGDB: !this.state.editGDB})
                  }} onMouseLeave = {e => {this.setState({editGDB: false}) }}>
                  { this.state.status.map(s => <option value={s} key={s}>{s}</option>)}
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
  