import { FC, useEffect }from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import { MainForm } from '../../components';

import './styles.scss';

export const Main:FC = () => {
  let navigate = useNavigate();
  const data = useSelector((state: any) => state.user);

  const mainSuccess = (_phone: string) => {
    console.log(_phone);
    const url = `https://api.whatsapp.com/send?phone=${_phone}`;
    window.open(url, '_blank');
    // navigate(url);
  }

  return (
    <div className='main-container'>
      <MainForm mainSuccess={mainSuccess}/>
    </div>
  );
};