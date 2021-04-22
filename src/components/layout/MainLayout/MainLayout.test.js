import React from 'react';
import { shallow } from 'enzyme';
import { MainlayoutComponent } from './MainLayout';

describe('Component Header', () => {
  it('should render without crashing', () => {
    const component = shallow(<MainlayoutComponent />);
    expect(component).toBeTruthy();
  });
});
