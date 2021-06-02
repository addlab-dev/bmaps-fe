import Login from './Customer/Login'
import Register from './Customer/Register'
import Services from './Booking/Services'
import Professionals from './Booking/Professionals'
import {Switch , Route} from 'react-router-dom'
import useAuthContext from '../Hooks/useAuthContext'
import Questions from './Booking/Questions'
import Slots from './Booking/Slots'
import Confirmation from './Booking/Confirmation'
import Summary from './Booking/Summary'
import ResetPassword from './Customer/ResetPassword'
import Account from './Customer/Account'
import Appointments from './Customer/Appointments'

const Pages = () => {
    const {authState} = useAuthContext();
    return <div>
            <Switch>
                <Route exact component={Services} path="/:id/services" />
                <Route exact component={Professionals} path="/:id/professionals"  />
                <Route exact component={Slots} path="/:id/slots"  />
                <Route exact component={Questions} path="/:id/questions"  />
                <Route exact component={Summary} path="/:id/summary"  />
                <Route exact component={Confirmation} path="/:id/confirmation"  />
                <Route exact component={Register} path="/:id/register" />
                <Route exact component={Login} path="/:id/login" />
                <Route exact component={ResetPassword} path="/:id/resetPassword" />
                {/* {authState.token && <Route exact component={Account} path="/:id/account"  />} */}
                <Route exact path="/:id/account">{authState.token ? <Account/> : <Login />}</Route>
                <Route exact path="/:id/appointments">{authState.token ? <Appointments/> : <Login />}</Route>
                {/* {authState.token && <Route exact component={Appointments} path="/:id/appointments"  />} */}
            </Switch>
    </div>
}
export default Pages