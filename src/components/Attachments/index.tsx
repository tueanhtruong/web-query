import React from 'react';
import { FiTrash } from 'react-icons/fi';
import { connect } from 'react-redux';
// import { MODAL_TYPES } from 'src/appConfig/modal';
import { Grid, View, Button } from 'src/components/common';
import { AttachmentPayload } from 'src/redux/file/types';
// import { closeModal, showModal } from 'src/redux/modalRedux/actions';
// import { AttachmentPayload } from 'src/redux/fileRedux/types';
import { IRootState } from 'src/redux/rootReducer';
import { Callback } from 'src/redux/types';
// import { removeTestingAttachmentAsync } from 'src/redux/testingRedux/actions';
// import { RemoveTestingAttachmentPayload } from 'src/redux/tripRedux/types';
import { isEmpty } from 'src/validations';
import FileRenderer from '../FileRenderer';

const Attachments: React.FC<Props> = ({ data, onDelete }) => {
  const canRemoveAttachment = !!onDelete;

  const handleRemoveFile = (idx: number) => {
    const updateFiles = data.filter((x, id) => id !== idx);
    onDelete(updateFiles);
  };

  // const handleOpenModalConfirmRemoveFile = (fileId: string) => {
  //   const payload: RemoveTestingAttachmentPayload = {
  //     fileId: fileId,
  //     tripId,
  //     travelerId,
  //   };
  //   onShowModal({
  //     type: MODAL_TYPES.yesNoModal,
  //     data: {
  //       title: 'Delete File',
  //       message: 'Are you sure that you want to delete this file?',
  //       onOk: () => removeFunction(payload),
  //       onCancel: onHideModal,
  //     },
  //   });
  // };

  if (isEmpty(data)) return null;

  return (
    <View className="cmp-test-item__attachment-container">
      <Grid.Wrap>
        {data.map((x, idx) => [
          <Grid.Item
            key={`attachment-key-${idx}`}
            variant={canRemoveAttachment ? 'is-full' : 'is-half'}
          >
            <View isRowWrap align="center">
              <FileRenderer downloadFileName={x.name} url={x.fileUrl} label={x.name} />
              {canRemoveAttachment && (
                <Button
                  variant="text"
                  className="ml-8 has-text-danger"
                  onClick={(e) => handleRemoveFile(idx)}
                >
                  <FiTrash />
                </Button>
              )}
            </View>
          </Grid.Item>,
        ])}
      </Grid.Wrap>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    data: AttachmentPayload[];
    onDelete?: Callback;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Attachments);
