export interface ContentDialogData {
  title?: string;
  iconTitle?: React.ReactNode;
  content?: string | React.ReactElement;
  okText?: string;
  cancelText?: string;
  onOk?: (...arg: any[]) => void;
  onCancel?: (...arg: any[]) => void;
  overflowVisible?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  hideTitle?: boolean;
  fullScreen?: boolean;
  hideCloseButton?: boolean;
  reconfirm?: {
    ok?: {
      show?: boolean;
      title?: string;
      content?: string;
      okBtn?: string;
      cancelBtn?: string;
    };
    cancel?: {
      show?: boolean;
      title?: string;
      content?: string;
      okBtn?: string;
      cancelBtn?: string;
    };
  };
}

export enum DialogDataKey {
  FIRST = 'first',
  SECOND = 'second',
  THIRD = 'third',
}

export interface ConfirmDialogData {
  title?: string;
  iconTitle?: React.ReactNode;
  content?: string | React.ReactElement;
  okText?: string;
  cancelText?: string;
  onOk?: (...arg: any[]) => void;
  onCancel?: (...arg: any[]) => void;
  overflowVisible?: boolean;
  hideCloseButton?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

export enum DIALOG_TYPES {
  CONTENT_DIALOG = 'CONTENT_DIALOG',
  YESNO_DIALOG = 'YESNO_DIALOG',
  OK_DIALOG = 'OK_DIALOG',
}

export type DialogData = ContentDialogData & ConfirmDialogData;
