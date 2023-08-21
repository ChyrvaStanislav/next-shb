import React, { useContext } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { ContuctUsFormContext } from '../forms/contact-us/handler';
import styles from './styles.module.scss';

const AboutUsLinks = () => {
  const { setOpenForm } = useContext(ContuctUsFormContext);

  return (
    <li className={classNames(styles.categoriesListItem, styles.categoriesListItemAbout)}>
      <p className={classNames(styles.categoriesListTitle, styles.categoriesListLabel, styles.categoriesListLabelAbout)}>
        About
      </p>
      <ul className={styles.tagsList}>
        <Link href="/faq" className={styles.tagsListItem} itemProp="url">
          FAQ
        </Link>
        <Link href="/whatsnew" className={styles.tagsListItem} itemProp="url">
          What&apos;s New
        </Link>
        <Link href="/privacy-policy" className={styles.tagsListItem} itemProp="url">
          Privacy Policy
        </Link>
        <Link href="/terms" className={styles.tagsListItem} itemProp="url">
          Terms of Use
        </Link>
        <Link href="/cookie-policy" className={styles.tagsListItem} itemProp="url">
          Cookie Policy
        </Link>
        <button
          type="button"
          className={classNames(styles.tagsListItem, styles.tagsListButton, 'btnContactUsAboutUs')}
          onClick={() => setOpenForm(true)}
        >
          Contact Us
        </button>
        <Link href="/blog" className={styles.tagsListItem} itemProp="url">
          Blog
        </Link>
      </ul>
    </li>
  );
};

export default AboutUsLinks;
