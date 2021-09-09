import React, { useState } from 'react';
import { makeStyles, useTheme, Link } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { Link as RouterLink } from 'react-router-dom';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import OnboardingFooter from 'web-components/lib/components/fixed-footer/OnboardingFooter';
import Toggle from 'web-components/lib/components/inputs/Toggle';
import ImageField from 'web-components/lib/components/inputs/ImageField';
import Modal from 'web-components/lib/components/modal';
import Title from 'web-components/lib/components/title';
import Card from 'web-components/lib/components/cards/Card';
import Description from 'web-components/lib/components/description';
import OrganizationIcon from 'web-components/lib/components/icons/OrganizationIcon';
import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';
import ProjectTopCard from 'web-components/lib/components/cards/ProjectTopCard';

interface EntityDisplayFormProps {
  submit: (values: EntityDisplayValues) => Promise<void>;
  initialValues?: EntityDisplayValues;
}

export interface IndividualDisplayValues extends IndividualShape, IndividualDisplayShape {}
export interface OrganizationDisplayValues extends OrganizationShape, OrganizationDisplayShape {}
export interface EntityDisplayValues {
  'http://regen.network/landOwner'?: OrganizationDisplayValues | IndividualDisplayValues;
  'http://regen.network/landSteward'?: OrganizationDisplayValues | IndividualDisplayValues;
  'http://regen.network/projectDeveloper'?: OrganizationDisplayValues | IndividualDisplayValues;
  'http://regen.network/projectOriginator'?: OrganizationDisplayValues | IndividualDisplayValues;
}

type EntityFieldName =
  | 'http://regen.network/landOwner'
  | 'http://regen.network/landSteward'
  | 'http://regen.network/projectDeveloper'
  | 'http://regen.network/projectOriginator';

type EnityType = 'http://regen.network/Individual' | 'http://regen.network/Organization';

interface OrganizationShape {
  '@type': EnityType;
  'http://schema.org/legalName': string;
}

interface IndividualShape {
  '@type': EnityType;
  'http://schema.org/name': string;
}

interface OrganizationDisplayShape {
  'http://regen.network/showOnProjectPage': boolean;
  'http://schema.org/name'?: string;
  'http://schema.org/logo'?: string;
  'http://schema.org/description'?: string;
}

interface IndividualDisplayShape {
  'http://regen.network/showOnProjectPage': boolean;
  'http://schema.org/image'?: string;
  'http://schema.org/description'?: string;
}
interface FormletProps {
  role: EntityFieldName;
  handleChange: any;
  values: EntityDisplayValues;
}

export interface EntityDisplayValuesErrors {
  // TODO
}

const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: 700,
    color: theme.palette.primary.contrastText,
    fontFamily: theme.typography.fontFamily,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(18),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  field: {
    marginBottom: theme.spacing(8),
  },
  description: {
    marginBottom: theme.spacing(4),
  },
  error: {
    marginTop: 0,
  },
  activeContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  organizationIcon: {
    height: theme.spacing(11),
    width: '100%',
  },
  link: {
    cursor: 'pointer',
  },
  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  modalTitle: {
    maxWidth: '70%',
    textAlign: 'center',
    paddingBottom: theme.spacing(4),
  },
  modalCard: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(4),
  },
  projectTopCard: {
    paddingBottom: 0,
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(15),
    },
  },
  modalText: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
    },
  },
  examplePageText: {
    fontSize: theme.typography.pxToRem(16),
    paddingBottom: theme.spacing(5),
  },
  toggleDescription: {
    fontStyle: 'italic',
    color: theme.palette.info.main,
  },
  modalUserInfo: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(8),
      marginBottom: 0,
    },
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(15),
    },
  },
}));

const EntityDisplayForm: React.FC<EntityDisplayFormProps> = ({ submit, initialValues }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const styles = useStyles();
  const theme = useTheme();

  const getToggle = (
    fieldName: EntityFieldName,
    handleChange: any,
    values: EntityDisplayValues,
  ): JSX.Element | null => {
    const entity: OrganizationDisplayValues | IndividualDisplayValues | undefined = values[fieldName];
    if (entity && values) {
      if (entity['@type'] === 'http://regen.network/Individual') {
        return <IndividualFormlet role={fieldName} handleChange={handleChange} values={values} />;
      } else if (entity['@type'] === 'http://regen.network/Organization') {
        return <OrganizationFormlet role={fieldName} handleChange={handleChange} values={values} />;
      }
    }
    return null;
  };

  const OrganizationFormlet: React.FC<FormletProps> = ({ handleChange, values, role }) => {
    return (
      <Field
        className={styles.field}
        label={`${values[role]['http://schema.org/legalName']} ${getEntityTypeString(role)}`}
        type="checkbox"
        component={Toggle}
        onChange={handleChange}
        name={`['${role}'].['http://regen.network/showOnProjectPage']`}
        checked={!!values[role]?.['http://regen.network/showOnProjectPage']}
        activeContent={
          <div className={styles.activeContent}>
            <Field
              className={styles.field}
              component={ControlledTextField}
              name={`['${role}'].['http://schema.org/name']`}
              label="Organization display name"
              optional
              placeholder="i.e. Cherrybrook Farms"
            />
            <Field
              className={styles.field}
              component={ImageField}
              label="Organization logo"
              name={`['${role}'].['http://schema.org/logo']`}
              fallbackAvatar={
                <OrganizationIcon className={styles.organizationIcon} color={theme.palette.info.main} />
              }
            />
            <Field
              charLimit={160}
              component={ControlledTextField}
              label="Short organization description"
              name={`['${role}'].['http://schema.org/description']`}
              rows={4}
              multiline
            />
          </div>
        }
      />
    );
  };

  const IndividualFormlet: React.FC<FormletProps> = ({ handleChange, values, role }) => {
    return (
      <Field
        className={styles.field}
        classes={{ description: styles.toggleDescription }}
        label={`${values[role]['http://schema.org/name']} ${getEntityTypeString(role)}`}
        description="recommended to increase salability"
        type="checkbox"
        component={Toggle}
        onChange={handleChange}
        name={`['${role}'].['http://regen.network/showOnProjectPage']`}
        checked={!!values[role]?.['http://regen.network/showOnProjectPage']}
        activeContent={
          <div className={styles.activeContent}>
            <Field
              className={styles.field}
              component={ImageField}
              label="Bio photo"
              name={`['${role}'].['http://schema.org/photo']`}
            />
            <Field
              charLimit={160}
              component={ControlledTextField}
              label="Short personal description"
              description="Describe any relevant background and experience."
              name={`['${role}'].['http://schema.org/description']`}
              rows={4}
              multiline
            />
          </div>
        }
      />
    );
  };

  const getEntityTypeString = (shaclRole: EntityFieldName): string => {
    const friendlyRoles: any = {
      'http://regen.network/landOwner': '(land owner)',
      'http://regen.network/landSteward': '(land steward)',
      'http://regen.network/projectDeveloper': '(project developer)',
      'http://regen.network/projectOriginator': '(project originator)',
      default: '',
    };
    return friendlyRoles[shaclRole] || friendlyRoles.default;
  };

  return (
    <>
      <Formik
        enableReinitialize
        validateOnMount
        initialValues={
          initialValues || {
            'http://regen.network/landOwner': initialValues?.['http://regen.network/landOwner'],
            'http://regen.network/landSteward': initialValues?.['http://regen.network/landSteward'],
            'http://regen.network/projectDeveloper': initialValues?.['http://regen.network/projectDeveloper'],
            'http://regen.network/projectOriginator':
              initialValues?.['http://regen.network/projectOriginator'],
          }
        }
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            await submit(values);
            setSubmitting(false);
          } catch (e) {
            setSubmitting(false);
          }
        }}
      >
        {({ submitForm, isValid, isSubmitting, handleChange, values }) => {
          return (
            <Form translate="yes">
              <OnBoardingCard>
                <Title className={styles.title}>Choose the entities to show on the project page:</Title>
                <Description className={styles.description}>
                  Showing more entities increases the salability of the project. You must show at least one
                  entity on the project page. These entities can only be edited in the previous step.&nbsp;
                  <Link className={styles.link} onClick={() => setModalOpen(true)}>
                    See an example»
                  </Link>
                </Description>

                {values['http://regen.network/landOwner'] &&
                  getToggle('http://regen.network/landOwner', handleChange, values)}
                {values['http://regen.network/landSteward'] &&
                  getToggle('http://regen.network/landSteward', handleChange, values)}
                {values['http://regen.network/projectDeveloper'] &&
                  getToggle('http://regen.network/projectDeveloper', handleChange, values)}
                {values['http://regen.network/projectOriginator'] &&
                  getToggle('http://regen.network/projectOriginator', handleChange, values)}
              </OnBoardingCard>

              <OnboardingFooter
                onSave={submitForm}
                saveText={'Save and Next'}
                onPrev={() => null} // TODO
                onNext={() => null} // TODO
                hideProgress={false} // TODO
                saveDisabled={!isValid || isSubmitting}
                percentComplete={0} // TODO
              />
            </Form>
          );
        }}
      </Formik>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className={styles.modalContent}>
          <Title className={styles.modalTitle} variant="h5">
            Example of Entity Display
          </Title>
          <Description className={styles.examplePageText}>
            See full{' '}
            <RouterLink to="/projects/wilmot" target="_blank">
              project page»
            </RouterLink>
          </Description>
          <Card className={styles.modalCard}>
            <ProjectTopCard
              classes={{ root: styles.projectTopCard, userInfo: styles.modalUserInfo }}
              projectDeveloper={{
                name: 'Impact Ag Partners',
                imgSrc: 'https://regen-registry.s3.amazonaws.com/projects/wilmot/impactag.jpg',
                description:
                  'Impact Ag Partners is a specialist agricultural asset management firm and advisory service which utilises a variety of pathways and partners to measure and monetize natural capital.',
                type: 'project developer',
              }}
              landSteward={{
                name: 'Wilmot Cattle Co.',
                type: 'organization',
                place: {
                  state: 'New South Wales',
                  country: 'Australia',
                },
                imgSrc: 'https://regen-registry.s3.amazonaws.com/projects/wilmot/wilmot.jpg',
                description: 'Wilmot Cattle Company is an innovative, regenerative, grass-fed beef business.',
              }}
            />
          </Card>
        </div>
      </Modal>
    </>
  );
};

export { EntityDisplayForm };
