import { WelcomePage, RekitStudioPage } from './';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    {
      path: 'welcome',
      component: WelcomePage,
      isIndex: true,
    },
    { path: 'rekit-studio/:port', component: RekitStudioPage },
  ],
};
