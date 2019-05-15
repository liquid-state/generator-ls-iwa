import IdentityPlugin from '@liquid-state/iwa-identity';
import apiGatewayFactory from 'aws-api-gateway-client';

export default (app) => {
  const createClient = async (identity) => {
    const { UIS_URL, AWS_REGION } = await app.configuration('UIS_URL', 'AWS_REGION');
    return apiGatewayFactory.newClient({
      invokeUrl: UIS_URL,
      accessKey: identity.credentials.accessKeyId,
      secretKey: identity.credentials.secretAccessKey,
      sessionToken: identity.credentials.sessionToken,
      region: AWS_REGION,
    });
  };

  return {
    register: async () => {
      const identity = await app.use(IdentityPlugin).forService('cognito').getIdentity();
      const client = await createClient(identity);
      // eslint-disable-next-line camelcase
      const { app_token } = await app.configuration('app_token');
      const cognitoUsername = identity.name.replace('@', '*');
      return client.invokeApi({}, 'user/register/', 'POST', {}, { app_token, idp_username: cognitoUsername });
    },
    getTokens: async () => {
      const identity = await app.use(IdentityPlugin).forService('cognito').getIdentity();
      const client = await createClient(identity);
      return client.invokeApi({}, 'user/jwt/', 'GET');
    },
  };
};
