import './App.css'
import { TwitterFollowCard }  from './TwitterFollowCard.jsx'
import { useState } from 'react'

const users = [
    {
        userName:"Alonso",
        name: "Luismi",
        isFollowing: false
    },
    {
        userName:"SON",
        name: "Sonia",
        isFollowing: false
    },
    {
        userName:"ALL",
        name: "Alicia",
        isFollowing: true
    }
]

/*
export const App = ()=>{

    const formatUserName = (userName) => `@${userName}`

    return (

        <section className='AppTwitterFollow'>
            <TwitterFollowCard formatUserName={formatUserName} isFollow userName="Alonso">
                Luis Miguel
            </TwitterFollowCard>

            <TwitterFollowCard 
                formatUserName={formatUserName} 
                isFollow userName="Alonso" 
                name="Luis Miguel" 
            />

            <TwitterFollowCard 
                formatUserName={formatUserName} 
                isFollow userName="Sora" 
                name="Soraya" 
            />

            <TwitterFollowCard
                formatUserName={formatUserName}
                isFollow={false} 
                userName="Alib" 
                name="Alicia Sanchez"  
             />
             
        </section>
    ) 
}
*/

/*
****Children Prop****
export const App = ()=>{

    const formatUserName = (userName) => `@${userName}`
    return (

        <section className='AppTwitterFollow'>
            <TwitterFollowCard formatUserName={formatUserName}  userName="Alonso">
              <strong>Luis Miguel</strong> 
            </TwitterFollowCard>
            <TwitterFollowCard formatUserName={formatUserName}  userName="Sora">
                <strong>Soraya Saez</strong>
            </TwitterFollowCard>
            <TwitterFollowCard formatUserName={formatUserName}  userName="ALL">
                <strong>Alicia Sanchez</strong>
            </TwitterFollowCard>2
        </section>
    ) 
}
*/

/*
export const App = ()=>{

   const [isFollowing,setName] = useState(false)
   console.log("APP render is "+isFollowing);

    return (

        <section className='AppTwitterFollow'>
            <TwitterFollowCard   userName="Luismi">
                <strong>
                    Luis Miguel
                </strong> 
            </TwitterFollowCard>
            <TwitterFollowCard   userName="Sora">
                <strong>
                    Soraya
                </strong> 
            </TwitterFollowCard>
            <TwitterFollowCard   userName="ALL">
                <strong>
                    Alicia
                </strong> 
            </TwitterFollowCard>

            <button onClick={()=>setName(!isFollowing)}>cambio nombre</button>
        </section>
    ) 
}
*/


/*
****Multiples Props en un Objeto****
export const App = ()=>{

    const formatUserName = (userName) => `@${userName}`

    const objUser01={userName:'Alonso',name:'Luis Miguel',isFollow:true};
    const objUser02={userName:'Sora',name:'Soraya Saez',isFollow:true};
    const objUser03={userName:'ALL',name:'Alicia Hernandez',isFollow:false};

    return (

        <section className='AppTwitterFollow'>
            <TwitterFollowCard {...objUser01}>
              <strong>Luis Miguel</strong> 
            </TwitterFollowCard>
            <TwitterFollowCard {...objUser02}>
                <strong>Soraya Saez</strong>
            </TwitterFollowCard>
            <TwitterFollowCard {...objUser03}>
                <strong>Alicia Sanchez</strong>
            </TwitterFollowCard>
        </section>
    ) 
}*/

//creamos listas
export const App = ()=>{

    const [isFollowing,setName] = useState(false)
    const users = [
        {
            userName: 'Alonso',
            name: 'Luis Miguel',
            isFollowing: true
        },
        {
            userName: 'SUSU',
            name: 'Susana Martinez',
            isFollowing: false
        },
        {
            userName: 'MATT',
            name: 'Marta Sanchez',
            isFollowing: true
        }
        
    ]
    //console.log(" APP: "+users[0].userName);
    
     return (
 
         <section className='AppTwitterFollow'>
           {
                users.map(({ userName, name, isFollowing})=>(
                    <TwitterFollowCard 
                    key={userName}
                    userName={userName}
                    initialState={isFollowing}>
                        <strong>{name}</strong> 
                    </TwitterFollowCard>         
                )
            )
           }
         </section>
     ) 
 }












