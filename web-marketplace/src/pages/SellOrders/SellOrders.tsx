import { SellerSetupAccount } from 'components/organisms/SellerSetupAccount/SellerSetupAccount';
import { UserSellOrders } from 'components/organisms/UserSellOrders/UserSellOrders';

const SellOrders = () => {
  return (
    <section className="overflow-x-auto bg-transparent">
      {/* TODO:  If the member is an Editor or Viewer, <SellerSetupAccount /> should be hidden */}
      <SellerSetupAccount />
      <UserSellOrders />
    </section>
  );
};

export default SellOrders;
