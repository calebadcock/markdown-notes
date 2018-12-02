import { GOOGLE_ANALYTICS_ID, GOOGLE_CLIENT_ID } from '../../../config/env';
import assets from '../../../public/assets/manifest.json';

const createAppScript = () => `<script async type="text/javascript" charset="utf-8" src="/assets/${assets['app.js']}"></script>`;
const createVendorScript = () => `<script async type="text/javascript" charset="utf-8" src="/assets/${assets['vendor.js']}"></script>`;

const createTrackingScript = () => GOOGLE_ANALYTICS_ID ? createAnalyticsSnippet(GOOGLE_ANALYTICS_ID) : '';

const createAnalyticsSnippet = id =>
  `<script>
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', '${id}', 'auto');
ga('send', 'pageview');
</script>
<script async src='https://www.google-analytics.com/analytics.js'></script>`;

const createStylesheets = () => `
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Condensed" />
<link rel="stylesheet" href="/assets/${assets['app.css']}" />
`;

const createGooglePlatformLibrary = () => `<script src="https://apis.google.com/js/platform.js" async defer></script>`;

const createGoogleClientId = () => GOOGLE_CLIENT_ID ? `<script>window.GOOGLE_CLIENT_ID='${GOOGLE_CLIENT_ID}'</script>` : '';

export { createAppScript, createGoogleClientId, createGooglePlatformLibrary, createVendorScript, createTrackingScript, createStylesheets };

