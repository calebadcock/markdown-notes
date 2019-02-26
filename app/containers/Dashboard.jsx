import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../css/containers/dashboard.css';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';

const cx = classNames.bind(styles);
/**
 * Container for the notes
 */
class Dashboard extends Component {
    /**
     * Sets the initial state of the Notes page
     * @param {Object} props
     */
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleChange = (e) => {
        this.setState({ text: e.target.value });
    };

    /**
    * Renders notes container
    * @return {*}
    */
    render() {
        return (
          <div>
            <Navbar/>
            <div className={styles.content}>
              <Sidebar/>
              <div className={styles.wrapperContent}>
                <div className={styles.container}>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

Dashboard.propTypes = {
};

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps)(Dashboard);
