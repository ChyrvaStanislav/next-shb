/* eslint-disable max-len */
import React from 'react';

const FullStar = ({
  color, className, onClick, ...props
}) => (
  <svg {...props} onClick={onClick} className={className} width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.3081 5.29454C15.2465 5.10468 15.0826 4.96613 14.8853 4.93744L10.4523 4.2921L8.47011 0.268615C8.29367 -0.0895382 7.70696 -0.0895382 7.53039 0.268615L5.54817 4.2921L1.11519 4.93735C0.917941 4.96604 0.754026 5.1046 0.692395 5.29445C0.630776 5.48454 0.682223 5.6929 0.82487 5.8325L4.03242 8.96428L3.2751 13.3865C3.24155 13.5833 3.32246 13.7824 3.48358 13.8998C3.64528 14.0171 3.85902 14.0327 4.03523 13.9397L8.00007 11.8516L11.9649 13.9397C12.141 14.0322 12.3547 14.0174 12.5166 13.8998C12.6777 13.7824 12.7585 13.5833 12.725 13.3865L11.9677 8.96428L15.1753 5.8325C15.318 5.69289 15.3694 5.48464 15.3077 5.29457L15.3081 5.29454Z" fill={color || 'white'} fillOpacity={color ? 1 : 0.65} />
  </svg>
);

export default FullStar;
