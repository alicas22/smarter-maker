import { useSelector } from 'react-redux';
import SplashPageNav from '../SplashPageNav';

function SplashPage(){
    const sessionUser = useSelector(state => state.session.user);

    return (
        <SplashPageNav />
    )
}
export default SplashPage;
