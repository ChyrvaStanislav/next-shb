import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import md5 from 'blueimp-md5';
import jwtDecode from 'jwt-decode';
import { Logout } from '../../../../../v2_common/svg';
import { getLogoutLink } from '../../../../../v2_common/api/auth/authHelper';
import { removeToken, getToken } from '../../../../../v2_common/utils/cookieHelper';
import styles from './styles.module.scss';

const User = () => {
  const [open, setOpen] = useState(false);
  const mainContainer = useRef(null);
  const { accessToken } = getToken();
  let decodedToken = {};
  try {
    decodedToken = jwtDecode(accessToken);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(`jwtDecode error from header/user: ${error}`);
    }
  }
  const id = decodedToken['http://epam.com/claims/pmcid'];
  const avatarUrl = `https://static.cdn.epam.com/avatar/${md5(`${'small'}_${id}`)}.jpg`;

  const onBlur = ({ relatedTarget }) => {
    const target = relatedTarget || document.activeElement;

    if (!mainContainer.current.contains(target)) setOpen(false);
  };

  return (
    <section
      className={styles.userComponent}
      ref={mainContainer}
      tabIndex={0} //eslint-disable-line
      onBlur={onBlur}
    >
      <div
        className={classNames(styles.bg, {
          [styles.active]: open
        })}
      >
        <button
          type="button"
          className={styles.btn}
          onClick={() => setOpen(!open)}
        >
          <img className={styles.avatar} src={avatarUrl} alt="avatar" />
        </button>
      </div>
      {
        open && (
          <ul className={styles.list}>
            <li>
              <a
                href={getLogoutLink()}
                className={styles.link}
                onClick={() => {
                  setOpen(false);
                  removeToken();
                }}
              >
                Logout
                <Logout className={classNames(styles.icon, styles.logoutIcon)} />
              </a>
            </li>
          </ul>
        )
      }
    </section>
  );
};

export default User;
