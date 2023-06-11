import React from 'react';
import Banner from '../Banner/Banner';
import { Toaster } from 'react-hot-toast';
import PopularClasses from '../PopularClasses/PopularClasses';
import PopularInstructor from '../PupularInstructor/PopularInstructor';
import SportopiaHighlight from '../SportopiaHighlight/SportopiaHighlight';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const Home = () => {
    return (
        <>
           <Banner></Banner> 
           <Toaster/>
           <PopularClasses></PopularClasses>
           <PopularInstructor></PopularInstructor>
           <SportopiaHighlight/>
        </>
    );
};

export default Home;