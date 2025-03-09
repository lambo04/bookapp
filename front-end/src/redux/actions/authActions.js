// authActions.js
export const loginSuccess = (userData) => ({
  type: "LOGIN_SUCCESS",
  payload: {
    user: userData.user,
    role: userData.role,
    token: userData.token,
  },
});

export const login = (userCredentials) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userCredentials),
    });

    // Check if the response is OK (status 200-299)
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();

    // Derive role from the user data returned by the backend
    const role = data.user.isAdmin ? "admin" : "user";

    // Save data to localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("userRole", role);
    localStorage.setItem("userName", data.user.name);

    // Dispatch the login success action with the proper payload
    dispatch(
      loginSuccess({
        user: data.user,
        role: role,
        token: data.token,
      })
    );
  } catch (error) {
    console.error("Login error:", error);
    // Re-throw error to be caught in the Login component
    throw error;
  }
};

export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: "LOGOUT" });
};
