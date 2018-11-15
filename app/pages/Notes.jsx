import React, { Component } from 'react';
import Page from '../pages/Page';
import NotesContainer from '../containers/Notes';

/**
 * Page component for notes screen
 * @return {*}
 */
class Notes extends Component {
  getMetaData = () => {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  };

  pageTitle = () => {
    return 'Notes | Markdown Notes';
  };

  pageMeta = () => {
    return [];
  };

  pageLink = () => {
    return [];
  };

  /**
   * Renders page with notes container
   * @return {*}
   */
  render() {
    return (
      <Page {...this.getMetaData()}>
        <NotesContainer {...this.props} />
      </Page>
    );
  }
}

export default Notes;
