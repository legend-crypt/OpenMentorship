import { createSlice } from "@reduxjs/toolkit";

export const userRoleSlice = createSlice({
    name: "userRole",
    initialState: {
        role: JSON.parse(localStorage.getItem("role")) || null,
    },
    reducers: {
        setUserRole: (state, action) => {
        state.role = action.payload;
        localStorage.setItem("role", JSON.stringify(action.payload));
        },
    },
    });

export const { setUserRole } = userRoleSlice.actions;

export default userRoleSlice.reducer;