import Authorization from '../authorization/Authorization'
import Registration from '../registration/Registration'
import StartingPage from '../../pages/StartingPage'
import Spinner from '../spinner/Spinner'
import AppHeader from '../appHeader/AppHeader'
import Infomation from '../../pages/Information'

import { lazy, Suspense } from "react";

import ApplicationModal from '../applicationModal/applicationModal';

import { useDispatch, useSelector } from 'react-redux';
import { setIsAuth, setUser, setId, setActivity, setLoading } from '../../store/userSlice'
import { check } from '../../http/userAPI'


import { BrowserRouter, Routes, Route } from  'react-router-dom'
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const { isAuth, loading } = useSelector(state => state.user)

  useEffect(() => {
    check().then(res => {
      dispatch(setIsAuth(true))
      dispatch(setUser(res.name))
      dispatch(setId(res.id))
      dispatch(setActivity(res.activity))
    }).finally(() => dispatch(setLoading(false)))
  }, [])
  

  return (
    
    <BrowserRouter>
        <div className="App">
          <ApplicationModal/>
          {isAuth && <AppHeader/>}
          <Suspense fallback={<Spinner/>}>
            <Routes>
              <Route path="/login" element={<Authorization/>} exact/>
              <Route path="/registration" element={<Registration/>} exact/>
              {isAuth && <Route path="/" element={<StartingPage/>} exact/>}
              {isAuth && <Route path="/information" element={<Infomation/>} exact/>}
              <Route path="*" element={<Authorization/>}/>
            </Routes>
        </Suspense>
        </div>
        
      </BrowserRouter>
  );
}

export default App;
