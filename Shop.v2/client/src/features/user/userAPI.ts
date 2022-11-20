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

export const registrationAsync = createAsyncThunk(
    'my-account-registration',
    async ({ firstName, lastName, identifierNumber,
        phoneNumber, email, confirmEmail, city,
        streetAddress, houseNumber, postalCode,
        password, confirmPassword }: RegistrationProps) => {
        try {
            const {data} = await axios.post('/users/register-user', {
                firstName, lastName, identifierNumber,
                phoneNumber, email, confirmEmail, city,
                streetAddress, houseNumber, postalCode,
                password, confirmPassword
            });
            if(!data) throw new Error("Couldn't receive data from axios POST '/register-user'");
            console.log(data);
            return data;
        } catch (error) {
            console.error(error);
        }
    }
);