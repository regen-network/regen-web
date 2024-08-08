import Card from 'web-components/src/components/cards/Card';
import { Body } from 'web-components/src/components/typography/Body';
import { Title } from 'web-components/src/components/typography/Title';

export type TradableProps = {
  goToChooseCredits: () => void;
  imgSrc: string;
};
export const Tradable = ({ goToChooseCredits, imgSrc }: TradableProps) => {
  return (
    <Card className="py-30 px-20 sm:py-50 sm:px-40 border-grey-300">
      <Card className="p-20 border-grey-300 bg-grey-100 flex gap-10 flex-col sm:flex-row items-center sm:items-start">
        <img
          className="h-50 w-50 sm:h-[100px] sm:w-[100px]"
          src={imgSrc}
          alt="info with hand"
        />
        <div>
          <Title as="h2" className="text-base">
            You have chosen to purchase tradable credits, so you will not
            receive a retirement certificate.
          </Title>
          <Body className="pt-10 text-grey-700 italic font-bold">
            If you’d prefer retired credits, please modify your choice on the{' '}
            <span
              className="font-bold text-brand-400 cursor-pointer"
              onClick={goToChooseCredits}
            >
              previous screen.
            </span>
          </Body>
        </div>
      </Card>
    </Card>
  );
};
