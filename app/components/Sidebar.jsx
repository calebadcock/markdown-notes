import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../css/components/sidebar.css';

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
     * Invoked once
     */
    componentDidMount() {
    }

    /**
    * @return {*}
    *
    */
    render() {
        return (
            <div className={styles.sidebar}>
            </div>
        );
    }
}

Sidebar.propTypes = {
};

const mapStateToProps = ({ user }) => {
    return { user };
};
export default connect(mapStateToProps, {})(Sidebar);
