import Login from './Customer/Login'
import Register from './Customer/Register'
import Services from './Booking/Services'
import Professionals from './Booking/Professionals'
import {Switch , Route, Router} from 'react-router-dom'
import useAuthContext from '../Hooks/useAuthContext'
import Questions from './Booking/Questions'
import Slots from './Booking/Slots'
import Confirmation from './Booking/Confirmation'
import Summary from './Booking/Summary'
import ResetPassword from './Customer/ResetPassword'
import Account from './Customer/Account'
import Appointments from './Customer/Appointments'
import Profile from './Customer/Profile'

const Pages = () => {
    const {authState} = useAuthContext();
    return <div>
        <Switch>
            <Route component={Services} path="/:id/services" />
            <Route component={Professionals} path="/:id/professionals"  />
            <Route component={Slots} path="/:id/slots"  />
            <Route component={Questions} path="/:id/questions"  />
            <Route component={Summary} path="/:id/summary"  />
            <Route component={Confirmation} path="/:id/confirmation"  />
            <Route component={Register} path="/:id/register" />
            <Route component={Login} path="/:id/login" />
            <Route component={ResetPassword} path="/:id/resetPassword" />
        </Switch>
        {authState.token ? (
        <Switch>
            <Route component={Account} path="/:id/account"  />
            <Route component={Appointments} path="/:id/appointments"  />
            <Route component={Profile} path="/:id/profile"  />
        </Switch>
    ) : (
        <Switch>          
            <Route component={Services} path="/:id/services" exact />
        </Switch>
    )}
    </div>
}
export default Pages