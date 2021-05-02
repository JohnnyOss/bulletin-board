import React from 'react';
import PropTypes from 'prop-types';
import ImageUploader from 'react-images-upload';
import { NotFound } from '../NotFound/NotFound';

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

import clsx from 'clsx';

import { connect } from 'react-redux';
import { fetchAddPost } from '../../../redux/postsRedux';

import styles from './PostAdd.module.scss';

class Component extends React.Component {
  state = {
    post: {
      title: '',
      content: '',
      datePublication: '',
      dateLastUpdate: '',
      author: '',
      status: '',
      photo: null,
      price: '',
      phone: '',
      location: '',
    },
  };

  handleChange = (event) => {
    const { post } = this.state;

    this.setState({ post: { ...post, [event.target.name]: event.target.value } });
  };

  handleImage = (files) => {
    const { post } = this.state;

    if (files !== undefined) this.setState({ post: { ...post, photo: files[0].name } });
  };

  handleChangePrice = (event) => {
    const { post } = this.state;

    this.setState({ post: { ...post, [event.target.name]: parseInt(event.target.value) } });
  };

  submitForm = (event) => {
    event.preventDefault();
    const { post } = this.state;
    const { addPost } = this.props;

    if((post.title.length > 9) && (post.content.length > 19) && post.author && post.status) {
      const today = new Date();
      const dateToday = today.getFullYear() + '.' + (today.getMonth() + 1) + '.' + today.getDate();
      post.datePublication = dateToday;
      post.dateLastUpdate = post.datePublication;
      addPost(post);

      this.setState({
        post: {
          title: '',
          content: '',
          datePublication: '',
          dateLastUpdate: '',
          author: '',
          status: '',
          photo: '',
          price: '',
          phone: '',
          location: '',
        },
      });
      alert('Your ad has been published');
    } else {
      alert('Please fill required fields');
    }
  };

  render () {
    const { className, user } = this.props;
    const { post } = this.state;
    return (
      <div className={clsx(className, styles.root)}>
        {user.active === true
          ?
          <div>
            <Typography variant='h4' className={styles.title}>
              Post new Ad
            </Typography>
            <Grid align="center">
              <Grid item align="center" xs={12} sm={9}>
                <Paper>
                  <form onSubmit={this.submitForm}>
                    <Typography variant="h5" className={styles.formTitle}>
                        Fill in the form
                    </Typography>
                    <Grid item xs={11} sm={6} className={styles.formField}>
                      <TextField fullWidth required name="title" label="Title" variant="outlined" onChange={this.handleChange} helperText="min. 10 characters"/>
                    </Grid>
                    <Grid item xs={11} sm={6} className={styles.formField}>
                      <TextField fullWidth required name="content" label="Describe Ad" variant="outlined" onChange={this.handleChange} helperText="min. 20 characters"/>
                    </Grid>
                    <Grid item xs={11} sm={6} className={styles.formField}>
                      <TextField fullWidth required name="author" label="Email" variant="outlined" onChange={this.handleChange}/>
                    </Grid>
                    <Grid item xs={11} sm={6} className={styles.formField}>
                      <FormControl>
                        <InputLabel htmlFor="age-native-helper">Status</InputLabel>
                        <NativeSelect
                          required
                          name="status"
                          onChange={this.handleChange}
                          value={post.status}
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
                      <TextField fullWidth name="price" label="Price ($)" type="number" variant="outlined" onChange={this.handleChangePrice}/>
                    </Grid>
                    <Grid item xs={11} sm={3} className={styles.formField}>
                      <TextField fullWidth name="phone" label="Phone" type="number" variant="outlined" onChange={this.handleChange}/>
                    </Grid>
                    <Grid item xs={11} sm={3} className={styles.formField}>
                      <TextField fullWidth required name="location" label="Location" variant="outlined" onChange={this.handleChange}/>
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
                    <Grid item xs={11} sm={6} className={styles.formField}>
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
  addPost: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  addPost: (post) => dispatch(fetchAddPost(post)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
