async function logout(request, response) {
  try {
    const cookieOptions = {
      http: true,
      secure: true,
    };

    response.setHeader(
      "Access-Control-Allow-Origin",
      "https://social-chat-app-001.netlify.app"
    );

    return response.cookie("token", "", cookieOptions).status(200).json({
      message: "session out",
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = logout;
