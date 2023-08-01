import Form from 'react-bootstrap/Form';
import { AUTO_LANGUAGE, SUPORTED_LEGUAGES } from '../constants';
import { FromLanguage, Language, SectionType } from '../types.d';
import React from 'react';


type Props = 
  | {type: SectionType.From , value: FromLanguage, onChange: (Language: FromLanguage) => void }
  | {type: SectionType.To , value: Language, onChange: (Language:Language) => void}

export const LanguageSelector = ({ onChange,type, value } : Props) => {

const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) =>{
  onChange(event.target.value as Language)
}

  return (
    <Form.Select aria-label="Default select example" onChange={handleChange} value={value}>
      {type === SectionType.From && <option value = {AUTO_LANGUAGE}>Detectar idioma</option> }

     {Object.entries(SUPORTED_LEGUAGES).map(([key,literal]) =>(
      <option key = {key} value ={key}>
        {literal}
      </option>
     ))}
    </Form.Select>
  );
}