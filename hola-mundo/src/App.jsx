import './App.css'
import { TwitterFollowCard }  from './TwitterFollowCard.jsx'

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
            <TwitterFollowCard formatUserName={formatUserName} isFollow userName="Alonso">
              <strong>Luis Miguel</strong> 
            </TwitterFollowCard>
            <TwitterFollowCard formatUserName={formatUserName} isFollow userName="Sora">
                <strong>Soraya Saez</strong>
            </TwitterFollowCard>
            <TwitterFollowCard formatUserName={formatUserName} isFollow userName="ALL">
                <strong>Alicia Sanchez</strong>
            </TwitterFollowCard>
        </section>
    ) 
}
*/

/*
****Multiples Props en un Objeto****/
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
}












