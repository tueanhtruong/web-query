import React from 'react';
import { connect } from 'react-redux';
import { Button, Dialog, View } from 'src/components/common';
import { hideDialog, showDialog } from 'src/redux/dialog/dialogSlice';
import { DialogData, DIALOG_TYPES } from 'src/redux/dialog/type';
import { IRootState } from 'src/redux/rootReducer';
import { Callback } from 'src/redux/types';

const DialogRenderer: React.FC<Props> = ({
  data = {},
  dialogType = '',
  onShowDialog,
  onHideDialog,
  open = false,
}) => {
  const {
    cancelText = '',
    content,
    fullScreen = false,
    hideTitle = false,
    maxWidth = 'sm',
    okText = '',
    onCancel,
    onOk,
    overflowVisible = false,
    reconfirm,
    title = '',
    hideCloseButton,
  } = data;

  const onNoClick = () => {
    const cancelCallback = () => {
      if (data.onCancel) {
        data.onCancel();
      } else {
        onHideDialog();
      }
    };

    switch (dialogType) {
      case DIALOG_TYPES.YESNO_DIALOG:
        if (data.reconfirm?.cancel?.show) {
          showReconfirmDialog('cancel');
        } else {
          cancelCallback();
        }
        return;
      default:
        onHideDialog();
    }
  };

  const onYesClick = () => {
    switch (dialogType) {
      case DIALOG_TYPES.YESNO_DIALOG:
        if (data.reconfirm?.cancel?.show) {
          showReconfirmDialog('ok');
        } else {
          onOk();
        }
        return;
      default:
        onOk();
    }
  };

  const showReconfirmDialog = (type: 'ok' | 'cancel') => {
    switch (type) {
      case 'ok':
        const dataOk = data.reconfirm?.ok;
        onShowDialog({
          type: DIALOG_TYPES.YESNO_DIALOG,
          data: {
            title: dataOk?.title || 'Confirmation',
            content: dataOk?.content || 'Are you sure you want to apply this change?',
            cancelText: dataOk?.cancelBtn || 'Cancel',
            okText: dataOk?.okBtn || 'Confirm',
            onOk,
            onCancel: () => {
              onHideDialog();
            },
          },
        });
        return;
      case 'cancel':
        const dataCancel = reconfirm?.cancel;
        onShowDialog({
          type: DIALOG_TYPES.YESNO_DIALOG,
          data: {
            title: dataCancel?.title || 'Confirmation',
            content: dataCancel?.content || 'Are you sure you want to apply this change?',
            cancelText: dataCancel?.cancelBtn || 'Cancel',
            okText: dataCancel?.okBtn || 'Confirm',
            onOk: () => {
              onCancel();
            },
            onCancel: () => {
              onHideDialog();
            },
          },
        });
        return;
      default:
        onHideDialog();
    }
  };

  return (
    <Dialog
      open={open}
      title={title}
      maxWidth={maxWidth}
      fullWidth
      onClose={() => onNoClick()}
      overflowVisible={overflowVisible || false}
      dialogActions={
        <DiaLogAction {...{ dialogType, cancelText, okText, onNoClick, onYesClick }} />
      }
      hideTitle={hideTitle}
      fullScreen={fullScreen}
      disabledButton={hideCloseButton}
    >
      {content}
      {/* <DialogBody dialogType={dialogType} content={content as React.ReactElement} /> */}
    </Dialog>
  );
};

type DialogActionType = {
  dialogType: string;
  cancelText: string;
  onNoClick: Callback;
  onYesClick: Callback;
  okText: string;
};

const DiaLogAction: React.FC<DialogActionType> = ({
  dialogType,
  cancelText,
  onNoClick,
  onYesClick,
  okText,
}) => {
  switch (dialogType) {
    case DIALOG_TYPES.YESNO_DIALOG:
      return (
        <View isRowWrap>
          <Button variant="outline" color="primary" onClick={() => onNoClick()} className="mr-8">
            {cancelText || 'Cancel'}
          </Button>
          <Button color="primary" onClick={() => onYesClick()}>
            {okText || 'Confirm'}
          </Button>
        </View>
      );
    case DIALOG_TYPES.OK_DIALOG:
      return (
        <View flexGrow={1} align="center">
          <Button color="primary" onClick={() => onYesClick()}>
            {okText || 'Confirm'}
          </Button>
        </View>
      );
    default:
      return null;
  }
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    data: DialogData;
    dialogType: string;
    open: boolean;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {
  onShowDialog: showDialog,
  onHideDialog: hideDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogRenderer);
