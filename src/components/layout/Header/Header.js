import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typograhy from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAd, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';


import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Header.module.scss';

const Component = ({className, children}) => (
  <div className={clsx(className, styles.root)}>
    <AppBar>
      <Toolbar className={styles.toolbar}>
        <Typograhy variant='h5'>
          <Link to={'/'} className={styles.logo}>Bulletin Board</Link>
        </Typograhy>
        <div>
          <Button variant="contained" href="#" className={styles.buttons}>
            My ads
            <FontAwesomeIcon icon={faAd} className={styles.icon}/>
          </Button>
          <Button variant="contained" href="#" className={styles.buttons}>
            Logout
            <FontAwesomeIcon icon={faSignOutAlt} className={styles.icon}/>
          </Button>
          <Button variant="contained" href="https://google.com" className={styles.buttons}>
            Login
            <FontAwesomeIcon icon={faUser} className={styles.icon}/>
          </Button>
        </div>
      </Toolbar>
    </AppBar>
    <Toolbar />
    {children}
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Header,
  // Container as Header,
  Component as HeaderComponent,
};
