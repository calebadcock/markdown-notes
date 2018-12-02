import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../css/main.css';
import { isClient } from '../../config/app';

const cx = classNames.bind(styles);

if (isClient) {
  require('!style-loader!css-loader!../css/overrides.css');
}


/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 *
 * A better explanation of react-router is available here:
 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
 */
const App = ({ children }) => {
  return (
    <div className={styles.app}>
      {children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.object
};

export default App;
