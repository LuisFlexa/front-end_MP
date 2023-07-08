import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './style.css';

/**
 * Componente que representa o formulário de preferências.
 * @returns {JSX.Element} Componente do formulário de preferências.
 */
function FormularioPreferencias() {

  const navigate = useNavigate();

  const [preferencias, setPreferencias] = useState({
    romance: false,
    drama: false,
    action: false,
    crime: false,
    adventure: false,
    family: false,
    horror: false,
    scienceFiction: false,
    comedy: false,
    animation: false,
    fantasy: false,
    thriller: false,
    documentary: false,
    musical: false
  });

  /**
   * Manipula a alteração de um campo de preferência.
   * @param {Object} event - O evento de alteração.
   */
  const handleChange = (event) => {
    const { name, checked } = event.target;
    setPreferencias((prevPreferencias) => ({
      ...prevPreferencias,
      [name]: checked
    }));
  };

  /**
   * Manipula o envio do formulário de preferências.
   * @param {Object} event - O evento de envio do formulário.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
  const selectedCount = Object.values(preferencias).filter(Boolean).length;
  if (selectedCount >= 3) {
    const usuario = {
      preference: preferencias
    };
    /*localStorage.setItem('usuario', JSON.stringify(usuario));
    console.log(preferencias);
    console.log(JSON.parse(localStorage.getItem('usuario')).preference);*/

    if (preferencias.romance == true) {localStorage.setItem(localStorage.getItem('usuario') + 'preference' + 'romance', "yes"); }
    else { localStorage.setItem(localStorage.getItem('usuario') + 'preference' + 'romance', "no");}

    if (preferencias.drama == true) {localStorage.setItem(localStorage.getItem('usuario') + 'preference' + 'drama', "yes"); }
    else { localStorage.setItem(localStorage.getItem('usuario') + 'preference' + 'drama', "no");}

    if (preferencias.action == true) {localStorage.setItem(localStorage.getItem('usuario') + 'preference' + 'action', "yes"); }
    else { localStorage.setItem(localStorage.getItem('usuario') + 'preference' + 'action', "no");}

    if (preferencias.crime == true) {localStorage.setItem(localStorage.getItem('usuario') + 'preference' + 'crime', "yes"); }
    else { localStorage.setItem(localStorage.getItem('usuario') + 'preference' + 'crime', "no");}

    if (preferencias.adventure == true) {localStorage.setItem(localStorage.getItem('usuario') + 'preference' + 'adventure', "yes"); }
    else { localStorage.setItem(localStorage.getItem('usuario') + 'preference' + 'adventure', "no");}

    if (preferencias.family) { localStorage.setItem(localStorage.getItem('usuario') + 'preference' + 'family', "yes"); } 
    else { localStorage.setItem(localStorage.getItem('usuario') + 'preference' + 'family', "no"); }

    if (preferencias.horror) { localStorage.setItem(localStorage.getItem('usuario') + 'preference' + 'horror', "yes"); } 
    else { localStorage.setItem(localStorage.getItem('usuario') + 'preference' + 'horror', "no"); }

    if (preferencias.scienceFiction) { localStorage.setItem(localStorage.getItem('usuario') + 'preference' + 'scienceFiction', "yes"); } 
    else { localStorage.setItem(localStorage.getItem('usuario') + 'preference' + 'scienceFiction', "no"); }
    
    if (preferencias.comedy) { localStorage.setItem(localStorage.getItem('usuario') + 'preference' + 'comedy', "yes"); } 
    else { localStorage.setItem(localStorage.getItem('usuario') + 'preference' + 'comedy', "no"); }
    
    if (preferencias.animation) { localStorage.setItem(localStorage.getItem('usuario') + 'preference' + 'animation', "yes"); } 
    else { localStorage.setItem(localStorage.getItem('usuario') + 'preference' + 'animation', "no"); }
    
    if (preferencias.fantasy) { localStorage.setItem(localStorage.getItem('usuario') + 'preference' + 'fantasy', "yes"); } 
    else { localStorage.setItem(localStorage.getItem('usuario') + 'preference' + 'fantasy', "no"); }
    
    if (preferencias.thriller) { localStorage.setItem(localStorage.getItem('usuario') + 'preference' + 'thriller', "yes"); } 
    else { localStorage.setItem(localStorage.getItem('usuario') + 'preference' + 'thriller', "no"); }
    
    if (preferencias.documentary) { localStorage.setItem(localStorage.getItem('usuario') + 'preference' + 'documentary', "yes"); } 
    else { localStorage.setItem(localStorage.getItem('usuario') + 'preference' + 'documentary', "no"); }
    
    if (preferencias.musical) { localStorage.setItem(localStorage.getItem('usuario') + 'preference' + 'musical', "yes"); } 
    else { localStorage.setItem(localStorage.getItem('usuario') + 'preference' + 'musical', "no"); }
      
    navigate("/Home");

  } else {
    console.log('Selecione pelo menos 3 itens');
    localStorage.setItem('test', '3');
    //localStorage.setItem(localStorage.getItem('usuario') + 'preference', "yes");

    //localStorage.setItem(localStorage.getItem('usuario'), "NNOCAP");

    //00000000000000000000000000
    const userToken = localStorage.getItem("user_token");
    console.log(localStorage.getItem(JSON.parse(userToken).email));
    console.log(localStorage.getItem('usuario'.teste));
  }
  };

  return (
    <div class="box">
    <form className="preferences-form" onSubmit={handleSubmit}>
    <fieldset>
    <legend><b>Preferências</b></legend>
    <div className="checkbox-group">
      <div>
        <label>
          <input
            type="checkbox"
            name="romance"
            checked={preferencias.romance}
            onChange={handleChange}
          />
          Romance
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="drama"
            checked={preferencias.drama}
            onChange={handleChange}
          />
          Drama
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="action"
            checked={preferencias.action}
            onChange={handleChange}
          />
          Action
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="crime"
            checked={preferencias.crime}
            onChange={handleChange}
          />
          Crime
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="adventure"
            checked={preferencias.adventure}
            onChange={handleChange}
          />
          Adventure
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="family"
            checked={preferencias.family}
            onChange={handleChange}
          />
          Family
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="horror"
            checked={preferencias.horror}
            onChange={handleChange}
          />
          Horror
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="scienceFiction"
            checked={preferencias.scienceFiction}
            onChange={handleChange}
          />
          Science Fiction
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="comedy"
            checked={preferencias.comedy}
            onChange={handleChange}
          />
          Comedy
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="animation"
            checked={preferencias.animation}
            onChange={handleChange}
          />
          Animation
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="fantasy"
            checked={preferencias.fantasy}
            onChange={handleChange}
          />
          Fantasy
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="thriller"
            checked={preferencias.thriller}
            onChange={handleChange}
          />
          Thriller
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="documentary"
            checked={preferencias.documentary}
            onChange={handleChange}
          />
          Documentary
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="musical"
            checked={preferencias.musical}
            onChange={handleChange}
          />
          Musical
        </label>
      </div>
      </div>
      <br></br>
      <button className="btnS" type="submit">Salvar Preferências (3 no mínimo)</button>
      </fieldset>
    </form>
    </div>
  );
}

export default FormularioPreferencias;
