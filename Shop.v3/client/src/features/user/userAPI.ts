import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface RegistrationProps {
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
    confirmEmail: string,
    confirmPassword: string
}

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