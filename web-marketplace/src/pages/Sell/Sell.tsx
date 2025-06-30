import { SellerSetupAccount } from 'components/organisms/SellerSetupAccount/SellerSetupAccount';
import { UserSellOrders } from 'components/organisms/UserSellOrders/UserSellOrders';

const Sell = () => {
  return (
    <section className="overflow-x-auto bg-transparent shadow-[0_2px_5px_0.5px_rgba(0,0,0,0.05)]">
      <SellerSetupAccount />
      <UserSellOrders />
    </section>
  );
};

export default Sell;
