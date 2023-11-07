
/* eslint-disable react/no-children-prop */
import React, { forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import isExternalLink from '@/utils/isExternalLink';
// import AppContext from 'v2_main/context/appContext';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import styles from './styles.module.scss';
import internalStyles from './internalStyles.module.scss';
import CodeBlock from './CodeBlock';


// eslint-disable-next-line react/display-name
const Markdown = forwardRef(({
  source,
  className,
  version,
  itemProp,
  linkTarget,
  linkNofollow,
  wrapped,
  withCode,
  inlineContainer,
  codeContainerClassName,
  withTooltip,
  additionalRenderer,
  ...otherProps
}, ref) => {
  // const { setTooltipLinkId, setTooltipPageId, tooltipLinkId } = useContext(AppContext);
  const setTooltipLinkId = () => {};
  const setTooltipPageId = () => {};
  const tooltipLinkId = null;
  const Type = inlineContainer ? 'span' : 'section';

  /**
   * Parse URL string and write the last part in AppContext
   * used in link-tooltip
   * @param event {Event}
   */
  const parseHref = (event) => {
    const { href } = event.currentTarget;
    const parsedHref = href.split('/');
    if (parsedHref[parsedHref.length - 1] !== tooltipLinkId) {
      if (parsedHref[parsedHref.length - 2] === 'asset' || parsedHref[parsedHref.length - 2] === 'solution') {
        setTooltipLinkId(parsedHref[parsedHref.length - 1]);
        setTooltipPageId(parsedHref[parsedHref.length - 2]);
      }
    }
  };

  /**
   * @desc We want to avoid accidental transfers from QA to PROD environment via links in the content
   * so we change all absolute links to relative
   * @param url {string}
   */
  const removeAbsolutePath = (url) => url.replace(/^.*solutionshub\.epam\.com/i, '');

  const isLinkTooltip = props => (/\/asset\//gi.test(props?.href) || /\/solution\//gi.test(props?.href)) && withTooltip;
  const renderers = withCode ? {
    // eslint-disable-next-line
    code: (props) => (
      <CodeBlock
        language={props.language || props.className?.replace?.('language-', '')}
        value={props.children}
        containerClassName={codeContainerClassName}
      />
    ),
    a: props => (
      <a
        href={isExternalLink(props?.href) ? props?.href : removeAbsolutePath(props?.href)}
        // onMouseMove={isLinkTooltip(props) ? parseHref : null}
        data-tip={isLinkTooltip(props) ? true : null}
        data-for={isLinkTooltip(props) ? 'link-tooltip' : null}
        target={linkTarget}
        rel={linkNofollow && isExternalLink(props?.href)
          ? 'noopener noreferrer nofollow'
          : null}
      >
        {props?.children}
      </a>
    ),
    table: props => (
      <div className="markdown__table-wrapper">
        <table>
          {props.children}
        </table>
      </div>
    )
  } : {
    a: props => (
      <a
        href={isExternalLink(props?.href) ? props?.href : removeAbsolutePath(props?.href)}
        // onMouseMove={isLinkTooltip(props) ? parseHref : null}
        data-tip={isLinkTooltip(props) ? true : null}
        data-for={isLinkTooltip(props) ? 'link-tooltip' : null}
        target={linkTarget}
        rel={linkNofollow && isExternalLink(props?.href)
          ? 'noopener noreferrer nofollow'
          : null}
      >
        {props?.children}
      </a>
    ),
    table: props => (
      <div className="markdown__table-wrapper">
        <table>
          {props.children}
        </table>
      </div>
    )
  };

  return (
    <Type
      className={classNames(className, {
        [styles.container]: version === 'external',
        [internalStyles.container]: version === 'internal',
      })}
      itemProp={itemProp}
      ref={ref}
    >
      { wrapped
        ? (
          <div>
            <ReactMarkdown
              components={{ ...renderers, [additionalRenderer.name]: additionalRenderer.func }}
              children={source}
              {...otherProps}
              linkTarget={linkTarget}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            />
          </div>
        )
        : (
          <ReactMarkdown
            components={{ ...renderers, [additionalRenderer?.name]: additionalRenderer?.func }}
            children={source}
            {...otherProps}
            linkTarget={linkTarget}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          />
        )
    }
    </Type>
  );
});

Markdown.propTypes = {
  source: PropTypes.string.isRequired,
  className: PropTypes.string,
  version: PropTypes.oneOf(['internal', 'external']),
  itemProp: PropTypes.string,
  linkTarget: PropTypes.oneOf(['_blank']),
  linkNofollow: PropTypes.bool,
  wrapped: PropTypes.bool,
  withCode: PropTypes.bool,
  inlineContainer: PropTypes.bool,
  codeContainerClassName: PropTypes.string,
  withTooltip: PropTypes.bool,
  additionalRenderer: PropTypes.shape({}),
};

Markdown.defaultProps = {
  className: '',
  version: 'internal',
  itemProp: null,
  linkTarget: null,
  linkNofollow: false,
  wrapped: false,
  withCode: false,
  inlineContainer: false,
  codeContainerClassName: '',
  withTooltip: false,
  additionalRenderer: {},
};

export default Markdown;
