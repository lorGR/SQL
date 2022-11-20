import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registrationAsync = createAsyncThunk(
    'my-account-registration',
    async ({}) => {
        try {
            
        } catch (error) {
            console.error(error);
        }
    } 
);