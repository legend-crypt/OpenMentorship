/* This state are meant for user Type : mentor */
import { createSlice } from '@reduxjs/toolkit';

export const studentsSlice = createSlice({
    name: "students",
    initialState: {
        acceptedStudents: null,
        pendingStudentRequest: null,
        isLoading: false,
        isError: false,
        message: null,
    },
    reducers: {
        setAcceptedStudents: (state, action) => {
            state.acceptedStudents = action.payload;
        },
        setPendingStudentRequest: (state, action) => {
            state.pendingStudentRequest = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.isError = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        }
    }
})

export const { setAcceptedStudents, setPendingStudentRequest, setLoading } = studentsSlice.actions;
export default studentsSlice.reducer;