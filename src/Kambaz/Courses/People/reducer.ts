import { createSlice } from "@reduxjs/toolkit";
import { users as seedUsers, enrollments as seedEnrollments } from "../../Database";

const peopleSlice = createSlice({
  name: "people",
  initialState: {
    users: [...seedUsers] as any[],
    enrollments: [...seedEnrollments] as any[],
  },
  reducers: {
    setUsers: (state, { payload }: { payload: any[] }) => {
      state.users = payload;
    },
  },
});

export const { setUsers } = peopleSlice.actions;
export default peopleSlice.reducer;
