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
import BookingInfo from './Booking/Info'

const Pages = () => {
    const {authState} = useAuthContext()
    return authState.token ? (
        <Switch>
        <Route component={Services} path="/services"  />
        <Route component={Professionals} path="/professionals"  />
        <Route component={Slots} path="/slots"  />
        <Route component={Questions} path="/questions"  />
        <Route component={BookingInfo} path="/info"  />
        <Route component={Summary} path="/summary"  />
        <Route component={Confirmation} path="/confirmation"  />
        </Switch>
    ) : (
        <Switch>
        <Route component={Services} path="/services"  />
        <Route component={Professionals} path="/professionals"  />
        <Route component={Slots} path="/slots"  />
        <Route component={Questions} path="/questions"  />
        <Route component={Summary} path="/summary"  />
        <Route component={Confirmation} path="/confirmation"  />
        <Route component={Register} path="/register"  />
        <Route component={Login}  />
    </Switch>
    )
}
export default Pages