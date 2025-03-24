
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.b94343597d7840a2b39b59f4fb469e16',
  appName: 'exploriana-app',
  webDir: 'dist',
  server: {
    url: 'https://b9434359-7d78-40a2-b39b-59f4fb469e16.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#ffffff",
      showSpinner: true,
      spinnerColor: "#6366f1"
    }
  }
};

export default config;
