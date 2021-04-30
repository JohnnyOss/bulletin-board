import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAd, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';


import clsx from 'clsx';

import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Header.module.scss';
import { RoleSwitcher } from '../../features/RoleSwitcher/RoleSwitcher';

const Component = ({className, children, user}) => (
  <div className={clsx(className, styles.root)}>
    <AppBar>
      <Toolbar className={styles.toolbar}>
        <Typography variant='h5' className={styles.logoBox}>
          <Link to={'/'} className={styles.logo}>Bulletin Board</Link>
          <RoleSwitcher className={styles.switcher} />
        </Typography>
        <div className={styles.buttons}>
          {user.active === true
            ?
            <div>
              <Button component={Link} to={'/'} variant="contained" className={styles.button}>
                My ads
                <FontAwesomeIcon icon={faAd} className={styles.icon}/>
              </Button>
              <Button component={Link} to={'/'} variant="contained" className={styles.button}>
                Logout
                <FontAwesomeIcon icon={faSignOutAlt} className={styles.icon}/>
              </Button>
            </div>
            :
            <Button variant="contained" href="https://google.com" className={styles.button}>
              Login
              <FontAwesomeIcon icon={faUser} className={styles.icon}/>
            </Button>
          }
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
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: state.user,
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Header,
  Container as Header,
  Component as HeaderComponent,
};
