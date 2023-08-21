import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BlogFilter from '../BlogFilter';

const categoryList = [
  {
    meta: {
      title: 'Data Analytics Articles | EPAM SolutionsHub',
      description: 'Read useful articles about Data Analytics. '
    },
    label: 'Analytics',
    id: 'analytics'
  },
  {
    meta: {
      title: 'Cloud Devops Blog Posts | EPAM SolutionsHub',
      description: 'Browse the catalog of published posts related to Cloud and DevOps.'
    },
    label: 'Cloud & DevOps',
    id: 'cloud_devops'
  }
];

const setCategory = jest.fn();

const Component = (props) => (
  <BrowserRouter>
    <BlogFilter menuTitle="All Posts" categoryList={categoryList} setCategory={setCategory} {...props} />
  </BrowserRouter>
);

describe('BlogFilter snapshots', () => {
  test('should BlogFilter match snapshot', () => {
    const { asFragment } = render(<Component />);

    expect(asFragment()).toMatchSnapshot();
  });
});

