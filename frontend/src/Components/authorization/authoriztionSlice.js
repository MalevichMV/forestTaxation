import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: '',
    password: '',
    emailCorrect: true,
    passwordCorrect: true,
    alertAboutProblem: ''
}

const authorizationSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        changeEmail: (state, action) => {
            state.email = action.payload;
        },
        changePassword: (state, action) => {
            state.password = action.payload;
        },
        emailValid: (state, action) => {state.emailCorrect = action.payload},
        passwordValid: (state, action) => {state.passwordCorrect = action.payload},
        changeAlertAboutProblem: (state, action) => {
            state.alertAboutProblem = action.payload;
        }
    }
});

const {actions, reducer} = authorizationSlice;

export default reducer;
export const {
    changeEmail,
    changePassword,
    emailValid,
    passwordValid,
    changeAlertAboutProblem
} = actions;