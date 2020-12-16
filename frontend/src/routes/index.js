import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "../services/auth";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Posts from "../pages/Posts";
import Post from "../pages/Posts/Post";
import NewPost from "../pages/Posts/NewPost";
import EditPost from "../pages/Posts/EditPost";
import NotFound from "../pages/NotFound";
import About from "../pages/About";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                )
        }
    />
);

const Routes = () => (
    <BrowserRouter>

        <div className="container">
            <Header />
            <Navbar />
        </div>

        <Switch>
            <Route exact path="/" component={() => <Home />} />
            <Route path="/about" component={() => <About /> } />
            <Route path="/login" component={() => <Login />} />
            <Route path="/register" component={() => <Register />} />
            <PrivateRoute path="/posts/new" component={() => <NewPost />} />  
            <PrivateRoute path="/posts/:id/edit" component={() => <EditPost />} />
            <Route path="/posts/:id" component={() => <Post />} />
            <Route path="/posts" component={() => <Posts/>} /> 
            <Route path="*" component={() => <NotFound />} />
        </Switch>

        <Footer />
    </BrowserRouter>
);

export default Routes;
