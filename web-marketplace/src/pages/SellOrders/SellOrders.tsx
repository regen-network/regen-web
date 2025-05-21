import { SellerSetupAccount } from 'components/organisms/SellerSetupAccount/SellerSetupAccount';
import { UserSellOrders } from 'components/organisms/UserSellOrders/UserSellOrders';

const SellOrders = () => {
  return (
    <section className="overflow-x-auto bg-transparent">
      <SellerSetupAccount />
      <UserSellOrders />
    </section>
  );
};

export default SellOrders;
