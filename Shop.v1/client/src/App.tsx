import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/home/Home';
import Main from './views/main/Main';
import Products from './views/products/Products';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} >
            <Route index element={<Home />} />
            <Route path="/mac_store" element={<Products storeType='Mac'/>} />
            <Route path="/iphone_store" element={<Products storeType='iPhone' />} />
            <Route path="/ipad_store" element={<Products storeType='iPad'/>} />
            <Route path="/apple_watch_store" element={<Products storeType='Apple Watch'/>} />
            <Route path="/air_pods_store" element={<Products storeType='Air Pods'/>} />
            <Route path="/air_tag_store" element={<Products storeType='Air Tag'/>} />
            <Route path="/apple_tv_store" element={<Products storeType='Apple Watch' />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
