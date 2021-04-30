import React from 'react';
import { shallow } from 'enzyme';
import { RoleSwitcherComponent } from './RoleSwitcher';

describe('Component RoleSwitcher', () => {
  it('should render without crashing', () => {
    const component = shallow(<RoleSwitcherComponent />);
    expect(component).toBeTruthy();
  });
});
