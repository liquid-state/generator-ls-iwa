import KeyValuePlugin from '@liquid-state/iwa-keyvalue';
import UbiquityPlugin from '@liquid-state/ubiquity-client/dist/plugin';

const applyPermissions = key => key
  .addWritePermission('iwa', 'entry')
  .addWritePermission('iwa', 'home')
  .addReadPermission('native', 'library');

export const refreshContent = async (app) => {
  const kv = app.use(KeyValuePlugin);
  const client = app.use(UbiquityPlugin);
  let content;
  try {
    content = await client.appContent();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    throw e;
  }
  const contentKey = applyPermissions(new Key('app.ubiquity-content', content))
  // Also set content for the native document reader.
  const mappedContent = mapContentForNative(content);
  const nativeKey = applyPermissions(new Key('ubiquity.library-content', mappedContent));
  await kv.set(contentKey);
  await kv.set(nativeKey);
  return content;
};

export const clearCache = async (app) => {
  const kv = app.use(KeyValuePlugin);
  await kv.set(applyPermissions(new Key('app.ubiquity-content', null)));
  await kv.set(applyPermissions(new Key('ubiquity.library-content', null)));
};
