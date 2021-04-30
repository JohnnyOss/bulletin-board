import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import NativeSelect from '@material-ui/core/NativeSelect';

import { connect } from 'react-redux';
import { getStatus, loadStatusUser } from '../../../redux/usersRedux';


import styles from './RoleSwitcher.module.scss';


class Component extends React.Component {
  state = {
    user: {
      active: true,
    },
  };

  handleOnChange = (event) => {
    const { userActiveChange } = this.props;
    const { user } = this.state;

    if(event === 'true') {
      user.active = true;
      userActiveChange(user);
    } else {
      user.active = false;
      userActiveChange(user);
    }
  };

  render() {
    const {className} = this.props;

    return(
      <div>
        <div className={clsx(className, styles.root)}>
          <NativeSelect name="statusUser" id="isLogged" onChange={(event) => this.handleOnChange(event.target.value)} className={styles.select}>
            <option value="true">Logged user</option>
            <option value="false">Unlogged user</option>
            <option value="true">Admin</option>
          </NativeSelect>
        </div>
      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  setStatusUser: PropTypes.func,
  user: PropTypes.object,
  userActiveChange: PropTypes.func,
};

const mapStateToProps = state => ({
  user: getStatus(state),
});

const mapDispatchToProps = dispatch => ({
  userActiveChange: (user) => dispatch(loadStatusUser(user)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Switcher,
  Container as RoleSwitcher,
  Component as RoleSwitcherComponent,
};
