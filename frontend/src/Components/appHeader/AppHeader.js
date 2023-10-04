import { useDispatch, useSelector } from 'react-redux';
import { resetState } from '../../store/userSlice'
import './AppHeader.scss'

import { useNavigate, NavLink } from 'react-router-dom'

const AppHeader = () => {
    const { user } = useSelector(state => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogOut = () => {
        dispatch(resetState())
        navigate('/login')
        localStorage.removeItem('token')
    }

    return(
        <header className='header'>
            <div className="header__information">
                <a href="/#"><img className='header__logo' src={require('../../img/logo.png')} alt="logo"/></a>

                <nav className="header__menu">
                    <ul>
                        <li><NavLink end 
                        style={({ isActive }) => ({color: isActive ? '#258850' : 'inherit'})}
                        to="/">Главная страница</NavLink></li>
                        /
                        <li><NavLink  
                        style={({ isActive }) => ({color: isActive ? '#258850' : 'inherit'})}
                        to="/information">Как все работает?</NavLink></li>
                    </ul>
                </nav>

                <div className="header__personalInfomation">
                    <h2 className="header__FIO">{user}</h2>
                    <a href="/#"><img className='header__exit' src={require('../../img/exit.png')} alt="exit"
                        onClick={() => onLogOut()}/></a>
                </div>
            </div>
        </header>
    )
}

export default AppHeader