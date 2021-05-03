import React from 'react';
import { shallow } from 'enzyme';
import { PostComponent } from './Post';

describe('Component Post', () => {
  it('should render without crashing', () => {
    const fetchOnePost = function(){};
    const user = { active: true };
    const post = {
      id: '123abc',
      title: 'Lorem ipsum 1',
      content: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum.',
      datePublication: '2021.04.11',
      dateLastUpdate: '2021.04.11',
      email: 'helena@wp.pl',
      status: 'published',
      photo: 'https://placeimg.com/640/480/nature/1',
      price: '999',
      phone: '999999999',
      location: 'Asbru',
    };
    const component = shallow(<PostComponent fetchOnePost={fetchOnePost} user={user} post={post}/>);
    expect(component).toBeTruthy();
  });
});
