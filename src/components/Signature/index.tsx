import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import SignatureCanvas, { ReactSignatureCanvasProps } from 'react-signature-canvas';
import { IRootState } from 'src/redux/rootReducer';
import './styles.scss';
import Element from '../common/Element';
import { isEmpty } from 'src/validations';
import { FiTrash } from 'react-icons/fi';
import { View } from '../common';
import { useComponentDidMount } from 'src/hooks';
// import { getDecodeUrlAsync } from 'src/redux/fileRedux/actions';
// import i18n from 'src/assets/i18n';

const Signature: React.FC<Props> = ({
  label,
  onChange,
  errorMessage,
  containerClassName,
  classNames,
  name,
  onBlur,
  onClear,
  value,
  disabled = false,
  getUrlWhenMount = false,
  // onGetDecodeUrl,
  ...props
}) => {
  const signRef = useRef<SignatureCanvas>();
  const [isSignEmpty, setIsEmpty] = useState(true);

  // allowTaint: true,
  // foreignObjectRendering: true

  const getDataFromRemoteURL = async (value: string) => {
    return new Promise((resolve) => {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      img.crossOrigin = 'Anonymous';

      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.src = value;
    });
  };

  useComponentDidMount(() => {
    if (!isEmpty(value)) {
      setIsEmpty(false);

      if (value?.startsWith('http')) {
        if (!getUrlWhenMount)
          getDataFromRemoteURL(value).then((dataUrl: string) => {
            signRef.current.fromDataURL(dataUrl);
          });
      } else {
        signRef.current.fromDataURL(value);
      }
    }
  });

  useEffect(() => {
    if (getUrlWhenMount && value?.startsWith('http')) {
      // onGetDecodeUrl({
      //   filePath: value,
      //   callback: response => {
      //     getDataFromRemoteURL(response).then((dataUrl: string) => {
      //       if (dataUrl) signRef.current?.fromDataURL(dataUrl);
      //     });
      //   },
      // });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  React.useEffect(() => {
    if (disabled) signRef.current?.off();
  }, [disabled]);

  const handleBeginDraw = () => {
    setIsEmpty(false);
  };

  const handleClear = () => {
    signRef.current.clear();
    onClear && onClear(name, null);
    setIsEmpty(true);
  };

  const handleSign = () => {
    // const data = signRef.current?.toDataURL();
    const data = signRef.current.getCanvas().toDataURL('image/png');
    onChange(name, data);
  };

  // For more information:

  return (
    <Element
      errorMessage={errorMessage}
      label={label}
      className={cn('cmp-signature', containerClassName)}
    >
      <View
        className={cn('cmp-signature__container', {
          'cmp-signature__container--disabled': disabled,
        })}
      >
        <SignatureCanvas
          canvasProps={{ className: 'cmp-signature__table' }}
          ref={signRef}
          onBegin={handleBeginDraw}
          onEnd={handleSign}
        />

        <View renderIf={isSignEmpty} isRow justify="center" className="cmp-signature__footer">
          {'SIGN HERE'}
        </View>

        {!isSignEmpty && !disabled && (
          <FiTrash className="cmp-signature__footer__icon" onClick={handleClear} />
        )}
      </View>
    </Element>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  ReactSignatureCanvasProps & {
    errorMessage?: string;
    containerClassName?: string;
    classNames?: string;
    placeholder?: string;
    disabled?: boolean;
    name?: string;
    label?: string | React.ReactNode;
    value?: string;
    onChange: (name: string, value: any) => void;
    onBlur?: (name: string, value: boolean) => void;
    onClear?: (name: string, value: any) => void;
    getUrlWhenMount?: boolean;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {
  // onGetDecodeUrl: getDecodeUrlAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signature);
