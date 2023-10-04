import { useDispatch, useSelector } from 'react-redux';

import {  activePacts, currentPacts, completedPacts, setItems, setProcess, setActiveChat, setActiveMap  } from './mainPageSlice'
import { getApplicationById, getCurrentPacts, getCompletedPacts, getApplicationAll, changeOnComplited, deleteApplication } from '../../http/pactsAPI'

import { setOpenModal } from '../applicationModal/applicationModalSlice'

import { resetState } from '../chat/chatSlice';

import './MainPage.scss'
import { useEffect } from 'react';

import Chat from '../chat/Chat';
import Map from '../map/Map';

const MainPage = () => {
    const { stateOfPacts, items, process, activeChat, activeMap } = useSelector(state => state.mainPage);
    const { activity, id } = useSelector(state => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        if (stateOfPacts === 'active')
        {
            if (activity === 'customer')
            {
                getApplicationById(id)
                .then(res => {
                    dispatch(setItems(res))
                }).catch(error => {
                    console.log(error)
                });
            }
            if (activity === 'contractor')
            {
                getApplicationAll()
                .then(res => {
                    dispatch(setItems(res))
                }).catch(error => {
                    console.log(error)
                });
            }
        }
        if (stateOfPacts === 'current')
        {
            getCurrentPacts(id)
            .then(res => {
                dispatch(setItems(res))
            }).catch(error => {
                console.log(error)
            });
        }
        if (stateOfPacts === 'completed')
        {
            getCompletedPacts(id)
            .then(res => {
                dispatch(setItems(res))
            }).catch(error => {
                console.log(error)
            });
        }
      }, [stateOfPacts])

      useEffect(() => {
        const handleClickOutside = (e) => {
            const chatElement = document.querySelector('.messenger');
            const mapElement = document.querySelector('.readyMap');
            if (mapElement && !mapElement.contains(e.target) && e.target.className !== 'main__Button openMapBtn') {
                dispatch(setActiveMap(null));
              }
            if (chatElement && !chatElement.contains(e.target) && e.target.className !== 'main__Button openChatBtn') {
              dispatch(setActiveChat(null));
            }
          };

      
          // Attach the event listener on mount, and detach on unmount
          document.addEventListener('click', handleClickOutside);
          return () => {document.removeEventListener('click', handleClickOutside)};
      }, [])


    const changeStatus = (id) => {
        changeOnComplited(id)
        .then(res => {
            window.location.reload();
        })
        .catch(error => {
            console.log(error)
        });
    }

    const deleteApplicationById = (id) => {
        deleteApplication(id)
        .then(res => {
            window.location.reload();
        })
        .catch(error => {
            console.log(error)
        });
    }

    const renderChat = (itemId) => {
        if (itemId === activeChat)
        {
            if (stateOfPacts === 'active')
                return(<Chat id={itemId} type='application'/>)
            else
                return(<Chat id={itemId} type='pact'/>)
        }
        else return;
    }

    const openChat = (id) => {
        if (activeChat !== id)
            dispatch(resetState())
        dispatch(setActiveChat(id))
    }

    const renderItems = () => {
        const itemList = items;
        const renderedItems = itemList.map((item) => {
            return(
                <div className="main__pactsItem" key={item.id}>
                    <button className='main__Button openChatBtn'
                        onClick={() => openChat(item.id)}>Открыть чат</button>
                        <button className='main__Button openMapBtn'
                        onClick={() => dispatch(setActiveMap(item.id))}>Открыть карту</button>
                    <img className='main__pactsImg' src={require('../../img/document.png')} alt="doc" />
                    <div className="main__pactsInfo">
                        <p className="main__pactsTittle">№ {item.id}</p>
                        <div className="main__pactsSubinfo">
                            <div className="main__pactsInfoDetail"><span>Стоимость:</span> {item.cost} руб.</div>
                            
                            <div className="main__pactsInfoDetail"><span>Сроки выполнения:</span> {item.endDate.slice(0,10)}</div>
                            <div className="main__pactsInfoDetail"><span>Вид работы:</span> {item.typeOfWork}</div>
                        </div>
                    </div>
                    {(activity === 'customer' && stateOfPacts === 'current') && <button className='main__SelectionButton' onClick={() => changeStatus(item.id)}>Закрыть</button>}
                    {(activity === 'customer' && stateOfPacts === 'active') && <button className='main__SelectionButton deleteButton' onClick={() => deleteApplicationById(item.id)}>Удалить</button>}
                    { renderChat(item.id) }
                    {item.id === activeMap ? <Map coordinates={item.coordinates}/> : null}
                </div>
            )
        });

        return(
            <div className="main__pacts">
                {renderedItems}
            </div>
        ) 
    }

    const elements = renderItems()

    return (
        <div className="main">
            { activity === 'customer' && (
                <div className="main__createNewRequest" onClick={() => {dispatch(setOpenModal(true))}}>
                    <a className='main__CreateButton' href="/#">+</a>
                    <a className='main__CreateText' href="/#">Создать заявку на таксацию</a>
                </div>
            )}            
            <div className="main__tabs">
                <p className={`main__tabsItem ${(stateOfPacts==='active') ? 'active_tab' : null}`}
                onClick={() => dispatch(activePacts())}>Активные заявки</p>
                <p className={`main__tabsItem ${(stateOfPacts==='current') ? 'active_tab' : null}`}
                onClick={() => dispatch(currentPacts())}>Действующие договоры</p>
                <p className={`main__tabsItem ${(stateOfPacts==='completed') ? 'active_tab' : null}`}
                onClick={() => dispatch(completedPacts())}>Завершенные договоры</p>
            </div>
            {elements}
        </div>
    )
}

export default MainPage;