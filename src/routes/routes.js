
import {BrowserRouter, Switch , Route }from 'react-router-dom'
import Login from '../screens/login/Login'
import AddItem from '../screens/addItem/AddItem'


function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/AddItem" component={AddItem}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;