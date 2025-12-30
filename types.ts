
export type AppView = 'splash' | 'dashboard' | 'copiers' | 'setup' | 'how-it-works' | 'disclaimer';

export type SetupStep = 'form' | 'summary' | 'waitlist';

export interface CopierType {
  id: string;
  title: string;
  description: string;
  icon: any;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}