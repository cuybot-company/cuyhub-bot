import React from "react";
import Typical from "react-typical";

export default class Title extends React.Component {
  render() {
    return <Typical steps={["Cuyhub", 1000, "Cuyhub Community!", 500]} loop={Infinity} wrapper="p" />;
  }
}
