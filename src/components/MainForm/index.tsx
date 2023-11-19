import { FC, SetStateAction, useEffect, useState }from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { useSearchParams } from "react-router-dom";

import './styles.scss';
import { addPhone } from '../../redux/userSlice';

interface props {
  mainSuccess(e: string): void;
}
export const MainForm:FC<props> = ({mainSuccess}) => {
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  // const [errroMessage, setErrorMessage] = useState('');
  const dispatch =  useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  let [query] = useState<any>(
    searchParams.get('query')
  );

  const handleClick = () => {
    // setQuery;
    dispatch(addPhone({ phone: phoneNumber}));
    mainSuccess(phoneNumber);
  }

  const handleOnChangeTextField = (
    e: { target: { value: SetStateAction<string> }},
    field: 'phoneNumber'
  )=>{
    if (field === 'phoneNumber') setPhoneNumber(e.target.value);
  }

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && disableButton === false) {
      handleClick();
    }
  }

  useEffect(() => {
    setSearchParams({ query });
    if (query !== null) setPhoneNumber(query);
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

