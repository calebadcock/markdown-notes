import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../css/containers/notes.css';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import ReactMarkdown from 'react-markdown';
import { updateNote, newNote } from '../actions/users';
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
                text: '# Welcome to Markdown Notes\n### This is a playground for writing markdown\nSign in and click **Create Note** to start editing a saved note!'
            },
            typing: 0
        };
        this.rawNote = React.createRef();
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

    /**
     * Invoked when component is updated
     */
    componentDidUpdate(oldProps) {
        if (oldProps.notes.note !== this.props.notes.note) {
            const note = this.props.notes.note;
            this.setState({ note });
        }
        if (oldProps.signedIn !== this.props.signedIn && !this.props.signedIn) {
            this.setState({ note: {
                id: null,
                text: '# Welcome to Markdown Notes\n### This is a playground for writing markdown\nSign in and click **Create Note** to start editing a saved note!'
            }});
        }
    }

    handleChange = (newValue) => {
        const { note } = this.state;
        note.text = newValue;
        this.setState({ note });
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
        const text = '# Welcome to your new note!\n### Start typing to edit your note';
        this.props.newNote(text);
    }

    handler = (note) => {
        this.setState({ note });
    };

    highlightText = (start, end) => {
      const rawText = this.rawNote.current;
      rawText.selectionStart = start;
      rawText.selectionEnd = end;
      rawText.focus();
    };

    getSelectedText = () => {
      const { note } = this.state;
      const rawText = this.rawNote.current;
      const start = rawText.selectionStart;
      const end = rawText.selectionEnd;
      const before = note.text.substring(0, start);
      const selection = note.text.substr(start, end - start);
      const after = note.text.substr(end, note.text.length - end);
      return { note, before, selection, after, start, end };
    };

    boldMod = (e) => {
      e.preventDefault();
      const { note, before, selection, after, start, end } = this.getSelectedText();
      note.text = `${before}**${selection}**${after}`;
      this.setState({
        note
      }, () => this.highlightText(start + 2, end + 2));
    };

    italicMod = (e) => {
      e.preventDefault();
      const { note, before, selection, after, start, end } = this.getSelectedText();
      note.text =`${before}*${selection}*${after}`;
      this.setState({
        note
      }, () => this.highlightText(start + 1, end + 1));
    };

    strikethroughMod = (e) => {
      e.preventDefault();
      const { note, before, selection, after, start, end } = this.getSelectedText();
      note.text =`${before}~~${selection}~~${after}`;
      this.setState({
        note
      }, () => this.highlightText(start + 2, end + 2));
    };

    headerMod = (e) => {
      e.preventDefault();
      let { note, before, selection, after, start, end } = this.getSelectedText();
      let additions = 2;
      if (before.length > 1 && before.substr(before.length - 2, before.length) === '# ') {
        before = before.substr(0, before.length - 2) + '#';
        additions = 1;
      }
      note.text = `${before}# ${selection}${after}`;
      this.setState({
        note
      }, () => this.highlightText(start + additions, end + additions));
    };

    codeMod = (e) => {
      e.preventDefault();
      let { note, before, selection, after, start, end } = this.getSelectedText();
      if (selection === '') {
        selection = '\n```\n\n```\n';
        note.text = `${before}${selection}${after}`;
        this.setState({
          note
        }, () => this.highlightText(start + 5, start + 5));
      } else {
        const tick = '`';
        note.text = `${before}${tick}${selection}${tick}${after}`;
        this.setState({
          note
        }, () => this.highlightText(start + 1, end + 1));
      }
    };

    numberedListMod = (e) => {
      e.preventDefault();
      const { note, before, selection, after, start } = this.getSelectedText();
      note.text = `${before}1. ${selection}${after}`;
      this.setState({
        note
      }, () => this.highlightText(start + 3, start + 3));
    };

    bulletListMod = (e) => {
      e.preventDefault();
      const { note, before, selection, after, start } = this.getSelectedText();
      note.text = `${before}* ${selection}${after}`;
      this.setState({
        note
      }, () => this.highlightText(start + 2, start + 2));
    };

    linkMod = (e) => {
      e.preventDefault();
      const { note, before, selection, after, start } = this.getSelectedText();
      if (selection === '') {
        note.text = `${before}[text](url)${selection}${after}`;
        this.setState({
          note
        }, () => this.highlightText(start + 1, start + 5));
      } else if (/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9\-]+([\-\.]{1}[a-z0-9\-]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(selection)) {
        note.text = `${before}[text](${selection})${after}`;
        this.setState({
          note
        }, () => this.highlightText(start + 1, start + 5));
      } else {
        note.text = `${before}[${selection}](url)${after}`;
        this.setState({
          note
        }, () => this.highlightText(start + selection.length + 3, start + selection.length + 6));
      }
    };

    handleKeyPress = (e) => {
      const { note, before, selection, after, start, end } = this.getSelectedText();
      if (e.keyCode === 9) {
        e.preventDefault();
        note.text = `${before}\t${selection}${after}`;
        this.setState({ note }, () => this.highlightText(start + 1, end + 1));
      } else if (e.keyCode === 13 && selection === '') {
        const lines = before.split('\n');
        if (lines.length > 0 && /^\d.\s/.test(lines[lines.length - 1])) {
          e.preventDefault();
          const previousNum = parseInt(lines[lines.length - 1].substr(0, 1), 0);
          note.text = `${before}\n${previousNum + 1}. ${selection}${after}`;
          this.setState({
            note
          }, () => this.highlightText(start + 4, start + 4));
        } else if (lines.length > 0 && /^\*\s/.test(lines[lines.length - 1])) {
          e.preventDefault();
          note.text = `${before}\n* ${selection}${after}`;
          this.setState({
            note
          }, () => this.highlightText(start + 3, start + 3));
        }
      } else if (e.which === 19 || (String.fromCharCode(event.which).toLowerCase() === 's' && e.ctrlKey)) {
        // Control+s or Cmd+s captured
        e.preventDefault();
        if (this.state.note.id) {
            this.props.updateNote(this.state.note.id, this.state.note.text);
        } else if (this.props.signedIn) {
            this.props.newNote(this.state.note.text);
        }
      } else if (String.fromCharCode(event.which).toLowerCase() === 'b' && (e.ctrlKey || e.metaKey)) {
        this.boldMod(e);
      } else if (String.fromCharCode(event.which).toLowerCase() === 'h' && (e.ctrlKey || e.metaKey)) {
        this.headerMod(e);
      } else if (String.fromCharCode(event.which).toLowerCase() === 'i' && (e.ctrlKey || e.metaKey)) {
        this.italicMod(e);
      } else if (String.fromCharCode(event.which).toLowerCase() === 'n' && (e.ctrlKey || e.metaKey)) {
        this.numberedListMod(e);
      } else if (String.fromCharCode(event.which).toLowerCase() === 'm' && (e.ctrlKey || e.metaKey)) {
        this.bulletListMod(e);
      } else if (String.fromCharCode(event.which).toLowerCase() === 'j' && (e.ctrlKey || e.metaKey)) {
        this.strikethroughMod(e);
      } else if (String.fromCharCode(event.which).toLowerCase() === 'k' && (e.ctrlKey || e.metaKey)) {
        this.codeMod(e);
      } else if (String.fromCharCode(event.which).toLowerCase() === 'l' && (e.ctrlKey || e.metaKey)) {
        this.linkMod(e);
      }
    };

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
                  <Sidebar action={this.handler} clearState={this.clearState}/>
                  <div className={styles.wrapperContent}>
                    <div className={styles.containerTools}>
                      <button className={styles.btnTool} onClick={this.boldMod}><b>B</b></button>
                      <button className={styles.btnTool} onClick={this.italicMod}><i>I</i></button>
                      <button className={styles.btnTool} onClick={this.strikethroughMod}><s>S</s></button>
                      <button className={styles.btnTool} onClick={this.headerMod}>H</button>
                      <button className={styles.btnTool} onClick={this.linkMod}>L</button>
                      <button className={styles.btnTool} onClick={this.codeMod}>&lt;/&gt;</button>
                      <button className={styles.btnTool} onClick={this.numberedListMod}>1.</button>
                      <button className={styles.btnTool} onClick={this.bulletListMod}>*</button>
                    </div>
                    <div className={styles.container}>
                      <div className={styles.wrapper}>
                        <textarea ref={this.rawNote} onKeyDown={this.handleKeyPress} className={styles.txtRaw} onChange={(e) => this.handleChange(e.target.value)} value={note.text}/>
                      </div>
                      <div className={styles.wrapper}>
                        <ReactMarkdown className={styles.preview} source={note.text} />
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        );
    }
}

Notes.propTypes = {
    updateNote: PropTypes.func,
    newNote: PropTypes.func,
    note: PropTypes.object,
    signedIn: PropTypes.bool

};

const mapStateToProps = ({ notes, user }) => {
  return { notes, signedIn: user.authenticated };
};

export default connect(mapStateToProps, { updateNote, newNote })(Notes);
