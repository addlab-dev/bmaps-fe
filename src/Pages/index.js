import Login from '../Pages/Login'
import Register from '../Pages/Register'
import Services from '../Pages/Booking/Services'
import {Switch , Route} from 'react-router-dom'
import useAuthContext from '../Hooks/useAuthContext'

const Pages = () => {
    const {authState} = useAuthContext()
    return authState.token ? (
        <Switch>
        <Route component={Services} path="/services"  />
        </Switch>
    ) : (
        <Switch>
        <Route component={Services} path="/services"  />
        <Route component={Register} path="/register"  />
        <Route component={Login}  />
    </Switch>
    )
}
export default Pages