import { SellerSetupAccount } from 'components/organisms/SellerSetupAccount/SellerSetupAccount';
import { UserSellOrders } from 'components/organisms/UserSellOrders/UserSellOrders';

import { useDashboardContext } from '../Dashboard/Dashboard.context';

const Sell = () => {
  const { isOrganizationDashboard, isOrganizationOwner, isOrganizationAdmin } =
    useDashboardContext();

  const canManageSellOrders =
    !isOrganizationDashboard || isOrganizationOwner || isOrganizationAdmin;

  return (
    <section className="overflow-hidden">
      {canManageSellOrders && <SellerSetupAccount />}
      <UserSellOrders canManageSellOrders={canManageSellOrders} />
    </section>
  );
};

export default Sell;
