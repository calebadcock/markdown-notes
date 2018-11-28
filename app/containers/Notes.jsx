import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../css/containers/notes.css';
import Navbar from '../components/Navbar.jsx';
import ReactMarkdown from 'react-markdown';

const cx = classNames.bind(styles);
/**
 * Container for the notes
 */
class Notes extends Component {
    /**
     * Sets the initial state of the Notes page
     * @param {Object} props
     */
    constructor(props) {
        super(props);
        this.state = {
            text: `# Welcome!`
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
                <Navbar />
                <textarea onChange={this.handleChange} value={this.state.text}></textarea>
                <ReactMarkdown source={this.state.text} />
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
