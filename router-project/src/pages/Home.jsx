import { Link } from "../Link"

export default function HomePage(){
  return (
    <>
    <h1>Home</h1>
    <p>Este es una pagina de ejemplo para crear un React Router</p>
    <Link to='/about'>Ir a Nosotros</Link>
    </>
  )
}