import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { IRootState } from 'src/redux/rootReducer';
import './styles.scss';
import { useTranslation } from 'react-i18next';

const Text: React.FC<Props> = ({
  children,
  className,
  variant,
  size = 16,
  style = {},
  isTranslatable = false,
  ...props
}) => {
  const { i18n } = useTranslation();
  const textStyle: React.CSSProperties = { ...style, fontSize: size };
  return (
    <p
      style={textStyle}
      className={cn('cmp-text', className, {
        [`cmp-text__${variant}`]: !!variant,
      })}
      {...props}
    >
      {isTranslatable && typeof children === 'string' ? i18n.t<string>(`${children}`) : children}
    </p>
  );
};

export type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> & {
    variant?: 'title' | 'titleUnderline';
    size?: number;
    isTranslatable?: boolean;
    children?: React.ReactNode;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Text);
