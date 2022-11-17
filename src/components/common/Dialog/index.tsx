import {
  CircularProgress,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogContentProps,
  DialogProps,
  DialogTitle,
  IconButton,
  Grow,
} from '@material-ui/core';
// import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { isEmpty } from 'src/validations';
import { Text, View } from '..';
import { REASON_CLOSE_DIALOG } from './helpers';
import './styles.scss';
import cn from 'classnames';
import { Callback } from 'src/redux/types';
import { IoClose } from 'react-icons/io5';

const Dialog: React.FC<
  Omit<DialogProps, 'onClose'> & {
    iconTitle?: React.ReactNode;
    title: string;
    dialogActions?: React.ReactNode;
    dialogContentClasses?: DialogContentProps['classes'];
    fullScreen?: boolean;
    loading?: boolean;
    overflowVisible?: boolean;
    disabledButton?: boolean;
    hideTitle?: boolean;
    onClose?: Callback;
  }
> = ({
  iconTitle,
  children,
  title,
  dialogActions,
  onClose,
  dialogContentClasses,
  fullScreen,
  loading,
  overflowVisible,
  disabledButton,
  hideTitle,
  open,
  ...dialogProps
}) => {
  return (
    <MuiDialog
      open={open}
      // onClose={onClose}
      {...dialogProps}
      fullScreen={fullScreen}
      // disableBackdropClick={loading || disabledButton}
      classes={{
        paper: cn('cmp-dialog', {
          'cmp-dialog__content--visible': overflowVisible,
        }),
        container: 'cmp-dialog__container',
      }}
      TransitionComponent={Grow}
      BackdropProps={{
        transitionDuration: 0.4,
      }}
      {...dialogProps}
    >
      {!disabledButton && (
        <IconButton
          className="cmp-dialog__close-icon"
          onClick={(e) => {
            // e.stopPropagation();
            // e.preventDefault();
            onClose({}, REASON_CLOSE_DIALOG.CLOSE_ICON_CLICK);
          }}
        >
          <IoClose />
        </IconButton>
      )}
      {!hideTitle && (
        <DialogTitle className="cmp-dialog__title" disableTypography>
          <View isRow align="center" justify="space-between">
            <View isRow align="center">
              {iconTitle && <i className="mr-8">{iconTitle}</i>}
              <Text size={18} className="fw-bold mr-8">
                {isEmpty(title) ? ` ` : title}
              </Text>
              {loading && <CircularProgress size={25} />}
            </View>
          </View>
        </DialogTitle>
      )}
      <DialogContent
        classes={{
          root: cn('cmp-dialog__content', {
            'cmp-dialog__content--visible': overflowVisible,
          }),
        }}
      >
        {children}
      </DialogContent>
      {!isEmpty(dialogActions) && (
        <DialogActions
          classes={{
            root: 'cmp-dialog__footer',
          }}
        >
          {dialogActions}
        </DialogActions>
      )}
    </MuiDialog>
  );
};

export default Dialog;
