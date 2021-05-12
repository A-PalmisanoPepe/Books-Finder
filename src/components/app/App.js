import "../../css/App.css";
import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {KeywordProvider} from "../../context/KeywordContext";
import {UrlProvider} from "../../context/UrlContext";
import {AuthProvider} from "../../context/AuthContext";
import {BookIdProvider} from "../../context/BookIdContext";
import Home from "./Home";
import About from "./About";
import Settings from "./Settings";
import Navbar from "./navbar/Navbar";
import Footer from "./Footer";
import Results from "./Results";
import Result from "./Result";
import Login from "../authentication/Login";
import SignIn from "../authentication/SignIn";
import ForgotPassword from "../authentication/ForgotPassword";
import UpdateProfile from "../personalArea/UpdateProfile";
import Profile from "../personalArea/Profile";
import PrivateRoute from "../personalArea/PrivateRoute";
import PersonalArea from "../personalArea/PersonalArea";
import PersonalNavbar from "../personalArea/PersonalNavbar";
import SavedBook from '../personalArea/SavedBook';

function App() {
  return (
    <KeywordProvider>
    <UrlProvider>
    <AuthProvider>
    <BookIdProvider>
      <Router>
        <div className="App">
          <Navbar/>
          <PersonalNavbar/>
          <Switch>
            {/* Authentication */}
            <Route exact path="/sign-in" component={SignIn}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/forgot-password" component={ForgotPassword}/>
            
            {/* Personal Area */}
            <PrivateRoute exact path="/update-profile" component={UpdateProfile}/>
            <PrivateRoute exact path="/profile" component={Profile}/>
            <PrivateRoute exact path="/personal-area" component={PersonalArea}/>
            <PrivateRoute exact path="/folder/:folderId" component={PersonalArea}/>
            <PrivateRoute exact path="/saved-book" component={SavedBook}/>
            
            {/* Books Finder */}
            <Route exact path="/" component={Home}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/settings" component={Settings}/>
            <Route exact path="/results" component={Results}/>
            <Route exact path="/:id" component={Result}/> 
          </Switch>
          <Footer/>
        </div>
      </Router>
    </BookIdProvider>
    </AuthProvider>
    </UrlProvider>
    </KeywordProvider>
  );
}

export default App;
