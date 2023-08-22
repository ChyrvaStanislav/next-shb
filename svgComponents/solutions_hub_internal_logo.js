/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

export default function InternalLogo({ color, ...other }) {
  const fillColor = color === 'black' ? '#222222' : '#FFF';
  const fillBrackets = color === 'black' ? '#3DD1B0' : '#FFF';

  return (
    <svg viewBox="0 0 220 16" {...other}>
      <g fill="none" fillRule="evenodd">
        <path d="M123.326 14.478V4.254h-2.305v10.224h2.305zm6.278 0v-3.622c0-.607-.034-1.234-.102-1.882a151.26 151.26 0 01-.18-1.819h.063l1.003 2.227 2.666 5.096h2.368V4.254h-2.196v3.607c0 .606.034 1.244.102 1.913.068.669.128 1.275.18 1.819h-.062l-1.004-2.258-2.665-5.08h-2.368v10.223h2.195zm14.448 0l3.073-10.224h-2.352l-1.208 4.767c-.146.565-.282 1.11-.407 1.639l-.096.4c-.098.402-.202.815-.312 1.238h-.063a35.975 35.975 0 01-.415-1.638l-.094-.4a37.055 37.055 0 00-.322-1.239l-1.223-4.767h-2.446l3.09 10.224h2.775zm12.393 0v-1.945h-4.25v-2.352h3.481V8.253h-3.48V6.199h4.092V4.254h-6.397v10.224h6.554zm5.901 0v-3.622c0-.607-.034-1.234-.101-1.882a151.28 151.28 0 01-.18-1.819h.062l1.003 2.227 2.666 5.096h2.368V4.254h-2.195v3.607c0 .606.034 1.244.101 1.913.068.669.129 1.275.18 1.819h-.062l-1.003-2.258-2.666-5.08h-2.368v10.223h2.195zm14.213 0v-8.28h2.806V4.255h-7.934V6.2h2.807v8.279h2.32zm9.79.188c.69 0 1.32-.123 1.89-.369a4.108 4.108 0 001.465-1.058c.408-.46.724-1.02.949-1.678.225-.658.337-1.406.337-2.242 0-.826-.112-1.565-.337-2.219-.225-.653-.54-1.204-.949-1.654a4.029 4.029 0 00-1.466-1.027 4.906 4.906 0 00-1.89-.353c-.69 0-1.319.118-1.889.353a4.073 4.073 0 00-1.466 1.02c-.407.444-.724.992-.948 1.646-.225.653-.337 1.398-.337 2.234 0 .836.112 1.584.337 2.242.224.659.54 1.218.948 1.678.408.46.897.813 1.466 1.058.57.246 1.2.369 1.89.369zm0-1.991c-.7 0-1.255-.3-1.662-.902-.408-.601-.612-1.419-.612-2.454 0-1.024.204-1.824.612-2.399.407-.575.961-.862 1.662-.862.7 0 1.254.287 1.662.862.408.575.611 1.375.611 2.4 0 1.034-.203 1.852-.611 2.453-.408.601-.962.902-1.662.902zm10.543 1.803v-3.685h1.27l1.96 3.685h2.587l-2.32-4.093c.553-.24.995-.603 1.324-1.09.33-.486.494-1.105.494-1.858 0-.606-.104-1.113-.313-1.52a2.62 2.62 0 00-.847-.98 3.481 3.481 0 00-1.247-.526 7.113 7.113 0 00-1.528-.157h-3.685v10.224h2.305zm1.192-5.52h-1.192V6.09h1.192c.606 0 1.068.1 1.387.298.319.199.478.549.478 1.05 0 .502-.159.881-.478 1.137-.319.256-.781.384-1.387.384zm11.609 5.52V10.84l3.089-6.586h-2.415l-.925 2.352c-.147.387-.29.76-.431 1.122-.141.36-.285.74-.432 1.136h-.062c-.147-.397-.285-.776-.416-1.136-.13-.361-.269-.735-.415-1.122l-.91-2.352H204.3l3.089 6.586v3.638h2.305z" fill="#3DD1B0" fillRule="nonzero" />
        <g fill={fillBrackets} fillRule="nonzero">
          <path d="M117.423 15.484V14.13h-1.444V3.903h1.444V2.55h-3.37v12.935zM216.454 15.484V14.13h1.444V3.903h-1.444V2.55h3.369v12.935z" />
        </g>
        <path d="M4.887.848c1.548 0 2.988.656 3.965 1.654L7.808 3.78c-.821-.737-1.75-1.182-2.921-1.182-1.362 0-2.258.664-2.258 1.733 0 1.151 1.075 1.58 2.136 2.02l1.825.779c1.544.652 2.685 1.6 2.685 3.533 0 2.105-1.744 3.824-4.604 3.824A6.542 6.542 0 010 12.547l1.18-1.375c.945.94 2.235 1.566 3.53 1.566 1.604 0 2.523-.766 2.523-1.919 0-1.213-.901-1.6-2.12-2.125L3.27 7.887C2.008 7.356.607 6.378.607 4.45c0-2.053 1.8-3.6 4.28-3.6zm10.047 3.344c2.425 0 4.608 1.887 4.608 5.158 0 3.251-2.183 5.137-4.608 5.137-2.426 0-4.608-1.886-4.608-5.137 0-3.271 2.182-5.158 4.608-5.158zM23.3 0v12.117c0 .538.238.74.48.74.099 0 .18 0 .36-.041l.257 1.494c-.258.098-.592.177-1.086.177-1.438 0-1.994-.925-1.994-2.49V0H23.3zm79.442 0v3.792l-.06 1.694c.859-.746 1.908-1.294 2.957-1.294 2.495 0 3.886 1.967 3.886 4.988 0 3.36-2.007 5.307-4.22 5.307-.904 0-1.891-.462-2.737-1.263h-.06l-.177 1.022h-1.572V0h1.983zM27.899 4.433v5.93c0 1.721.507 2.415 1.688 2.415.933 0 1.563-.448 2.4-1.505v-6.84h1.982v9.813h-1.63l-.158-1.49h-.06c-.886 1.046-1.851 1.731-3.196 1.731-2.085 0-3.01-1.378-3.01-3.868V4.433H27.9zM38.822 1.72v2.714h2.58v1.593h-2.58v5.061c0 1.177.417 1.808 1.454 1.808.342 0 .767-.122 1.07-.244l.357 1.475c-.543.181-1.214.361-1.914.361-2.176 0-2.95-1.377-2.95-3.412v-5.05H35.41V4.534l1.527-.1.235-2.714h1.65zM51.43 4.192c2.425 0 4.607 1.887 4.607 5.158 0 3.251-2.182 5.137-4.607 5.137-2.426 0-4.608-1.886-4.608-5.137 0-3.271 2.182-5.158 4.608-5.158zm19.957 0c1.295 0 2.377.528 3.157 1.14l-.926 1.24c-.68-.502-1.374-.865-2.193-.865-1.111 0-1.63.565-1.63 1.246 0 .854 1.029 1.18 2.116 1.582 1.371.515 2.902 1.122 2.902 2.971 0 1.64-1.3 2.981-3.697 2.981-1.368 0-2.748-.582-3.689-1.364l.946-1.279c.862.683 1.716 1.129 2.803 1.129 1.18 0 1.75-.595 1.75-1.349 0-.916-1.11-1.323-2.176-1.724-1.331-.493-2.842-1.201-2.842-2.848 0-1.636 1.317-2.86 3.48-2.86zm20.75.241v5.93c0 1.721.508 2.415 1.688 2.415.933 0 1.564-.448 2.4-1.505v-6.84h1.983v9.813h-1.63l-.159-1.49h-.06c-.885 1.046-1.85 1.731-3.196 1.731-2.085 0-3.009-1.378-3.009-3.868V4.433h1.984zM79.824 1.09v5.4h5.72v-5.4h2.004v13.157h-2.004v-6.01h-5.72v6.01h-2.004V1.09h2.004zm-34.87 3.344v9.813h-1.984V4.433h1.983zm18.064-.24c2.085 0 3.009 1.378 3.009 3.868v6.185h-1.983v-5.93c0-1.72-.508-2.414-1.688-2.414-.933 0-1.564.467-2.46 1.363v6.981h-1.982V4.433h1.63l.158 1.371h.06c.907-.887 1.911-1.612 3.256-1.612zm-11.588 1.63c-1.563 0-2.566 1.42-2.566 3.527s1.003 3.506 2.566 3.506c1.562 0 2.565-1.4 2.565-3.506s-1.003-3.526-2.565-3.526zm-36.495 0c-1.563 0-2.566 1.42-2.566 3.527s1.003 3.506 2.566 3.506c1.562 0 2.565-1.4 2.565-3.506s-1.003-3.526-2.565-3.526zm90.19.02c-.771 0-1.546.408-2.381 1.22v4.856c.774.673 1.568.917 2.176.917 1.467 0 2.564-1.305 2.564-3.627 0-2.061-.69-3.366-2.359-3.366zM43.971.19c.731 0 1.286.474 1.286 1.188 0 .693-.555 1.189-1.286 1.189s-1.285-.496-1.285-1.189c0-.714.554-1.188 1.285-1.188z" fill={fillColor} />
      </g>
    </svg>
  );
}

InternalLogo.propTypes = {
  color: PropTypes.oneOf(['black', 'white']),
};

InternalLogo.defaultProps = {
  color: 'white',
};