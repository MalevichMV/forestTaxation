import AppHeader from '../Components/appHeader/AppHeader'
import '../style/infomation.scss'

const Infomation = () => {
    return (
    
        <div class="steps">
            <div class="step">
            <div class="step-icon">1</div>
            <div class="step-content">
                <div class="step-title">Создание заявки</div>
                <div class="step-description">Пользователь создает заявку</div>
            </div>
            </div>
            <div class="step">
            <div class="step-icon">2</div>
            <div class="step-content">
                <div class="step-title">Ожидание исполнителя</div>
                <div class="step-description">Пользователь ожидает исполнителя</div>
            </div>
            </div>
            <div class="step">
            <div class="step-icon">3</div>
            <div class="step-content">
                <div class="step-title">Выбор исполнителя</div>
                <div class="step-description">Пользователь выбирает исполнителя</div>
            </div>
            </div>
            <div class="step">
            <div class="step-icon">4</div>
            <div class="step-content">
                <div class="step-title">Ожидание результатов</div>
                <div class="step-description">Ожидание результатов</div>
            </div>
            </div>
        </div>
        
    )
}

export default Infomation;