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
        return (
            <div className={styles.navbar}>
                <h2 className={styles.title}>Dashboard</h2>
            </div>
        );
    }
}

export default Navbar;
