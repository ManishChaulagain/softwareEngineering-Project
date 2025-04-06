import { Basket } from '@/components/basket';
import { Footer, Navigation } from '@/components/common';
import * as ROUTES from '@/constants/routes';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import * as view from '@/views';
import SinglePageCheckout from '@/views/checkout/SinglePageCheckout';
import AdminRoute from './AdminRoute';
import ClientRoute from './ClientRoute';
import PublicRoute from './PublicRoute';
import ThankYou from '@/views/checkout/ThankYou';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <>
      <Navigation />
      <Basket />
      <Switch>
        <Route component={view.Home} exact path={ROUTES.HOME} />
        <Route component={view.Shop} exact path={ROUTES.SHOP} />
        <Route component={view.FeaturedProducts} exact path={ROUTES.FEATURED_PRODUCTS} />
        <Route component={view.RecommendedProducts} exact path={ROUTES.RECOMMENDED_PRODUCTS} />
        <PublicRoute component={view.SignUp} path={ROUTES.SIGNUP} />
        <PublicRoute component={view.SignIn} exact path={ROUTES.SIGNIN} />
        <PublicRoute component={view.ForgotPassword} path={ROUTES.FORGOT_PASSWORD} />
        <Route component={view.ViewProduct} path={ROUTES.VIEW_PRODUCT} />
        <ClientRoute component={view.UserAccount} exact path={ROUTES.ACCOUNT} />
        <ClientRoute component={view.EditAccount} exact path={ROUTES.ACCOUNT_EDIT} />
        <ClientRoute component={SinglePageCheckout} exact path="/checkout" />
        <AdminRoute component={view.Dashboard} exact path={ROUTES.ADMIN_DASHBOARD} />
        <AdminRoute component={view.Products} path={ROUTES.ADMIN_PRODUCTS} />
        <AdminRoute component={view.AddProduct} path={ROUTES.ADD_PRODUCT} />
        <AdminRoute component={view.EditProduct} path={`${ROUTES.EDIT_PRODUCT}/:id`} />
        <Route component={ThankYou} exact path="/thank-you" />
        <PublicRoute component={view.PageNotFound} />
      </Switch>
      <Footer />
    </>
  </Router>
);

export default AppRouter;
