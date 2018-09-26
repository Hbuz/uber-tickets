// import React, { PureComponent } from 'react';
import React, { Component } from 'react';
import store from './store'
import {Provider} from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import LoginFormContainer from './components/login/LoginFormContainer'
import SignupFormContainer from './components/signup/SignupFormContainer'
import EventsContainer from './components/events/EventsContainer'
import TicketsContainer from './components/tickets/TicketsContainer'
import TicketDetails from './components/tickets/TicketDetails'
import TicketEditFormContainer from './components/tickets/TicketEditFormContainer'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
        <Route exact path="/login" component={LoginFormContainer} />
        <Route exact path="/signup" component={SignupFormContainer} />
        <Route exact path="/events" component={EventsContainer} />
        <Route exact path="/events/:idEvent/tickets" component={TicketsContainer} />
        <Route exact path="/events/:idEvent/tickets/:idTicket/details" component={TicketDetails} />
        <Route exact path="/events/:idEvent/tickets/:idTicket/edit" component={TicketEditFormContainer} />
        <Route exact path="/" render={ () => <Redirect to="/events" /> } />
        </div>
      </Provider>
    );
  }
}

export default App;

