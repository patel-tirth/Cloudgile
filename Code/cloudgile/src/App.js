import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
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
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';
import { Manage } from './components/Manage';
import CloudgileProject from './components/Cloudgileproject';

function App() {
  const { isLoading, user } = useAuth();

  return (
    <Router>
      <Switch>
        <Route path="/signIn"><SignInForm/></Route>
        <Route path="/createAccount"><SignUpForm/></Route>
        <Route path="/confirmation/success"></Route>
        <Route path="/confirmation/failure"></Route>
        <ProtectedRoute path="/reminders"></ProtectedRoute>
        <ProtectedRoute path="/dashboard" exact isLoading={isLoading} isAuthed={!!user}><Dashboard/></ProtectedRoute>
        <ProtectedRoute path="/profile" isLoading={isLoading} isAuthed={!!user}><Profile/></ProtectedRoute>
        <ProtectedRoute path="/projects/:projectID/" isLoading={isLoading} isAuthed={!!user}></ProtectedRoute>
        <ProtectedRoute path="/projects" isLoading={isLoading} isAuthed={!!user}></ProtectedRoute>
        <ProtectedRoute path="/manage" isLoading={isLoading} isAuthed={!!user}><Manage/></ProtectedRoute>
        {/* <ProtectedRoute path="/projects/projectID/members" isLoading={isLoading} isAuthed={!!user}></ProtectedRoute> */}
        {/* <ProtectedRoute path="/projects" isLoading={isLoading} isAuthed={!!user}></ProtectedRoute> */}
        <ProtectedRoute path="/settings" isLoading={isLoading} isAuthed={!!user}><Settings/></ProtectedRoute>
        <ProtectedRoute path="/signOut" isLoading={isLoading} isAuthed={!!user}></ProtectedRoute>
        <ProtectedRoute path="/createProject" isLoading={isLoading} isAuthed={!!user}></ProtectedRoute>
        <Redirect to="/dashboard"/>
      </Switch>
    </Router>
  );
}

export default App;

