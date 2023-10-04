import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../http/userAPI";

import { NavLink } from 'react-router-dom';

import {  changeEmail, changePassword, emailValid, passwordValid, changeAlertAboutProblem } from './authoriztionSlice'
import { setIsAuth, setUser, setId, setActivity } from '../../store/userSlice'

import { useNavigate } from 'react-router-dom'

import './Authorization.scss'

const Authorization = () => {
    const { emailCorrect, passwordCorrect, email, password, alertAboutProblem} = useSelector(state => state.authorization);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onAuthorization = () => {
        if ((email !== '' && emailCorrect) &&
            (password !== '' && passwordCorrect))
        {    
            login(email, password)
            .then(res => {
                dispatch(setIsAuth(true))
                dispatch(setUser(res.name))
                dispatch(setId(res.id))
                dispatch(setActivity(res.activity))
                navigate('/')
            }).catch(error => {
                dispatch(changeAlertAboutProblem(error.response.data.message))
            });
        }
    }

    //проверка емаила на валидность
    const validateEmail = (email) => {
        return email
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ) !== null;
      };

    const onBlurEmail = (e) => {
        if (e !== '' && validateEmail(e) === false)
        {
            dispatch(emailValid(false))
        }
        else 
        {
            dispatch(emailValid(true))
        }
    }

    const onBlurPassword = (e) => {
        (e.length >= 8 || e.length === 0) ? dispatch(passwordValid(true)) : dispatch(passwordValid(false))
    }
    
     return(
        <div className='startingForm'>
            <h1 className='startingForm__tittle'>Авторизация</h1>
            {alertAboutProblem === '' ? null : <p className='startingForm__error'>{alertAboutProblem}</p>}
            <form className='startingForm__form' onSubmit={(e) => e.preventDefault()}>
            <div className="startingForm__input">
                <input className={`startingForm-input ${!emailCorrect ? 'input_error' : null}`} type="text" required 
                    onBlur={(e) => onBlurEmail(e.target.value)} 
                    onChange={(e) => dispatch(changeEmail(e.target.value))}></input>
                <label className="startingForm-placeholder">E-mail</label>
                <div className={`startingForm-errorMessage ${!emailCorrect ? 'show_errorMessage' : null}`}>Некорректный E-mail</div>
            </div>
            <div className="startingForm__input">
                <input className={`startingForm-input ${!passwordCorrect ? 'input_error' : null}`} type="password" required
                    onChange={(e) => dispatch(changePassword(e.target.value))}
                    onBlur={(e) => onBlurPassword(e.target.value)} ></input>
                <label className="startingForm-placeholder">Пароль</label>
                <div className={`startingForm-errorMessage ${!passwordCorrect ? 'show_errorMessage' : null}`}>Пароль меньше 8 символов</div>
            </div>
            <NavLink to="/registration" href="/#" className='startingForm__registrationLink'>Создать аккаунт</NavLink>
            <br/>
            <button className='startingForm__button' onClick={() => {onAuthorization()}}>Войти</button>
            </form>
        </div>
     ) 
}
export default Authorization;