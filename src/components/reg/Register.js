import React, { useEffect, useState, useContext, useRef } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Tooltip } from 'reactstrap';
import { AuthContext } from '../../context/AuthContext';
import AuthService from './../../services/AuthService';

const Register = props => {
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [done, setDone] = useState(false);
  const authContext = useContext(AuthContext);
  const { message, isAuthenticated } = useContext(AuthContext);
  const { handleSubmit, register, errors, watch } = useForm();
  const password = useRef({});
  let timerID = useRef(null);
  password.current = watch('password', '');

  const removeClass = () => {
    setTimeout(() => {
      authContext.setMessage('');
    }, 2000);
  };

  const logout = async () => {
    const res = await AuthService.logout();

    if (res.status === 'success') {
      authContext.setIsLoading(true);
      authContext.setIsAuthenticated(false);
      authContext.setUser(null);
      authContext.setIsLoading(false);
      return;
    } else {
      authContext.setIsLoading(false);
      authContext.setMessage(res.error);
      return;
    }
  };

  const onSubmit = async values => {
    const data = await AuthService.register(values);

    const { isAuthenticated, user, error } = data;

    if (isAuthenticated) {
      authContext.setIsAuthenticated(isAuthenticated);
      authContext.setUser(user);
      authContext.setRole(user.role);
      setDone(true);
      timerID = setTimeout(() => {
        window.location.href = '/profile';
      }, 2000);
      return;
    } else {
      authContext.setMessage(error);
      removeClass();
      return;
    }
  };

  useEffect(() => {
    logout();
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  return (
    <div>
      <div className="container login">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h3>Register </h3>
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
              {done ? (
                <h6 className="regtext2">
                  Forte-Agent Account Created successfully
                </h6>
              ) : null}
              <form onSubmit={handleSubmit(onSubmit)}>
                <h6 className="regtext">Full name</h6>
                <div className="input-group form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    placeholder="Surname & Name"
                    ref={register({
                      required: 'name is required!',
                      pattern: {
                        value: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
                        message: 'You have entered invalid character'
                      }
                    })}
                  />
                  {errors ? (
                    <Tooltip
                      placement="top"
                      isOpen={tooltipOpen}
                      target="name"
                      toggle={toggle}
                    >
                      <h6>{errors.name && errors.name.message}</h6>
                    </Tooltip>
                  ) : null}
                </div>
                <h6 className="regtext">Email Adress</h6>
                <div className="input-group form-group">
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
                <h6 className="regtext">Agent Code</h6>
                <div className="input-group form-group">
                  <input
                    type="text"
                    name="agentID"
                    id="agentIDerror"
                    className="form-control"
                    placeholder="Agent Code (e.g: fb645378)"
                    ref={register({
                      required: 'Agent Code is required'
                    })}
                  />
                  <Tooltip
                    placement="bottom"
                    isOpen={tooltipOpen}
                    target="agentIDerror"
                    toggle={toggle}
                  >
                    <h6>{errors.agentID && errors.agentID.message}</h6>
                  </Tooltip>
                </div>
                <h6 className="regtext">Password</h6>
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
                    ref={register({
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must have at least 8 characters'
                      }
                    })}
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
                <h6 className="regtext">Confirm Password</h6>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-key" aria-hidden="true"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    name="passwordConfirm"
                    id="password2error"
                    className="form-control"
                    placeholder="Confirm your password"
                    ref={register({
                      validate: value =>
                        value === password.current ||
                        'The passwords do not match'
                    })}
                  />
                  <Tooltip
                    placement="bottom"
                    isOpen={tooltipOpen}
                    target="password2error"
                    toggle={toggle}
                  >
                    <h6>
                      {errors.passwordConfirm && errors.passwordConfirm.message}
                    </h6>
                  </Tooltip>
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="register"
                    className="btn float-right login_btn"
                  />
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Already have an account?<Link to="login">Login Here</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default Register;
