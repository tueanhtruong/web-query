import { connect } from 'react-redux';
import { Button, DatePicker, Input, Text, View } from 'src/components/common';
import { hideAllDialog, hideDialog, showDialog } from 'src/redux/dialog/dialogSlice';
import { DIALOG_TYPES } from 'src/redux/dialog/type';

import { IRootState } from 'src/redux/rootReducer';
import { Toastify } from 'src/services';
import { emptyFunction } from 'src/utils';
// import { MY_PROFILE_IDS } from '../ProfileContainers/helpers';
import './styles.scss';

const LoadingContainer: React.FC<Props> = ({ onShowDialog, onHideDialog, onHideAllDialog }) => {
  // const [tab, setTab] = useState<string>(MY_PROFILE_IDS.GENERAL_INFORMATION);
  const showContentDialog = () => {
    onShowDialog({
      type: DIALOG_TYPES.CONTENT_DIALOG,
      data: {
        title: 'Dialog Content Dialog',
        content: (
          <View>
            <Input label="aaaaaaaaaa" placeholder="asdasd" />
            <Input label="bbbbbbb" placeholder="cvbcvb" />

            <View justify="flex-end" isRow className="mt-16">
              <Button
                variant="secondary-outline"
                className="mr-16"
                onClick={() => {
                  Toastify.success('Cancel Click');
                  onHideDialog();
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  Toastify.info('Ok Click');
                  onHideDialog();
                }}
              >
                Ok
              </Button>
            </View>
          </View>
        ),
        cancelText: 'Cancel',
        okText: 'Ok',
        onCancel: () => onHideDialog(),
      },
    });
  };

  const showYesNoDialog = () => {
    onShowDialog({
      type: DIALOG_TYPES.YESNO_DIALOG,
      data: {
        title: 'Yes No Dialog',
        content: (
          <View>
            <Input label="aaaaaaaaaa" placeholder="asdasd" />
            <Input label="bbbbbbb" placeholder="cvbcvb" />
          </View>
        ),
        cancelText: 'Cancel',
        okText: 'Ok',
        onOk: () => {
          Toastify.info('Ok Click');
          onHideDialog();
        },
        onCancel: () => {
          Toastify.info('Cancel Click');
          onHideDialog();
        },
      },
    });
  };

  const showYesNoReconfirmDialog = () => {
    onShowDialog({
      type: DIALOG_TYPES.YESNO_DIALOG,
      data: {
        title: 'Yes No Dialog',
        content: (
          <View>
            <Input label="aaaaaaaaaa" placeholder="asdasd" />
            <Input label="bbbbbbb" placeholder="cvbcvb" />
          </View>
        ),
        cancelText: 'Cancel',
        okText: 'Ok',
        onOk: () => {
          Toastify.info('Ok Click');
          onHideAllDialog();
        },
        onCancel: () => {
          Toastify.info('Cancel Click');
          onHideAllDialog();
        },
        reconfirm: {
          ok: {
            show: true,
            title: 'Ok Confirmation Title',
            content: 'Ok Content',
          },
          cancel: {
            show: true,
            title: 'Cancel Confirmation Title',
            content: 'Cancel Content',
          },
        },
      },
    });
  };

  return (
    <View>
      <Text size={40} className="fw-bold mb-16">
        Dev Page v2
      </Text>
      <View>
        <View>
          <Text size={24} className="fw-bold mb-16">
            Dialog
          </Text>
          <View isRow>
            <Button onClick={showContentDialog} className="mb-32 mr-16">
              Content Dialog
            </Button>
            <Button onClick={showYesNoDialog} className="mb-32 mr-16">
              YES NO Dialog
            </Button>
            <Button onClick={showYesNoReconfirmDialog} className="mb-32 mr-16">
              YES NO + Reconfirm Answer Dialog
            </Button>
          </View>
          <hr />
        </View>
        <View>
          <Text size={24} className="fw-bold mb-16">
            Accordion
          </Text>
          {/* <Accordion title={'Test Accordion'} /> */}
          <hr />
        </View>
        <View>
          <Text size={24} className="fw-bold mb-16">
            Date Picker
          </Text>
          <DatePicker value={new Date().toISOString()} onChange={emptyFunction} />
          <hr />
        </View>

        <View>
          <Text size={24} className="fw-bold mb-16">
            Toast
          </Text>
          <View isRow>
            <Button
              onClick={() => {
                Toastify.success('Success');
              }}
            >
              Success
            </Button>
            <Button
              onClick={() => {
                Toastify.info('Info');
              }}
            >
              Info
            </Button>
            <Button
              onClick={() => {
                Toastify.warning('Warning');
              }}
            >
              Warning
            </Button>
            <Button
              onClick={() => {
                Toastify.error('Error');
              }}
            >
              Error
            </Button>
          </View>
          <hr />
        </View>
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {};

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {
  onShowDialog: showDialog,
  onHideDialog: hideDialog,
  onHideAllDialog: hideAllDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadingContainer);
