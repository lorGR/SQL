import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { registrationAsync } from "./userAPI";

export interface User {
    firstName: string,
    lastName: string,
    identifierNumber: number,
    phoneNumber: number,
    email: string,
    city: string,
    streetAddress: string,
    houseNumber: number,
    postalCode: number,
    password: string
}

export enum Status {
    LOADING = "loading",
    IDLE = "idle",
    FAILED = "failed"
}

export interface UserState {
    value: User | null
    status: Status
}

const initialState: UserState = {
    value: null,
    status: Status.IDLE
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registrationAsync.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(registrationAsync.fulfilled, (state, action) => {
                state.status = Status.IDLE;
                state.value = action.payload;
            })
            .addCase(registrationAsync.fulfilled, (state) => {
                state.status = Status.FAILED;
            });
    }
});

export const selectUser = (state: RootState) => state.user.value;
export const selectUserStatus = (state: RootState) => state.user.status;

export default userSlice.reducer;