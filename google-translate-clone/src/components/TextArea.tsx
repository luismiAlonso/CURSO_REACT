import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'

interface Props { 
    type: SectionType
    loading?: boolean
    onChange: (value: string) => void
    value: string
}

const commonStyles = {border: 0, height: '200px',resize:'none'}

const getPlaceHolder = ({type, loading} : {type: SectionType, loading?: boolean}) => {
  if(type === SectionType.From) return 'Introducir Texto ..'
  if(loading === true) return 'Cargando...'
  return 'Traducción'
}

export const TextArea = ({loading, type, value, onChange } : Props) =>{
  const styles =type === SectionType.From 
    ? commonStyles
    : {...commonStyles, backgroundColor: '#f5f5f5'} 
  
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => (
    onChange(event.target.value)
  )

    return (

      <Form.Control
        autoFocus = {type === SectionType.From}
        as='textarea'
        placeholder={getPlaceHolder({ type,loading })}
        style ={ styles }
        value = { value }
        onChange={handleChange}
     />
  )
}