import React from 'react';
import PropTypes from 'prop-types';
import ImageUploader from 'react-images-upload';

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
import uniqid from 'uniqid';

import { connect } from 'react-redux';
import { getAll, addPost } from '../../../redux/postsRedux';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './PostAdd.module.scss';

class Component extends React.Component {
  state = {
    post: {
      title: '',
      content: '',
      email: '',
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
    // console.log('this.state', this.state);
  };

  handleImage = (files) => {
    const { post } = this.state;
    // console.log('files', files[0].name);

    if (files !== undefined) this.setState({ post: { ...post, photo: files[0].name } });
  };

  handleChangePrice = (event) => {
    const { post } = this.state;

    this.setState({ post: { ...post, [event.target.name]: parseInt(event.target.value) } });
    // console.log('this.state', this.state);
  };

  submitForm = (event) => {
    event.preventDefault();
    const { post } = this.state;
    const { addPost } = this.props;

    if((post.title.length > 9) && (post.content.length > 19) && post.email && post.status) {
      post.id = uniqid();
      post.datePublication = new Date().toISOString();
      post.dateLastUpdate = post.datePublication;
      console.log('dodaje:', post);
      addPost(post);

      this.setState({
        post: {
          id: '',
          title: '',
          content: '',
          datePublication: '',
          dateLastUpdate: '',
          email: '',
          status: '',
          photo: '',
          price: '',
          phone: '',
          location: '',
        },
      });
    } else {
      alert('Please fill required fields');
    }
  };

  render () {
    const { className } = this.props;
    const { post } = this.state;
    return (
      <div className={clsx(className, styles.root)}>
        <Typography variant='h4' className={styles.title}>
          Post new Ad
        </Typography>
        <Grid align="center">
          <Grid item align="center" xs={12} sm={9}>
            <Paper>
              <form onSubmit={this.submitForm}>
                <Typography variant="h6" className={styles.formTitle}>
                    Fill in the form
                </Typography>
                <Grid item xs={12} sm={9} className={styles.formField}>
                  <TextField required name="title" label="Title" variant="outlined" onChange={this.handleChange} helperText="min. 10 characters"/>
                </Grid>
                <Grid item xs={12} sm={9} className={styles.formField}>
                  <TextField required name="content" label="Describe Ad" variant="outlined" onChange={this.handleChange} helperText="min. 20 characters"/>
                </Grid>
                <Grid item xs={12} sm={9} className={styles.formField}>
                  <TextField required name="email" label="Email" variant="outlined" onChange={this.handleChange}/>
                </Grid>
                <Grid item xs={12} sm={9} className={styles.formField}>
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
                <Grid item xs={12} sm={9} className={styles.formField}>
                  <TextField name="price" label="Price ($)" type="number" variant="outlined" onChange={this.handleChangePrice}/>
                </Grid>
                <Grid item xs={12} sm={9} className={styles.formField}>
                  <TextField name="phone" label="Phone" variant="outlined" onChange={this.handleChange}/>
                </Grid>
                <Grid item xs={12} sm={9} className={styles.formField}>
                  <TextField name="location" label="Location" variant="outlined" onChange={this.handleChange}/>
                </Grid>
                <Grid item xs={12} sm={9} className={styles.formField}>
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
                <Grid item xs={12} sm={9} className={styles.formField}>
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
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  addPost: PropTypes.func,
};

const mapStateToProps = state => ({
  postsAll: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  addPost: (post) => dispatch(addPost(post)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
