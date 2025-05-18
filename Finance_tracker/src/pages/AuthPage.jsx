import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export default function AuthPage({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      {isLogin
        ? <LoginForm onLogin={onAuth} />
        : <RegisterForm onRegister={onAuth} />}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Go to Register' : 'Go to Login'}
      </button>
    </div>
  );
}
