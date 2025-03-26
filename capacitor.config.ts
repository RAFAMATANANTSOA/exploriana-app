
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.b94343597d7840a2b39b59f4fb469e16',
  appName: 'exploriana-app',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    allowNavigation: ['*.lovable.app', '*.lovableproject.com'],
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
