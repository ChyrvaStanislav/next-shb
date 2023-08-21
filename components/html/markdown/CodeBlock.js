"use client";

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AnimateHeight from 'react-animate-height';
import classNames from 'classnames';
import Typography from '../typography';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
// import theme from '../../../../styles/prism-theme.css';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import java from 'react-syntax-highlighter/dist/cjs/languages/prism/java';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import graphql from 'react-syntax-highlighter/dist/cjs/languages/prism/graphql';
import styles from './styles.module.scss';

SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('graphql', graphql);

const CodeBlock = ({
  language,
  value,
  containerClassName,
}) => {
  const offset = 380;
  const previewHeight = 380;
  const valueLength = Array.isArray(value) && value?.[0] ? value[0].length : value.length;
  const overflow = valueLength > offset;
  const [expanded, setExpanded] = useState(false);
  const theme = {}

  return (
    <div className={classNames(styles.preWrapper, containerClassName)}>
      <AnimateHeight
        className={classNames(styles.animatedContainer, { [styles.extended]: expanded || !overflow })}
        animateOpacity={true}
        height={expanded || !overflow ? 'auto' : previewHeight}
        duration={250}
      >
        <SyntaxHighlighter
          customStyle={{ backgroundColor: 'transparent' }}
          language={language}
          style={theme}
        >
          {value}
        </SyntaxHighlighter>
      </AnimateHeight>
      {overflow ? (
        <Typography
          type="span"
          className={styles.showMore}
          variant="p_links"
          onClick={() => setExpanded(!expanded)}
          data-url={true}
        >
          {expanded ? 'Show less' : 'Show more'}
        </Typography>
      ) : null}
    </div>
  );
};

CodeBlock.propTypes = {
  language: PropTypes.string,
  value: PropTypes.string,
  containerClassName: PropTypes.string,
};

CodeBlock.defaultProps = {
  language: '',
  value: '',
  containerClassName: '',
};

export default CodeBlock;
