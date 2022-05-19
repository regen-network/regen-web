import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';

import { Theme } from 'web-components/lib/theme/muiTheme';
import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';
import { Body, Title } from 'web-components/lib/components/typography';
import Modal from 'web-components/lib/components/modal';
import Card from 'web-components/lib/components/cards/Card';
import { ProjectPageFooter } from '../molecules';
import { useShaclGraphByUriQuery } from '../../generated/graphql';
import { validate, getProjectPageBaseData } from '../../lib/rdf';
import { useProjectEditContext } from '../../pages/ProjectEdit';

interface StoryFormProps {
  submit: (values: StoryValues) => Promise<void>;
  initialValues?: StoryValues;
}

export interface StoryValues {
  'regen:landStory': string;
  'regen:landStewardStory': string;
  'regen:landStewardStoryTitle': string;
  'regen:projectQuote'?: Quote;
}

export interface StoryValuesErrors {
  'regen:landStory'?: string;
  'regen:landStewardStory'?: string;
  'regen:landStewardStoryTitle'?: string;
  'regen:projectQuote'?: QuoteErrors;
}

interface Example {
  type: string;
  text: string;
}

interface Quote {
  'regen:quote': string;
  'schema:name': string;
  'schema:jobTitle': string;
}

interface QuoteErrors {
  'regen:quote'?: string;
  'schema:name'?: string;
  'schema:jobTitle'?: string;
}

interface FieldNameExamples {
  'regen:landStory': Example;
  'regen:landStewardStory': Example;
  'regen:landStewardStoryTitle': Example;
  'regen:projectQuote': Example;
}

interface Errors {
  'regen:landStory': string;
  'regen:landStewardStory': string;
  'regen:landStewardStoryTitle': string;
  'regen:projectQuote': string;
}

type exampleFieldName =
  | 'regen:landStory'
  | 'regen:landStewardStory'
  | 'regen:landStewardStoryTitle'
  | 'regen:projectQuote';

const useStyles = makeStyles((theme: Theme) => ({
  storyCard: {
    paddingBottom: 0,
    marginBottom: theme.spacing(13),
  },
  quoteTitle: {
    marginBottom: theme.spacing(5),
    display: 'flex',
    alignItems: 'baseline',
  },
  paddingTop: {
    paddingTop: theme.spacing(4),
  },
  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  modalCard: {
    padding: theme.spacing(6, 4),
    whiteSpace: 'pre-wrap',
  },
}));

const examples: FieldNameExamples = {
  'regen:landStory': {
    type: 'Story of the Land',
    text: 'Wilmot is an extraordinary property high in the New England Tablelands at Ebor, New South Wales, Australia. Set on 1,854ha and at approximately 1,200m above sea level, average annual rainfall of 1,200mm, highly fertile volcanic basalt soils, and complimented by a series of pristine spring fed, year-round natural waterways including five waterfalls, it is quite simply a unique environment for growing cattle.',
  },
  'regen:landStewardStory': {
    type: 'Story of the Land Stewards',
    text:
      'Stu & Trish are the management team behind Wilmot Cattle Co and are driven by the exciting ecological opportunities they can foresee for the business. They have a wholehearted belief in regenerative agriculture and the benefits it will bring to the industry globally, as we collectively work to heal what has largely become a degraded landscape. They have a burning desire to succeed in agriculture and are very ambitious in the growth and development plans they have for Wilmot Cattle Co.\n\n' +
      'While Stu has managed the day to day operations of Wilmot since 2016, and now presides over the portfolio of all three properties in a General Manager capacity, Trish works tirelessly behind the scenes ensuring a high level of rigor around the data collection, management, and analysis of every aspect of the business. They firmly believe that you cannot manage what you do not measure and as such, the integrity of the data is paramount.\n\n' +
      'In their spare time, they enjoy exploring the natural wonders of Wilmot, including its five waterfalls and large areas of virtually native bushland, with their two kids Harry and Poppy. They all gain great satisfaction from discovering new species of plants and learning about their role in the ecosystem.',
  },
  'regen:landStewardStoryTitle': {
    type: 'Land Steward Story Title',
    text: 'Stuart Austin & Trisha Cowley have managed Wilmot since 2016',
  },
  'regen:projectQuote': {
    type: 'Quote',
    text: 'We feel privileged to have the opportunity to manage cattle in a truly holistic and regenerative way on such a remarkable property.',
  },
};

const quoteError: string = 'You must fill in all the quote fields, or none';
const errorMsgs: Errors = {
  'regen:landStory': 'Please fill in the story of the land',
  'regen:landStewardStory': 'Please fill in the story of the land stewards',
  'regen:landStewardStoryTitle':
    'Please fill in a title for the land steward story',
  'regen:projectQuote': quoteError,
};

const ModalContent: React.FC<{
  exampleProjectUrl: string;
  fieldName: exampleFieldName;
}> = ({ exampleProjectUrl, fieldName }) => {
  const styles = useStyles();

  return (
    <div className={styles.modalContent}>
      <Title variant="h5" sx={{ maxWidth: '70%', textAlign: 'center', pb: 4 }}>
        Example of {examples[fieldName].type}
      </Title>
      <Body pb={5}>
        See full example{' '}
        <Link to={exampleProjectUrl} target="_blank">
          project page»
        </Link>
      </Body>
      <Card className={styles.modalCard}>
        <Body size="lg">{examples[fieldName].text}</Body>
      </Card>
    </div>
  );
};

const StoryForm: React.FC<StoryFormProps> = ({ submit, initialValues }) => {
  const styles = useStyles();
  const { confirmSave, isEdit } = useProjectEditContext();
  const { data: graphData } = useShaclGraphByUriQuery({
    variables: {
      uri: 'http://regen.network/ProjectPageShape',
    },
  });

  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

  const showExample = (fieldName: exampleFieldName): void => {
    const content = (
      <ModalContent
        fieldName={fieldName}
        exampleProjectUrl={'/projects/wilmot'}
      />
    );
    setModalContent(content);
  };

  const handleModalClose = (): void => {
    setModalContent(null);
  };

  return (
    <>
      <Formik
        enableReinitialize
        validateOnMount
        initialValues={
          initialValues || {
            'regen:landStory': initialValues?.['regen:landStory'] || '',
            'regen:landStewardStory':
              initialValues?.['regen:landStewardStory'] || '',
            'regen:landStewardStoryTitle':
              initialValues?.['regen:landStewardStoryTitle'] || '',
            'regen:projectQuote':
              initialValues?.['regen:projectQuote'] || undefined,
          }
        }
        validate={async (values: StoryValues) => {
          const errors: StoryValuesErrors = {};
          if (graphData?.shaclGraphByUri?.graph) {
            const projectPageData = { ...getProjectPageBaseData(), ...values };
            const report = await validate(
              graphData.shaclGraphByUri.graph,
              projectPageData,
              'http://regen.network/ProjectPageStoryGroup',
            );
            for (const result of report.results) {
              const path: keyof StoryValues = result.path.value;
              if (path === 'regen:projectQuote') {
                errors['regen:projectQuote'] = {
                  'regen:quote': getProjectQuoteError(values, 'regen:quote'),
                  'schema:name': getProjectQuoteError(values, 'schema:name'),
                  'schema:jobTitle': getProjectQuoteError(
                    values,
                    'schema:jobTitle',
                  ),
                };
              } else {
                errors[path] = errorMsgs[path];
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
        {({ submitForm, submitCount, isValid, isSubmitting, touched }) => {
          return (
            <Form translate="yes">
              <OnBoardingCard className={styles.storyCard}>
                <Field
                  charLimit={500}
                  component={ControlledTextField}
                  label="Story of the land"
                  description="Describe the story of this property."
                  onExampleClick={() => showExample('regen:landStory')}
                  name="regen:landStory"
                  rows={5}
                  minRows={5}
                  multiline
                />
              </OnBoardingCard>
              <OnBoardingCard className={styles.storyCard}>
                <Field
                  charLimit={1500}
                  component={ControlledTextField}
                  label="Story of the land stewards"
                  description="Tell the story of who are they, what do they do on the land, what is their background, why are they excited to do this work."
                  onExampleClick={() => showExample('regen:landStewardStory')}
                  name="regen:landStewardStory"
                  rows={16}
                  minRows={16}
                  multiline
                />
                <Field
                  charLimit={80}
                  component={ControlledTextField}
                  label="Land steward story title"
                  description="In one sentence, summarize the story above of the land stewards."
                  onExampleClick={() =>
                    showExample('regen:landStewardStoryTitle')
                  }
                  name="regen:landStewardStoryTitle"
                  rows={2}
                  minRows={2}
                  multiline
                />
              </OnBoardingCard>
              <OnBoardingCard>
                <div className={styles.quoteTitle}>
                  <Title variant="h5">QUOTE</Title>
                  <Body>&nbsp;&nbsp;(optional)</Body>
                </div>
                <Field
                  charLimit={160}
                  component={ControlledTextField}
                  label="Quote from land steward or other important stakeholder"
                  description="Choose an inspiring quote that helps others understand why this project is important."
                  onExampleClick={() => showExample('regen:projectQuote')}
                  name="regen:projectQuote.regen:quote"
                  rows={16}
                  minRows={16}
                  multiline
                  defaultStyle={false}
                />
                <Field
                  component={ControlledTextField}
                  label="Name of person quoted"
                  name="regen:projectQuote.schema:name"
                />
                <Field
                  className={styles.paddingTop}
                  component={ControlledTextField}
                  label="Title of person quoted"
                  name="regen:projectQuote.schema:jobTitle"
                />
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
      <Modal open={!!modalContent} onClose={handleModalClose}>
        {modalContent}
      </Modal>
    </>
  );
};

function getProjectQuoteError(
  values: StoryValues,
  key: keyof Quote,
): string | undefined {
  return values?.['regen:projectQuote']?.[key]
    ? undefined
    : errorMsgs['regen:projectQuote'];
}

export { StoryForm };
