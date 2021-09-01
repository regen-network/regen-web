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

export interface EntityDisplayValues {
  'http://regen.network/landOwner'?: OrganizationDisplayShape | IndividualDisplayShape;
  'http://regen.network/landSteward'?: OrganizationDisplayShape | IndividualDisplayShape;
  'http://regen.network/projectDeveloper'?: OrganizationDisplayShape | IndividualDisplayShape;
  'http://regen.network/projectOriginator'?: OrganizationDisplayShape | IndividualDisplayShape;
}

export interface OrganizationDisplayShape {
  'http://regen.network/EntityDisplayShape-showOnProjectPage': boolean;
  legalName?: string;
  name?: string;
  logo?: string;
  description?: string;
}

export interface IndividualDisplayShape {
  'http://regen.network/EntityDisplayShape-showOnProjectPage': boolean;
  legalName?: string;
  name?: string;
  image?: string;
  description?: string;
}

// export interface EntityDisplayValues {
//   'http://regen.network/EntityDisplayShape-showOnProjectPage': boolean;
// }

export interface EntityDisplayValuesErrors {
  // 'http://regen.network/landOwner': string;
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
  userInfo: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(12),
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

  const getToggle = (entity: any, fieldName: string, handleChange: any, values: any): JSX.Element | null => {
    if (entity['@type'] === 'http://regen.network/Individual') {
      return <IndividualFormlet fieldName={fieldName} handleChange={handleChange} values={values} />;
    } else if (entity['@type'] === 'http://regen.network/Organization') {
      return <OrganizationFormlet fieldName={fieldName} handleChange={handleChange} values={values} />;
    }
    return null;
  };

  const OrganizationFormlet: React.FC<any> = ({ handleChange, values, fieldName }) => {
    return (
      <Field
        className={styles.field}
        label={`${values[fieldName].legalName} (${getEntityTypeString(fieldName)})`}
        type="checkbox"
        component={Toggle}
        onChange={handleChange}
        name={`[${fieldName}].['http://regen.network/EntityDisplayShape-showOnProjectPage']`}
        checked={!!values[fieldName]?.['http://regen.network/EntityDisplayShape-showOnProjectPage']}
        activeContent={
          <div className={styles.activeContent}>
            <Field
              className={styles.field}
              component={ControlledTextField}
              name={`[${fieldName}].name`}
              label="Organization display name"
              optional
              placeholder="i.e. Cherrybrook Farms"
            />
            <Field
              className={styles.field}
              component={ImageField}
              label="Organization logo"
              name={`[${fieldName}].logo`}
              fallbackAvatar={
                <OrganizationIcon className={styles.organizationIcon} color={theme.palette.info.main} />
              }
            />
            <Field
              charLimit={160}
              component={ControlledTextField}
              label="Short organization description"
              name={`[${fieldName}].description`}
              rows={4}
              multiline
            />
          </div>
        }
      />
    );
  };

  const getEntityTypeString = (fieldName: string): string => {
    const friendlyNames: any = {
      'http://regen.network/landOwner': 'land owner',
      'http://regen.network/landSteward': 'land steward',
      'http://regen.network/projectDeveloper': 'project developer',
      'http://regen.network/projectOriginator': 'project originator',
      default: '',
    };
    return friendlyNames[fieldName] || friendlyNames.default;
  };

  const IndividualFormlet: React.FC<any> = ({ handleChange, values, fieldName }) => {
    return (
      <Field
        className={styles.field}
        classes={{ description: styles.toggleDescription }}
        label={`${values[fieldName].name} (${getEntityTypeString(fieldName)})`}
        description="recommended to increase salability"
        type="checkbox"
        component={Toggle}
        onChange={handleChange}
        name={`[${fieldName}].['http://regen.network/EntityDisplayShape-showOnProjectPage']`}
        checked={!!values[fieldName]?.['http://regen.network/EntityDisplayShape-showOnProjectPage']}
        activeContent={
          <div className={styles.activeContent}>
            <Field
              className={styles.field}
              component={ImageField}
              label="Bio photo"
              name={`[${fieldName}].photo`}
            />
            <Field
              charLimit={160}
              component={ControlledTextField}
              label="Short personal description"
              description="Describe any relevant background and experience."
              name={`[${fieldName}].description`}
              rows={4}
              multiline
            />
          </div>
        }
      />
    );
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
                  getToggle(
                    values['http://regen.network/landOwner'],
                    'http://regen.network/landOwner',
                    handleChange,
                    values,
                  )}
                {values['http://regen.network/landSteward'] &&
                  getToggle(
                    values['http://regen.network/landSteward'],
                    'http://regen.network/landSteward',
                    handleChange,
                    values,
                  )}
                {values['http://regen.network/projectDeveloper'] &&
                  getToggle(
                    values['http://regen.network/projectDeveloper'],
                    'http://regen.network/projectDeveloper',
                    handleChange,
                    values,
                  )}
                {values['http://regen.network/projectOriginator'] &&
                  getToggle(
                    values['http://regen.network/projectOriginator'],
                    'http://regen.network/projectOriginator',
                    handleChange,
                    values,
                  )}
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
