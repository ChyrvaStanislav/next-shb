"use client"

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getImageCMS } from '@/utils/getImageCMS';
import { Button } from '@/components/html';
// import ShortSolutionsRequestHandler from '@/components/common/forms/short-solutions-request';
import styles from './BlogPostAdvertising.module.scss';
import Image from "next/image";

const BlogPostAdvertising = ({ data }) => {
  const {
    enableDarkMode,
    enableTwoButtons,
    imageForMobile,
    imageForDesktop,
    imageForTablet,
    link,
    solutionDescription,
    solutionName,
  } = data;

  const [isSolutionRequestFormOpen, setIsSolutionRequestFormOpen] = useState(false);

  return (
    <>
      {/*{enableTwoButtons && (*/}
      {/*<ShortSolutionsRequestHandler*/}
      {/*  solutionName={solutionName}*/}
      {/*  solutionLink={link}*/}
      {/*  isOpen={isSolutionRequestFormOpen}*/}
      {/*  setIsOpen={setIsSolutionRequestFormOpen}*/}
      {/*/>*/}
      {/*)}*/}
      <div className={classNames(styles.blogPostAdvertisingWrapper, { [styles.dark]: enableDarkMode })}>
        <div className={styles.blogPostAdvertisingInner}>
          <div className={styles.blogPostAdvertisingLeft}>
            <div className={styles.blogPostAdvertisingTitle}>
              {solutionName}
            </div>
            <div className={styles.blogPostAdvertisingDescr}>
              {solutionDescription}
            </div>
            <div className={styles.blogPostAdvertisingBtnWrapper}>
              {
              enableTwoButtons ? (
                <>
                  <Button
                    onClick={() => setIsSolutionRequestFormOpen(true)}
                    className={classNames(styles.oneOfTwoButtons, 'blogPostAdvertisingGetItNowBtn')}
                  >
                    Get It Now
                  </Button>

                  <Button
                    type="outline"
                    className={classNames(styles.blogPostAdvertisingOutlineBtn, styles.oneOfTwoButtons, 'blogPostAdvertisingReadMoreBtn')}
                    href={link}
                  >
                    Read More
                  </Button>
                </>
              ) : (
                <Button
                  className={classNames(styles.blogPostAdvertisingPrimaryBtn, styles.singleButton, 'blogPostAdvertisingBtn')}
                  href={link}
                >
                  Learn More
                </Button>
              )
            }
            </div>
          </div>
          <div className={styles.blogPostAdvertisingRight}>
            <div className={classNames(styles.blogPostAdvertisingImageWrapperLight, { [styles.withTwoButtons]: enableTwoButtons })}>
              <picture>
                <source
                  media="(max-width: 567px)"
                  src={getImageCMS(imageForMobile)}
                />
                <source
                  media="(min-width: 568px) and (max-width: 1023px)"
                  src={getImageCMS(imageForTablet)}
                />
                <Image
                  src={getImageCMS(imageForDesktop)}
                  alt="Blog Post Advertising"
                  width="413"
                  height="236"
                />
              </picture>
            </div>
            <div className={classNames(styles.blogPostAdvertisingImageWrapperDark, { [styles.withTwoButtons]: enableTwoButtons })}>
              <picture>
                <source
                  media="(max-width: 567px)"
                  src={getImageCMS(imageForMobile)}
                />
                <source
                  media="(min-width: 568px) and (max-width: 1023px)"
                  src={getImageCMS(imageForTablet)}
                />
                <Image
                  src={getImageCMS(imageForDesktop)}
                  alt="Blog Post Advertising"
                  fill={true}
                  width={300}
                  height={200}
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

BlogPostAdvertising.propTypes = {
  data: PropTypes.shape({
    enableDarkMode: PropTypes.bool,
    enableTwoButtons: PropTypes.bool,
    imageForMobile: PropTypes.object,
    imageForDesktop: PropTypes.object,
    imageForTablet: PropTypes.object,
    link: PropTypes.string,
    solutionDescription: PropTypes.string,
    solutionName: PropTypes.string,
  }).isRequired
};

export default BlogPostAdvertising;
