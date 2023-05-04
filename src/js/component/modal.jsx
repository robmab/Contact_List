import React,{useContext} from "react";

import { Context } from "../store/appContext";

export const Modal = (props)=>{
    const {store, actions}= useContext(Context)

    const deleteContact = (e) => {
        actions.deleteData(Number(e.target.id));
        props.setContacts(store.contactList);
      };

    return (
        <div
        className="modal fade"
        id={"exampleModal" + props.id}
        tabIndex="-1"
        aria-labelledby={"exampleModalLabel" + props.id}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id={"exampleModalLabel" + props.id}
              >
                Are you sure?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Do you want to delete this contact?
            </div>
            <div className="modal-footer">
              <button
                type="button "
                className="btn btn-primary "
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                id={props.id}
                onClick={deleteContact}
                type="button"
                className="btn btn-secondary "
                data-bs-dismiss="modal"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}

/* Para que el modal detecte el id del contacto al darle a borrar,
 es necesario que el identificador del propio modal sea único, 
 por lo que aprovechamos el id de props para asociarlo tanto a 
 aria-labelledby como al id del modal. */