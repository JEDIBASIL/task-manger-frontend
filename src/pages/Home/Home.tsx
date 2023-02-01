import { Banner, Navbar, Services } from '../../components';

const Home: React.FC = () => {
    return (
        <>
            <Navbar />
            <Banner />
            <div className='banner_img'>
            </div>
            <Services />
        </>
    );
};

export default Home;
