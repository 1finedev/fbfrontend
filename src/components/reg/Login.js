import React, { useState, useContext, useEffect, useRef } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Tooltip } from 'reactstrap';
import { AuthContext } from './../../context/AuthContext';
import AuthService from './../../services/AuthService';

const Login = props => {
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [done, setDone] = useState(false);
  const authContext = useContext(AuthContext);
  const { message, isAuthenticated } = useContext(AuthContext);

  const { handleSubmit, register, errors } = useForm();
  let timerID = useRef(null);

  const removeClass = () => {
    setTimeout(() => {
      authContext.setMessage('');
    }, 2000);
  };

  const Redirect = () => {
    setDone(true);
    timerID = setTimeout(() => {
      // props.history.push('/profile');
      window.location.href = '/profile';
    }, 1000);
    return;
  };

  const onSubmit = async values => {
    const data = await AuthService.login(values);
    const { isAuthenticated, user, error } = data;

    if (isAuthenticated) {
      authContext.setUser(user);
      authContext.setRole(user.role);
      authContext.setIsAuthenticated(isAuthenticated);
      return;
    } else {
      authContext.setMessage(error);
      removeClass();
      return;
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      Redirect();
    }
    return () => {
      clearTimeout(timerID);
    };
  });

  return (
    <div>
      <div className="container login">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h3>Sign In</h3>
              <div className="d-flex justify-content-end social_icon">
                <span>
                  <i className=" fa fa-facebook-square" aria-hidden="true"></i>
                </span>
                <span>
                  <i
                    className="fa fa-google-plus-square"
                    aria-hidden="true"
                  ></i>
                </span>
                <span>
                  <i className="fa fa-instagram" aria-hidden="true"></i>{' '}
                </span>
              </div>
            </div>
            <div className="card-body">
              {message ? (
                <h6 className="regtext1" id="15">
                  {' '}
                  {message}{' '}
                </h6>
              ) : null}
              {done ? <h6 className="regtext2">Log-in successful</h6> : null}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-user" aria-hidden="true"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    id="emailerror"
                    placeholder="email address"
                    ref={register({
                      required: 'Email is required!',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'Enter a valid email'
                      }
                    })}
                  />
                  {errors ? (
                    <Tooltip
                      placement="top"
                      isOpen={tooltipOpen}
                      target="emailerror"
                      toggle={toggle}
                    >
                      <h6>{errors.email && errors.email.message}</h6>
                    </Tooltip>
                  ) : null}
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-key" aria-hidden="true"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="passworderror"
                    className="form-control"
                    placeholder="Enter your password"
                    ref={register({ required: 'Password is required' })}
                  />
                  <Tooltip
                    placement="bottom"
                    isOpen={tooltipOpen}
                    target="passworderror"
                    toggle={toggle}
                  >
                    <h6>{errors.password && errors.password.message}</h6>
                  </Tooltip>
                </div>

                <div className="form-group">
                  <input
                    type="submit"
                    value="login"
                    className="btn float-right login_btn"
                  />
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Don't have an account?<Link to="register">Register</Link>
              </div>
              <div className="d-flex justify-content-center">
                <Link to="/forgot-password">Forgot password?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
