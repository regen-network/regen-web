import { Grid } from '@mui/material';
import clsx from 'clsx';
import { StaticImageData } from 'next/image';

import { Center } from 'web-components/src/components/box';
import { Title } from 'web-components/src/components/typography';

import BackgroundSection from '../BackgroundSection/BackgroundSection';
import { IconLabel } from './ConnectSection.IconLabel';
import { useConnectSectionStyles } from './ConnectSection.styles';
import { IconLabelProps } from './ConnectSection.types';

interface ConnectSectionProps {
  header: string;
  icons: IconLabelProps[];
  itemClassName?: string;
  /** removes `label` and `subLabel on items, presents in a more compact form */
  isCompact?: boolean;
  titleClassName?: string;
  className?: string;
  backgroundImage: string | StaticImageData;
}

const ConnectSection = ({
  header,
  titleClassName,
  className,
  backgroundImage,
  isCompact,
  icons,
  itemClassName,
}: ConnectSectionProps): JSX.Element => {
  const { classes } = useConnectSectionStyles();
  return (
    <BackgroundSection
      className={clsx(className, classes.root)}
      linearGradient="unset"
      topSection={false}
      imageSrc={backgroundImage}
    >
      <Center
        col
        sx={theme => ({
          maxWidth: isCompact ? theme.spacing(185) : 'auto',
          margin: '0 auto',
        })}
      >
        <Title
          className={titleClassName}
          variant="h2"
          mobileVariant="h3"
          align="center"
          color="primary.main"
        >
          {header}
        </Title>
        <Grid
          container
          spacing={4}
          justifyContent={['space-around', 'center']}
          rowGap={8}
          columnGap={1}
          sx={{ mt: [8, 10] }}
        >
          {icons.map((item, i) => (
            <Grid item xs={3} md={2} className={itemClassName} key={i}>
              <IconLabel
                href={item.href}
                icon={item.icon}
                smallSvg={item.smallSvg}
                label={item.label}
                isCompact={isCompact}
                subLabel={item.subLabel}
              />
            </Grid>
          ))}
        </Grid>
      </Center>
    </BackgroundSection>
  );
};

export default ConnectSection;
