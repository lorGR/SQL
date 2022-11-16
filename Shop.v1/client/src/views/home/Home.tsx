import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import Sidenav from '../../components/sidenav/Sidenav';

const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <Sidenav />
    </div>
  )
}

export default Home;