This integration allows you to implement a password rotation policy for your users. You may choose to do this to increase your security posture. This Action can be used in tandem with the `Password History` setting available in your Database connections that can prevent users from rotating their password to values they have previously used. Learn more <https://auth0.com/docs/authenticate/database-connections/password-options#password-history>.

## Prerequisites

1. An Auth0 account and tenant. [Sign up for free](https://auth0.com/signup).

## Add the Auth0 Action

**Note:** Once the Action is successfully deployed, all logins for your tenant will be processed by this integration. Before activating the integration in production, [install and verify this Action on a test tenant](https://auth0.com/docs/get-started/auth0-overview/create-tenants/set-up-multiple-environments).

1. Select **Add Integration** (at the top of this page).

1. Read the necessary access requirements, and select **Continue**.

1. Configure the integration using the following fields:

* **Password Expiry In Days:** Set this to the number of days a password is valid before expiry.

* **Error Message:** Set this to what you want to display to the user when they attempt to use an expired password.

* **Enabled Connections:** Set this to a comma-delimited list (no spaces) of the connection IDs you wish to enforce this policy on. Alternatively, leave it blank if you wish to enforce this policy on all connections.

* **Enabled Organizations:** Set this to a comma-delimited list (no spaces) of the organization IDs you wish to enforce this policy on. Alternatively, leave it blank if you wish to enforce this policy on all organizations.

Note: These two configurations work in tandem. If you set values for both, only logins where both criteria are true will this policy be enforced. So for instance, if you login with a connection that is not enabled but an organization that is: the user will not be required to reset password and vice versa. Make sure to consider this when implementing this strategy.

1. Add the integration to your Library by selecting **Create**.

1. In the modal that appears, select the **Add to flow** link.

1. Drag the Action into the desired location in the flow.

1. Select **Apply Changes**.

## Results

Once this Action has been deployed. Users with passwords that were set within the window you configured, will login as usual. When users with expired passwords attempt to login, they will be prompted with your error message and be forced to reset their password.

## Troubleshooting

Ensure you provide a valid whole number for `Password Expiry In Days` and remember this will only apply to users that authenticate with `Database Connections`. Users than authenticate through `Social, Enterprise or Passwordless Connections` will not be under the scope of this `Action`.

Make sure to provide the `name` of the connections and organizations and not any `Display Names` or `IDs`. Make sure the list comma-delimited without spaces: `team-a,team-b,team-c`. Remember that the evaluation for `Connections` and `Organizations` is either or and not mutually exclusive. So if an `Organization` is supposed to have this policy enforced, but there is a connection enabled for that `Organization` that is not included in the configuration of this `Action` - the user will not be required to reset their password. If you supply `Connections` and `Organizations` - only a user that authenticates under both an enabled `Organization` and `Connection` will have the policy enforced for them.
