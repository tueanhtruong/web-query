import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'src/redux/rootReducer';
import { Callback } from 'src/redux/types';
import { Prompt } from 'react-router-dom';
import urljoin from 'url-join';
import { hideDialog, showDialog } from 'src/redux/dialog/dialogSlice';
import { DIALOG_TYPES } from 'src/redux/dialog/type';
import i18n from '../../assets/i18n';

const Banner: React.FC<Props> = ({
  when,
  message,
  title,
  cancelTitle = 'Confirm Cancel',
  cancelMessage = 'Cancel editing?',
  cancelOkText = 'Yes, confirm',
  cancelText = 'No, keep it',
  shouldBlockNavigation,
  navigate,
  onShowDialog,
  onHideDialog,
  confirmExitTabName,
}) => {
  const [lastLocation, setLastLocation] = useState(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);

  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      // Navigate to the previous blocked location with your navigate function
      navigate(urljoin(lastLocation.pathname, lastLocation.search));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmedNavigation, lastLocation]);

  const showDialog = (location = { search: '' }) => {
    const isAskConfirmCancel = location.search.includes(confirmExitTabName);
    onShowDialog({
      type: DIALOG_TYPES.YESNO_DIALOG,
      data: {
        cancelText: i18n.t(isAskConfirmCancel ? cancelText : 'No, stay'),
        onCancel: onHideDialog,
        onOk: handleConfirmNavigationClick,
        okText: i18n.t(isAskConfirmCancel ? cancelOkText : 'Yes, leave'),
        content: i18n.t(isAskConfirmCancel ? cancelMessage : message),
        // iconVariant: 'warning',
        title: i18n.t(isAskConfirmCancel ? cancelTitle : title),
        maxWidth: 'xs',
      },
    });
  };

  const handleBlockedNavigation = (nextLocation) => {
    if (!confirmedNavigation && shouldBlockNavigation(nextLocation)) {
      showDialog(nextLocation);
      setLastLocation(nextLocation);
      return false;
    }
    return true;
  };

  const handleConfirmNavigationClick = () => {
    setConfirmedNavigation(true);
    onHideDialog();
  };
  return <Prompt when={true} message={handleBlockedNavigation} />;
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    when?: boolean;
    message?: string;
    title?: string;
    cancelTitle?: string;
    cancelMessage?: string;
    cancelOkText?: string;
    cancelText?: string;
    shouldBlockNavigation?: (location: string) => boolean;
    navigate?: Callback;
    confirmExitTabName?: any;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {
  onShowDialog: showDialog,
  onHideDialog: hideDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
