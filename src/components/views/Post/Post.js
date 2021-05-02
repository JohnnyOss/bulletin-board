import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhoneAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { fetchPost, getPost } from '../../../redux/postsRedux.js';

import styles from './Post.module.scss';

class Component extends React.Component {

  componentDidMount() {
    const { fetchOnePost } = this.props;
    fetchOnePost();
  }

  render() {
    const { className, user, post } = this.props;

    return(
      <div className={clsx(className, styles.root)}>
        <Grid align="center">
          <Grid item align="left" xs={12} sm={9}>
            <Typography variant='h4' className={styles.title}>
              <br></br>
            </Typography>
            <Paper className={styles.container}>
              <Grid className={styles.adHeader}>
                <Typography variant="h4">
                  {post.title}
                </Typography>
                <Typography variant="h6">
                  Price: {post.price}$
                </Typography>
              </Grid>
              <Grid className={styles.adContent}>
                <Paper>
                  <Typography className={styles.contentText}>
                    {post.content}
                  </Typography>
                </Paper>
                <Paper>
                  <div className={styles.imageBox}>
                    {/* <img src={`'${post.photo}'`} alt='title'/> */}
                    <img src='https://placeimg.com/640/480/nature/1' alt='title'/>
                  </div>
                </Paper>
              </Grid>
              <Paper className={styles.adInfo}>
                <Grid>
                  <Typography variant="h6">
                    Contact:
                  </Typography>
                  <FontAwesomeIcon icon={faEnvelope} className={styles.icon}/>Email: {post.author} <br/>
                  <FontAwesomeIcon icon={faPhoneAlt} className={styles.icon}/>Phone: {post.phone} <br/>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon}/>Location: {post.location}
                </Grid>
                <Grid className={styles.status}>
                  <Typography variant='body2'>Status: {post.status}</Typography>
                  <Typography variant='body2'>Publication: {post.datePublication}</Typography>
                  <Typography variant='body2'>Updated: {post.dateLastUpdate}</Typography>
                </Grid>
              </Paper>
            </Paper>
          </Grid>
        </Grid>
        {user.active === true
          ?
          <Button component={Link} to={`/post/${post._id}/edit`} variant="contained" className={styles.button}>
            Edit post
            <FontAwesomeIcon icon={faEdit} className={styles.icon}/>
          </Button>
          :
          null
        }
      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  post: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  user: PropTypes.object,
  fetchOnePost: PropTypes.func,
};

const mapStateToProps = (state, props) => ( {
  post: getPost(state),
  user: state.user,
} );

const mapDispatchToProps = (dispatch, props) => ({
  fetchOnePost: () => dispatch(fetchPost(props.match.params.id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};
