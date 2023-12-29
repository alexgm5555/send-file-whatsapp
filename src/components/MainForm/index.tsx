import { FC, SetStateAction, useEffect, useState }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import useCreateRecordMutation from '../../hooks/useCreateRecordMutation';
import { addPhone } from '../../redux/userSlice';

import { contentTextSend } from './content';
import './styles.scss';


interface props {
  mainSuccess(e: string): void;
}
/**
 * Componente principal del formulario.
 *
 * @component
 * @example
 * <MainForm mainSuccess={handleSuccess} />
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Function} props.mainSuccess - Función para manejar el éxito del formulario.
 * @returns {JSX.Element} - Elemento JSX que representa el formulario principal.
 */
export const MainForm:FC<props> = ({mainSuccess}) => {
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [phoneNumber, setPhoneNumber] = useState(useSelector((state: any) => state.user.phone));
  // const [errroMessage, setErrorMessage] = useState('');
  let navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  let [query] = useState<any>(searchParams.get('query'));

  const { createRecord } = useCreateRecordMutation();
  const dispatch =  useDispatch();
  // const phoneNumber = useSelector(selectPhone);

  /**
   * Maneja el clic en el botón de envío del formulario.
   *
   * @function
   * @returns {void}
   */
  const handleClick = () => {
    dispatch(addPhone({ phone: phoneNumber}));
    createRecord(phoneNumber);
    mainSuccess(phoneNumber);
  }

  /**
   * Maneja el cambio en el campo de entrada del número de teléfono.
   *
   * @function
   * @param {Object} e - Evento de cambio.
   * @param {string} field - Campo afectado ('phoneNumber' en este caso).
   * @returns {void}
   */
  const handleOnChangeTextField = (
    e: { target: { value: SetStateAction<string> }},
    field: 'phoneNumber'
  )=>{
    let _phone: string = e.target.value.toString();
    _phone =_phone.replaceAll('-','')
    if (field === 'phoneNumber') setPhoneNumber(_phone);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && disableButton === false) {
      handleClick();
    }
  }

  useEffect(() => {
    setSearchParams({ query });
    if (query !== null && query !== 'null') {
      dispatch(addPhone({ phone: query }));
      if(query ===  process.env.REACT_APP_ROUTE_QR_CODE) navigate("/code");
      else {
        setTimeout(function(){
          const url = `https://api.whatsapp.com/send?phone=${query}&text=${contentTextSend}`;
          window.open(url, '_parent');
        }, 1700);
        createRecord(query);
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

