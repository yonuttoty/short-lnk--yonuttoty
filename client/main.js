import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { routes, onAuthChange } from './../imports/routes/routes';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import '../imports/startup/simple-schema-configuration';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

// Stateless Functional Components

Meteor.startup(() => {
  Session.set('showVisible', true);
  ReactDOM.render(routes, document.getElementById('app'));
});
