import CheckboxLabel from 'web-components/src/components/inputs/new/CheckboxLabel/CheckboxLabel';

type AgreePurchaseFormProps = {
  retiring: boolean;
  country?: string;
};
export const AgreePurchaseForm = ({
  retiring,
  country,
}: AgreePurchaseFormProps) => {
  return (
    <>
      <CheckboxLabel
        checked={createAccount}
        label={
          <Body size="sm">
            Yes, please create an account for me so I can easily see my purchase
            details and retirement certificate when I log in
          </Body>
        }
        {...register('createAccount')}
      />
    </>
  );
};
