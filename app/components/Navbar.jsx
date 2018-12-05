import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../css/components/navbar.css';

const cx = classNames.bind(styles);

/**
* Navbar component
*
*/
class Navbar extends Component {
    /**
    * @return {*}
    *
    */
    render() {
        const { signedIn } = this.props;

        return (
            <div className={styles.navbar}>
                <h2 className={styles.title}>Markdown Notes</h2>
                { signedIn &&
                    <div>
                        <a className={styles.navButton} onClick={() => this.props.newNote()}>Create Note</a>
                    </div>
                }
            </div>
        );
    }
}

Navbar.propTypes = {
    signedIn: PropTypes.bool
}

const mapStateToProps = ({ user }) => {
  return { signedIn: user.authenticated };
};

export default connect(mapStateToProps, {})(Navbar);
