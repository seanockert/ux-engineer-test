import React from "react";

interface ILoading {
  isLoading: boolean;
  loadingMsg: string;
  children: React.ReactChild;
}

const Loading: React.FC<ILoading> = ({ isLoading, loadingMsg, children }) => {
  return isLoading ? (
    <div className="notice-container flex">
      <div className="stack">
        <svg width="32" height="32" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
            className="spinner"
          />
        </svg>
        <div>{loadingMsg}</div>
      </div>
    </div>
  ) : (
    <>{children}</>
  );
};

export default Loading;
