import React from 'react';
import Banner from '../Banner/Banner';
import { Toaster } from 'react-hot-toast';
import PopularClasses from '../PopularClasses/PopularClasses';

const Home = () => {
    return (
        <>
           <Banner></Banner> 
           <Toaster/>
           <PopularClasses></PopularClasses>
        </>
    );
};

export default Home;