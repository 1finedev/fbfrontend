import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <div>
        <div className="errorpage">
          <div className="errhead">
            <header className="heading1">PAGE NOT FOUND!!!</header>
            <h2>
              <strong>'Error 404'</strong>
            </h2>
          </div>
          <div className="errtxt">
            <h3>Possible reasons why this page cannot be found:</h3>
            <ul>
              <li>The page has moved</li>
              <li>The page no longer exists</li>
              <li>You were looking for your 'puppy' and got lost </li>
              <li>You like 404 pages </li>
            </ul>
            <Link className="bluebutton" to="/">
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
