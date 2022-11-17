import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { hideDialog } from 'src/redux/dialog/dialogSlice';
import { DialogDataKey } from 'src/redux/dialog/type';
import { IRootState } from 'src/redux/rootReducer';

const DialogRenderer = React.lazy(() => import('./DialogRenderer'));

const DialogContainer: React.FC<Props> = ({ data, isVisible, dialogType, hideDialog, loading }) => {
  return (
    <Suspense fallback={null}>
      <DialogRenderer
        open={isVisible[DialogDataKey.FIRST]}
        data={data[DialogDataKey.FIRST]}
        dialogType={dialogType[DialogDataKey.FIRST]}
      />
      <DialogRenderer
        open={isVisible[DialogDataKey.SECOND]}
        data={data[DialogDataKey.SECOND]}
        dialogType={dialogType[DialogDataKey.SECOND]}
      />

      <DialogRenderer
        open={isVisible[DialogDataKey.THIRD]}
        data={data[DialogDataKey.THIRD]}
        dialogType={dialogType[DialogDataKey.THIRD]}
      />
    </Suspense>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {};

const mapStateToProps = (state: IRootState) => {
  const { dialog } = state;
  return {
    isVisible: dialog.isVisible,
    dialogType: dialog.type,
    data: dialog.data,
    loading: dialog.loading,
  };
};

const mapDispatchToProps = {
  hideDialog: hideDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogContainer);
