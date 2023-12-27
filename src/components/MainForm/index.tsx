import { FC, SetStateAction, useEffect, useState }from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from '@apollo/client';

import './styles.scss';
import { addPhone } from '../../redux/userSlice';
import { CREATE_RECORD } from '../../graphql/mutations';

interface props {
  mainSuccess(e: string): void;
}
export const MainForm:FC<props> = ({mainSuccess}) => {
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  // const [errroMessage, setErrorMessage] = useState('');
  const dispatch =  useDispatch();
  let navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  let [query] = useState<any>(
    searchParams.get('query')
  );


  const [mutCreateRecord, createRecord] = useMutation(
    CREATE_RECORD,
    {
      errorPolicy: 'all',
      onError(err) {
        const error = `${err}`.split(':').reverse()[0];
        if (error === ' Failed to fetch') {
          console.log(error);
        }
      },
    },
  );

  const handleClick = () => {
    // setQuery;
    dispatch(addPhone({ phone: phoneNumber}));

    mutCreateRecord({
      variables: {
        phone: phoneNumber
      }
    });
    // mainSuccess(phoneNumber);
  }

  const handleOnChangeTextField = (
    e: { target: { value: SetStateAction<string> }},
    field: 'phoneNumber'
  )=>{
    let _phone: string = e.target.value.toString();
    _phone =_phone.replaceAll('-','')
    if (field === 'phoneNumber') setPhoneNumber(_phone);
  }

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && disableButton === false) {
      handleClick();
    }
  }

  useEffect(() => {
    setSearchParams({ query });
    if (query !== null) {
      setPhoneNumber(query);
      if(query ===  process.env.REACT_APP_ROUTE_QR_CODE) navigate("/code");
      else {
        setTimeout(function(){
          const textSend =  '¡Adios%20a%20los%20contactos%20i'+
                            'nnecesarios!%20En%20https://coff'+
                            'ee-whatsapp.netlify.app%20,%20pr'+
                            'iorizamos%20conexiones%20valiosas'+
                            '.%20Únete%20a%20nosotros%'+
                            '20y%20enfócate%20en%20conexiones'+
                            '%20significativas.'
          const url = `https://api.whatsapp.com/send?phone=${query}&text=${textSend}`;
          window.open(url, '_parent');
        }, 1700);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phoneNumber !== '' && phoneNumber?.length === 10) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [phoneNumber]);


  return (
    <div className='main-form-container'>
      <br />
      
      <TextField
        id='filte01'
        label='WhatsApp'
        value={phoneNumber}
        placeholder='311#######'
        autoFocus
        autoComplete={query}
        onChange={(e)=>handleOnChangeTextField(e, 'phoneNumber')}
        onKeyDown={handleKeyDown}
      />
      <br />
      <br />
      {/* {errroMessage && <label>
        {errroMessage}
      </label>} */}
      <br />
      <Button
        id="contained"
        variant='contained'
        onClick={handleClick}
        disabled={disableButton}
      >Enviar</Button>
    </div>
  );
};

