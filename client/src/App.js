import React ,{useEffect} from 'react';

import {GlobalStyle} from './global.styles'
import {Switch, Route, Redirect} from 'react-router-dom'
import HomePage from './pages/homepage/HomePage.component';
import ShopPage from './pages/shop/shop.component'
import SearchPage from  './pages/search/search.component'
import {default as Header} from './components/header/header.container'
import SignInAndSignUpPage from './pages/sign-in-and-signup/sign-in-and-signup.component'

import { connect } from 'react-redux';
import {checkUserSession} from './redux/user/user.actions'
import {selectCurrentUser} from './redux/user/user.selectors'
import {createStructuredSelector} from 'reselect'
import CheckoutPage from './pages/checkout/checkout.component'


const App = ({ checkUserSession, currentUser }) => {

  useEffect( () => {
    checkUserSession()
  }, [checkUserSession])
  


  
    return (
      <div>
        <GlobalStyle/>
        <Header/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/search" component={SearchPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route 
            exact 
            path="/signin" 
            render={() => 
            currentUser ? (
              <Redirect to='/'/>
            ) 
            : (
              <SignInAndSignUpPage/>
            )
          } />
        </Switch>
      </div>
    ); 
  }


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})



export default connect(mapStateToProps, mapDispatchToProps)(App);
