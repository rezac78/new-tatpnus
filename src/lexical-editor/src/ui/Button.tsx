/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import './Button.css';

import * as React from 'react';

import joinClasses from '../utils/joinClasses';
// interface Interface {
//     'data-test-id'?: string;
//     children: ReactNode;
//     className?: string;
//     disabled?: boolean;
//     onClick: () => void;
//     small?: boolean;
//     title?: string;
// }
const Button:any = ({
  'data-test-id': dataTestId,
  children,
  className,
  onClick,
  disabled,
  small,
  title,
}:any)=> {
  return (
    <button
      disabled={disabled}
      className={joinClasses(
        'Button__root',
        disabled && 'Button__disabled',
        small && 'Button__small',
        className,
      )}
      onClick={onClick}
      title={title}
      aria-label={title}
      {...(dataTestId && {'data-test-id': dataTestId})}>
      {children}
    </button>
  );
}

export default Button
