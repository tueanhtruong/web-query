import React, { Fragment, useRef } from 'react';
import { connect } from 'react-redux';
import { Button } from 'src/components/common';
import FileUpload from 'src/components/FileUpload';
// import { getPresignedUrlsAsync } from 'src/redux/fileRedux/actions';
// import { FileUploadType } from 'src/redux/fileRedux/types';
// import { AttachmentPayload } from 'src/redux/fileRedux/types';
import { IRootState } from 'src/redux/rootReducer';
import { Callback } from 'src/redux/types';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import './styles.scss';
import { FileUploadType } from 'src/redux/file/types';

//   import { trimUrl } from 'src/utils';

const AttachmentUploadButton: React.FC<Props> = ({
  filetype = 'avatars',
  icon,
  content = 'upload',
  onAddAttachment,
  // onGetPresignedUrls,
  isAvatar,
  onError,
}) => {
  const inputRef = useRef(null);

  const handleOpenSelectFileModal = () => {
    inputRef.current.click();
  };

  const handleSelectFile = (files: File[]) => {
    onAddAttachment(files);
    // inputRef.current.value = null;
  };

  return (
    <Fragment>
      <Button
        variant="outline"
        className="mb-4 cmp-upload-button"
        style={{ height: 40 }}
        onClick={handleOpenSelectFileModal}
        type="button"
      >
        <span className="cmp-upload-button__icon">{icon}</span>
        {content}
      </Button>
      <FileUpload
        className="is-hidden"
        onChange={handleSelectFile}
        innerRef={inputRef}
        isAvatar={isAvatar}
        onError={(errorMessage) => onError(errorMessage)}
      />
    </Fragment>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    filetype: FileUploadType;
    icon?: ReactJSXElement;
    content: string;
    onAddAttachment: Callback;
    isAvatar?: boolean;
    onError: (value: any) => void;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {
  // onAddTestingAttachment: addTestingAttachmentAsync.request,
  // onGetPresignedUrls: getPresignedUrlsAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(AttachmentUploadButton);
