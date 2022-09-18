import React from 'react';

import Svg, { Path } from 'react-native-svg';

export const MailboxIcon = props => {
  return (
    <Svg
      width={props.size}
      height={props.size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path d="M0 0h48v1H0z" fill="#fff" fillRule="evenodd" />
    </Svg>
  );
};
