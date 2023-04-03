exports.onExecutePostLogin = async (event, api) => {
  const { PASSWORD_EXPIRY_IN_DAYS, ERROR_MESSAGE } = event.configuration;

  // Only run this Action on Database users
  if (event.connection.strategy !== "auth0") {
    return;
  }

  // Logic to check password age against configured limit
  const today = new Date();

  const passwordTimestamp = event.user.last_password_reset ?? event.user.created_at;
  const passwordDate = new Date(passwordTimestamp);

  const calcDayDiff = (first, second) => (second - first) / (1000 * 60 * 60 * 24);
  const diff = calcDayDiff(passwordDate, today);

  if (diff >= PASSWORD_EXPIRY_IN_DAYS) {
    api.access.deny(ERROR_MESSAGE);
  }
};
