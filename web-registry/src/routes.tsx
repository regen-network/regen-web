import { lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouteObject,
} from 'react-router-dom';
import { Router } from '@remix-run/router';
import { QueryClient } from '@tanstack/react-query';

import MyBridge from 'pages/Dashboard/MyBridge';
import { MyBridgableEcocreditsTable } from 'pages/Dashboard/MyBridge/MyBridge.BridgableEcocreditsTable';
import { MyBridgedEcocreditsTable } from 'pages/Dashboard/MyBridge/MyBridge.BridgedEcocreditsTable';
import MyCreditBatches from 'pages/Dashboard/MyCreditBatches';
import MyCreditClasses from 'pages/Dashboard/MyCreditClasses';
import MyEcocredits from 'pages/Dashboard/MyEcocredits';
import MyProjects from 'pages/Dashboard/MyProjects';
import { ecocreditBatchesLoader } from 'pages/EcocreditBatches/EcocreditBatches.loader';
import { BridgeTab } from 'pages/EcocreditsByAccount/BridgeTab/BridgeTab';
import { PortfolioTab } from 'pages/EcocreditsByAccount/PortfolioTab/EcocreditsByAccount.PortfolioTab';
import { homeLoader } from 'pages/Home/Home.loader';
import { projectsLoader } from 'pages/Projects/Projects.loader';
import { RegistryLayout } from 'components/organisms/RegistryLayout/RegistryLayout';

import { KeplrRoute, ProtectedRoute } from './components/atoms';
import { ProjectMetadata } from './pages/ProjectMetadata/ProjectMetadata';

const Additionality = lazy(() => import('./pages/Additionality'));
const Admin = lazy(() => import('./pages/Admin'));
const BasicInfo = lazy(() => import('./pages/BasicInfo'));
const BatchDetails = lazy(() => import('./pages/BatchDetails'));
const BasketDetails = lazy(() => import('./pages/BasketDetails'));
const BuyerCreate = lazy(() => import('./pages/BuyerCreate'));
const BuyerCreditsTransfer = lazy(() => import('./pages/BuyerCreditsTransfer'));
const BuyersPage = lazy(() => import('./pages/Buyers'));
const CertificatePage = lazy(() => import('./pages/Certificate'));
const ChooseCreditClassPage = lazy(
  () => import('./pages/ChooseCreditClassPage'),
);
const CreateCreditClassInfo = lazy(
  () => import('./pages/CreateCreditClassInfo'),
);
const CreateCreditClass = lazy(() => import('./pages/CreateCreditClass'));
const CreateMethodology = lazy(() => import('./pages/CreateMethodology'));
const CreditClassDetails = lazy(() => import('./pages/CreditClassDetails'));
const CreditsIssue = lazy(() => import('./pages/CreditsIssue'));
const CreditsRetire = lazy(() => import('./pages/CreditsRetire'));
const CreditsTransfer = lazy(() => import('./pages/CreditsTransfer'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Description = lazy(() => import('./pages/Description'));
const EntityDisplay = lazy(() => import('./pages/EntityDisplay'));
const EcocreditBatches = lazy(() => import('./pages/EcocreditBatches'));
const EcocreditsByAccount = lazy(() => import('./pages/EcocreditsByAccount'));
const Home = lazy(() => import('./pages/Home'));
const LandStewards = lazy(() => import('./pages/LandStewards'));
const Media = lazy(() => import('./pages/Media'));
const MethodologyDetails = lazy(() => import('./pages/MethodologyDetails'));
const MethodologyReviewProcess = lazy(
  () => import('./pages/MethodologyReviewProcess'),
);
const NotFoundPage = lazy(() => import('./pages/NotFound'));
const OrganizationProfile = lazy(() => import('./pages/OrganizationProfile'));
const PostPurchase = lazy(() => import('./pages/PostPurchase'));
const Project = lazy(() => import('./pages/Project'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectCreate = lazy(() => import('./pages/ProjectCreate'));
const ProjectFinished = lazy(() => import('./pages/ProjectFinished'));
const ProjectList = lazy(() => import('./pages/ProjectList'));
const ProjectLocation = lazy(() => import('./pages/ProjectLocation'));
const ProjectReview = lazy(() => import('./pages/ProjectReview'));
const Roles = lazy(() => import('./pages/Roles'));
const Seller = lazy(() => import('./pages/Seller'));
const Signup = lazy(() => import('./pages/Signup'));
const Story = lazy(() => import('./pages/Story'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'));
const ProjectEdit = lazy(() => import('./pages/ProjectEdit'));
const Activity = lazy(() => import('./pages/Activity'));
const CreateBatch = lazy(() => import('./pages/CreateBatch'));
const Storefront = lazy(() => import('./pages/Marketplace/Storefront'));

type RouterParams = {
  reactQueryClient: QueryClient;
};

export const getRoutes = ({ reactQueryClient }: RouterParams): RouteObject[] =>
  createRoutesFromElements(
    <Route element={<RegistryLayout />}>
      <Route
        path="/"
        element={<Home />}
        loader={homeLoader({
          queryClient: reactQueryClient,
        })}
      />
      <Route path="verify-email" element={<VerifyEmail />} />
      <Route path="add" element={<Additionality />} />
      <Route path="signup" element={<Signup />} />
      <Route path="certificate" element={<CertificatePage />} />
      <Route path="project/wilmot/admin" element={<Seller />} />
      <Route path="buyers" element={<BuyersPage />} />
      <Route path="create-methodology" element={<CreateMethodology />} />
      <Route
        // TODO: thould this route be moved to /credit-classes?
        path="create-credit-class"
        element={<CreateCreditClassInfo />}
      />
      <Route path="land-stewards" element={<LandStewards />} />
      <Route
        path="methodology-review-process"
        element={<MethodologyReviewProcess />}
      />
      <Route
        path="projects/:page"
        element={<Projects />}
        loader={projectsLoader({
          queryClient: reactQueryClient,
        })}
      />
      <Route path="project/:projectId" element={<Project />} />
      <Route
        path="post-purchase/:projectId/:walletId/:name"
        element={<PostPurchase />}
      />
      <Route path="ecocredits" element={<KeplrRoute component={Dashboard} />}>
        <Route
          path="portfolio"
          element={<KeplrRoute component={MyEcocredits} />}
        />
        <Route
          path="projects"
          element={<KeplrRoute component={MyProjects} />}
        />
        <Route
          path="credit-classes"
          element={<KeplrRoute component={MyCreditClasses} />}
        />
        <Route
          path="credit-batches"
          element={<KeplrRoute component={MyCreditBatches} />}
        />
        <Route path="bridge" element={<KeplrRoute component={MyBridge} />}>
          <Route index element={<MyBridgableEcocreditsTable />} />
          <Route path="bridgable" element={<MyBridgableEcocreditsTable />} />
          <Route path="bridged" element={<MyBridgedEcocreditsTable />} />
        </Route>
      </Route>
      <Route
        path="ecocredits/accounts/:accountAddress"
        element={<EcocreditsByAccount />}
      >
        <Route path="portfolio" element={<PortfolioTab />} />
        <Route path="bridge" element={<BridgeTab />} />
      </Route>
      <Route
        path="ecocredit-batches/:page"
        element={<EcocreditBatches />}
        loader={ecocreditBatchesLoader({
          queryClient: reactQueryClient,
        })}
      />
      <Route
        path="ecocredits/create-batch"
        element={<KeplrRoute component={CreateBatch} />}
      />
      <Route path="baskets/:basketDenom" element={<BasketDetails />} />
      <Route path="credit-batches/:batchDenom" element={<BatchDetails />} />
      <Route
        path="user-profile"
        element={<ProtectedRoute component={UserProfile} />}
      />
      <Route
        path="organization-profile"
        element={<ProtectedRoute component={OrganizationProfile} />}
      />
      <Route
        path="project-list"
        element={<ProtectedRoute component={ProjectList} />}
      />
      <Route path="project-pages">
        <Route path=":projectId" element={<ProjectCreate />}>
          <Route
            path="choose-credit-class"
            element={<KeplrRoute component={ChooseCreditClassPage} />}
          />
          <Route
            path="basic-info"
            element={<KeplrRoute component={BasicInfo} />}
          />
          <Route
            path="location"
            element={<KeplrRoute component={ProjectLocation} />}
          />
          <Route path="story" element={<KeplrRoute component={Story} />} />
          <Route
            path="description"
            element={<KeplrRoute component={Description} />}
          />
          <Route path="media" element={<KeplrRoute component={Media} />} />
          <Route
            path="metadata"
            element={<KeplrRoute component={ProjectMetadata} />}
          />
          <Route path="roles" element={<KeplrRoute component={Roles} />} />
          <Route
            path="entity-display"
            element={<KeplrRoute component={EntityDisplay} />}
          />
          <Route
            path="review"
            element={<KeplrRoute component={ProjectReview} />}
          />
          <Route
            path="finished"
            element={<KeplrRoute component={ProjectFinished} />}
          />
          <Route path="edit" element={<KeplrRoute component={ProjectEdit} />}>
            <Route
              path="basic-info"
              element={<KeplrRoute component={BasicInfo} />}
            />
            <Route
              path="location"
              element={<KeplrRoute component={ProjectLocation} />}
            />
            <Route path="story" element={<KeplrRoute component={Story} />} />
            <Route path="media" element={<KeplrRoute component={Media} />} />
            <Route path="roles" element={<KeplrRoute component={Roles} />} />
            <Route
              path="entity-display"
              element={<KeplrRoute component={EntityDisplay} />}
            />
          </Route>
        </Route>
      </Route>
      <Route path="admin" element={<Admin />}>
        <Route path="admin/credits">
          <Route
            path="create-and-transfer"
            element={<ProtectedRoute component={BuyerCreditsTransfer} />}
          />
          <Route
            path="issue"
            element={<ProtectedRoute component={CreditsIssue} />}
          />
          <Route
            path="transfer"
            element={<ProtectedRoute component={CreditsTransfer} />}
          />
          <Route
            path="retire"
            element={<ProtectedRoute component={CreditsRetire} />}
          />
        </Route>
        <Route
          path="admin/buyer/create"
          element={<ProtectedRoute component={BuyerCreate} />}
        />
      </Route>
      <Route
        path="methodologies/:methodologyId"
        element={<MethodologyDetails />}
      />
      <Route path="credit-classes">
        {/* TODO: Index route is same as /create-credit-class for now */}
        <Route index element={<CreateCreditClassInfo />} />
        <Route path=":creditClassId/*">
          <Route index element={<CreditClassDetails isLandSteward={true} />} />
          <Route
            path="buyer"
            element={<CreditClassDetails isLandSteward={false} />}
          />
          <Route
            path="land-steward"
            element={<CreditClassDetails isLandSteward={true} />}
          />
        </Route>
        <Route
          path="create"
          element={<KeplrRoute component={CreateCreditClass} />}
        />
      </Route>
      <Route path="stats/activity" element={<Activity />} />
      <Route path="storefront" element={<Storefront />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  );

export const getRouter = ({ reactQueryClient }: RouterParams): Router =>
  createBrowserRouter(getRoutes({ reactQueryClient }), {
    basename: process.env.PUBLIC_URL,
  });
