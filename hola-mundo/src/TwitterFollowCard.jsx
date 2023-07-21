import {useState} from 'react'
import imageSrc from './imgs/avatar_woman.jpg'

/*
export const TwitterFollowCard = ({formatUserName,userName,name,isFollow}) => {

   // const imageSrc= "./imgs/avatar_woman.jpg";

    return (
        <article className='tw-followCard'>
        <header className='tw-followCard-header'>
        <img
            className='tw-followCard-avatar'
            alt='El avatar de midudev'
            src={imageSrc}
        />
        <div className='tw-followCard-info'>
            <strong>{name}</strong>
            <span className='tw-followCard-infoUserName'>{userName}</span>
        </div>
        </header>

        <aside>
        <button className='tw-followCard-button' >
            <span className='tw-followCard-text'>Seguir</span>
            <span className='tw-followCard-stopFollow'>Dejar de seguir</span>
        </button>
        </aside>
    </article>
    ) 
}
*/

/*
****CHILDREN PROP****
export const TwitterFollowCard = ({children,formatUserName,userName}) => {

    const [isFollowing,setIsFollowing] = useState(false)

    const textFollow = isFollowing ? 'siguiendo' : 'seguir'
    const buttonClassName = isFollowing ? 'tw-followCard-button is-following' : 'tw-followCard-button'

    const hadleClick = () => {
        setIsFollowing(!isFollowing)
    }

     return (
         <article className='tw-followCard'>
         <header className='tw-followCard-header'>
         <img
             className='tw-followCard-avatar'
             alt='El avatar de midudev'
             src={imageSrc}
         />
         <div className='tw-followCard-info'>
             <strong>{children}</strong>
             <span className='tw-followCard-infoUserName'>{userName}</span>
         </div>
         </header>
 
         <aside>
         <button  className={buttonClassName} onClick={hadleClick}>
             <span className='tw-followCard-text'>{textFollow}</span>
             <span className='tw-followCard-stopFollow'>Dejar de seguir</span>
         </button>
         </aside>
     </article>
     ) 
 }
 */

 export const TwitterFollowCard = ({children,initialState,userName}) => {

    const [isFollowing,setIsFollowing] = useState(initialState)

    console.log('Renderizando los hijos de padre App: '+userName);
    const textFollow = isFollowing ? 'siguiendo' : 'seguir'
    const buttonClassName = isFollowing ? 'tw-followCard-button is-following' : 'tw-followCard-button'

    const hadleClick = () => {
        setIsFollowing(!isFollowing)
    }

     return (
         <article className='tw-followCard'>
         <header className='tw-followCard-header'>
         <img
             className='tw-followCard-avatar'
             alt='El avatar de midudev'
             src={imageSrc}
         />
         <div className='tw-followCard-info'>
             <strong>{children}</strong>
             <span className='tw-followCard-infoUserName'>@{userName}</span>
         </div>
         </header>
 
         <aside>
         <button  className={buttonClassName} onClick={hadleClick}>
             <span className='tw-followCard-text'>{textFollow}</span>
             <span className='tw-followCard-stopFollow'>Dejar de seguir</span>
         </button>
         </aside>
     </article>
     ) 
 }




