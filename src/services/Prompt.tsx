import React from 'react';
import { Beforeunload } from 'react-beforeunload';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import RouteLeavingGuard from 'src/components/RouteLeavingGuard';

const Prompt: React.FC<Props> = ({
  history,
  condition,
  children,
  message,
  title,
  cancelTitle,
  cancelMessage,
  cancelOkText,
  cancelText,
  confirmExitTabName,
}) => {
  return (
    <Beforeunload onBeforeunload={() => "You'll lose your data!"}>
      <RouteLeavingGuard
        navigate={(path) => history.push(path)}
        shouldBlockNavigation={condition}
        message={message}
        title={title}
        cancelTitle={cancelTitle}
        cancelMessage={cancelMessage}
        cancelOkText={cancelOkText}
        cancelText={cancelText}
        confirmExitTabName={confirmExitTabName}
      />
      {children}
    </Beforeunload>
  );
};

type BaseProps = {};

type Props = RouteComponentProps<BaseProps> & {
  condition?: (location: any) => boolean;
  history?: any;
  children?: any;
  message?: string;
  title?: string;
  cancelTitle?: string;
  cancelMessage?: string;
  cancelOkText?: string;
  cancelText?: string;
  confirmExitTabName?: any;
};

export default withRouter(Prompt);
