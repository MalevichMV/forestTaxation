import { useDispatch, useSelector } from 'react-redux';
import { registrationContractor, registrationCustomer } from "../../http/userAPI";

import { useNavigate } from 'react-router-dom'

import {  changeEmail,
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
    changeAlertAboutProblem } from './registrationSlice'

import './Registration.scss'

import { NavLink } from 'react-router-dom';

const Registration = () => {
    const { emailCorrect,
        passwordCorrect,
        nameCorrect,
        surnameCorrect,
        patronymicCorrect,
        passportSeriesCorrect,
        passportNumberCorrect,
        dateOfIssueCorrect,
        whoIssuedCorrect,
        invoiceForPaymentCorrect } = useSelector(state => state.registration);
        const { email,
            password,
            name,
            surname,
            patronymic,
            passportSeries,
            passportNumber,
            dateOfIssue,
            whoIssued,
            invoiceForPayment,
            activity,
            alertAboutProblem } = useSelector(state => state.registration);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onRegistration = () => {   
        if ((email !== '' && emailCorrect) &&
            (password !== '' && passwordCorrect) &&
            (name !== '' && nameCorrect) &&
            (surname !== '' && surnameCorrect) &&
            (patronymic !== '' && patronymicCorrect) &&
            (passportSeries !== '' && passportSeriesCorrect) &&
            (passportNumber !== '' && passportNumberCorrect) &&
            (dateOfIssue !== '' && dateOfIssueCorrect) &&
            (whoIssued !== '' && whoIssuedCorrect) &&
            activity !== '')
        {
            if (activity === 'Исполнитель') {
                if (invoiceForPayment !== '' && invoiceForPaymentCorrect){
                    registrationContractor(email, password, name, surname, patronymic, passportSeries, passportNumber, dateOfIssue, whoIssued, invoiceForPayment)
                    .then(res => {
                        dispatch(resetState())
                        navigate('/login')
                    }).catch(error => {
                        dispatch(changeAlertAboutProblem(error.response.data.message))
                    });
                }
                else
                {
                    dispatch(changeAlertAboutProblem('Необходимо заполнить все поля!'))
                }
            } else {
                registrationCustomer(email, password, name, surname, patronymic, passportSeries, passportNumber, dateOfIssue, whoIssued)
                .then(res => {
                    dispatch(resetState())
                    navigate('/login')
                }).catch(error => {
                    dispatch(changeAlertAboutProblem(error.response.data.message))
                });
            }

        } else {
            dispatch(changeAlertAboutProblem('Необходимо заполнить все поля!'))
        }
       
    }
    
    //проверка на наличие цифр в строке
    function hasNumber(myString) {
        return /\d/.test(myString);
      }

        //проверка емаила на валидность
    const validateEmail = (email) => {
        return email
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ) !== null;
      };

    const onCheckEmail = (e) => {
        if (e !== '' && validateEmail(e) === false)
        {
            dispatch(emailValid(false))
        }
        else 
        {
            dispatch(emailValid(true))
        }
    }

    const onCheckPassword = (e) => {
        (e.length >= 8 || e.length === 0) ? dispatch(passwordValid(true)) : dispatch(passwordValid(false))
    }

    const onCheckName = (e) => {
        ((!hasNumber(e) && e.length > 1) || e.length === 0) ? dispatch(nameValid(true)) : dispatch(nameValid(false))
    }
    const onCheckSurname = (e) => {
        ((!hasNumber(e) && e.length > 2) || e.length === 0) ? dispatch(surnameValid(true)) : dispatch(surnameValid(false))
    }
    const onCheckPatronymic = (e) => {
        ((!hasNumber(e) && e.length > 2) || e.length === 0) ? dispatch(patronymicValid(true)) : dispatch(patronymicValid(false))
    }
    const onCheckPassportSeries = (e) => {
        (e.length === 4 || e.length === 0) ? dispatch(passportSeriesValid(true)) : dispatch(passportSeriesValid(false))
    }
    const onCheckPassportNumber = (e) => {
        (e.length === 6 || e.length === 0) ? dispatch(passportNumberValid(true)) : dispatch(passportNumberValid(false))
    }
    const onCheckInvoiceForPayment = (e) => {
        (e.length === 16 || e.length === 0) ? dispatch(invoiceForPaymentValid(true)) : dispatch(invoiceForPaymentValid(false))
    }

    const onCheckDateOfIssue = (e) => {
        const now = new Date();
        const current = new Date(e);
        const min = new Date('1995-01-01');
        if ((current <= now) && (current > min))
        {
            dispatch(dateOfIssueValid(true))
        } 
        else 
        {
            dispatch(dateOfIssueValid(false))
        }
    }

    const onCheckWhoIssued = (e) => {
        (!hasNumber(e)) ? dispatch(whoIssuedValid(true)) : dispatch(whoIssuedValid(false))
    }

    return(
        <div className='startingForm'>
            <h1 className='startingForm__tittle'>Регистрация</h1>
            {alertAboutProblem === '' ? null : <p className='startingForm__error'>{alertAboutProblem}</p>}
            <form className='startingForm__form registrationForm' onSubmit={(e) => e.preventDefault()}> 
                <div className="startingForm__inputs">
                    <div className="startingForm__input">
                        <input className={`startingForm-input ${!emailCorrect ? 'input_error' : null}`} type="text" required 
                            onBlur={(e) => onCheckEmail(e.target.value)} 
                            onChange={(e) => dispatch(changeEmail(e.target.value))}></input>
                        <label className="startingForm-placeholder">E-mail</label>
                        <div className={`startingForm-errorMessage ${!emailCorrect ? 'show_errorMessage' : null}`}>Некорректный E-mail</div>
                    </div>

                    <div className="startingForm__input">
                        <input className={`startingForm-input ${!passwordCorrect ? 'input_error' : null}`} type="password" required
                            onChange={(e) => dispatch(changePassword(e.target.value))}
                            onBlur={(e) => onCheckPassword(e.target.value)} ></input>
                        <label className="startingForm-placeholder">Пароль</label>
                        <div className={`startingForm-errorMessage ${!passwordCorrect ? 'show_errorMessage' : null}`}>Пароль меньше 8 символов</div>
                    </div>

                    <div className="startingForm__input">
                        <input className={`startingForm-input ${!nameCorrect ? 'input_error' : null}`} type="text" required
                            onBlur={(e) => onCheckName(e.target.value)}
                            onChange={(e) => dispatch(changeName(e.target.value))}></input>
                        <label className="startingForm-placeholder">Имя</label>
                        <div className={`startingForm-errorMessage ${!nameCorrect ? 'show_errorMessage' : null}`}>Некорректное имя</div>
                    </div>

                    <div className="startingForm__input">
                        <input className={`startingForm-input ${!surnameCorrect ? 'input_error' : null}`} type="text" required
                            onBlur={(e) => onCheckSurname(e.target.value)}
                            onChange={(e) => dispatch(changeSurname(e.target.value))}></input>
                        <label className="startingForm-placeholder">Фамилия</label>
                        <div className={`startingForm-errorMessage ${!surnameCorrect ? 'show_errorMessage' : null}`}>Некорректная фамилия</div>
                    </div>

                    <div className="startingForm__input">
                        <input className={`startingForm-input ${!patronymicCorrect ? 'input_error' : null}`} type="text" required
                            onBlur={(e) => onCheckPatronymic(e.target.value)}
                            onChange={(e) => dispatch(changePatronymic(e.target.value))}></input>
                        <label className="startingForm-placeholder">Отчество</label>
                        <div className={`startingForm-errorMessage ${!patronymicCorrect ? 'show_errorMessage' : null}`}>Некорректное отчество</div>
                    </div>

                    <div className="startingForm__input">
                        <input className={`startingForm-input ${!passportSeriesCorrect ? 'input_error' : null}`} type="text" maxLength='4' required
                            onBlur={(e) => onCheckPassportSeries(e.target.value)}
                            onChange={(e) => {
                                if (!hasNumber(e.target.value[e.target.value.length-1])) { e.target.value = e.target.value.slice(0,e.target.value.length-1); }
                                dispatch(changePassportSeries(e.target.value))}}></input>
                        <label className="startingForm-placeholder">Серия паспорта</label>
                        <div className={`startingForm-errorMessage ${!passportSeriesCorrect ? 'show_errorMessage' : null}`}>Серия меньше 4</div>
                    </div>

                    <div className="startingForm__input">
                    <input className={`startingForm-input ${!passportNumberCorrect ? 'input_error' : null}`} type="text" maxLength='6' required
                            onBlur={(e) => onCheckPassportNumber(e.target.value)}
                            onChange={(e) => {
                                if (!hasNumber(e.target.value[e.target.value.length-1])) { e.target.value = e.target.value.slice(0,e.target.value.length-1); }
                                dispatch(changePassportNumber(e.target.value))}}></input>
                        <label className="startingForm-placeholder">Номер паспорта</label>
                        <div className={`startingForm-errorMessage ${!passportNumberCorrect ? 'show_errorMessage' : null}`}>Номер меньше 6</div>
                    </div>

                    <div className="startingForm__input">
                        <input className={`startingForm-input ${!dateOfIssueCorrect ? 'input_error' : null}`} type="date" required
                            onBlur={(e) => onCheckDateOfIssue(e.target.value)}
                            onChange={(e) => dispatch(changeDateOfIssue(e.target.value))}></input>
                        <label className="startingForm-placeholder">Дата выдачи</label>
                        <div className={`startingForm-errorMessage ${!dateOfIssueCorrect ? 'show_errorMessage' : null}`}>Некорректная дата выдачи</div>
                    </div>
                    </div>

                    <div className="startingForm__input">
                        <input className={`startingForm-input ${!whoIssuedCorrect ? 'input_error' : null}`} type="text" required
                            onBlur={(e) => onCheckWhoIssued(e.target.value)}
                            onChange={(e) => dispatch(changeWhoIssued(e.target.value))}></input>
                        <label className="startingForm-placeholder">Кем выдан</label>
                        <div className={`startingForm-errorMessage ${!whoIssuedCorrect ? 'show_errorMessage' : null}`}>Проверьте правильность</div>
                    </div>
                     {activity === 'Исполнитель' && <div className="startingForm__input">
                        <input className={`startingForm-input ${!invoiceForPaymentCorrect ? 'input_error' : null}`} type="text" maxLength='16' required
                                onBlur={(e) => onCheckInvoiceForPayment(e.target.value)}
                                onChange={(e) => {
                                    if (!hasNumber(e.target.value[e.target.value.length-1])) { e.target.value = e.target.value.slice(0,e.target.value.length-1); }
                                    dispatch(changeInvoiceForPayment(e.target.value))}}></input>
                            <label className="startingForm-placeholder">Номер счета для оплаты</label>
                            <div className={`startingForm-errorMessage ${!invoiceForPaymentCorrect ? 'show_errorMessage' : null}`}>Номер меньше 12</div>
                        </div>}

                    <div className="startingForm__activitySelection">
                        <div className="startingForm__radioButton">                              
                            <input className="startingForm__radioInput" name='activity' type="radio" value='Исполнитель'
                            onChange={(e) => dispatch(changeActivity(e.target.value))}/>
                            <label>Исполнитель</label>                        
                        </div>
                        <div className="startingForm__radioButton">                              
                            <input className="startingForm__radioInput" name='activity' type="radio" value='Заказчик'
                            onChange={(e) => dispatch(changeActivity(e.target.value))}/>
                            <label>Заказчик</label>                        
                        </div>
                    </div>
                    

                <NavLink to="/login" href="/#" className='startingForm__registrationLink'>Войти в уже имеющийся аккаунт</NavLink>
                <br/>
                <button className='startingForm__button' onClick={() => {onRegistration()}}>Зарегестрироваться</button>
            </form>
        </div>
    ) 
}
export default Registration;