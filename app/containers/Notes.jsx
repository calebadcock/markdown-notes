import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../css/containers/notes.css';

const cx = classNames.bind(styles);
/**
 * Container for the notes
 */
class Notes extends Component {

  /**
   * Renders notes container
   * @return {*}
   */
  render() {
    return (
      <div>
        Notes Here
      </div>
    );
  }
}

Notes.propTypes = {
};

const mapStateToProps = ({ notes }) => {
  return { notes };
};

export default connect(mapStateToProps)(Notes);
