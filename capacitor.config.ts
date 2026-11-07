import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.worqut.app',
  appName: 'WORKOUT',
  webDir: 'out',
  backgroundColor: '#F5F5F1',
  server: {
    androidScheme: 'https'
  }
};

export default config;
