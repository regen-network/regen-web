import { SellerSetupAccount } from 'components/organisms/SellerSetupAccount/SellerSetupAccount';
import { UserSellOrders } from 'components/organisms/UserSellOrders/UserSellOrders';

const Sell = () => {
  return (
    <section className="overflow-hidden">
      <SellerSetupAccount />
      <UserSellOrders />
    </section>
  );
};

export default Sell;
