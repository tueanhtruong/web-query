/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux';

import { IRootState } from 'src/redux/rootReducer';

// import { View } from 'src/components/common';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './styles.scss';
// import { useEffect, useState } from 'react';
// import { removeFileProgress } from 'src/redux/fileRedux/actions';
// import { Close } from '@material-ui/icons';
// import { IconButton, Tooltip } from '@material-ui/core';

const UploadProgressContainer: React.FC<Props> = () => {
  return null;
  // const [showUploadModal, setShowUpload] = useState(false);
  // const [userDidClose, setUserAction] = useState(false);

  // useEffect(() => {
  //   checkRemoveCompletedUpload();
  //   checkShowingUpload();
  //   checkHideUpload();
  // }, [filesProgress]);

  // const handleCloseUploadModal = () => {
  //   setUserAction(true);
  //   setShowUpload(false);
  // };

  // const handleRemoveCompletedFile = (file) => {
  //   setTimeout(() => {
  //     onRemoveFileProgress({ id: file.id });
  //   }, 2000);
  // };

  // const checkRemoveCompletedUpload = () => {
  //   filesProgress.forEach((file) => {
  //     if (file.progress === 100) handleRemoveCompletedFile(file);
  //   });
  // };

  // const checkShowingUpload = () => {
  //   if (showUploadModal || userDidClose) return;

  //   if (filesProgress.length > 0) setShowUpload(true);
  // };

  // const checkHideUpload = () => {
  //   if (!showUploadModal) return;

  //   if (filesProgress.length === 0) {
  //     setShowUpload(false);

  //     // Clear user action for next time upload
  //     setUserAction(false);
  //   }
  // };

  // return (
  //   <TransitionGroup>
  //     {showUploadModal && (
  //       <CSSTransition key="upload-modal" timeout={400} classNames="upload-transition">
  //         <View className="ctn-upload__container">
  //           <h3 className="mb-2">Upload Progress</h3>

  //           <View className="ctn-upload__close">
  //             <Tooltip title={'Hide'}>
  //               <IconButton onClick={handleCloseUploadModal}>
  //                 <Close />
  //               </IconButton>
  //             </Tooltip>
  //           </View>

  //           <TransitionGroup>
  //             {filesProgress.map((file) => {
  //               return (
  //                 <CSSTransition key={file.id} timeout={200} classNames="file-transition">
  //                   <View className="ctn-upload__item">
  //                     <span className="ctn-upload__progress-name">{file.fileName}</span>

  //                     <View flexGrow={1} className="ctn-upload__progress-bar-container">
  //                       <span
  //                         style={{ width: `${file.progress}%` }}
  //                         className="ctn-upload__progress-bar"
  //                       />
  //                     </View>

  //                     {/* <span className="ctn-upload__progress-percent">{file.progress}%</span> */}
  //                   </View>
  //                 </CSSTransition>
  //               );
  //             })}
  //           </TransitionGroup>
  //         </View>
  //       </CSSTransition>
  //     )}
  //   </TransitionGroup>
  // );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {};

const mapStateToProps = (state: IRootState) => ({
  // filesProgress: state.file.filesProgress,
});

const mapDispatchToProps = {
  // onRemoveFileProgress: removeFileProgress,
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadProgressContainer);
