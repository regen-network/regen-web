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
  // landOwner?: OrganizationDisplayShape | IndividualDisplayShape;
  // landSteward?: OrganizationDisplayShape | IndividualDisplayShape;
  // projectDeveloper?: OrganizationDisplayShape | IndividualDisplayShape;
  // projectOriginator?: OrganizationDisplayShape | IndividualDisplayShape;
}

export interface EntityDisplayValues {
  'regen:landOwner'?: OrganizationDisplayShape | IndividualDisplayShape;
  'regen:landSteward'?: OrganizationDisplayShape | IndividualDisplayShape;
  'regen:projectDeveloper'?: OrganizationDisplayShape | IndividualDisplayShape;
  'regen:projectOriginator'?: OrganizationDisplayShape | IndividualDisplayShape;
}

export interface OrganizationDisplayShape {
  'regen:EntityDisplayShape-showOnProjectPage': boolean;
  legalName?: string;
  name?: string;
  logo?: string;
  description?: string;
}

export interface IndividualDisplayShape {
  'regen:EntityDisplayShape-showOnProjectPage': boolean;
  legalName?: string;
  name?: string;
  image?: string;
  description?: string;
}

// export interface EntityDisplayValues {
//   'regen:EntityDisplayShape-showOnProjectPage': boolean;
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

  return (
    <>
      <Formik
        enableReinitialize
        validateOnMount
        initialValues={
          initialValues || {
            'regen:landOwner': initialValues?.['regen:landOwner'] || undefined,
            'regen:landSteward': initialValues?.['regen:landSteward'] || undefined,
            'regen:projectDeveloper': initialValues?.['regen:projectDeveloper'] || undefined,
            'regen:projectOriginator': initialValues?.['regen:projectOriginator'] || undefined,
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
          // regen:OrganizationDisplayShape
          //   a sh:NodeShape ;
          //   sh:targetClass regen:Organization ;
          //   sh:property regen:EntityDisplayShape-showOnProjectPage ;
          //   sh:property [
          //     sh:path schema:name ;
          //     sh:datatype xsd:string ;
          //     sh:name "Organization display name" ;
          //     sh:description "This is the display name on your project page, if you choose to make this entity publically viewable." ;
          //   ] ;
          //   sh:property [
          //     sh:path schema:logo ;
          //     sh:datatype schema:URL ;
          //     sh:name "Organization logo" ;
          //     sh:minCount 1 ;
          //     sh:maxCount 1 ;
          //   ] ;
          //   sh:property [
          //     sh:path schema:description ;
          //     sh:datatype xsd:string ;
          //     sh:name "Short organization description" ;
          //     sh:minCount 1 ;
          //     sh:maxCount 1 ;
          //     sh:maxLength 160 ;
          //   ] ;
          // .

          // regen:IndividualDisplayShape
          //   a sh:NodeShape ;
          //   sh:targetClass regen:Individual ;
          //   sh:property regen:EntityDisplayShape-showOnProjectPage ;
          //   sh:property [
          //     sh:path schema:image ;
          //     sh:datatype schema:URL ;
          //     sh:name "Bio photo" ;
          //     sh:minCount 1 ;
          //     sh:maxCount 1 ;
          //   ] ;
          //   sh:property [
          //     sh:path schema:description ;
          //     sh:datatype xsd:string ;
          //     sh:name "Short person description" ;
          //     sh:description "Describe any relevant background and experience." ;
          //     sh:minCount 1 ;
          //     sh:maxCount 1 ;
          //     sh:maxLength 160 ;
          //   ] ;
          // .

          // # The following property isn't actually used for validation but could be used for
          // # form generation later on.
          // # Indeed, we have a separate form in the UI for choosing which entities to display
          // # on the project page, but we're actually storing this info as part of regen:landOwner,
          // # regen:landSteward and regen:projectDeveloper along with the "Roles" info.
          // sh:property [
          //   sh:name "Choose the entities to show on the project page:" ;
          //   sh:description "Showing more entities increases the salability of the project. You must show at least one entity on the project page. These entities can only be edited in the previous step." ;
          //   sh:group regen:ProjectPageEntityDisplayGroup ;
          // ] ;
          // # We should show at least one of the project stakeholders on the project page.
          // sh:or (
          //   [
          //     sh:property [
          //       sh:path regen:landOwner ;
          //       sh:minCount 1 ;
          //       sh:maxCount 1 ;
          //       sh:xone (
          //         sh:node regen:IndividualDisplayShape
          //         sh:node regen:OrganizationDisplayShape
          //       ) ;
          //       sh:group regen:ProjectPageEntityDisplayGroup ;
          //     ]
          //   ]
          //   [
          //     sh:property [
          //       sh:path regen:landSteward ;
          //       sh:description "recommended to increase salability" ;
          //       sh:minCount 1 ;
          //       sh:maxCount 1 ;
          //       sh:xone (
          //         sh:node regen:IndividualDisplayShape
          //         sh:node regen:OrganizationDisplayShape
          //       ) ;
          //       sh:group regen:ProjectPageEntityDisplayGroup ;
          //     ]
          //   ]
          //   [
          //     sh:property [
          //       sh:path regen:projectDeveloper ;
          //       sh:description "recommended to increase salability" ;
          //       sh:minCount 1 ;
          //       sh:maxCount 1 ;
          //       sh:xone (
          //         sh:node regen:IndividualDisplayShape
          //         sh:node regen:OrganizationDisplayShape
          //       ) ;
          //       sh:group regen:ProjectPageEntityDisplayGroup ;
          //     ]
          //   ]
          // ) ;

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

                {values['regen:landOwner'] && (
                  <Field
                    className={styles.field}
                    label={values['regen:landOwner'].legalName}
                    type="checkbox"
                    component={Toggle}
                    onChange={handleChange}
                    name="regen:EntityDisplayShape-showOnProjectPage"
                    checked={!!values['regen:landOwner']?.['regen:EntityDisplayShape-showOnProjectPage']}
                    activeContent={
                      <div className={styles.activeContent}>
                        <Field
                          className={styles.field}
                          component={ControlledTextField}
                          name="['regen:landOwner'].name"
                          label="Organization display name"
                          optional
                          placeholder="i.e. Cherrybrook Farms"
                        />
                        <Field
                          className={styles.field}
                          component={ImageField}
                          label="Organization logo"
                          name="['regen:landOwner'].logo"
                          fallbackAvatar={
                            <OrganizationIcon
                              className={styles.organizationIcon}
                              color={theme.palette.info.main}
                            />
                          }
                        />
                        <Field
                          charLimit={160}
                          component={ControlledTextField}
                          label="Short organization description"
                          name="['regen:landOwner'].description"
                          rows={4}
                          multiline
                        />
                      </div>
                    }
                  />
                )}

                {/* <Field
                  className={styles.field}
                  classes={{ description: styles.toggleDescription }}
                  label="a person"
                  description="recommended to increase salability"
                  type="checkbox"
                  component={Toggle}
                  onChange={handleChange}
                  name="checkMe2"
                  checked={!!values.checkMe2}
                  activeContent={
                    <div className={styles.activeContent}>
                      <Field className={styles.field} component={ImageField} label="Bio photo" name="photo" />
                      <Field
                        charLimit={160}
                        component={ControlledTextField}
                        label="Short personal description"
                        description="Describe any relevant background and experience."
                        name="['http://regen.network/landStewardStory']"
                        rows={4}
                        multiline
                      />
                    </div>
                  }
                /> */}
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
