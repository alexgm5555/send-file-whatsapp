import { FC }from 'react';
import { useNavigate } from 'react-router-dom';

import { MainForm } from '../../components';

import './styles.scss';

export const Main:FC = () => {
  let navigate = useNavigate();

  const mainSuccess = (_phone: string) => {
    console.log('enviado');
    if (process.env.REACT_APP_ENVIROMENT === 'dev') console.log('enviado');
    else {
      const url = `https://api.whatsapp.com/send?phone=57${_phone}`;
      if(_phone ===  process.env.REACT_APP_ROUTE_QR_CODE) navigate("/code");
      else window.open(url, '_blank');
    }
  }

  return (
    <div className='main-container'>
      <MainForm mainSuccess={mainSuccess}/>
      <div className='QR_LA_Image'>
        {/* <br />
        ¡Ayudanos a mantener esta web!
        <br />
        Tu generosa donación garantizará el desarrollo y mejora.
        <br />
        ¡Gracias por tu apoyo! */}
      </div>
    </div>
  );
};
