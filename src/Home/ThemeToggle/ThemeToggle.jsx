// ThemeToggle.js
import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {

    const setDarkMode = ()=>{
        document.querySelector('body').setAttribute('data-theme', 'dark')
    }
    const setLightMode = ()=>{
        document.querySelector('body').setAttribute('data-theme', 'light')
    }
    const toggleTheme = e =>{
        if (e.target.checked) {
            setDarkMode()
        }else{
            setLightMode()
        }
    }

  return (
    <div className="flex items-center">
      <span className="text-gray-500">Light</span>
      <label className="flex items-center ml-2">
        <input
          type="checkbox"
          className="toggle toggle-primary"
          onChange={toggleTheme}
        />
        <span className="toggle-mark"></span>
      </label>
      <span className="text-gray-500 ml-2">Dark</span>
    </div>
  );
};

export default ThemeToggle;
