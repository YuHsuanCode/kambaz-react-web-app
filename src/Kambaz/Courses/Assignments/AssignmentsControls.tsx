// add new assignments
import AssignmentsEditor from "./AssignmentsEditor";
import { BsSearch } from "react-icons/bs";

interface AssignmentsControlsProps {
  dialogTitle: string;
  assignmentName: {
    title: string;
    description: string;
    points: string;
    dueDate: string;
    availableFrom: string;
    availableTo: string;
    _id?: string;
  };
  setAssignmentName: (assignment: any) => void;
  addAssignment: () => void;
  saveAssignment: () => void;
  isEditing?: boolean;
}

export default function AssignmentsControls({
  dialogTitle,
  assignmentName,
  setAssignmentName,
  addAssignment,
  saveAssignment,
  isEditing = false,
}: AssignmentsControlsProps) {
  return (
    <div className="d-flex justify-content-between align-items-center">
      {/* Search */}
      <div className="input-group w-50">
        <span className="input-group-text">
          <BsSearch />
        </span>
        <input
          type="text"
          placeholder="Search..."
          id="wd-search-assignment"
          className="form-control"
        />
      </div>

      {/* Buttons */}
      <div className="d-flex">
        <button
          id="wd-add-assignment-group"
          className="btn btn-light me-2"
          data-bs-toggle="modal"
          data-bs-target="#wd-add-assignment-dialog"
        >
          + Group
        </button>

        <button
          id="wd-add-assignment"
          className="btn btn-danger me-1"
          data-bs-toggle="modal"
          data-bs-target="#wd-add-assignment-dialog"
        >
          + Assignment
        </button>
      </div>

      {/* Modal Editor */}
      <AssignmentsEditor
        dialogTitle={dialogTitle}
        assignmentName={assignmentName}
        setAssignmentName={setAssignmentName}
        addAssignment={addAssignment}
        saveAssignment={saveAssignment}
        isEditing={isEditing}
      />
    </div>
  );
}