import { useEffect, useRef } from 'react';
import './Chat.scss'
import { useDispatch, useSelector } from 'react-redux';

import { createConversation, getConversationByCustomer, getConversationByContractor, createMessage, getMessages } from '../../http/conversationAPI'

import { createPact } from '../../http/pactsAPI'

import { setConversations, setCurrentChat, setMessages, setNewMessage, addNewMessage, setArrivalMessage, addConversation, resetState } from './chatSlice'

import { io } from "socket.io-client"


const Chat = ({id, type}) => {
    const dispatch = useDispatch();

    const activity = useSelector(state => state.user.activity);
    const userId = useSelector(state => state.user.id);

    const { conversations, currentChat, messages, newMessage, arrivalMessage } = useSelector(state => state.chat)

    const scrollRef = useRef();
    const socket = useRef();

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.emit("addUser", userId);
        socket.current.on("getMessage", (data) => {
            dispatch(setArrivalMessage(data))
        });
    }, [userId])
    
    useEffect(() => {
        if (activity === 'customer')
        {
            getConversationByCustomer(id)
            .then(res => {
                dispatch(setConversations(res))
            }).catch(error => {
                console.log(error)
            });
        }
        if (activity === 'contractor')
        {
            getConversationByContractor(id, userId)
            .then(res => {
                dispatch(setConversations(res))
            }).catch(error => {
                console.log(error)
            });
        }
        return () => {dispatch(resetState())};
    }, [])

    useEffect(() => {
        if (Object.entries(arrivalMessage).length !== 0)
        {
            const conversation = conversations.find(item => item.id === currentChat)
            

            if (activity === 'customer')
            {
                if (arrivalMessage.contractorId === conversation.contractorId)
                    dispatch(addNewMessage(arrivalMessage))
            }
            else
            {
                if (arrivalMessage.customerId === conversation.customerId)
                    dispatch(addNewMessage(arrivalMessage))
            } 
        }
    }, [arrivalMessage])

    useEffect(() => {
        if (conversations.length === 1)
            dispatch(setCurrentChat(conversations[0].id))
    }, [conversations])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    useEffect(() => {
        if (currentChat){
            getMessages(currentChat)
            .then(res => {
                console.log(res)
                dispatch(setMessages(res))
            }).catch(error => {
                console.log(error)
            });    
        }
    }, [currentChat])

    const sendMessage = (currentConv) => {
        if (newMessage !== "")
        {
            const now = new Date();
            if (activity === 'contractor' && conversations.length === 0)
            {
                createConversation(id, userId)
                .then(res => {
                    dispatch(addConversation(res))
                    dispatch(setCurrentChat(res.id))

                    createMessage(res.id, userId, newMessage, now)
                    .then(res => {
                        dispatch(addNewMessage(res))
                    }).catch(error => {
                        console.log(error)
                    });
                }).catch(error => {
                    console.log(error)
                }); 
            }
            else
            {
                const receiverId = currentConv.members[0].userId === userId ? currentConv.members[1].userId : currentConv.members[0].userId;
                socket.current.emit("sendMessage", {
                    senderId: userId,
                    receiverId,
                    conversationId: currentChat,
                    text: newMessage,
                    sendingDate: now
                });

                createMessage(currentChat, userId, newMessage, now)
                .then(res => {
                    dispatch(addNewMessage(res))
                }).catch(error => {
                    console.log(error)
                });
            }
            dispatch(setNewMessage(""))
        }
    }

    const createNewPact = (applicationId, id) => {
        const now = new Date();
        createPact(applicationId, id, now)
        .then(res => {
            window.location.reload()
        })
        .catch(error => {
            console.log(error)
        });
    }

    const renderConversations = () => {
        const conversationList = conversations;
        const items = conversationList.map((item) => {
            const className = (item.id === currentChat) ? 'conversation__item active_conversation' : 'conversation__item'
            const contractorId = item.members[0].userId === id ? item.members[1].userId : item.members[0].userId
            return (
                <div key={item.id} onClick={() => dispatch(setCurrentChat(item.id))} 
                    className={className}>Исполнитель №{contractorId}</div>
            )
        })
        if (conversations.length < 2) return;
        
        return(
            <div className="messenger__conversations">
                {items}
            </div>
        )
    }

    const renderChat = () => {
        const messageList = messages;
        const items = messageList.map((item) => {
            const formattedDate = new Date(item.sendingDate).toLocaleDateString('ru-RU', {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
              });
            const className = userId === item.userId ? "messenger__message own" : "messenger__message";

            return (
                <div className={className} key={item.id} ref={scrollRef}>
                    <span>{item.text}</span>
                    <div className="messenger__messageTime">{formattedDate}</div>
                </div>
            )
        })
        const currentConv = conversations.find((item) => item.id === currentChat);
        const contractorId = currentConv ? (currentConv.members[0].userId === id ? currentConv.members[1].userId : currentConv.members[0].userId) : ''
        const tittle = contractorId ? `Исполнитель №${contractorId}` : '';
        const conversationTittle = (activity === 'contractor') ? `Заказчик` : `${tittle}`
        return(
            <div className="messenger__chat">
                <div className="messenger__tittle">
                    <div className="messenger__tittleName">{conversationTittle}</div>
                    {(activity === 'customer' && type === 'application' && currentChat !== null) && <button className="messenger__selectionButton"
                    onClick={() => createNewPact(id, contractorId)}>Выбрать</button>}
                    
                </div>
                <div className="messenger__messages">
                    {items}
                    {!currentChat && conversations.length > 0 && (<div className="messenger__info">Выберите диалог</div>)}
                    {activity === 'customer' && conversations.length === 0 && (<div className="messenger__info">Исполнители пока не ответили на заявку</div>)}
                    {activity === 'contractor' && conversations.length === 0 && (<div className="messenger__info">Вы можете написать заказчику! </div>)}
                </div>
                    {(currentChat !== null || (activity === 'contractor' && conversations.length === 0)) && (
                    <div className="messenger__input">
                        <textarea 
                            className="messenger_textArea" 
                            placeholder="Написать сообщение..."
                            onChange={(e) => dispatch(setNewMessage(e.target.value))}
                            value={newMessage}></textarea>
                        <button className='messenger__sendButton'
                            onClick={() => sendMessage(currentConv)}>
                            <img className='header__logo' src={require('../../img/SendButton.png')} alt="logo"/>
                        </button>
                    </div>)}
            </div>
        )
    }

    return(
        <div className="messenger" style={{ display: conversations.length < 2 ? "block" : "grid" }}>
            {renderConversations()}
            {renderChat()}
        </div>
    )
}

export default Chat