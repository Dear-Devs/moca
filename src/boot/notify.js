import { boot } from "quasar/wrappers";
import { Notify } from "quasar";

const REQUIRED_CONFIG = {
  icon: ["close", "announcement"],
  color: ["negative", "secondary"],
};

/**
 * Show a notification
 * @param {boolean} status
 * @param {string} msg
 * @param {Object} options
 */
const noti = (status, msg, options = {}) => {
  const posDefault = status ? 1 : 0;

  const CONFIG = {
    message: msg,
  };

  // Set config attributes to notify
  for (const [attribute, defaultValue] of Object.entries(REQUIRED_CONFIG)) {
    CONFIG[attribute] = options[attribute] ?? defaultValue[posDefault];
  }

  Notify.create(CONFIG);
};

/**
 * Show a notification
 * @param {Object} options
 */
const notiObj = (options = {}) => {
  Notify.create(options);
};

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$noti
  app.config.globalProperties.$noti = noti;
  app.config.globalProperties.$notiObj = notiObj;
});

export { noti, notiObj };
