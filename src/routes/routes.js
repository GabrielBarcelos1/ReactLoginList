
import {BrowserRouter, Switch , Route }from 'react-router-dom'
import Login from '../screens/login/Login'
import AddItem from '../screens/addItem/AddItem'
import List from '../screens/list/List'


function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/add" component={AddItem}/>
                <Route exact path="/list" component={List}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;