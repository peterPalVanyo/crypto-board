import React from "react";
import { AppContext } from "../App/AppProvider";

export default function({ firstVisit }) {
  return (
    <AppContext.Consumer>
      {({ firstVisit }) =>
        firstVisit ? (
          <div>Welcome to CryptoBoard, first select your favorite coins...</div>
        ) : null
      }
    </AppContext.Consumer>
  );
}
