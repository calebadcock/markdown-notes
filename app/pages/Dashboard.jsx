import React, { Component } from 'react';
import Page from '../pages/Page';
import NotesContainer from '../containers/Dashboard';

/**
 * Page component for Dashboard screen
 * @return {*}
 */
class Dashboard extends Component {
  getMetaData = () => {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  };

  pageTitle = () => {
    return 'Dashboard | React';
  };

  pageMeta = () => {
    return [];
  };

  pageLink = () => {
    return [];
  };

  /**
   * Renders page with Dashboard container
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

export default Dashboard;
