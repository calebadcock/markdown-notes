import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../css/containers/notes.css';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import ReactMarkdown from 'react-markdown';
import { updateNote } from '../actions/users';


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
            note: {
                id: null,
                text: '# Welcome'
            },
            typing: 0
        };
    }

    handleChange = (newValue) => {
        const { note } = this.state;
        note.text = newValue;
        this.setState({ note });
        console.log(this.state.note.id);
        if (this.state.note.id) {
            if (this.state.typing) {
                clearTimeout(this.state.typing);
            }

            this.setState({
                typing: setTimeout( () => {
                    console.log('update in database');
                    this.props.updateNote(note.id, note.text);
                }, 5000)
            });
        }
    };

    handler = (note) => {
        console.log(note)
        this.setState({
            note
        });
    }

    /**
    * Renders notes container
    * @return {*}
    */
    render() {
        const { note } = this.state;
        return (
            <div>
                <Navbar />
                <div className={styles.content}>
                <Sidebar action={this.handler}/>
                <div className={styles.container}>
                  <div className={styles.wrapper}>
                    <textarea className={styles.txtRaw} onChange={(e) => this.handleChange(e.target.value)} value={note.text}/>
                  </div>
                  <div className={styles.wrapper}>
                    <ReactMarkdown className={styles.preview} source={note.text} />
                  </div>
                </div>
                </div>
            </div>
        );
    }
}

Notes.propTypes = {
    updateNote: PropTypes.func
};

const mapStateToProps = ({ notes }) => {
  return { notes };
};

export default connect(mapStateToProps, { updateNote })(Notes);
