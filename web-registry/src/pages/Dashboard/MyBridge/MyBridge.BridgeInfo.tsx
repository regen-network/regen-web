import Card from 'web-components/lib/components/cards/Card';
import { Title } from 'web-components/lib/components/typography/Title';

export const BridgeInfo = (): JSX.Element => {
  return (
    <Card
      sx={[
        theme => ({
          display: 'flex',
          width: '100%',
          // flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          height: { xs: theme.spacing(62.5), sm: theme.spacing(92.5) },
          backgroundColor: 'info.light',
          p: { xs: 12, sm: 8, md: 12 },
          borderRadius: '10px',
          borderColor: 'grey.100',
        }),
      ]}
    >
      <Title variant="h5">Bridging ecocredits</Title>
    </Card>
  );
};
