import React from 'react';
import { shallow } from 'enzyme';
import { PostEditComponent } from './PostEdit';

describe('Component PostEdit', () => {
  it('should render without crashing', () => {
    const user = { active: true };
    const component = shallow(<PostEditComponent user={user} />);
    expect(component).toBeTruthy();
  });
});
