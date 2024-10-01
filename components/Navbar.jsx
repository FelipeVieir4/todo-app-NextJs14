import React from 'react';

const Navbar = ()=>{
    return(
        <div className='flex py-3 flex-wrap justify-around'>
            <h1 className='text-lg font-semibold'>Todo APP</h1>
            <ul className='flex gap-[40px] text-m'>
                <l1>Home</l1>
                <l1>Products</l1>
                <l1>About</l1>
                <l1>Contact</l1>
            </ul>
        </div>
    )
}

export default Navbar