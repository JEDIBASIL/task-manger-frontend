import { Navigate } from 'react-router-dom';
import { Banner, Navbar, Services } from '../../components';
import { isAuth } from '../../utils/auth';

const Home: React.FC = () => {
    return (
        <>
            {isAuth("rqwt") ? <Navigate to={`/tasks`} />
                :
                <>
                    <Navbar />
                    <Banner />
                    <div className='banner_img'>
                    </div>
                    <Services />
                </>
            }
        </>
    );
};

export default Home;
