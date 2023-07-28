import './Footer.css'

export function Footer ({filters}){

    return(
      <footer className='footer'>
        {
            JSON.stringify(filters, null, 2)
        }
        {
            /*
            <h4>Prueba t´cenica de React * -
            <span> Luismi</span></h4>
            <h5>Shopping Caert con useContext & useReducer</h5>
            */
        }
        </footer>
    )
}