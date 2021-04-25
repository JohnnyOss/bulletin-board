import React from 'react';
import { shallow } from 'enzyme';
import { PostListComponent } from './PostList';

describe('Component PostList', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostListComponent />);
    expect(component).toBeTruthy();
  });
});
