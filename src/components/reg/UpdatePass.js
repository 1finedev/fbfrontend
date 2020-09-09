import React, { useState, useRef, useContext } from 'react';
import { Jumbotron } from 'reactstrap';
import { useForm } from 'react-hook-form';
import AuthService from './../../services/AuthService';
import { AuthContext } from '../../context/AuthContext';

const UpdatePass = props => {
  const authContext = useContext(AuthContext);
  const { handleSubmit, register, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch('password', '');
  const [mailsent, setMailsent] = useState(null);
  const [errorsent, setErrorsent] = useState(null);
  const [load, setLoad] = useState(false);
  let timerID = useRef(null);

  const removeClass = () => {
    setTimeout(() => {
      setErrorsent('');
    }, 3000);
  };

  const onSubmit = async values => {
    setLoad(true);
    const query = window.location.href;
    let token = query.split('+')[1];
    if (token[token.length - 1] === '.') token = token.slice(0, -1);

    const data = await AuthService.resetPassword(values, token);

    const { isAuthenticated, user, error } = data;

    if (isAuthenticated) {
      authContext.setIsAuthenticated(isAuthenticated);
      authContext.setUser(user);
      authContext.setRole(user.role);
      setMailsent('Password Change Successful!');
      setLoad(false);
      timerID = setTimeout(() => {
        window.location.href = '/profile';
      }, 2000);
      return;
    } else {
      setErrorsent(error);
      removeClass();
      return;
    }
  };

  return (
    <div className="flex">
      <div className="addshipment2 forgot">
        <Jumbotron>
          <div>
            {mailsent ? (
              <>
                <h4 className="regtext2">{mailsent}</h4>
                <hr />
                <h4>Redirecting to your profile in 3 seconds...</h4>
              </>
            ) : (
              <>
                {errorsent ? (
                  <h4>{errorsent}</h4>
                ) : (
                  <>
                    {load ? (
                      <div>
                        <h6 className="regtext1">Loading...</h6>
                      </div>
                    ) : null}
                    <h4>Create a new secure Password</h4>

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <h6 className="regtext1">
                        {errors.passwordConfirm &&
                          errors.passwordConfirm.message}
                        {errors.password && errors.password.message}
                      </h6>
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
                              message:
                                'Password must have at least 8 characters'
                            }
                          })}
                        />
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
                      </div>
                      <div className="form-group">
                        <input
                          type="submit"
                          value="Send"
                          className="btn float-right login_btn"
                        />
                      </div>
                    </form>
                  </>
                )}
              </>
            )}
          </div>
        </Jumbotron>
      </div>
    </div>
  );
};

export default UpdatePass;
