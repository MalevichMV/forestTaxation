import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: '',
    password: '',
    name: '',
    surname: '',
    patronymic: '',
    passportSeries: '',
    passportNumber: '',
    dateOfIssue:'',
    whoIssued: '',
    invoiceForPayment: '',
    activity: '',
    emailCorrect: true,
    passwordCorrect: true,
    nameCorrect: true,
    surnameCorrect: true,
    patronymicCorrect: true,
    passportSeriesCorrect: true,
    passportNumberCorrect: true,
    dateOfIssueCorrect: true,
    whoIssuedCorrect: true,
    invoiceForPaymentCorrect: true,
    alertAboutProblem: ''
}

const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        changeEmail: (state, action) => {
            state.email = action.payload;
        },
        changePassword: (state, action) => {
            state.password = action.payload;
        },
        changeName: (state, action) => {
            state.name = action.payload;
        },
        changeSurname: (state, action) => {
            state.surname = action.payload;
        },
        changePatronymic: (state, action) => {
            state.patronymic = action.payload;
        },
        changePassportSeries: (state, action) => {
            state.passportSeries = action.payload;
        },
        changePassportNumber: (state, action) => {
            state.passportNumber = action.payload;
        },
        changeDateOfIssue: (state, action) => {
            state.dateOfIssue = action.payload;
        },
        changeWhoIssued: (state, action) => {
            state.whoIssued = action.payload;
        },
        changeInvoiceForPayment: (state, action) => {
            state.invoiceForPayment = action.payload;
        },
        changeActivity: (state, action) => {
            state.activity = action.payload;
        },
        changeAlertAboutProblem: (state, action) => {
            state.alertAboutProblem = action.payload;
        },
        emailValid: (state, action) => {state.emailCorrect = action.payload},
        passwordValid: (state, action) => {state.passwordCorrect = action.payload},
        nameValid: (state, action) => {state.nameCorrect = action.payload},
        surnameValid: (state, action) => {state.surnameCorrect = action.payload},
        patronymicValid: (state, action) => {state.patronymicCorrect = action.payload},
        passportSeriesValid: (state, action) => {state.passportSeriesCorrect = action.payload},
        passportNumberValid: (state, action) => {state.passportNumberCorrect = action.payload},
        dateOfIssueValid: (state, action) => {state.dateOfIssueCorrect = action.payload},
        whoIssuedValid: (state, action) => {state.whoIssuedCorrect = action.payload},
        invoiceForPaymentValid: (state, action) => {state.invoiceForPaymentCorrect = action.payload},
        resetState: () => {
            return initialState;
          }
        }
});

const {actions, reducer} = registrationSlice;

export default reducer;
export const {
    changeEmail,
    changePassword,
    changeName,
    changeSurname,
    changePatronymic,
    changePassportSeries,
    changePassportNumber,
    changeDateOfIssue,
    changeWhoIssued,
    changeInvoiceForPayment,
    changeActivity,
    emailValid,
    passwordValid,
    nameValid,
    surnameValid,
    patronymicValid,
    passportSeriesValid,
    passportNumberValid,
    dateOfIssueValid,
    whoIssuedValid,
    invoiceForPaymentValid,
    resetState,
    changeAlertAboutProblem
} = actions;