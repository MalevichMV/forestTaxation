import './applicationModal.scss'
import { useDispatch, useSelector } from 'react-redux'

import "leaflet/dist/leaflet.css";
import { MapContainer, Polygon, TileLayer, useMapEvents, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

import { createApplication } from "../../http/pactsAPI";

import {  setOpenModal,
    setCost,
    setDateOfEnd,
    resetState,
    setCostCorrect,
    setDateOfEndCorrect,
    addCoordinate,
    removeCoordinate,
    resetCoordinates,
    toggleConsent,
    changeAlertAboutProblem, 
    toogleActiveDropDown,
    setDropDownItem} from './applicationModalSlice'
import { useEffect } from 'react';


const ApplicationModal = () => {
    const dispatch = useDispatch()
    const { openModal,
            cost,
            costCorrect,
            dateOfEnd,
            dateOfEndCorrect,
            activeDropdown,
            dropDownItem,
            coordinates,
            consent,
            alertAboutProblem }  = useSelector(state => state.applicationModal)
    const { id } = useSelector(state => state.user)

    const customIcon = new Icon({
        // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
        iconUrl: require("../../img/location_pin.png"),
        iconSize: [38, 38] // size of the icon
      });

    const onPostApplication = async () => {   
        if ((cost !== '' && costCorrect) &&
            (dateOfEnd !== '' && dateOfEndCorrect) &&
            (coordinates.length > 2) && consent === true && 
            dropDownItem !== "")
        {
            await createApplication(dateOfEnd, cost, dropDownItem, coordinates, id)
            .then(res => {
                dispatch(resetState())
                dispatch(setOpenModal(false))
            }).catch(error => {
                dispatch(changeAlertAboutProblem(error.response.data.message))
            });
        } else {
            dispatch(changeAlertAboutProblem('Необходимо заполнить все поля и укзать не менее двух точек на карте!'))
        }
    
    }

    //проверка на наличие цифр в строке
    function hasNumber(myString) {
        return /\d/.test(myString);
    }

    function hasDigitOrDecimal(myString) {
        if (myString){
            return !isNaN(myString) || myString.includes('.');
        }
      } 

    const onCheckCost = (e) => {
        (e.length > 2 || e.length === 0) ? dispatch(setCostCorrect(true)) : dispatch(setCostCorrect(false))
    }  

    const onCheckDateOfEnd = (e) => {
        const now = new Date();
        const current = new Date(e);
        if (current > now)
        {
            dispatch(setDateOfEndCorrect(true))
        } 
        else 
        {
            dispatch(setDateOfEndCorrect(false))
        }
    }

    const reset = (e) => {
        e.preventDefault()
        dispatch(resetCoordinates())
    }

    const remove = (e) => {
        e.preventDefault();
        dispatch(removeCoordinate())
    }

    function OnClick() {
        const map = useMapEvents({
          click(e) {
            dispatch(addCoordinate({lat: e.latlng.lat, lng: e.latlng.lng}))
          },
        })
      
        return;
      }

    const renderPolygon = () => {
        if (coordinates.length === 0) return;
        const coordinateList = coordinates;
        if (coordinates.length < 3)
        {
            const items = coordinateList.map((item, i) => (
                <Marker position={[item.lat, item.lng]} icon={customIcon} key={i}>
                  <Popup>{`Широта: ${item.lat}, Долгота: ${item.lng}`}</Popup>
                </Marker>
              ))

              return items;
        }
        else
        {
            const items = coordinateList.map((item) => (
                [item.lat, item.lng]
              ))
            return(
                <Polygon  positions={items} />
            );
        }
    }

    return(
        <div className='applicationModal' style={{'opacity': openModal ? 1 : 0, 'visibility': openModal ? 'visible' : 'hidden', 'position': openModal ?'absolute' : 'fixed'}}>

            <div className="closeButton"
                onClick={() => {dispatch(setOpenModal(false))}}>+</div>
            <div className="createNewApplication">
                <h1 className='startingForm__tittle'>Создание заявки</h1>
                {alertAboutProblem === '' ? null : <p className='startingForm__error'>{alertAboutProblem}</p>}
                <form className='startingForm__form' onSubmit={(e) => e.preventDefault()}>
                <div className="startingForm__input">
                    <input className={`startingForm-input ${!costCorrect ? 'input_error' : null}`} type="text" required value={cost}
                    onBlur={(e) => onCheckCost(e.target.value)}
                    onChange={(e) => {
                        if (!hasNumber(e.target.value[e.target.value.length-1])) { e.target.value = e.target.value.slice(0,e.target.value.length-1); }
                        dispatch(setCost(e.target.value))}}></input>
                    <label className="startingForm-placeholder">Стоимость, в руб.</label>
                    <div className={`startingForm-errorMessage ${!costCorrect ? 'show_errorMessage' : null}`}>Стоимость меньше 100 руб.</div>
                </div>

                <div className={`startingForm-select ${activeDropdown ? 'active_select' : null}`}>
                    <div className="startingForm-header"
                        onClick={() => {dispatch(toogleActiveDropDown())}}>
                        <div className="startingForm-current">{dropDownItem}</div>
                        <label className="startingForm-dropDownPlaceholder">Выберите вид работы</label>
                        <div className="startingForm-icon"></div>
                    </div>
                    <div className="startingForm-body"
                    style={{"zIndex": 999999999, "maxHeight": activeDropdown ? 200 : 0}}>
                        <div className={`startingForm-item ${dropDownItem === 'Подсчет объема древесины' ? 'active_item' : ''}`}
                            onClick={(e) => {dispatch(setDropDownItem(e.target.innerText)); dispatch(toogleActiveDropDown())}}>Подсчет объема древесины</div>
                        <div className={`startingForm-item ${dropDownItem === 'Подсет наоговой стоимости леса' ? 'active_item' : ''}`}
                            onClick={(e) => {dispatch(setDropDownItem(e.target.innerText)); dispatch(toogleActiveDropDown())}}>Подсчет налоговой стоимости леса</div>
                        <div className={`startingForm-item ${dropDownItem === 'Учет биоразнообразия' ? 'active_item' : ''}`}
                            onClick={(e) => {dispatch(setDropDownItem(e.target.innerText)); dispatch(toogleActiveDropDown())}}>Учет биоразнообразия</div>
                        <div className={`startingForm-item ${dropDownItem === 'Получение характеристик для лесоустройства' ? 'active_item' : ''}`}
                            onClick={(e) => {dispatch(setDropDownItem(e.target.innerText)); dispatch(toogleActiveDropDown())}}>Получение характеристик для лесоустройства</div>
                    </div>
                </div>

                <div className="startingForm__input">
                    <input className={`startingForm-input ${!dateOfEndCorrect ? 'input_error' : null}`} type="date" required value={dateOfEnd}
                    onBlur={(e) => onCheckDateOfEnd(e.target.value)}
                    onChange={(e) => dispatch(setDateOfEnd(e.target.value))}></input>
                    <label className="startingForm-placeholder">Сроки выполнения</label>
                    <div className={`startingForm-errorMessage ${!dateOfEndCorrect ? 'show_errorMessage' : null}`}>Проверьте правильность</div>
                </div>
                <div className='myMap'>
                    <button className='mapButton resetButton'
                        onClick={(e) => {reset(e)}}>Сбросить</button>
                    <button className='mapButton removeButton'
                        onClick={(e) => {remove(e)}}>Шаг назад</button>

                    <MapContainer center={[56.48756, 84.948613]} zoom={13}
                    >
                        <TileLayer
                            attribution="Google Maps"
                            url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                            maxZoom={20}
                            subdomains={["mt0", "mt1", "mt2", "mt3"]}
                        />
                        {renderPolygon()}
                        <OnClick/>
                    </MapContainer>
                </div>
                <div className="applicationModal__checkButton">
                    <input className="applicationModal__checkbox" type="checkbox"
                    onClick={() => dispatch(toggleConsent())}/>
                    <label>Подтвердите ваше с договором который будет заключен между вами и исполнителем. Ознакомиться с структурой договора можно <a href="#" style={{textDecoration: 'underline'}}>здесь</a></label>                        
                </div>
                <br/>
                <button className='applicationModal__button' onClick={() => {onPostApplication()}}>Создать заявку</button>
                </form>
            </div>
        </div>
    )
}

export default ApplicationModal