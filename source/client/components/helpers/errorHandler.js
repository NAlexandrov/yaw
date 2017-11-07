import { message } from 'antd';

function showError(err) {
  if (typeof err === 'string') {
    return message.error(err);
  }

  const errorTitle = err.toString();
  const { error: errorMessage } = err.response.data;

  if (errorMessage) {
    return message.error(`${errorMessage}`);
  }

  return message.error(`${errorTitle}`);
}

function errorHandler(err) {
  if (typeof err === 'function') {
    return (msg) => {
      err();
      showError(msg);
    };
  }

  showError(err);

  if (err instanceof Error) {
    throw err;
  }

  return null;
}

export default errorHandler;
