/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { connect } from 'react-redux';
import cn from 'classnames';

import { Toastify } from 'src/services';
import appConfig from 'src/appConfig';
import { Icon, Text, View } from '../common';
import { IRootState } from 'src/redux/rootReducer';
import './styles.scss';
import { AVATAR_TYPE, COMMON_TYPE } from 'src/appConfig/constants';

const FileUpload: React.FC<Props> = ({
  className,
  onChange,
  innerRef,
  numberAllow = null,
  isAvatar,
  onError,
}) => {
  const [myFiles, setMyFiles] = useState<File[]>([]);
  const [rejectFiles, setRejectFiles] = useState<FileRejection[]>([]);

  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    setMyFiles(acceptedFiles);
    setRejectFiles(fileRejections);
  };

  // List MIME can be found here:
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: isAvatar ? AVATAR_TYPE : COMMON_TYPE,
    maxSize: isAvatar ? appConfig.MAXIMUM_AVATAR_SIZE : appConfig.MAXIMUM_FILE_SIZE,
  });

  useEffect(() => {
    if (rejectFiles.length > 0) {
      rejectFiles.forEach((file) => {
        const error = file.errors[0];
        isAvatar || Toastify.error(error.message);
      });
    }
    if (isAvatar && rejectFiles.length > 0) {
      if (rejectFiles[0]?.file?.size > appConfig.MAXIMUM_AVATAR_SIZE)
        onError('Your file size is greater than 16MB. Please try again.');
      else if (!rejectFiles[0]?.file.type.includes(AVATAR_TYPE))
        onError('Your file format is invalid. Please try again.');
    }
  }, [rejectFiles]);

  useEffect(() => {
    if (!!numberAllow && myFiles.length > numberAllow)
      return Toastify.error('Can not upload more than 2 files');
    if (myFiles.length > 0) onChange(myFiles);
  }, [myFiles]);

  // For more info about react dropzone follow:
  // https://react-dropzone.js.org/
  return (
    <View className={cn(className, 'cmp-file-upload')}>
      <View {...getRootProps({ className: 'cmp-file-upload__body' })}>
        {innerRef ? (
          <input data-testid="upload-input" {...getInputProps()} ref={innerRef} />
        ) : (
          <input data-testid="upload-input" {...getInputProps()} />
        )}
        <View isRow align="center">
          <Icon name="ic_plus" className="mr-8" />{' '}
          <Text>{'CLICK HERE TO UPLOAD FILE(S) OR DRAG & DROP HERE'}</Text>
        </View>
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    className?: string;
    innerRef?: any;
    numberAllow?: number;
    onChange: (...args: any[]) => void;
    isAvatar?: boolean;
    onError?: (value: any) => void;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);
