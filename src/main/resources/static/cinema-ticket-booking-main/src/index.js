import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./context/AuthContext";

const domain = "dev-gm4otsgwu6kmtwyp.us.auth0.com";
const clientId = "Zd9aHYadqmso8RM4n2NcNXa0zNzmZ0Yt";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://dev-gm4otsgwu6kmtwyp.us.auth0.com/api/v2/",
        scope: "openid profile email",
      }}
      cacheLocation="localstorage"
    > */}
    <AuthProvider>
      <App />
    </AuthProvider>
    {/* </Auth0Provider> */}
  </React.StrictMode>
);

reportWebVitals();
