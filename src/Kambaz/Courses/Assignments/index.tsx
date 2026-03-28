import { BsGripVertical } from "react-icons/bs";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AControlButtons from "./AControlButtons";
import { LuNotebookPen } from "react-icons/lu";
import { Link, useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  setAssignments,
} from "./reducer";
import AssignmentsControls from "./AssignmentsControls";
import * as client from "./client";
import AssignmentsEditor from "./AssignmentsEditor";
import { useCoursePermissions } from "../../Account/useCoursePermissions";

export default function Assignments() {
  const { cid } = useParams();
  const { canManageCourse } = useCoursePermissions();
  const dispatch = useDispatch();
  const assignments = useSelector(
    (state: any) => state.assignmentReducer.assignments
  );

  const [assignment, setAssignment] = useState({
    title: "",
    description: "",
    points: "",
    dueDate: "",
    availableFrom: "",
    availableTo: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  const fetchAssignments = async () => {
    const data = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(data));
  };

  const createAssignment = async (assignment: any) => {
    const newAssignment = await client.createAssignment(
      cid as string,
      assignment
    );
    dispatch(addAssignment(newAssignment));
  };

  const removeAssignment = async (assignmentId: string) => {
    if (!cid) return;
    await client.deleteAssignment(cid, assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };

  const saveAssignment = async (assignment: any) => {
    if (!cid) return;
    await client.updateAssignment(cid, assignment._id, assignment);
    dispatch(updateAssignment(assignment));
  };

  const handleEdit = (assignmentId: string) => {
    const a = assignments.find((a: any) => a._id === assignmentId);
    if (a) {
      setAssignment(a);
      setIsEditing(true);
      setShowEditor(true);
    }
  };

  const handleAdd = () => {
    setAssignment({
      title: "",
      description: "",
      points: "",
      dueDate: "",
      availableFrom: "",
      availableTo: "",
    });
    setIsEditing(false);
    setShowEditor(true);
  };

  useEffect(() => {
    if (cid) fetchAssignments();
  }, [cid]);

  return (
    <div id="wd-assignments" className="text-nowrap">
      {canManageCourse && (
      <AssignmentsControls
        assignmentName={assignment}
        setAssignmentName={setAssignment}
        addAssignment={handleAdd}
        dialogTitle={isEditing ? "Edit Assignment" : "Add Assignment"}
        saveAssignment={() => saveAssignment(assignment)}
      />
      )}
      {!canManageCourse && (
        <h4 className="mb-3">Assignments</h4>
      )}

      <br />

      {canManageCourse && showEditor && (
        <AssignmentsEditor
          dialogTitle={isEditing ? "Edit Assignment" : "Add Assignment"}
          assignmentName={assignment}
          setAssignmentName={setAssignment}
          addAssignment={() => {
            if (!cid) return;
            createAssignment({ ...assignment, course: cid });
            setShowEditor(false);
          }}
          saveAssignment={() => {
            saveAssignment(assignment);
            setShowEditor(false);
          }}
        />
      )}

      <ul className="list-group rounded-0">
        <li className="list-group-item p-0 fs-5">
          <div className="p-4 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <span className="fw-bold">ASSIGNMENTS</span>

            <AssignmentControlButtons
              totalPoints={assignments.reduce(
                (acc: number, a: any) =>
                  acc + Number(a.points || 0),
                0
              )}
              onAdd={handleAdd}
              readOnly={!canManageCourse}
            />
          </div>

          {assignments
            .filter((a: any) => a.course === cid)
            .map((a: any) => (
              <div key={a._id} className="list-group-item p-3">
                <Link
                  to={`/Kambaz/Courses/${cid}/Assignments/${a._id}`}
                  className="fw-bold text-black"
                >
                  {a.title}
                </Link>

                <br />

                <BsGripVertical />
                <LuNotebookPen className="ms-2 me-2" color="green" />

                <span className="text-danger">Multiple Modules</span> |{" "}
                Not Available until {a.availableTo}

                <AControlButtons
                  assignmentId={a._id}
                  deleteAssignment={removeAssignment}
                  editAssignment={handleEdit}
                  readOnly={!canManageCourse}
                />

                <br />
                <span className="fw-bold">Due</span> {a.dueDate} |{" "}
                {a.points} pts
              </div>
            ))}
        </li>
      </ul>
    </div>
  );
}