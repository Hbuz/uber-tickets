import React, { PureComponent } from 'react';
import store from './store'
import {Provider} from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import LoginFormContainer from './components/LoginFormContainer'

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <div>
        <Route exact path="/login" component={LoginFormContainer} />
        <Route exact path="/" render={ () => <Redirect to="/login" /> } />
        </div>
      </Provider>
    );
  }
}

export default App;

