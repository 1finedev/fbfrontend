import React, { useState } from 'react';
import { Jumbotron } from 'reactstrap';
import { useForm } from 'react-hook-form';
import AuthService from './../../services/AuthService';

const ForgotPass = () => {
  const { handleSubmit, register, errors } = useForm();
  const [mailsent, setMailsent] = useState(null);
  const [errorsent, setErrorsent] = useState(null);
  const [load, setLoad] = useState(false);

  const removeClass = () => {
    setTimeout(() => {
      setErrorsent('');
    }, 3000);
  };
  const onSubmit = async values => {
    setLoad(true);
    const data = await AuthService.forgotPassword(values);
    if (data.status === 'success') {
      setMailsent(data.message);
      setLoad(false);
      return;
    } else {
      setErrorsent(data.error);
      setLoad(false);
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
                <h4>
                  Check your email for Password Reset Link. Use the Link to get
                  access to your Account
                </h4>
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
                    <h4>Forgot your Account password?</h4>
                    <h6>
                      Enter the email associated with your account and we will
                      send a "Password Reset Token valid for 10minutes" to
                      enable you regain access into your account
                    </h6>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <h6 className="regtext1">
                        {errors.email && errors.email.message}
                      </h6>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="email"
                          placeholder="email address"
                          ref={register({
                            required: 'Email is required!',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                              message: 'Enter a valid email'
                            }
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

export default ForgotPass;
