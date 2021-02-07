import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'

import {
  ProtectedRoute,
  useAuth,
} from './auth';

import 'firebase/auth'
import 'firebase/firestore'
import Dashboard from './components/Dashboard';

function App() {

  const { isLoading, user } = useAuth();

  return (
    <Router>
      <Switch>
        <Route path="/signIn"><SignInForm/></Route>
        <Route path="/createAccount"><SignUpForm/></Route>
        <Route path="/confirmation/success"></Route>
        <Route path="/confirmation/failure"></Route>
        <ProtectedRoute path="/" exact isLoading={isLoading} isAuthed={!!user}><Dashboard/></ProtectedRoute>
        <ProtectedRoute path="/profile" isLoading={isLoading} isAuthed={!!user}></ProtectedRoute>
        <ProtectedRoute path="signOut" isLoading={isLoading} isAuthed={!!user}></ProtectedRoute>
      </Switch>
    </Router>
  );
}

export default App;

