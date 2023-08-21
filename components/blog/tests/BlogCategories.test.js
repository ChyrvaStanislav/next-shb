import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BlogCategories from '../BlogCategories';

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

const defaultMeta = {
  title: 'Blog | EPAM SolutionsHub',
  description: 'Visit our Blog page to read more about Lean Delivery, Testing, Cloud & DevOps, OSCI and other SolutionsHub topics'
};

const setCategory = jest.fn();
const setMeta = jest.fn();

const Component = (props) => (
  <BrowserRouter>
    <BlogCategories
      menuTitle="All Posts"
      categoryList={categoryList}
      setCategory={setCategory}
      setMeta={setMeta}
      defaultMeta={defaultMeta}
      hasHighlight={true}
      {...props}
    />
  </BrowserRouter>
);

describe('BlogCategories snapshots', () => {
  test('should BlogCategories match snapshot with ALL active link', () => {
    const { asFragment } = render(<Component />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('should BlogCategories match snapshot with ONE active link', () => {
    const { asFragment } = render(<Component categorySearch="analytics" postTag="analytics" />);

    expect(asFragment()).toMatchSnapshot();
  });
});

describe('BlogCategories functions', () => {
  test('should BlogCategories onClick by "All posts" link trigger setCategories and seMeta with default data', () => {
    render(<Component />);
    fireEvent.click(screen.getByText('Analytics'));

    expect(setCategory).toHaveBeenCalledWith('analytics');
  });

  test('should BlogCategories onClick by  trigger setMeta', () => {
    render(<Component categorySearch="analytics" postTag="analytics" />);

    fireEvent.click(screen.getByText('All Posts'));

    expect(setCategory).toHaveBeenCalledWith('');
    expect(setMeta).toHaveBeenCalledWith(defaultMeta);
  });
});
