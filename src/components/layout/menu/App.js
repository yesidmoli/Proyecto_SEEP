// App.js
import React, { useState, useRef, Fragment } from 'react';
import Burger from './Burger';
import Menu from './Menu';
import './style.css';

const Apps = () => {
  const [open, setOpen] = useState(false);
  const node = useRef();

  return (
    <Fragment>
    <div className='menu-haburguesa'>
    <div>
      <div ref={node}>
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} />
      </div>
    </div>
    </div>
    </Fragment>
  );
};

export default Apps;
