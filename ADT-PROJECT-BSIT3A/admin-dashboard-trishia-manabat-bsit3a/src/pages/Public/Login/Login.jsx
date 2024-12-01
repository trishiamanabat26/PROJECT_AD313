import { useState, useRef, useCallback, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../../utils/hooks/useDebounce';
import axios from 'axios';
import netflixxImage from './netflixx.jpg'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFieldsDirty, setIsFieldsDirty] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const userInputDebounce = useDebounce({ email, password }, 2000);
  const [debounceState, setDebounceState] = useState(false);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleShowPassword = useCallback(() => {
    setIsShowPassword((value) => !value);
  }, [isShowPassword]);

  const handleOnChange = (event, type) => {
    setDebounceState(false);
    setIsFieldsDirty(true);

    switch (type) {
      case 'email':
        setEmail(event.target.value);
        break;

      case 'password':
        setPassword(event.target.value);
        break;

      default:
        break;
    }
  };

  const handleLogin = async () => {
    const data = { email, password };
    setStatus('loading');

    await axios({
      method: 'post',
      url: '/admin/login',
      data,
      headers: { 'Access-Control-Allow-Origin': '*' },
    })
      .then((res) => {
        console.log(res);
        
        localStorage.setItem('accessToken', res.data.access_token);
        navigate('/main/movies');
        setStatus('idle');
      })
      .catch((e) => {
        setError(e.response.data.message);
        console.log(e);
        setStatus('idle');
      });
  };

  useEffect(() => {
    setDebounceState(true);
  }, [userInputDebounce]);

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${netflixxImage})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="login-form-container">
        <form>
          <div className="login-form">
            <h3 className="login-title">Ready for Your Next Favorite Movie?</h3>

            {error && <span className="login-error">{error}</span>}

            <div className="form-group">
              <label className="form-label">Email:</label>
              <input
                type="email"
                name="email"
                ref={emailRef}
                className="form-input"
                value={email}
                onChange={(e) => handleOnChange(e, 'email')}
                placeholder="Enter your email"
              />
              {debounceState && isFieldsDirty && email === '' && (
                <span className="error-text">This field is required</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Password:</label>
              <input
                type={isShowPassword ? 'text' : 'password'}
                name="password"
                ref={passwordRef}
                className="form-input"
                value={password}
                onChange={(e) => handleOnChange(e, 'password')}
                placeholder="Enter your password"
              />
              {debounceState && isFieldsDirty && password === '' && (
                <span className="error-text">This field is required</span>
              )}
            </div>

            <div className="show-password" onClick={handleShowPassword}>
              {isShowPassword ? 'Hide' : 'Show'} Password
            </div>

            <button
              type="button"
              className="login-btn"
              disabled={status === 'loading'}
              onClick={() => {
                if (status === 'loading') {
                  return;
                }
                if (email && password) {
                  handleLogin();
                } else {
                  setIsFieldsDirty(true);
                  if (email === '') {
                    emailRef.current.focus();
                  }
                  if (password === '') {
                    passwordRef.current.focus();
                  }
                }
              }}
            >
              {status === 'idle' ? 'Sign In' : 'Loading...'}
            </button>

            <div className="register-link">
              <a href="/register"> Register Now</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
