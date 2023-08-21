import React from 'react';
import AboutUsLinks from './AboutUsLinks';

describe('Should equal snapshot of About Us Section', () => {
  it('Should be matched snapshot', () => {
    const aboutUs = shallow(<AboutUsLinks />);
    expect(aboutUs).toMatchSnapshot();
  });
});
