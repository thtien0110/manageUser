import './App.css';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import Home from './components/Home';
import UserList from './components/UserList';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import Store from './redux/Store';

function App() {
  return (
    <Provider store={ Store }>
      <div className="App">
        <BrowserRouter>
          <div className='header'>
            <Link to={ '/user' } className='link'>Manager User</Link>
          </div>
          <Routes>
            <Route path='/' element={ <Home></Home> }></Route>
            <Route path='/user' element={ <UserList></UserList> }></Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </div>
    </Provider>
  );
}

export default App;
