import { Link } from '../Link.jsx'

export default function AboutPage(){
  return (
    <>
      <h1>About</h1>
      <div>
      <img src='https://pbs.twimg.com/profile_images/1613612257015128065/oA0Is67J_400x400.jpg' alt='Foto de midudev' />
        <p>Hola me llamo Mengano y estoy creando un clon de React router</p>
      </div>
      <Link to='/'>Ir al Home</Link>
    </>
  )
}