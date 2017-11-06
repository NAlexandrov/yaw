import React from 'react';

const LoginForm = () => (
  <div style={{ width: 200, margin: '50px auto' }}>
    Войти через: <a href='/auth/yandex'>Yandex</a> или <a href='/auth/google'>Google</a>
  </div>
);

export default LoginForm;
