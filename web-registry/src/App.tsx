import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, useParams, useLocation, Redirect } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';

import { useAuth0 } from './react-auth0-spa';
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
import Header, { HeaderMenuItem } from 'web-components/lib/components/header';
import Title from 'web-components/lib/components/title';
import ProjectDetails from './components/ProjectDetails';
import ProjectList from './components/ProjectList';
import UserCredits from './components/UserCredits';
import CreditsIssue from './components/CreditsIssue';
import CreditsTransfer from './components/CreditsTransfer';
import CreditsRetire from './components/CreditsRetire';
import BuyerCreate from './components/BuyerCreate';
import NotFound from './components/NotFound';
import Admin from './components/Admin';
import CookiesFooter from 'web-components/lib/components/fixed-footer/CookiesFooter';

interface BoolProps {
  [key: string]: boolean;
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
  //   '/projects/impactag': true,
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
        // {
        //   title: 'Contact',
        //   href: `${process.env.REACT_APP_WEBSITE_URL}/contact/`,
        // },
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
          href: 'http://forum.goatech.org/c/regen-network/19',
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

  const menuItems: HeaderMenuItem[] = [
    { title: 'Buyers', href: `${process.env.REACT_APP_WEBSITE_URL}/buyers/` },
    { title: 'Land Stewards', href: `${process.env.REACT_APP_WEBSITE_URL}/land-stewards/` },
    {
      title: 'Community',
      dropdownItems: [
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
  return (
    <Header
      menuItems={menuItems}
      color={theme.palette.primary.light}
      transparent={false}
      absolute={false}
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
  let { userId } = useParams();
  const userCredits: PurchasedCredits | undefined = purchasedCredits.find(p => p.userId === userId);
  if (userCredits) {
    return <UserCredits credits={userCredits} />;
  }
  return <div>User not found</div>;
}

function ProjectContainer(): JSX.Element {
  let { projectId } = useParams();
  const project: Project | undefined = projects.find(p => p.id === projectId);

  if (project) {
    return <ProjectDetails project={project} projectDefault={projectDefault} />;
  }
  return <div>No project found</div>;
}

function Projects(): JSX.Element {
  return <ProjectList projects={projects} />;
}

function VerifyEmail(): JSX.Element {
  const search = new URLSearchParams(window.location.search);
  return (
    <div style={{ padding: '1rem' }}>
      <Title variant="h3">Please confirm your email address</Title>
      We’ve just sent a confirmation email to: {search.get('email')}
    </div>
  );
}

function PostPurchase(): JSX.Element {
  return (
    <div style={{ padding: '1rem', display: 'flex', justifyContent: 'center' }}>
      <Title variant="h1">Thank you for your purchase</Title>
    </div>
  );
}

const App: React.FC = (): JSX.Element => {
  const { user, loading } = useAuth0();

  useEffect(() => {
    initGA();
  });

  if (loading) {
    return <div></div>;
  }

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ScrollToTop />
      <div>
        <AppHeader />
        <Switch>
          <Route exact path="/">
            <Redirect to="/projects/impactag" />
            {/* <Home /> */}
          </Route>
          <Route exact path="/verify-email">
            <VerifyEmail />
          </Route>
          <Route
            path="/projects"
            render={({ match: { path } }) => (
              <>
                <Route path={path} component={Projects} exact>
                  <Redirect to="/projects/impactag" />
                </Route>
                <Route path={`${path}/:projectId`} component={ProjectContainer} />
              </>
            )}
          />
          <Route
            path="/post-purchase"
            render={({ match: { path } }) => (
              <>
                <Route path={`${path}/:projectId`} component={PostPurchase} />
              </>
            )}
          />
          <Route
            path="/credits"
            render={({ match: { path } }) => (
              <>
                <Route path={`${path}/:projectId`} component={CreditsContainer}>
                  <Redirect to="/projects/impactag" />
                </Route>
              </>
            )}
          />
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
        <CookiesFooter privacyUrl="https://www.regen.network/privacy-policy/" />
        <footer>
          <AppFooter />
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
