import { Analytics } from '../firebase';
import ReactMoE, { MoEProperties } from 'react-native-moengage';
import { AppEventsLogger } from 'react-native-fbsdk-next';
export const analytics = {
  setUserProperties: (key, value) => {
    if (key == null || value == null) {
      return;
    }
    try {
      ReactMoE.setUserAttribute(key, value);
    } catch (error) {
      console.log('setUserProperties.error', value, error);
    }
  },

  trackEvent: (event, data = {}) => {
    try {
      if (event === 'user_sign_up') {
        AppEventsLogger.logEvent(
          AppEventsLogger.AppEvents.CompletedRegistration,
          {
            [AppEventsLogger.AppEventParams.RegistrationMethod]: data.method,
          },
        );
      } else if (event === 'TogglePlayPause') {
        AppEventsLogger.logEvent(AppEventsLogger.AppEvents.ViewedContent, {
          data,
        });
      }
      AppEventsLogger.logEvent(event, data);
      Analytics().logEvent(event, data);

      let properties = new MoEProperties();
      Object.entries(data).forEach(val => {
        properties.addAttribute(val[0], val[1]);
      });

      ReactMoE.trackEvent(event, properties);
    } catch (error) {
      console.log('trackEvent.error', event, data, error);
    }
  },

  trackScreenView: (screen_name, screen_class) => {
    try {
      Analytics().logScreenView({
        screen_name,
        screen_class,
      });
    } catch (error) {
      console.log('trackScreenView.error', screen_name, screen_class, error);
    }
  },
};
