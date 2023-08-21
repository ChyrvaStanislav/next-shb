import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BlogPost from '../BlogPost';
import { blogPostData } from './testData';

jest.mock('v2_main/components/html', () => ({
  Markdown: ({ source }) => <div>{ source }</div>,
  Typography: ({ children, ...other }) => <div {...other}>{ children }</div>
}));

const Component = (props) => (
  <BrowserRouter>
    <BlogPost post={blogPostData} {...props} />
  </BrowserRouter>
);

describe('BlogPost snapshots', () => {
  test('should BlogPost match snapshot', () => {
    const { asFragment } = render(<Component />);

    expect(asFragment()).toMatchSnapshot();
  });
});

