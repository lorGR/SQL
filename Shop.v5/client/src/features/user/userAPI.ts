import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserByCookie = createAsyncThunk(
    'get-user-by-cookie',
    async () => {
        try {
            const { data } = await axios.get('/users/get-user-by-cookie');
            if(!data) throw new Error("Couldn't receive data from axios POST '/get-user-by-cookie' ");
            const { result } = data;
            return result[0];
        } catch (error) {
            console.error(error);
        }
    }
)