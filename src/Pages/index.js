import Login from '../Pages/Login'
import Register from '../Pages/Register'
import Services from '../Pages/Booking/Services'
import Professionals from '../Pages/Booking/Professionals'
import {Switch , Route} from 'react-router-dom'
import useAuthContext from '../Hooks/useAuthContext'

const Pages = () => {
    const {authState} = useAuthContext()
    return authState.token ? (
        <Switch>
        <Route component={Services} path="/services"  />
        <Route component={Professionals} path="/professionals"  />
        </Switch>
    ) : (
        <Switch>
        <Route component={Services} path="/services"  />
        <Route component={Professionals} path="/professionals"  />
        <Route component={Register} path="/register"  />
        <Route component={Login}  />
    </Switch>
    )
}
export default Pages