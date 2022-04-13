import React, { useState } from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { Link } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { Link as RouterLink, useParams } from 'react-router-dom';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import Toggle from 'web-components/lib/components/inputs/Toggle';
import Modal from 'web-components/lib/components/modal';
import { Title } from 'web-components/lib/components/typography';
import Card from 'web-components/lib/components/cards/Card';
import Description from 'web-components/lib/components/description';
import OrganizationIcon from 'web-components/lib/components/icons/OrganizationIcon';
import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';
import ProjectTopCard from 'web-components/lib/components/cards/ProjectTopCard';
import { ImageUpload } from 'web-components/lib/components/inputs/ImageUpload';
import { isIndividual } from 'web-components/lib/components/inputs/RoleField';
import { OrganizationFormValues } from 'web-components/lib/components/modal/OrganizationModal';
import { IndividualFormValues } from 'web-components/lib/components/modal/IndividualModal';
import { requiredMessage } from 'web-components/lib/components/inputs/validation';

import { validate, getProjectPageBaseData } from '../../lib/rdf';
import getApiUri from '../../lib/apiUri';
import { useShaclGraphByUriQuery } from '../../generated/graphql';
import { urlType } from './MediaForm';
import { ProjectPageFooter } from '../molecules';
import { useProjectEditContext } from '../../pages/ProjectEdit';

interface EntityDisplayFormProps {
  submit: (values: EntityDisplayValues) => Promise<void>;
  initialValues?: EntityDisplayValues;
}

interface IndividualDisplayValues
  extends IndividualFormValues,
    IndividualDisplayShape {}

interface OrganizationDisplayValues
  extends OrganizationFormValues,
    OrganizationDisplayShape {}

export type DisplayValues = OrganizationDisplayValues | IndividualDisplayValues;

export interface EntityDisplayValues {
  'http://regen.network/landOwner'?: DisplayValues;
  'http://regen.network/landSteward'?: DisplayValues;
  'http://regen.network/projectDeveloper'?: DisplayValues;
  'http://regen.network/projectOriginator'?: DisplayValues;
}

export type EntityFieldName = keyof EntityDisplayValues;

interface OrganizationDisplayShape {
  'http://regen.network/showOnProjectPage': boolean;
  'http://schema.org/name'?: string;
  'http://schema.org/logo'?: urlType;
  'http://schema.org/description'?: string;
}

interface IndividualDisplayShape {
  'http://regen.network/showOnProjectPage': boolean;
  'http://schema.org/image'?: urlType;
  'http://schema.org/description'?: string;
}

interface FormletProps {
  role: EntityFieldName;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
  setFieldTouched: (
    field: string,
    isTouched?: boolean | undefined,
    shouldValidate?: boolean | undefined,
  ) => void;
}

interface OrganizationFormletProps extends FormletProps {
  entity: OrganizationDisplayValues;
}

interface IndividualFormletProps extends FormletProps {
  entity: IndividualDisplayValues;
}

type Errors = {
  [key in EntityFieldName | 'generic']?:
    | {
        [key in keyof DisplayValues]?: string;
      }
    | string;
};

const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: 700,
    color: theme.palette.primary.contrastText,
    fontFamily: theme.typography.fontFamily,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(18),
    },
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(8),
      marginBottom: 0,
    },
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(15),
    },
  },
}));

function getEntityTypeString(shaclRole: EntityFieldName): string {
  const friendlyRoles: { [key in EntityFieldName | 'default']: string } = {
    'http://regen.network/landOwner': '(land owner)',
    'http://regen.network/landSteward': '(land steward)',
    'http://regen.network/projectDeveloper': '(project developer)',
    'http://regen.network/projectOriginator': '(project originator)',
    default: '',
  };
  return friendlyRoles[shaclRole] || friendlyRoles.default;
}

async function setType(
  role: string,
  type: string,
  value: boolean,
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void,
  setFieldTouched: (
    field: string,
    isTouched?: boolean | undefined,
    shouldValidate?: boolean | undefined,
  ) => void,
): Promise<void> {
  const fieldName: string = `['${role}'].['@type']`;
  await setFieldValue(
    fieldName,
    value
      ? [`http://regen.network/${type}`, `http://regen.network/${type}Display`]
      : `http://regen.network/${type}`,
  );
  setFieldTouched(fieldName, true);
}

const OrganizationFormlet: React.FC<OrganizationFormletProps> = ({
  role,
  entity,
  setFieldValue,
  setFieldTouched,
}) => {
  const styles = useStyles();
  const theme = useTheme();
  const apiUri = getApiUri();
  const { projectId } = useParams();

  const triggerOnChange = async (value: boolean): Promise<void> => {
    setType(role, 'Organization', value, setFieldValue, setFieldTouched);
  };
  return (
    <Field
      className={styles.field}
      label={`${entity?.['http://schema.org/legalName']} ${getEntityTypeString(
        role,
      )}`}
      type="checkbox"
      component={Toggle}
      name={`['${role}'].['http://regen.network/showOnProjectPage']`}
      checked={!!entity?.['http://regen.network/showOnProjectPage']}
      triggerOnChange={triggerOnChange}
      activeContent={
        <div className={styles.activeContent}>
          <Field
            component={ControlledTextField}
            name={`['${role}'].['http://schema.org/name']`}
            label="Organization display name"
            optional
            placeholder="i.e. Cherrybrook Farms"
          />
          <Field
            component={ImageUpload}
            projectId={projectId}
            apiServerUrl={apiUri}
            label="Organization logo"
            name={`['${role}'].['http://schema.org/logo'].@value`}
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
            name={`['${role}'].['http://schema.org/description']`}
            rows={4}
            minRows={4}
            multiline
          />
        </div>
      }
    />
  );
};

const IndividualFormlet: React.FC<IndividualFormletProps> = ({
  entity,
  role,
  setFieldValue,
  setFieldTouched,
}) => {
  const styles = useStyles();
  const { projectId } = useParams();
  const apiUri = getApiUri();
  const triggerOnChange = async (value: boolean): Promise<void> => {
    setType(role, 'Individual', value, setFieldValue, setFieldTouched);
  };
  return (
    <Field
      className={styles.field}
      classes={{ description: styles.toggleDescription }}
      label={`${entity['http://schema.org/name']} ${getEntityTypeString(role)}`}
      description="recommended to increase salability"
      type="checkbox"
      component={Toggle}
      name={`['${role}'].['http://regen.network/showOnProjectPage']`}
      checked={!!entity['http://regen.network/showOnProjectPage']}
      triggerOnChange={triggerOnChange}
      activeContent={
        <div className={styles.activeContent}>
          <Field
            className={styles.field}
            component={ImageUpload}
            label="Bio photo"
            name={`['${role}'].['http://schema.org/image'].@value`}
            projectId={projectId}
            apiServerUrl={apiUri}
          />
          <Field
            charLimit={160}
            component={ControlledTextField}
            label="Short personal description"
            description="Describe any relevant background and experience."
            name={`['${role}'].['http://schema.org/description']`}
            rows={4}
            minRows={4}
            multiline
          />
        </div>
      }
    />
  );
};

function getToggle(
  fieldName: EntityFieldName,
  values: EntityDisplayValues,
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void,
  setFieldTouched: (
    field: string,
    isTouched?: boolean | undefined,
    shouldValidate?: boolean | undefined,
  ) => void,
): JSX.Element | null {
  const entity = values[fieldName];
  if (entity) {
    if (isIndividual(entity)) {
      return (
        <IndividualFormlet
          role={fieldName}
          entity={entity}
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
        />
      );
    } else {
      return (
        <OrganizationFormlet
          role={fieldName}
          entity={entity}
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
        />
      );
    }
  }
  return null;
}

function getInitialValues(values?: DisplayValues): DisplayValues | undefined {
  if (!values) {
    return undefined;
  }
  const initialURL: urlType = { '@type': 'http://schema.org/URL' };
  if (isIndividual(values)) {
    return {
      ...{ 'http://schema.org/image': initialURL },
      ...values,
    };
  } else {
    return {
      ...{ 'http://schema.org/logo': initialURL },
      ...values,
    };
  }
}

const EntityDisplayForm: React.FC<EntityDisplayFormProps> = ({
  submit,
  initialValues,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const styles = useStyles();
  const { confirmSave, isEdit } = useProjectEditContext();
  const { data: graphData } = useShaclGraphByUriQuery({
    variables: {
      uri: 'http://regen.network/ProjectPageShape',
    },
  });

  return (
    <>
      <Formik
        enableReinitialize
        validateOnMount
        initialValues={{
          'http://regen.network/landOwner': getInitialValues(
            initialValues?.['http://regen.network/landOwner'],
          ),
          'http://regen.network/landSteward': getInitialValues(
            initialValues?.['http://regen.network/landSteward'],
          ),
          'http://regen.network/projectDeveloper': getInitialValues(
            initialValues?.['http://regen.network/projectDeveloper'],
          ),
          'http://regen.network/projectOriginator': getInitialValues(
            initialValues?.['http://regen.network/projectOriginator'],
          ),
        }}
        validate={async (values: EntityDisplayValues): Promise<Errors> => {
          const errors: Errors = {};
          let validateProject: boolean = true;
          if (graphData?.shaclGraphByUri?.graph) {
            // Validate role specific data so we can display field specific errors
            // for roles shown on project page
            for (const role in values) {
              const value: DisplayValues = values[
                role as EntityFieldName
              ] as DisplayValues;
              if (value?.['http://regen.network/showOnProjectPage']) {
                validateProject = false;
                const report = await validate(
                  graphData.shaclGraphByUri.graph,
                  value,
                  'http://regen.network/ProjectPageEntityDisplayGroup',
                );
                for (const result of report.results) {
                  const path: any = result.path.value;
                  const error =
                    path === 'http://schema.org/image' ||
                    path === 'http://schema.org/logo'
                      ? { '@value': requiredMessage }
                      : requiredMessage;
                  errors[role as EntityFieldName] = { [path]: error };
                }
              }
            }
            if (validateProject) {
              const projectPageData = {
                ...getProjectPageBaseData(),
                ...values,
              };
              const report = await validate(
                graphData.shaclGraphByUri.graph,
                projectPageData,
                'http://regen.network/ProjectPageEntityDisplayGroup',
              );
              if (!report.conforms) {
                // TODO: display the error banner in case of generic error
                // https://github.com/regen-network/regen-registry/issues/554
                errors['generic'] =
                  'You must show at least one of the following roles on the project page';
              }
            }
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setTouched }) => {
          setSubmitting(true);
          try {
            await submit(values);
            setSubmitting(false);
            setTouched({}); // reset to untouched
            if (isEdit && confirmSave) confirmSave();
          } catch (e) {
            setSubmitting(false);
          }
        }}
      >
        {({
          submitForm,
          isValid,
          isSubmitting,
          values,
          setFieldValue,
          setFieldTouched,
          touched,
        }) => {
          return (
            <Form translate="yes">
              <OnBoardingCard>
                <Title className={styles.title}>
                  Choose the entities to show on the project page:
                </Title>
                <Description className={styles.description}>
                  Showing more entities increases the salability of the project.
                  You must show at least one entity on the project page. These
                  entities can only be edited in the previous step.&nbsp;
                  <Link
                    className={styles.link}
                    onClick={() => setModalOpen(true)}
                  >
                    See an example»
                  </Link>
                </Description>

                {values['http://regen.network/landOwner'] &&
                  getToggle(
                    'http://regen.network/landOwner',
                    values,
                    setFieldValue,
                    setFieldTouched,
                  )}
                {values['http://regen.network/landSteward'] &&
                  getToggle(
                    'http://regen.network/landSteward',
                    values,
                    setFieldValue,
                    setFieldTouched,
                  )}
                {values['http://regen.network/projectDeveloper'] &&
                  getToggle(
                    'http://regen.network/projectDeveloper',
                    values,
                    setFieldValue,
                    setFieldTouched,
                  )}
                {values['http://regen.network/projectOriginator'] &&
                  getToggle(
                    'http://regen.network/projectOriginator',
                    values,
                    setFieldValue,
                    setFieldTouched,
                  )}
              </OnBoardingCard>
              <ProjectPageFooter
                onSave={submitForm}
                saveDisabled={
                  !isValid || isSubmitting || !Object.keys(touched).length
                }
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
              classes={{
                root: styles.projectTopCard,
                userInfo: styles.modalUserInfo,
              }}
              projectDeveloper={{
                name: 'Impact Ag Partners',
                type: 'ORGANIZATION',
                image:
                  'https://regen-registry.s3.amazonaws.com/projects/wilmot/impactag.jpg',
                description:
                  'Impact Ag Partners is a specialist agricultural asset management firm and advisory service which utilises a variety of pathways and partners to measure and monetize natural capital.',
              }}
              landSteward={{
                name: 'Wilmot Cattle Co.',
                type: 'ORGANIZATION',
                location: 'New South Wales, Australia',
                image:
                  'https://regen-registry.s3.amazonaws.com/projects/wilmot/wilmot.jpg',
                description:
                  'Wilmot Cattle Company is an innovative, regenerative, grass-fed beef business.',
              }}
            />
          </Card>
        </div>
      </Modal>
    </>
  );
};

export { EntityDisplayForm };
