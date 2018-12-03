import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../css/components/sidebar.css';
import { getNotes } from '../actions/users';
import { isClient } from '../../config/app';

const GoogleLogin = isClient ? require('react-google-login').GoogleLogin : undefined;


const cx = classNames.bind(styles);


/**
* Navbar component
*
*/
class Sidebar extends Component {
  /**
  * Sets the initial state of the Sidebar
  * @param {Object} props
  */
  constructor(props) {
      super(props);
      this.state = {};
  }

  /**
   * Invoked once, retrieve users notes
   */
  componentDidMount() {
      this.props.getNotes();
  }

  /**
   *
   * @return {any}
   */
  getLoginButton = () => {
    return GoogleLogin && (
      <GoogleLogin
        clientId={window.GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={() => {}}
        onFailure={() => {}}
      />
    );
  };

  /**
  * @return {*}
  *
  */
  render() {
    const { signedIn } = this.props;
      return (
          <div className={styles.sidebar}>
            {!signedIn &&
              <div className={styles.containerLogin}>
                <h2>Log in to save notes</h2>
                { this.getLoginButton() }
              </div>
            }
          </div>
      );
  }
}

Sidebar.propTypes = {
  getNotes: PropTypes.func,
  notes: PropTypes.object,
  signedIn: PropTypes.bool.isRequired
};

const mapStateToProps = (notes, user) => {
  return { notes, signedIn: user.authenticated };
};
export default connect(mapStateToProps, {getNotes})(Sidebar);
