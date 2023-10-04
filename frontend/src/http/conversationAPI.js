import { $host } from './index'

export const createConversation = async (applicationId, contractorId) => {
    const {data} = await $host.post('api/conversation/createConversation', {id: applicationId, contractorId})
    return data
}

export const getConversationByCustomer = async (applicationId) => {
    const {data} = await $host.get(`api/conversation/getConversationByCustomer/${applicationId}`)
    return data
}

export const getConversationByContractor = async (applicationId, contractorId) => {
    const {data} = await $host.get(`api/conversation/getConversationByContractor/${applicationId}/${contractorId}`)
    return data
}

// message

export const createMessage = async (conversationId, senderId, text, sendingDate) => {
    const {data} = await $host.post('api/message/createMessage', {conversationId, senderId, text, sendingDate})
    return data
}

export const getMessages = async (conversationId) => {
    const {data} = await $host.get(`api/message/getMessages/${conversationId}`)
    return data
}