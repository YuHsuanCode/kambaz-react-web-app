import {createSlice} from "@reduxjs/toolkit";
import  {assignments} from "../../Database";
//import {v4 as uuidv4} from "uuid";

const initialState = {
    assignments: assignments,
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers:{
        setAssignments: (state, { payload })=> {
            state.assignments = payload;
        },
        addAssignment: (state, {payload}) => {
            state.assignments.push(payload);
        },

        deleteAssignment: (state, {payload}) => {
            state.assignments = state.assignments.filter(
            (a) => a._id !== payload);
        },

        updateAssignment: (state, {payload}) => {
            state.assignments = state.assignments.map((a) => 
                a._id === payload._id ? payload : a
            );
        },
    },
});

export const {addAssignment, deleteAssignment, updateAssignment, setAssignments} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;