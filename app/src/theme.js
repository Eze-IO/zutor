import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

// Aura with the Zutor logo blue as the primary color
export default definePreset(Aura, {
  semantic: {
    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '{blue.600}',
      600: '{blue.700}',
      700: '{blue.800}',
      800: '{blue.900}',
      900: '{blue.950}',
      950: '{blue.950}'
    }
  }
});
