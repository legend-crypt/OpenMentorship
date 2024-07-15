// This file will store all the states related user authentications like login status, user profile details etc for entire react APP.
// other components can access this value using useSelectors

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "../../../utils/axios"

// import useDynamicLogic from '../../../utils/useDynamicLogic'

/* You can use/call this `fetchActiveUser` function to check
  - whether the user is actually authenticated or not though having access token & user credentials in local storage.
  - Is the users token has been expired or not.
  - This function can be called when we user tried to visit protected content of the website
*/
export const fetchActiveUser = createAsyncThunk("fetchActiveUser", async (_, { rejectWithValue }) => {
    const accessToken = JSON.parse(localStorage.getItem('access_token'));
    let responseData = {
        loginStatus: null,
        userDetails: null
    }
    if (accessToken) {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        // call api
        try {
            const res = await axios.get("/profile/retrieve", config);
            if (res.status === 200) {
                responseData.loginStatus = true;
                if (res.data.success) {
                    // user has setup their profile before
                    responseData.userDetails = res.data.data
                    // update profile information
                    localStorage.setItem("profile", JSON.stringify(res.data.data));
                }
                return responseData;
            } else {
                responseData.loginStatus = false;
                return responseData;
            }
        } catch (error) {
            console.error(error);
            responseData.loginStatus = false;
            // You can use rejectWithValue to pass an error message to the action
            // return rejectWithValue("There was an error fetching the active user data.");
            return responseData;
        }
    } else {
        // no access token
        responseData.loginStatus = false;
        return responseData;
    }
});


export const userAuthSlice = createSlice({
    name: "userAuth",
    initialState: {
        loginStatus:  Boolean(window.localStorage.getItem('access_token')), // true or false after API call or first check
        userDetails: JSON.parse(localStorage.getItem("profile")) || null, // userName, user Emails etc
    },
    reducers: {
        // stores login status
        loginUser: (state, action) => {
            /*Here user might be new or has not set profile details before or the new one just get registered newly. 
            once the user login the login status changes to true & then behind the scene fetchActiveUser user is called to fetch user details
            */
            state.loginStatus = true;
            state.userDetails = action.payload.userDetails
        },

        // removes all login credentials including local storage data
        logOutUser: (state) => {
            // clear local storage items
            localStorage.removeItem("access_token");
            localStorage.removeItem("profile");
            state.loginStatus = false
            state.userDetails = null;
        },
    },
    extraReducers: (builder) => {
        // ----- fetchActive User ---
        builder.addCase(fetchActiveUser.fulfilled, (state, actions) => {
            const { loginStatus, userDetails } = actions.payload
            if (loginStatus) {
                state.loginStatus = true;
                state.userDetails = userDetails
            } else {
                state.loginStatus = false;
            }
        })
        builder.addCase(fetchActiveUser.rejected, (state, actions) => {
            state.loginStatus = false;
        })
    }
})

export const { loginUser, logOutUser } = userAuthSlice.actions;
export default userAuthSlice.reducer
