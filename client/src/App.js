import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import { Grid } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"
function App() {
	return (
		<Router>
			<React.Fragment>
				<Grid container direction="column" justify="center">
					<Grid item xs={12}>
						<Navbar  />
					</Grid>
					<Grid item>
						
            <Switch>
			<Route exact path="/" component={Landing} />
            <Route exact path ="/login" component={Login}/>
            <Route exact path ="/register" component={Register}/>
            <Route path="/" render ={()=><div>Page Not found  </div>}/>
            </Switch>
					</Grid>
				</Grid>
			</React.Fragment>
		</Router>
	);
}

export default App;
