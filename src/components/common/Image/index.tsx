import React from 'react';
import { connect } from 'react-redux';

const Image: React.FC<Props> = ({ alt = 'unset', ...props }) => {
  return <img alt={alt} {...props} />;
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Image);
