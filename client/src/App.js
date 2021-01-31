import { Route, Router } from 'react-router-dom';
import './App.css';
import Auth from './Components/Auth/Auth';
import Main from './Components/Main/Main';

function App() {
  let isAuth = false

    return <div>
        <Route exact path="/" render={() => <Auth/>}/>
        <Route exact path="/chat" render={() => <Main/>}/>
    </div>
}

export default App;