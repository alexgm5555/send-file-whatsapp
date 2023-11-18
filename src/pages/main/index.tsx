import { FC }from 'react';

import { MainForm } from '../../components';

import './styles.scss';

export const Main:FC = () => {

  const mainSuccess = (_phone: string) => {
    const url = `https://api.whatsapp.com/send?phone=${_phone}`;
    window.open(url, '_blank');
  }

  return (
    <div className='main-container'>
      <MainForm mainSuccess={mainSuccess}/>
    </div>
  );
};