import { createSlice } from '@reduxjs/toolkit'


export const mentorsSlice = createSlice({
    name: "mentors",
    initialState: {
        allMentors: null,
        pendingRequestsToMentors: null,
        reqAcceptedMentors: null,
        isLoading: false,
        isError: false,
    },
    reducers: {
        addAllMentors : (state, action) =>{
           state.allMentors = action.payload
           return state
        },
        addPendingRequestsToMentors: (state, action) => {
            state.pendingRequestsToMentors = action.payload
            return state
        },
        addReqAcceptedMentors : (state, action) => {
           state.reqAcceptedMentors = action.payload
           return state
        },
        setError : (state, action) => {
            state.isError = action.payload
            return state
        },
        setLoading : (state, action) => {
            state.isLoading = action.payload
            return state
        }
        
    }
})

export const {addAllMentors, addPendingRequestsToMentors, addReqAcceptedMentors, setError, setLoading} = mentorsSlice.actions;
export default mentorsSlice.reducer;