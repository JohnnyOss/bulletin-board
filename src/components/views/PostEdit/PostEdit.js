import React from 'react';
import PropTypes from 'prop-types';
import ImageUploader from 'react-images-upload';
import { NotFound } from '../NotFound/NotFound';

import clsx from 'clsx';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';
import { getPost, fetchUpdatePost } from '../../../redux/postsRedux.js';

import styles from './PostEdit.module.scss';


class Component extends React.Component {
  state = {
    post: {
      _id: this.props.postById._id,
      title: this.props.postById.title,
      content: this.props.postById.content,
      price: this.props.postById.price,
      photo: this.props.postById.photo,
      author: this.props.postById.author,
      location: this.props.postById.location,
      phone: this.props.postById.phone,
      status: this.props.postById.status,
      datePublication: this.props.postById.datePublication,
      dateLastUpdate: this.props.postById.dateLastUpdate,
    },
  }

  handleChange = (event) => {
    const { post } = this.state;
    this.setState({ post: { ...post, [event.target.name]: event.target.value } });
  };

  handleChangePrice = (event) => {
    const { post } = this.state;
    this.setState({ post: { ...post, [event.target.name]: parseInt(event.target.value) } });
  };

  submitForm = (event) => {
    event.preventDefault();
    const { post } = this.state;
    const { editPost } = this.props;

    if(post.title.length < 10) return alert('Min. 10 characters in title');
    if(post.content.length < 20) return alert('Min. 20 characters in text');
    if(post.price < 0) return alert('Wrong price');
    if(post.location.length < 0) return alert('You need to enter the location');

    if((post.title.length > 9) && (post.content.length > 19) && post.author && post.status && post.location) {
      const today = new Date();
      const dateToday = today.getFullYear() + '.' + (today.getMonth() + 1) + '.' + today.getDate();
      post.dateLastUpdate = dateToday;
      editPost(post);
      alert('Your ad has been edited');
    } else {
      alert('Please fill required fields');
    }
  }

  render () {
    const { className, user, postById } = this.props;
    return (
      <div className={clsx(className, styles.root)}>
        {user.active === true
          ?
          <div>
            <Typography variant='h4' className={styles.title}>
              Edit Your Post
            </Typography>
            <Grid align="center">
              <Grid item align="center" xs={12} sm={9}>
                <Paper>
                  <form onSubmit={this.submitForm}>
                    <Typography variant="h5" className={styles.formTitle}>
                        Fill in the form
                    </Typography>
                    <Grid item xs={11} sm={6} className={styles.formField}>
                      <TextField fullWidth required name="title" label="Title" variant="outlined" onChange={this.handleChange} defaultValue={postById.title} helperText="min. 10 characters"/>
                    </Grid>
                    <Grid item xs={11} sm={6} className={styles.formField}>
                      <TextField fullWidth defaultValue={postById.content} required name="content" label="Describe Ad" variant="outlined" onChange={this.handleChange} helperText="min. 20 characters"/>
                    </Grid>
                    <Grid item xs={11} sm={6} className={styles.formField}>
                      <TextField fullWidth defaultValue={postById.author} required name="email" label="Email" variant="outlined" onChange={this.handleChange}/>
                    </Grid>
                    <Grid item xs={11} sm={6} className={styles.formField}>
                      <FormControl>
                        <InputLabel htmlFor="age-native-helper">Status</InputLabel>
                        <NativeSelect
                          required
                          name="status"
                          onChange={this.handleChange}
                          defaultValue={postById.status}
                        >
                          <option aria-label="None" value="" />
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                          <option value="closed">Closed</option>
                        </NativeSelect>
                        <FormHelperText>Select your ad status</FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={11} sm={3} className={styles.formField}>
                      <TextField fullWidth defaultValue={postById.price} name="price" label="Price ($)" type="number" variant="outlined" onChange={this.handleChangePrice}/>
                    </Grid>
                    <Grid item xs={11} sm={3} className={styles.formField}>
                      <TextField fullWidth defaultValue={postById.phone} name="phone" label="Phone" variant="outlined" onChange={this.handleChange}/>
                    </Grid>
                    <Grid item xs={11} sm={3} className={styles.formField}>
                      <TextField fullWidth defaultValue={postById.location} required name="location" label="Location" variant="outlined" onChange={this.handleChange}/>
                    </Grid>
                    <Grid item xs={11} sm={6} className={styles.formField}>
                      <Typography variant="h6" className={styles.formTitle}>
                          Submit photo (optional)
                      </Typography>
                      <ImageUploader
                        withIcon={true}
                        buttonText='Choose images'
                        imgExtension={['.jpg', '.gif', '.png', '.jpeg']}
                        maxFileSize={5242880}
                        withPreview={true}
                        onChange={this.handleImage}
                        singleImage={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3} className={styles.formField}>
                      <Button variant="outlined" type="submit" className={styles.submitButton}>
                        Submit
                        <FontAwesomeIcon icon={faPaperPlane} className={styles.icon}/>
                      </Button>
                    </Grid>
                  </form>
                </Paper>
              </Grid>
            </Grid>
          </div>
          :
          <NotFound />
        }
      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  postById: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  editPost: PropTypes.func,
  user: PropTypes.object,
  post: PropTypes.any,
};

const mapStateToProps = (state, props) => ( {
  postById: getPost(state),
  user: state.user,
});

const mapDispatchToProps = dispatch => ( {
  editPost: (data) => dispatch(fetchUpdatePost(data)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as PostEdit,
  Component as PostEditComponent,
};
