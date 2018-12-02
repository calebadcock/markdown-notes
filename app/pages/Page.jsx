import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styles from '../css/main.css';

const Page = ({ title, link, meta, children }) => {
  return (
    <div className={styles.page}>
      <Helmet title={title} link={link} meta={meta} />
      { children }
    </div>
  );
};

Page.propTypes = {
  title: PropTypes.string,
  link: PropTypes.array,
  meta: PropTypes.array
};

export default Page;
