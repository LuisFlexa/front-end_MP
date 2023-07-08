import {Link} from 'react-router-dom';
import './estilo.css';

/**
 * Componente de sucesso de cadastro.
 *
 * Este componente exibe uma mensagem de sucesso após o cadastro do usuário.
 *
 * @returns {JSX.Element} O elemento JSX contendo a mensagem de sucesso e o botão de retorno ao login.
 */
function sucessoCad() {
    return (
        <div className="boxCad">
            <button></button>
            <fieldset className='fild'>
                <legend><b>Conta Criada!</b></legend>
                <br></br>
                <Link to="/"><button type="button" name="return" className="back" onclick="window.location.href='login.php'"><b>Retornar ao Login</b></button></Link>
                <br></br>
            </fieldset>
        </div>
    )
}

export default sucessoCad;