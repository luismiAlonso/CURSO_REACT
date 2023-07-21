

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
****CHILDREN PROP****/
export const TwitterFollowCard = ({children,formatUserName,userName,isFollow}) => {

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
             <strong>{children}</strong>
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



