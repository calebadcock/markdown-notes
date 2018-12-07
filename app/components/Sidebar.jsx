import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../css/components/sidebar.css';
import { getNotes } from '../actions/users';
import { manualLogin, logout } from '../actions/users';
import { isClient } from '../../config/app';
import moment from 'moment';

const GoogleLogin = isClient ? require('react-google-login').GoogleLogin : undefined;
const GoogleLogout = isClient ? require('react-google-login').GoogleLogout : undefined;

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
    if (this.props.signedIn) this.props.getNotes();
  }

  /**
   * Google login button
   * @return {any}
   */
  getLoginButton = () => {
    return GoogleLogin && (
      <GoogleLogin
        clientId={window.GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={(response) => {
          this.props.manualLogin({
            email: response.profileObj.email, googleId: response.googleId
          });
        }}
        onFailure={(response) => {
          console.log(response);
        }}
      />
    );
  };

  /**
   * Google logout button
   * @return {any}
   */
  getLogoutButton = () => {
    return (
      <button className={styles.btnLogout} onClick={this.props.logout}>
        Logout
      </button>
    );
  };

  /**
  * @return {*}
  *
  */
  render() {
    const { signedIn, notes } = this.props;
    return (
        <div className={styles.sidebar}>
          {signedIn &&
              <div className={styles.notesContainer}>
              { notes.map( (note) =>
                    <div className={styles.note}
                            key={note.id}
                            data-id={note.id}
                            onClick={() => this.props.action(note)}>
                        <p className={styles.title}>{ note.text }</p>
                        <span>{ moment(note.updatedAt).calendar()}</span>
                    </div>
                )}
              </div>
          }
          {!signedIn &&
            <div className={styles.containerLogin}>
              <h2>Log in to save notes</h2>
              { this.getLoginButton() }
            </div>
          }
          { signedIn &&
          <div className={styles.containerLogin}>
            { this.getLogoutButton() }
          </div>
          }
        </div>
    );
  }
}

Sidebar.propTypes = {
  getNotes: PropTypes.func,
  manualLogin: PropTypes.func,
  logout: PropTypes.func,
  notes: PropTypes.array,
  signedIn: PropTypes.bool
};

const mapStateToProps = ({ notes, user }) => {
  return { notes: notes.values, signedIn: user.authenticated };
};
export default connect(mapStateToProps, {getNotes, manualLogin, logout})(Sidebar);
