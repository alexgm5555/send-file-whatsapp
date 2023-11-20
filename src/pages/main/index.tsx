import { FC }from 'react';
import { useNavigate } from 'react-router-dom';

import { MainForm } from '../../components';
import QR_LA_Image from '../../images/QR_L__A__.png';

import './styles.scss';

export const Main:FC = () => {
  let navigate = useNavigate();

  const mainSuccess = (_phone: string) => {
    const url = `https://api.whatsapp.com/send?phone=${_phone}`;
    if(_phone ===  process.env.REACT_APP_ROUTE_QR_CODE) navigate("/code");
    else window.open(url, '_blank');
  }

  return (
    <div className='main-container'>
      <MainForm mainSuccess={mainSuccess}/>
      <div className='QR_LA_Image'>
        <br />
        <img className='img-car' src={`${QR_LA_Image}`} alt="" />
        ¡Ayudanos a mantener esta web!
        <br />
        Tu generosa donación garantizará el desarrollo y mejora.
        <br />
        ¡Gracias por tu apoyo!
      </div>
    </div>
  );
};
