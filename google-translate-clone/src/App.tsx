import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { useStore } from './hook/useStore'
import { ArrowsIcon } from './components/icons'
import { LanguageSelector } from './components/languageSelector'
import './App.css'
import { AUTO_LANGUAGE } from './constants'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'

function App() {
 const {
  loading,setFromLanguage,setToLanguage,setFromText,interChangeLanguages,fromText,result,setResult,toLanguage,fromLanguage}= useStore()
  return (
      <Container fluid>  
        <h1>Google Translate</h1>
        <Row>
          <Col>
            <Stack gap={2}>
              <LanguageSelector
                type={SectionType.From}
                value={fromLanguage}
                onChange={setFromLanguage} />
                <h2>{fromLanguage}</h2>
              <TextArea 
                type = {SectionType.From}
                value={fromText}    
                onChange={setFromText}             
              />
            </Stack>
          </Col>

          <Col xs='auto'>
            <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interChangeLanguages}>
              <ArrowsIcon />
            </Button>
          </Col>

          <Col>
            <Stack gap={2}>
              <LanguageSelector
                type = {SectionType.To}
                value={toLanguage}
                onChange={setToLanguage} />
                <h2>{toLanguage}</h2>
              <TextArea 
                loading = {loading}
                type={SectionType.To}
                value ={result}
                onChange={setResult}
              />
            </Stack>
          </Col>
        </Row>       
      </Container>  
  )
}

export default App
