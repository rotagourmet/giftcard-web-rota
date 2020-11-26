import React, { Component, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import './helpers/Firebase';
import AppLocale from './lang';
import NotificationContainer from './components/common/react-notifications/NotificationContainer';
// import { isMultiColorActive, isDemo } from './constants/defaultValues';
import { getDirection } from './helpers/Utils';
import UserLayout from './layout/UserLayout';

const GiftCardPage = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/giftcard.js')
);

export default class App extends Component {
  constructor(props) {
    super(props);
    const direction = getDirection();
    if (direction.isRtl) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }

  render() {
    const currentAppLocale = AppLocale['pt'];

    return (
      <div className="h-100">
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <React.Fragment>
            <NotificationContainer />
            <Suspense fallback={<div className="loading" />}>
              <Router>
                <Switch>
                <UserLayout>
                  <Route
                    path="/"
                    exact
                    render={props => <GiftCardPage {...props} />}
                  />
                  
                  </UserLayout>
                </Switch>
              </Router>
            </Suspense>
          </React.Fragment>
        </IntlProvider>
      </div>
    );
  }
}