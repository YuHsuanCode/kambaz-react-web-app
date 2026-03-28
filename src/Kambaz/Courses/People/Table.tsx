import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUsers } from "./reducer";
import * as accountClient from "../../Account/client";

interface User {
    _id: string;
    username: string;
    loginId: string;
    section: string;
    role: string;
    lastActivity: string;
    totalActivity: string;
}

interface Enrollment {
    user: string;
    course: string;
}

export default function PeopleTable() {
    const { cid } = useParams();
    const dispatch = useDispatch();
    const { users, enrollments } = useSelector((state: any) => state.peopleReducer);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const data = await accountClient.fetchAllUsers();
                if (!cancelled && Array.isArray(data) && data.length > 0) {
                    dispatch(setUsers(data));
                }
            } catch {
                /* keep seed data from reducer */
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [dispatch]);

    const roster = users.filter((user: User) =>
        enrollments.some(
            (enrollment: Enrollment) =>
                enrollment.user === user._id && enrollment.course === cid
        )
    );

    return (
        <div id="wd-people-table">
            {roster.length === 0 ? (
                <p className="text-muted">
                    No people enrolled in this course yet, or roster data is still loading.
                </p>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Login</th>
                            <th>Section</th>
                            <th>Role</th>
                            <th>Last Activity</th>
                            <th>Total Activity</th>
                        </tr>
                    </thead>

                    <tbody>
                        {roster.map((user: User) => (
                            <tr key={user._id}>
                                <td className="wd-full-name text-nowrap">
                                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                                    <span className="wd-first-name">{user.username}</span>
                                </td>
                                <td className="wd-login-id">{user.loginId}</td>
                                <td className="wd-section">{user.section}</td>
                                <td className="wd-role">{user.role}</td>
                                <td className="wd-last-activity">{user.lastActivity}</td>
                                <td className="wd-total-activity">{user.totalActivity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
