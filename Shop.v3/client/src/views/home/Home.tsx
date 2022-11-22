import React, { useEffect } from 'react'
import { useAppDispatch } from '../../app/hooks';
import Commercials from '../../components/commercials/Commercials';
import Navbar from '../../components/navbar/Navbar';
import Slider from '../../components/slider/Slider';
import SpecialOffers from '../../components/specialOffers/SpecialOffers';
import Sidenav from '../../components/storenav/Storenav';
import { getUserByCookie } from '../../features/user/userAPI';

const Home = () => {
  
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getUserByCookie());
  },[])

  return (
    <div className='home'>
      <Slider />
      <p>לשיחה עם נציג מכירות 8336*</p>
      <p>א׳-ה׳ 09:00-17:00</p>
      <Commercials />
      <SpecialOffers />
    </div>
  )
}

export default Home;