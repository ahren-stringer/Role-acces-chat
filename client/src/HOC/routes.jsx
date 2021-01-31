import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import Auth from '../Components/Auth/Auth'
import Chat from '../Components/Chat/Chat'
import Chats from '../Components/Chats/Chats'
import Header from '../Components/Header/Header'

export const useRotes=(isAuth)=>{
    debugger
 if (isAuth){
    return (<Switch>
        <Route path='/' exact>
            <Header/>
            <Chats/>
            <Chat/>
        </Route>
    </Switch>)
 }

 return <Switch>
     <Route path='/auth' exact>
        <Auth/>
     </Route>
     <Redirect to='/'/>
 </Switch>

}