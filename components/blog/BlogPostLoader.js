import React from 'react';
import ContentLoader from 'v2_main/components/common/content-loader';
import PropTypes from 'prop-types';

const BlogPostLoader = ({ breakpoint }) => {
  if (breakpoint === 'xl') {
    return (
      <ContentLoader width="100%" height={426} noViewBox={true}>
        <rect x="0" y="0" rx="2" ry="2" width="100%" height="240" />
        <rect x="0" y="256" rx="2" ry="2" width="100%" height="20" />
        <rect x="0" y="284" rx="2" ry="2" width="79%" height="20" />
        <rect x="0" y="316" rx="2" ry="2" width="30%" height="18" />
        <rect x="0" y="346" rx="2" ry="2" width="100%" height="16" />
        <rect x="0" y="370" rx="2" ry="2" width="64%" height="16" />
        <rect x="0" y="402" rx="3" ry="3" width="97" height="24" />
        <rect x="105" y="402" rx="3" ry="3" width="88" height="24" />
      </ContentLoader>
    );
  }

  if (breakpoint === 'lg') {
    return (
      <ContentLoader width="100%" height={426} noViewBox={true}>
        <rect x="0" y="0" rx="2" ry="2" width="100%" height="240" />
        <rect x="0" y="256" rx="2" ry="2" width="100%" height="20" />
        <rect x="0" y="284" rx="2" ry="2" width="76%" height="20" />
        <rect x="0" y="316" rx="2" ry="2" width="41%" height="18" />
        <rect x="0" y="346" rx="2" ry="2" width="100%" height="16" />
        <rect x="0" y="370" rx="2" ry="2" width="89%" height="16" />
        <rect x="0" y="402" rx="3" ry="3" width="97" height="24" />
        <rect x="105" y="402" rx="3" ry="3" width="88" height="24" />
      </ContentLoader>
    );
  }

  if (breakpoint === 'md') {
    return (
      <ContentLoader width="100%" height={376} noViewBox={true}>
        <rect x="0" y="0" rx="2" ry="2" width="100%" height="224" />
        <rect x="0" y="236" rx="2" ry="2" width="96%" height="18" />
        <rect x="0" y="258" rx="2" ry="2" width="88%" height="18" />
        <rect x="0" y="284" rx="2" ry="2" width="40%" height="16" />
        <rect x="0" y="308" rx="2" ry="2" width="100%" height="14" />
        <rect x="0" y="326" rx="2" ry="2" width="87" height="14" />
        <rect x="0" y="352" rx="3" ry="3" width="97" height="24" />
        <rect x="105" y="352" rx="3" ry="3" width="88" height="24" />
      </ContentLoader>
    );
  }

  if (breakpoint === 'sm') {
    return (
      <ContentLoader width="100%" height={376} noViewBox={true}>
        <rect x="0" y="0" rx="2" ry="2" width="100%" height="224" />
        <rect x="0" y="236" rx="2" ry="2" width="97%" height="18" />
        <rect x="0" y="258" rx="2" ry="2" width="65%" height="18" />
        <rect x="0" y="284" rx="2" ry="2" width="26%" height="16" />
        <rect x="0" y="308" rx="2" ry="2" width="92%" height="14" />
        <rect x="0" y="326" rx="2" ry="2" width="536%" height="14" />
        <rect x="0" y="352" rx="3" ry="3" width="97" height="24" />
        <rect x="105" y="352" rx="3" ry="3" width="88" height="24" />
      </ContentLoader>
    );
  }


  return (
    <ContentLoader width="100%" height={350} noViewBox={true}>
      <rect x="0" y="0" rx="2" ry="2" width="100%" height="200" />
      <rect x="0" y="212" rx="2" ry="2" width="100%" height="16" />
      <rect x="0" y="232" rx="2" ry="2" width="88%" height="18" />
      <rect x="0" y="258" rx="2" ry="2" width="49%" height="16" />
      <rect x="0" y="282" rx="2" ry="2" width="100%" height="14" />
      <rect x="0" y="300" rx="2" ry="2" width="83%" height="14" />
      <rect x="0" y="326" rx="3" ry="3" width="97" height="24" />
      <rect x="105" y="326" rx="3" ry="3" width="88" height="24" />
    </ContentLoader>
  );
};

export default BlogPostLoader;

BlogPostLoader.propTypes = {
  breakpoint: PropTypes.string,
};

BlogPostLoader.defaultProps = {
  breakpoint: 'xs',
};
