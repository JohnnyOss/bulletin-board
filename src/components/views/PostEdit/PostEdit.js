import React from 'react';
import PropTypes from 'prop-types';
import ImageUploader from 'react-images-upload';

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
import { getPostById, updatePost } from '../../../redux/postsRedux.js';

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

    if((postData.title.length > 9) && (postData.content.length > 19) && postData.email && postData.status && postData.location) {
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
    const { className } = this.props;
    const { postData } = this.state;
    const { submitForm, handleChange, handleStatusChange, handleChangePrice } = this;
    return (
      <div className={clsx(className, styles.root)}>
        <Typography variant='h4' className={styles.title}>
          Edit Your Post
        </Typography>
        <Grid align="center">
          <Grid item align="center" xs={12} sm={9}>
            <Paper>
              <form onSubmit={submitForm}>
                <Typography variant="h6" className={styles.formTitle}>
                    Fill in the form
                </Typography>
                <Grid item xs={12} sm={9} className={styles.formField}>
                  <TextField required id="title" label="Title" variant="outlined" onChange={handleChange} value={postData.title} helperText="min. 10 characters"/>
                </Grid>
                <Grid item xs={12} sm={9} className={styles.formField}>
                  <TextField value={postData.content} required id="content" label="Describe Ad" variant="outlined" onChange={handleChange} helperText="min. 20 characters"/>
                </Grid>
                <Grid item xs={12} sm={9} className={styles.formField}>
                  <TextField value={postData.email} required id="email" label="Email" variant="outlined" onChange={handleChange}/>
                </Grid>
                <Grid item xs={12} sm={9} className={styles.formField}>
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
                <Grid item xs={12} sm={9} className={styles.formField}>
                  <TextField value={postData.price} id="price" label="Price ($)" type="number" variant="outlined" onChange={handleChangePrice}/>
                </Grid>
                <Grid item xs={12} sm={9} className={styles.formField}>
                  <TextField value={postData.phone} id="phone" label="Phone" variant="outlined" onChange={handleChange}/>
                </Grid>
                <Grid item xs={12} sm={9} className={styles.formField}>
                  <TextField value={postData.location} required id="location" label="Location" variant="outlined" onChange={handleChange}/>
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
    // return (
    //   <Paper className={ clsx( className, styles.root ) }>
    //     <h2>Edit your post</h2>
    //     {post ? (
    //       <form className={ clsx( className, styles.form ) } onSubmit={ submitForm }>
    //         <TextField className={ styles.title } id='title' label='Title' variant='outlined' InputProps={ { minLength: 10 } } required fullWidth onChange={ handleChange } value={ postData.title } />
    //         <TextField className={ styles.text } id='text' label='text' variant='outlined' InputProps={ { minLength: 20 } } required fullWidth onChange={ handleChange } value={ postData.text } />
    //         <TextField className={ styles.price } id='price' label='Price' variant='outlined' type='number' InputProps={ {
    //           startAdornment: <InputAdornment position='start'>$</InputAdornment>,
    //         } } defaultValue='0' onChange={ handleChange } value={ postData.price } />
    //         <TextField className={ styles.phone } id='phone' label='Phone' variant='outlined' onChange={ handleChange } value={ postData.phone } />
    //         <TextField className={ styles.location } id='location' label='Location' variant='outlined' onChange={ handleChange } value={ postData.location } />
    //         <TextField className={ styles.mail } id='email' label='E-mail' variant='outlined' required fullWidth onChange={ handleChange } value={ postData.email } />
    //         <Select labelId="status" id="status" value={ postData.status } onChange={ handleStatusChange } label="Status">
    //           <MenuItem value='published'>Published</MenuItem>
    //           <MenuItem value='closed'>Closed</MenuItem>
    //         </Select>

    //         <Button className={ styles.submit }
    //           type="submit"
    //           fullWidth
    //           variant="contained"
    //           color="primary"
    //           onClick={ handleUpdateDateChange }>
    //           Save your changes
    //         </Button>
    //         <Button className={ styles.submit }
    //           variant="contained"
    //           color="primary"
    //           component={ Link } exact to={ `/post/${ post.id }` } >See edited post
    //         </Button>
    //       </form>
    //     ) : ( <p>Sorry, there is no post. Go to  <Button className={ styles.button } variant="contained" color="primary" component={ Link } to={ '/' }>
    //       Homepage</Button> </p> ) }
    //   </Paper>
    // );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  post: PropTypes.object,
  editPost: PropTypes.func,
};

const mapStateToProps = (state, props) => ( {
  post: getPostById(state, props.match.params.id),
});

const mapDispatchToProps = dispatch => ( {
  editPost: (data) => dispatch(updatePost(data)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as PostEdit,
  Component as PostEditComponent,
};
