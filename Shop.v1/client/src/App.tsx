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
            <Route path="/store/:storeType" element={<Products />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
