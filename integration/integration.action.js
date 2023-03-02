exports.onExecutePostLogin = async (event, api) => {
  const { PASSWORD_EXPIRY_IN_DAYS, ERROR_MESSAGE, ENABLED_CONNECTIONS, ENABLED_ORGANIZATIONS } =
    event.configuration;

  // Only run this Action on Database users
  if (event.connection.strategy !== "auth0") {
    return;
  }

  // Checking to see if any connections/organizations were supplied, if so and the current connection/organization is not found - skip logic and return
  if (ENABLED_CONNECTIONS.length > 0 && !ENABLED_CONNECTIONS.includes(event.connection.name)) {
    return;
  }
  if (
    ENABLED_ORGANIZATIONS.length > 0 &&
    event.organization &&
    !ENABLED_ORGANIZATIONS.includes(event.organization.name)
  ) {
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
