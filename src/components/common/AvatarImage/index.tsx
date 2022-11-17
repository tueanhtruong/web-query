import React, { HTMLProps } from 'react';
import cn from 'classnames';
import './styles.scss';
import { View } from 'src/components/common';

const Avatar: React.FC<Props> = ({ title, className, imageSize = '3rem', ...props }) => {
  return (
    <View
      className={cn('cmp-avatar-item', className)}
      style={{ height: imageSize, width: imageSize }}
      {...props}
      justify="center"
      align="center"
    >
      {title}
    </View>
  );
};

type Props = HTMLProps<HTMLDivElement> & {
  title: any;
  className?: string;
  imageSize?: string;
};

export default Avatar;
