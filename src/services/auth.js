import netlifyIdentity from "netlify-identity-widget";

export const signup = async (email, password) => await netlifyIdentity.signup(email, password);
export const login = async (email, password) => await netlifyIdentity.login(email, password);
export const logout = () => netlifyIdentity.logout();
export const currentUser = () => netlifyIdentity.currentUser();
