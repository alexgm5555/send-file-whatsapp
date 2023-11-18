import { FC }from 'react';
import { useNavigate } from 'react-router-dom';

import { MainForm } from '../../components';

import './styles.scss';

export const Main:FC = () => {
  let navigate = useNavigate();

  const mainSuccess = (_phone: string) => {
    const url = `https://api.whatsapp.com/send?phone=${_phone}`;
    window.open(url, '_blank');
  }
  const handleClick = () => navigate("/code");

  return (
    <div className='main-container'>
      <MainForm mainSuccess={mainSuccess}/>
      <div>
      <button onClick={handleClick}>
        generate Code
      </button>
      </div>
    </div>
  );
};