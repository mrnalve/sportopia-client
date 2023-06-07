import React from 'react';
import Banner from '../Banner/Banner';
import { Toaster } from 'react-hot-toast';

const Home = () => {
    return (
        <>
           <Banner></Banner> 
           <Toaster/>
        </>
    );
};

export default Home;