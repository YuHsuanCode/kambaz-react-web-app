/*pop up when you click  +Assignment buttons a new assignment editor*/
//import {Link} from "react-router-dom";
export default function AssignmentsEditor({
    dialogTitle,
    assignmentName,
    setAssignmentName,
    addAssignment,
    saveAssignment,
    isEditing = false,
  }: any) {
    return (
      <div
        id="wd-add-assignment-dialog"
        className="modal fade"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog">
          <div className="modal-content">
  
            <div className="modal-header">
              <h1 className="modal-title fs-5">{dialogTitle}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
  
            <div className="modal-body">
  
              <input
                className="form-control mb-2"
                value={assignmentName.title || ""}
                placeholder="New Assignment"
                onChange={(e) =>
                  setAssignmentName({
                    ...assignmentName,
                    title: e.target.value,
                  })
                }
              />
  
              <textarea
                className="form-control mb-2"
                value={assignmentName.description || ""}
                placeholder="Description"
                onChange={(e) =>
                  setAssignmentName({
                    ...assignmentName,
                    description: e.target.value,
                  })
                }
              />
  
              <input
                className="form-control mb-2"
                value={assignmentName.points || ""}
                placeholder="Points"
                onChange={(e) =>
                  setAssignmentName({
                    ...assignmentName,
                    points: e.target.value,
                  })
                }
              />
  
              <input
                type="date"
                className="form-control mb-2"
                value={assignmentName.dueDate || ""}
                onChange={(e) =>
                  setAssignmentName({
                    ...assignmentName,
                    dueDate: e.target.value,
                  })
                }
              />
  
            </div>
  
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
  
              {isEditing ? (
                <button
                  onClick={saveAssignment}
                  data-bs-dismiss="modal"
                  className="btn btn-success"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={addAssignment}
                  data-bs-dismiss="modal"
                  className="btn btn-danger"
                >
                  Add
                </button>
              )}
            </div>
  
          </div>
        </div>
      </div>
    );
  }