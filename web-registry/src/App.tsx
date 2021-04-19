import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, useParams, useLocation, Redirect } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import { useAuth0, OAuthError, withAuthenticationRequired } from '@auth0/auth0-react';

import { createBrowserHistory } from 'history';
import isAdmin from './lib/admin';
import { init as initGA } from './lib/ga';

import './App.css';
import {
  projects,
  // creditsIssuer,
  purchasedCredits,
  projectDefault,
  Project,
  PurchasedCredits,
} from './mocks';
import Footer, { FooterItemProps as FooterItem } from 'web-components/lib/components/footer';
import Header, { HeaderMenuItem, HeaderColors } from 'web-components/lib/components/header';
import CookiesBanner from 'web-components/lib/components/banner/CookiesBanner';
import ProjectDetails from './components/ProjectDetails';
import ProjectList from './components/ProjectList';
import UserCredits from './components/UserCredits';
import CreditsIssue from './components/CreditsIssue';
import CreditsTransfer from './components/CreditsTransfer';
import CreditsRetire from './components/CreditsRetire';
import BuyerCreate from './components/BuyerCreate';
import NotFound from './components/NotFound';
import Admin from './components/Admin';
import PostPurchase from './components/PostPurchase';
import Certificate from './components/Certificate';
import Seller from './components/Seller';
import Signup from './components/Signup';
import VerifyEmail from './components/VerifyEmail';
import UserProfile from './components/UserProfile';
import GettingStarted from './components/GettingStarted';
import ProjectPlanList from './components/ProjectPlanList';
import ChooseCreditClass from './components/ChooseCreditClass';

export const history = createBrowserHistory();

interface BoolProps {
  [key: string]: boolean;
}
interface ProtectedRouteProps {
  component: React.ComponentType;
  path: string;
}

function ScrollToTop(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppFooter(): JSX.Element {
  // const { pathname } = useLocation();
  // const footerPaddingBottom: BoolProps = {
  //   '/projects/wilmot': true,
  // };

  const footerItems: [FooterItem, FooterItem, FooterItem] = [
    {
      title: 'get involved',
      items: [
        {
          title: 'Buyers',
          href: `${process.env.REACT_APP_WEBSITE_URL}/buyers/`,
        },
        {
          title: 'Land Stewards',
          href: `${process.env.REACT_APP_WEBSITE_URL}/land-stewards/`,
        },
        {
          title: 'Community',
          href: `${process.env.REACT_APP_WEBSITE_URL}/community/`,
        },
        {
          title: 'Developers',
          href: `${process.env.REACT_APP_WEBSITE_URL}/developers/`,
        },
        {
          title: 'Scientists',
          href: `${process.env.REACT_APP_WEBSITE_URL}/science/`,
        },
        {
          title: 'Validators',
          href: `${process.env.REACT_APP_WEBSITE_URL}/validators/`,
        },
      ],
    },
    {
      title: 'learn more',
      items: [
        {
          title: 'Case Studies',
          href: `${process.env.REACT_APP_WEBSITE_URL}/case-studies/`,
        },
        {
          title: 'Resources',
          href: `${process.env.REACT_APP_WEBSITE_URL}/resources/`,
        },
        {
          title: 'FAQ',
          href: `${process.env.REACT_APP_WEBSITE_URL}/faq/`,
        },
        {
          title: 'Team',
          href: `${process.env.REACT_APP_WEBSITE_URL}/team/`,
        },
        {
          title: 'Contact',
          href: `${process.env.REACT_APP_WEBSITE_URL}/contact/`,
        },
      ],
    },
    {
      title: 'regen',
      items: [
        {
          title: 'Partners',
          href: `${process.env.REACT_APP_WEBSITE_URL}/partners/`,
        },
        {
          title: 'Media',
          href: `${process.env.REACT_APP_WEBSITE_URL}/media/`,
        },
        {
          title: 'Careers',
          href: 'https://apply.workable.com/regen-network/',
          target: '_blank',
        },
        {
          title: 'Forum',
          href: 'https://forum.regen.network/',
          target: '_blank',
        },
        {
          title: 'Press Kit',
          href: `${process.env.REACT_APP_WEBSITE_URL}/press-kit/`,
        },
        {
          title: 'Invest',
          href: `${process.env.REACT_APP_WEBSITE_URL}/invest/`,
        },
      ],
    },
  ];

  return (
    <Footer
      footerItems={footerItems}
      apiUri={process.env.REACT_APP_API_URI}
      privacyUrl="https://www.regen.network/privacy-policy"
      termsUrl="https://www.regen.network/terms-service"
      // paddingBottom={footerPaddingBottom[pathname]}
    />
  );
}

function AppHeader(): JSX.Element {
  const { pathname } = useLocation();
  const theme = useTheme();
  const fullWidthRegExp: RegExp = /projects\/[a-z-]+/;
  const menuItems: HeaderMenuItem[] = [
    { title: 'Buyers', href: `${process.env.REACT_APP_WEBSITE_URL}/buyers/` },
    { title: 'Land Stewards', href: `${process.env.REACT_APP_WEBSITE_URL}/land-stewards/` },
    {
      title: 'Community',
      dropdownItems: [
        { title: 'Community Overview', href: `${process.env.REACT_APP_WEBSITE_URL}/community/` },
        { title: 'Developers', href: `${process.env.REACT_APP_WEBSITE_URL}/developers/` },
        { title: 'Scientists', href: `${process.env.REACT_APP_WEBSITE_URL}/science/` },
        { title: 'Validators', href: `${process.env.REACT_APP_WEBSITE_URL}/validators/` },
      ],
    },
    {
      title: 'Learn More',
      dropdownItems: [
        { title: 'Case Studies', href: `${process.env.REACT_APP_WEBSITE_URL}/case-studies/` },
        { title: 'Resources', href: `${process.env.REACT_APP_WEBSITE_URL}/resources/` },
        { title: 'FAQ', href: `${process.env.REACT_APP_WEBSITE_URL}/faq/` },
        { title: 'Team', href: `${process.env.REACT_APP_WEBSITE_URL}/team/` },
      ],
    },
  ];

  const headerColors: HeaderColors = {
    '/certificate': theme.palette.primary.main,
  };

  return (
    <Header
      menuItems={menuItems}
      color={headerColors[pathname] ? headerColors[pathname] : theme.palette.primary.light}
      transparent={pathname === '/certificate'}
      absolute={pathname === '/certificate'}
      borderBottom={pathname !== '/certificate'}
      fullWidth={fullWidthRegExp.test(pathname)}
      pathName={pathname}
    />
  );
}

// TODO put following components in separate files
// function Home(): JSX.Element {
//   return (
//     <div style={{ paddingLeft: '1rem' }}>
//       <p>
//         <Link to="/projects">Project list</Link>
//       </p>
//       <p>
//         <Link to="/credits/userId">Credits page</Link>
//       </p>
//     </div>
//   );
// }

function CreditsContainer(): JSX.Element {
  let { userId } = useParams<{ userId: string }>();
  const userCredits: PurchasedCredits | undefined = purchasedCredits.find(p => p.userId === userId);
  if (userCredits) {
    return <UserCredits credits={userCredits} />;
  }
  return <div>User not found</div>;
}

function ProjectContainer(): JSX.Element {
  let { projectId } = useParams<{ projectId: string }>();
  const project: Project | undefined = projects.find(p => p.id === projectId);

  if (project) {
    return <ProjectDetails projects={projects} project={project} projectDefault={projectDefault} />;
  }
  return <div>No project found</div>;
}

function Projects(): JSX.Element {
  return <ProjectList projects={projects} />;
}

const ProtectedRoute = ({ component, ...args }: ProtectedRouteProps): JSX.Element => (
  <Route component={withAuthenticationRequired(component)} {...args} />
);

const App: React.FC = (props): JSX.Element => {
  const { user, isLoading, error } = useAuth0();

  useEffect(() => {
    initGA();
  });

  if (isLoading) {
    return <div></div>;
  }

  const authError = error as OAuthError;
  if (
    authError &&
    authError.error_description &&
    authError.error_description.indexOf('email_not_verified:') > -1
  ) {
    const email: string = authError.error_description.split(':')[1];
    history.push(`/verify-email?email=${email}`);
  }

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ScrollToTop />
      <div>
        <AppHeader />
        <Switch>
          <Route exact path="/">
            <Redirect to="/projects/wilmot" />
            {/* <Home /> */}
          </Route>
          <Route exact path="/verify-email">
            <VerifyEmail />
          </Route>
          <Route exact path="/user-profile">
            <UserProfile />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/certificate">
            <Certificate />
          </Route>
          <Route exact path={`/projects/wilmot/admin`} component={Seller} />
          <Route exact path="/projects/impactag">
            <Redirect to="/projects/wilmot" />
          </Route>
          <Route exact path="/projects/impactag/admin">
            <Redirect to="/projects/wilmot/admin" />
          </Route>
          <Route
            path="/projects"
            render={({ match: { path } }) => (
              <>
                <Route path={path} component={Projects} exact>
                  <Redirect to="/projects/wilmot" />
                </Route>
                <Route path={`${path}/:projectId`} component={ProjectContainer} />
              </>
            )}
          />
          <Route
            path="/post-purchase"
            render={({ match: { path } }) => (
              <>
                <Route path={`${path}/:projectId/:walletId/:name`} component={PostPurchase} />
              </>
            )}
          />
          <Route
            path="/credits"
            render={({ match: { path } }) => (
              <>
                <Route path={`${path}/:projectId`} component={CreditsContainer}>
                  <Redirect to="/projects/wilmot" />
                </Route>
              </>
            )}
          />
          <ProtectedRoute path="/getting-started" component={GettingStarted} />
          <ProtectedRoute path="/project-plans" component={ProjectPlanList} />
          <ProtectedRoute path="/choose-credit-class" component={ChooseCreditClass} />
          <Route
            path="/admin"
            render={({ match: { path } }) => (
              <>
                <Route path={path} component={Admin} exact />
                {isAdmin(user) && (
                  <>
                    <Route path={`${path}/credits/issue`} component={CreditsIssue} />
                    <Route path={`${path}/credits/transfer`} component={CreditsTransfer} />
                    <Route path={`${path}/credits/retire`} component={CreditsRetire} />
                    <Route path={`${path}/buyer/create`} component={BuyerCreate} />
                  </>
                )}
              </>
            )}
          />
          <Route path="*" component={NotFound} />
        </Switch>
        <CookiesBanner privacyUrl="https://www.regen.network/privacy-policy/" />
        <footer>
          <AppFooter />
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
