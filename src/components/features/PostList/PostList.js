import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './PostList.module.scss';

class Component extends React.Component {
  render() {
    const {className, postsList} = this.props;
    return (
      <div className={clsx(className, styles.root)}>
        <Typography variant='h4' className={styles.title}>
          Post Board
        </Typography>
        <TableContainer component={Paper} className={styles.table}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={styles.tableHeader}>Title</TableCell>
                <TableCell className={styles.tableHeader}>Description</TableCell>
                <TableCell className={styles.tableHeader}>Location</TableCell>
                <TableCell className={styles.tableHeader}>Date of publication</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {postsList.map(post => (
                <TableRow key={post.id}>
                  <TableCell component="th" scope="row">
                    <Link to={`/post/${post.id}`} className={styles.titleLink}>{post.title}</Link>
                  </TableCell>
                  <TableCell>{post.content}</TableCell>
                  <TableCell>{post.location}</TableCell>
                  <TableCell>{post.datePublication}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button component={Link} to={'/post/add'} variant="contained" className={styles.addButton}>
          Add new ad
          <FontAwesomeIcon icon={faPlus} className={styles.icon}/>
        </Button>
      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  postsList: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

const mapStateToProps = state => ({
  postsList: getAll(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as PostList,
  Container as PostList,
  Component as PostListComponent,
};
