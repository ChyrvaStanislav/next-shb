/* eslint-disable max-len */
import * as React from 'react';

function SolutionHeadingIcon(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 32 32" {...props}>
      <g fill="none" fillRule="evenodd">
        <rect width={32} height={32} rx={2} fill="#313B71" />
        <path
          d="M25.192 24.242a.808.808 0 010 1.617H6.808a.808.808 0 110-1.617h18.384zm0-4.242a.808.808 0 010 1.616H6.808a.808.808 0 110-1.616h18.384zM15 6a1 1 0 011 1v8.101a1 1 0 01-1 1H7a1 1 0 01-1-1V7a1 1 0 011-1h8zm10.192 8.485a.808.808 0 010 1.616h-5.384a.808.808 0 010-1.616h5.384zM14.4 7.616H7.6v6.869h6.8V7.616zm10.792 2.626a.808.808 0 010 1.617h-5.384a.808.808 0 010-1.617h5.384zm0-4.242a.808.808 0 010 1.616h-5.384a.808.808 0 010-1.616h5.384z"
          fill="#FFF"
        />
      </g>
    </svg>
  );
}

const MemoSolutionHeadingIcon = React.memo(SolutionHeadingIcon);
export default MemoSolutionHeadingIcon;
