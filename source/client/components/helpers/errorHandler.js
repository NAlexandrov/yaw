import { message } from 'antd';

function errorHandler(err) {
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

export default errorHandler;
