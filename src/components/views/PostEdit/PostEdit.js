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
import {  getPost, updatePost } from '../../../redux/postsRedux.js';

import styles from './PostEdit.module.scss';


class Component extends React.Component {
  state = {
    postData: { ...this.props.post },
  }

  handleChange = ({ target }) => {
    const { postData } = this.state;
    const { value, id } = target;
    this.setState({ postData: { ...postData, [ id ]: value } });
  }

  handleStatusChange = (event) => {
    const { postData } = this.state;
    const { value } = event.target;

    this.setState( {
      postData: {
        ...postData,
        status: value,
      },
    } );
  }

  handleChangePrice = ({ target }) => {
    const { postData } = this.state;
    const { value } = target;
    this.setState({ postData: { ...postData, price: parseInt(value) } });
  };

  submitForm = (event) => {
    event.preventDefault();
    const { postData } = this.state;
    const { editPost } = this.props;

    if((postData.title.length > 9) && (postData.content.length > 19) && postData.author && postData.status && postData.location) {
      const today = new Date();
      const dateToday = today.getFullYear() + '.' + (today.getMonth() + 1) + '.' + today.getDate();
      postData.dateLastUpdate = dateToday;
      editPost(postData);
      alert('Your ad has been edited');
    } else {
      alert('Please fill required fields');
    }
  }

  render () {
    const { className, user } = this.props;
    const { postData } = this.state;
    const { submitForm, handleChange, handleStatusChange, handleChangePrice } = this;
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
                  <form onSubmit={submitForm}>
                    <Typography variant="h5" className={styles.formTitle}>
                        Fill in the form
                    </Typography>
                    <Grid item xs={11} sm={6} className={styles.formField}>
                      <TextField fullWidth required id="title" label="Title" variant="outlined" onChange={handleChange} value={postData.title} helperText="min. 10 characters"/>
                    </Grid>
                    <Grid item xs={11} sm={6} className={styles.formField}>
                      <TextField fullWidth value={postData.content} required id="content" label="Describe Ad" variant="outlined" onChange={handleChange} helperText="min. 20 characters"/>
                    </Grid>
                    <Grid item xs={11} sm={6} className={styles.formField}>
                      <TextField fullWidth value={postData.author} required id="email" label="Email" variant="outlined" onChange={handleChange}/>
                    </Grid>
                    <Grid item xs={11} sm={6} className={styles.formField}>
                      <FormControl>
                        <InputLabel htmlFor="age-native-helper">Status</InputLabel>
                        <NativeSelect
                          required
                          id="status"
                          onChange={handleStatusChange}
                          value={postData.status}
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
                      <TextField fullWidth value={postData.price} id="price" label="Price ($)" type="number" variant="outlined" onChange={handleChangePrice}/>
                    </Grid>
                    <Grid item xs={11} sm={3} className={styles.formField}>
                      <TextField fullWidth value={postData.phone} id="phone" label="Phone" variant="outlined" onChange={handleChange}/>
                    </Grid>
                    <Grid item xs={11} sm={3} className={styles.formField}>
                      <TextField fullWidth value={postData.location} required id="location" label="Location" variant="outlined" onChange={handleChange}/>
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
  post: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  editPost: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = (state, props) => ( {
  post: getPost(state),
  user: state.user,
});

const mapDispatchToProps = dispatch => ( {
  editPost: (data) => dispatch(updatePost(data)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as PostEdit,
  Component as PostEditComponent,
};
