import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../css/containers/notes.css';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import ReactMarkdown from 'react-markdown';
import { updateNote } from '../actions/users';
import Mousetrap from 'mousetrap';


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

    /**
     * Invoked once, setup mousetrap for keyboard shortcuts
     */
    componentDidMount() {
        Mousetrap.bind(['command+s', 'ctrl+s'], () => {
            if (this.state.note.id) {
                this.props.updateNote(this.state.note.id, this.state.note.text);
            }
        });
    }

    handleChange = (newValue) => {
        const { note } = this.state;
        note.text = newValue;
        this.setState({ note });
        console.log(note);
        if (this.state.note.id) {
            if (this.state.typing) {
                clearTimeout(this.state.typing);
            }

            this.setState({
                typing: setTimeout( () => {
                    this.props.updateNote(note.id, note.text);
                }, 5000)
            });
        }
    };

    newNote = () => {
        // TODO: create new note with template text
        // TODO: set state with new note
    }

    handler = (note) => {
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
                <Navbar newNote={this.newNote} />
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
