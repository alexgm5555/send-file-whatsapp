import { FC, useState }from 'react';
import QRCode from "react-qr-code";
// import { saveAs } from 'file-saver';

import { MainForm } from '../../components';

import './styles.scss';

export const QrCode:FC = () => {
  const [url, setUrl] = useState('');
  const [showCode, setShowCode] = useState(false);

  const mainSuccess = (_phone: string) => {
    const _url = `https://api.whatsapp.com/send?phone=${_phone}`;
    setUrl(_url);
    setShowCode(true);
  }

  return (
    <div className='main-container'>
      {!showCode && <MainForm mainSuccess={mainSuccess}/>}
      {showCode && <div style={{ height: "auto", margin: "0 auto", maxWidth: 200, width: "100%" }}>
        <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={url}
        viewBox={`0 0 256 256`}
        />
      </div>}
    </div>
  );
};