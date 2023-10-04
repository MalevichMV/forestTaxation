import { configureStore } from '@reduxjs/toolkit';

import authorization from '../Components/authorization/authoriztionSlice'
import registration from '../Components/registration/registrationSlice'
import mainPage from '../Components/mainPage/mainPageSlice';
import user from './userSlice'
import applicationModal from '../Components/applicationModal/applicationModalSlice';
import chat from '../Components/chat/chatSlice'

const store = configureStore({
    reducer: {authorization, registration, mainPage, user, applicationModal, chat},
    devtools: process.env.NODE_ENV !== 'production'
  })

  export default store;