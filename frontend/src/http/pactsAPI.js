import { $host } from './index'

export const createApplication = async (endDate, cost, typeOfWork, coordinates, customerId) => {
    const {data} = await $host.post('api/application', {endDate, cost, typeOfWork, coordinates, customerId})
    return data
}
export const deleteApplication = async (id) => {
    const {data} = await $host.delete(`api/application/delete/${id}`)
    return data
}
export const getApplicationById = async (id) => {
    const {data} = await $host.get(`api/application/${id}`)
    return data
}
export const getApplicationAll = async () => {
    const {data} = await $host.get(`api/application/all`)
    return data
}


export const createPact = async (applicationId, contractorId, dateOfConclusion) => {
    const {data} = await $host.post('api/pact', {applicationId, contractorId, dateOfConclusion})
    return data
}
export const changeOnComplited = async (id) => {
    const {data} = await $host.post('api/pact/changeOnCompleted', {id})
    return data
}
export const getCurrentPacts = async (userId) => {
    const {data} = await $host.get(`api/pact/current/${userId}`)
    return data
}
export const getCompletedPacts = async (userId) => {
    const {data} = await $host.get(`api/pact/completed/${userId}`)
    return data
}


