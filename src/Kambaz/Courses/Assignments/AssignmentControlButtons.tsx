import {IoEllipsisVertical} from "react-icons/io5";
import {IoAdd} from "react-icons/io5";

export default function AssignmentControlButtons({
    totalPoints,
    onAdd,
    readOnly = false,
}: {
    totalPoints: number;
    onAdd: () => void;
    readOnly?: boolean;
}) {
    return(
        <div className="float-end">
            <span className="badge border border-secondary text-dark bg-light rounded-pill px-3 py-1">
                {totalPoints}% of Total
            </span>
            {!readOnly && (
              <>
                <IoAdd className="fs-4" onClick={onAdd}/>
                <IoEllipsisVertical className="fs-4"/>
              </>
            )}
        </div>
    );
}