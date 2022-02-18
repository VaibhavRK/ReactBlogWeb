import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import {Switch,Route} from 'react-router-dom';
import Details from './components/Details';
import CreatePost from './components/CreatePost';
import Footer from './components/Footer';
import UpdatePost from './components/UpdatePost';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import SupportUs from './components/SupportUs';

function App() {
  return (
    <div className='App'>
      <Header />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/details/:id' component={Details} />
      <Route exact path='/about' component={About} />
      <Route exact path='/contact' component={Contact} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/support' component={SupportUs} />
      <Route exact path='/create' component={CreatePost} />
      <Route exact path='/update/:id' component={UpdatePost} />
    </Switch>
      <Footer />
    </div>
  );
}

export default App;
