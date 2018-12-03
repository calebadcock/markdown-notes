import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../css/components/sidebar.css';
import { getNotes } from '../actions/users';

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
    * @return {*}
    *
    */
    render() {
        return (
            <div className={styles.sidebar}>
                Sidebar
            </div>
        );
    }
}

Sidebar.propTypes = {
    getNotes: PropTypes.func,
    notes: PropTypes.object
};

const mapStateToProps = (user) => {
    return { user };
};
export default connect(mapStateToProps, {getNotes})(Sidebar);
