import React from 'react'

function DeleteDialog({ id, deleteObject }) {

  
  return (
    <div id="deleteModal" className="modal">
      <div className="modal-content">
        <h4>Delete Job?</h4>
        <p>Do you confirm the deletion?</p>
      </div>
      <div className="modal-footer">
        <button className="modal-close waves-effect waves-green btn-flat">No</button>
        <button className="modal-close waves-effect waves-green btn-flat" onClick={() => deleteObject(id)}>Yes</button>
      </div>
    </div>
  )
}

export default DeleteDialog