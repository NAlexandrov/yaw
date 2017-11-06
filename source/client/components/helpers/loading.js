import { message } from 'antd';

function loading(msg, duration = 0) {
  return message.loading(msg, duration);
}

export default loading;
