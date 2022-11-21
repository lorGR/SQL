import React, { useEffect } from 'react'
import { useAppDispatch } from '../../app/hooks';
import Navbar from '../../components/navbar/Navbar';
import Sidenav from '../../components/storenav/Storenav';
import { getUserByCookie } from '../../features/user/userAPI';

const Home = () => {
  
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const allCookies = document.cookie;
        if(allCookies.length > 0) {
            dispatch(getUserByCookie());
        }
  },[])

  return (
    <div className='home'>
      home
    </div>
  )
}

export default Home;