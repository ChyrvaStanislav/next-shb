import React from 'react';
import TwitterIcon from '@/images/svg/socials/twitter.svg';
import FacebookIcon from '@/images/svg/socials/facebook.svg';
import LinkedInIcon from '@/images/svg/socials/linkedin.svg';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.module.scss';
import Image from "next/image";

export default function Index({ title, mode }) {

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = '';

  return (
    <div className={classNames({
      [styles.shareBlog]: mode === 'blog',
      [styles.shareSolution]: mode === 'solution',
      [styles.shareSolutionMobile]: mode === 'solution-mobile',
    })}
    >
      {mode === 'solution-mobile' && <div className={styles.shareTitle}>Share Solution</div>}
      {mode === 'blog' && <div className={styles.shareTitle}>Share this post</div>}
      <div className={styles.iconBlock}>
        <a
          href={`https://twitter.com/share?url=${encodedUrl}&amp;text=${encodedTitle}%0A%0A&amp;hashtags=Epam, SolutionsHub`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={TwitterIcon} alt="twitter" className={classNames(styles.icon, styles.twitter)} />
          <i className={styles.blogTwitter} />
        </a>
        <a
          href={`https://www.facebook.com/sharer.php?u=${encodedUrl}&display=page`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={FacebookIcon} alt="facebook" className={classNames(styles.icon, styles.facebook)} />
          <i className={styles.blogFacebook} />
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={LinkedInIcon} alt="linkedin" className={classNames(styles.icon, styles.linked)} />
          <i className={styles.bloglinked} />
        </a>
      </div>
    </div>
  );
}

Index.propTypes = {
  mode: PropTypes.oneOf(['blog', 'solution', 'solution-mobile']),
  title: PropTypes.string,
};

Index.defaultProps = {
  mode: 'blog',
  title: '',
};
