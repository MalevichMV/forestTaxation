import {$authHost, $host} from './index'
import jwt_decode from 'jwt-decode'

export const registrationCustomer = async (email, password, name, surname, patronymic, passportSeries, passportNumber, dateOfIssue, whoIssued) => {
    const {data} = await $host.post('api/user/registrationCustomer', {email, password, name, surname, patronymic, passportSeries, passportNumber, dateOfIssue, whoIssued})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const registrationContractor = async (email, password, name, surname, patronymic, passportSeries, passportNumber, dateOfIssue, whoIssued, invoiceForPayment) => {
    const {data} = await $host.post('api/user/registrationContractor', {email, password, name, surname, patronymic, passportSeries, passportNumber, dateOfIssue, whoIssued, invoiceForPayment})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}