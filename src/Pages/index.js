import Login from './Customer/Login'
import Register from './Customer/Register'
import Services from './Booking/Services'
import Professionals from './Booking/Professionals'
import {Switch , Route, BrowserRouter, withRouter} from 'react-router-dom'
import useAuthContext from '../Hooks/useAuthContext'
import Questions from './Booking/Questions'
import Slots from './Booking/Slots'
import Confirmation from './Booking/Confirmation'
import Summary from './Booking/Summary'
import ResetPassword from './Customer/ResetPassword'
import Account from './Customer/Account'
import Appointments from './Customer/Appointments'
import {useParams} from 'react-router'

const ShopID = () => {
    let {id} = useParams();
    console.log(id)
    return (<div></div>)
  }
const Pages = () => {
    const {authState} = useAuthContext();
    console.log(authState.token)
    return <div>
        <ShopID />
            <Switch>
                <Route exact component={Services} path="/:id/services" />
                <Route component={Professionals} path="/:id/professionals"  />
                <Route component={Slots} path="/:id/slots"  />
                <Route component={Questions} path="/:id/questions"  />
                <Route component={Summary} path="/:id/summary"  />
                <Route component={Confirmation} path="/:id/confirmation"  />
                <Route component={Register} path="/:id/register" />
                <Route component={Login} path="/:id/login" />
                <Route component={ResetPassword} path="/:id/resetPassword" />
                {authState.token && <Route exact component={Account} path="/:id/account"  />}
                {authState.token && <Route exact component={Appointments} path="/:id/appointments"  />}
            </Switch>
    </div>
}
export default Pages