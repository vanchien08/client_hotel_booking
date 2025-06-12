import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

const locationHelper = locationHelperBuilder({});

export const userIsAuthenticated = connectedRouterRedirect({
  authenticatedSelector: (state) =>
    state.user.role == 2 || state.user.role == 1,
  wrapperDisplayName: "UserIsAuthenticated",
  redirectPath: "/login",
});

export const userIsNotAuthenticated = connectedRouterRedirect({
  authenticatedSelector: (state) => !state.user.isLoggedIn,
  wrapperDisplayName: "UserIsNotAuthenticated",
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || "/",
  allowRedirectBack: false,
});

export const userIsAuthenticatedAdmin = connectedRouterRedirect({
  authenticatedSelector: (state) => state.user.role == 2,
  wrapperDisplayName: "UserIsAuthenticated",
  redirectPath: "/login",
});
