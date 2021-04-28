import React from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhoneAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux.js';

import styles from './Post.module.scss';

const Component = ({className, allPosts}) => {

  let { id } = useParams();
  const findPost = allPosts.find(el => el.id === id);

  return (
    <div className={clsx(className, styles.root)}>
      <Typography variant='h4' className={styles.title}>
        Post
      </Typography>
      <Grid align="center">
        <Grid item align="left" xs={12} sm={9}>
          <Paper className={styles.container}>
            <Grid className={styles.adHeader}>
              <Typography variant="h4">
                Tytuł: {findPost.title}
              </Typography>
              <Typography variant="h6">
                Cena: {findPost.price}$
              </Typography>
            </Grid>
            <Grid className={styles.adContent}>
              <Paper>
                <Typography className={styles.contentText}>
                Text: {findPost.content}
                </Typography>
              </Paper>
              <Grid>
                <div className={styles.imageBox}>
                  {/* <img src={`'${findPost.photo}'`} alt='title'/> */}
                  <img src='https://placeimg.com/640/480/nature/1' alt='title'/>
                </div>
              </Grid>
            </Grid>
            <Paper className={styles.adInfo}>
              <Grid>
                <Typography variant="h6">
                  Contact:
                </Typography>
                <FontAwesomeIcon icon={faEnvelope} className={styles.icon}/>Email: {findPost.email} <br/>
                <FontAwesomeIcon icon={faPhoneAlt} className={styles.icon}/>Phone: {findPost.phone} <br/>
                <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon}/>Location: {findPost.location}
              </Grid>
              <Grid className={styles.status}>
                <Typography variant='body2'>Status: {findPost.status}</Typography>
                <Typography variant='body2'>Publication: {findPost.datePublication}</Typography>
                <Typography variant='body2'>Updated: {findPost.dateLastUpdate}</Typography>
              </Grid>
            </Paper>
          </Paper>
        </Grid>
      </Grid>
      <Button component={Link} to={`/post/${findPost.id}/edit`} variant="contained" className={styles.button}>
          Edit post
        <FontAwesomeIcon icon={faEdit} className={styles.icon}/>
      </Button>
    </div>
  );

};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  allPosts: PropTypes.array,
};

const mapStateToProps = (state) => ( {
  allPosts: getAll(state),
} );

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};
