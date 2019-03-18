import React from "react";
import PropTypes from 'prop-types';
import "./Loading.css";

import pizza1 from "./pizza11.png";
import pizza2 from "./pizza22.png";
import pizza3 from "./pizza33.png";
import pizza4 from "./pizza44.png";
import pizza5 from "./pizza55.png";
import pizza6 from "./pizza66.png";

const Loading = ({ global }) => (
  <div className={ global ? 'load-container' : 'load-containerlocal'}>
    { global && <GlobalLoading />}
    { !global && <LocalLoading />}
  </div>
);

const GlobalLoading = () => (
  <div className="load-main">
    <img src={pizza1} className="load-slice pizza1" alt="slice" />
    <img src={pizza2} className="load-slice pizza2" alt="slice" />
    <img src={pizza3} className="load-slice pizza3" alt="slice" />
    <img src={pizza4} className="load-slice pizza4" alt="slice" />
    <img src={pizza5} className="laod-slice pizza5" alt="slice" />
    <img src={pizza6} className="load-slice pizza6" alt="slice" />
  </div>
);

const LocalLoading = () => (
  <div className="load-main">
    <div className="load-circle" />
  </div>
);

Loading.propTypes = {
  global: PropTypes.bool,
}

export default Loading;
