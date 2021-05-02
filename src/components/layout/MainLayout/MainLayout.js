import React from 'react';
import PropTypes from 'prop-types';
import { Header } from '../Header/Header';

import clsx from 'clsx';

import styles from './MainLayout.module.scss';

const Component = ({className, children}) => (
  <div className={clsx(className, styles.root)}>
    <div className={styles.container}>
      <Header />
      {children}
    </div>
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as MainLayout,
  // Container as Mainlayout,
  Component as MainLayoutComponent,
};
