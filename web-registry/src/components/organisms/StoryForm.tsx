import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import OnboardingFooter from 'web-components/lib/components/fixed-footer/OnboardingFooter';
import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';
import Description from 'web-components/lib/components/description';
import Title from 'web-components/lib/components/title';
import Modal from 'web-components/lib/components/modal';
import Card from 'web-components/lib/components/cards/Card';
import { useShaclGraphByUriQuery } from '../../generated/graphql';
import { validate, getProjectPageBaseData } from '../../lib/rdf';

interface StoryFormProps {
  submit: (values: StoryValues) => Promise<void>;
  exampleProjectUrl: string;
  initialValues?: StoryValues;
}

export interface StoryValues {
  'http://regen.network/landStory': string;
  'http://regen.network/landStewardStory': string;
  'http://regen.network/landStewardStoryTitle': string;
  'http://regen.network/projectQuote'?: Quote;
}

export interface StoryValuesErrors {
  'http://regen.network/landStory'?: string;
  'http://regen.network/landStewardStory'?: string;
  'http://regen.network/landStewardStoryTitle'?: string;
  'http://regen.network/projectQuote'?: QuoteErrors;
}

interface Example {
  type: string;
  text: string;
}

interface Quote {
  'http://regen.network/quote': string;
  'http://schema.org/name': string;
  'http://schema.org/jobTitle': string;
}

interface QuoteErrors {
  'http://regen.network/quote'?: string;
  'http://schema.org/name'?: string;
  'http://schema.org/jobTitle'?: string;
}

interface FieldNameExamples {
  'http://regen.network/landStory': Example;
  'http://regen.network/landStewardStory': Example;
  'http://regen.network/landStewardStoryTitle': Example;
  'http://regen.network/projectQuote': Example;
}

interface Errors {
  'http://regen.network/landStory': string;
  'http://regen.network/landStewardStory': string;
  'http://regen.network/landStewardStoryTitle': string;
  'http://regen.network/projectQuote': string;
}

type exampleFieldName =
  | 'http://regen.network/landStory'
  | 'http://regen.network/landStewardStory'
  | 'http://regen.network/landStewardStoryTitle'
  | 'http://regen.network/projectQuote';

const useStyles = makeStyles((theme: Theme) => ({
  storyCard: {
    paddingBottom: 0,
  },
  quoteTitle: {
    marginBottom: theme.spacing(5),
    display: 'flex',
    alignItems: 'baseline',
  },
  title: {
    fontWeight: 800,
    color: theme.palette.info.dark,
  },
  description: {
    marginBottom: 0,
    fontSize: theme.typography.pxToRem(16),
  },
  field: {
    marginBottom: theme.spacing(4),
  },
  error: {
    marginTop: 0,
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
    padding: theme.spacing(6, 4),
    whiteSpace: 'pre-wrap',
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
}));

const examples: FieldNameExamples = {
  'http://regen.network/landStory': {
    type: 'Story of the Land',
    text:
      'Wilmot is an extraordinary property high in the New England Tablelands at Ebor, New South Wales, Australia. Set on 1,854ha and at approximately 1,200m above sea level, average annual rainfall of 1,200mm, highly fertile volcanic basalt soils, and complimented by a series of pristine spring fed, year-round natural waterways including five waterfalls, it is quite simply a unique environment for growing cattle.',
  },
  'http://regen.network/landStewardStory': {
    type: 'Story of the Land Stewards',
    text:
      'Stu & Trish are the management team behind Wilmot Cattle Co and are driven by the exciting ecological opportunities they can foresee for the business. They have a wholehearted belief in regenerative agriculture and the benefits it will bring to the industry globally, as we collectively work to heal what has largely become a degraded landscape. They have a burning desire to succeed in agriculture and are very ambitious in the growth and development plans they have for Wilmot Cattle Co.\n\n' +
      'While Stu has managed the day to day operations of Wilmot since 2016, and now presides over the portfolio of all three properties in a General Manager capacity, Trish works tirelessly behind the scenes ensuring a high level of rigor around the data collection, management, and analysis of every aspect of the business. They firmly believe that you cannot manage what you do not measure and as such, the integrity of the data is paramount.\n\n' +
      'In their spare time, they enjoy exploring the natural wonders of Wilmot, including its five waterfalls and large areas of virtually native bushland, with their two kids Harry and Poppy. They all gain great satisfaction from discovering new species of plants and learning about their role in the ecosystem.',
  },
  'http://regen.network/landStewardStoryTitle': {
    type: 'Land Steward Story Title',
    text: 'Stuart Austin & Trisha Cowley have managed Wilmot since 2016',
  },
  'http://regen.network/projectQuote': {
    type: 'Quote',
    text:
      'We feel privileged to have the opportunity to manage cattle in a truly holistic and regenerative way on such a remarkable property.',
  },
};

const quoteError: string = 'You must fill in all the quote fields, or none';
const errorMsgs: Errors = {
  'http://regen.network/landStory': 'Please fill in the story of the land',
  'http://regen.network/landStewardStory': 'Please fill in the story of the land stewards',
  'http://regen.network/landStewardStoryTitle': 'Please fill in a title for the land steward story',
  'http://regen.network/projectQuote': quoteError,
    // 'http://regen.network/quote': quoteError,
    // 'http://schema.org/name': quoteError,
    // 'http://schema.org/jobTitle': quoteError,
  // },
};

const ModalContent: React.FC<{ exampleProjectUrl: string; fieldName: exampleFieldName }> = ({
  exampleProjectUrl,
  fieldName,
}) => {
  const styles = useStyles();

  return (
    <div className={styles.modalContent}>
      <Title className={styles.modalTitle} variant="h5">
        Example of {examples[fieldName].type}
      </Title>
      <Description className={styles.examplePageText}>
        See full example{' '}
        <Link to={exampleProjectUrl} target="_blank">
          project page»
        </Link>
      </Description>
      <Card className={styles.modalCard}>
        <Description className={styles.modalText}>{examples[fieldName].text}</Description>
      </Card>
    </div>
  );
};

const StoryForm: React.FC<StoryFormProps> = ({ submit, exampleProjectUrl, initialValues }) => {
  const styles = useStyles();
  const { data: graphData } = useShaclGraphByUriQuery({
    variables: {
      uri: 'http://regen.network/ProjectPageShape',
    },
  });

  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

  const showExample = (fieldName: exampleFieldName): void => {
    const content = <ModalContent fieldName={fieldName} exampleProjectUrl={exampleProjectUrl} />;
    setModalContent(content);
  };

  const handleModalClose = (): void => {
    setModalContent(null);
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={
          initialValues || {
            'http://regen.network/landStory': initialValues?.['http://regen.network/landStory'] || '',
            'http://regen.network/landStewardStory':
              initialValues?.['http://regen.network/landStewardStory'] || '',
            'http://regen.network/landStewardStoryTitle':
              initialValues?.['http://regen.network/landStewardStoryTitle'] || '',
            'http://regen.network/projectQuote':
              initialValues?.['http://regen.network/projectQuote'] || undefined,
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
              if (path === 'http://regen.network/projectQuote') {
                errors['http://regen.network/projectQuote'] = {
                  'http://regen.network/quote': getProjectQuoteError(values, 'http://regen.network/quote'),
                  'http://schema.org/name': getProjectQuoteError(values, 'http://schema.org/name'),
                  'http://schema.org/jobTitle': getProjectQuoteError(values, 'http://schema.org/jobTitle'),
                };
              } else {
                errors[path] = errorMsgs[path];
              }
            }
          }
          return errors;
        }}
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
        {({ submitForm, submitCount, isValid, isSubmitting }) => {
          return (
            <Form translate="yes">
              <OnBoardingCard className={styles.storyCard}>
                <Field
                  className={styles.field}
                  charLimit={500}
                  component={ControlledTextField}
                  label="Story of the land"
                  description="Describe the story of this property."
                  onExampleClick={() => showExample('http://regen.network/landStory')}
                  name="['http://regen.network/landStory']"
                  rows={5}
                  multiline
                />
              </OnBoardingCard>
              <OnBoardingCard className={styles.storyCard}>
                <Field
                  className={styles.field}
                  charLimit={1500}
                  component={ControlledTextField}
                  label="Story of the land stewards"
                  description="Tell the story of who are they, what do they do on the land, what is their background, why are they excited to do this work."
                  onExampleClick={() => showExample('http://regen.network/landStewardStory')}
                  name="['http://regen.network/landStewardStory']"
                  rows={16}
                  multiline
                />
                <Field
                  className={styles.field}
                  charLimit={80}
                  component={ControlledTextField}
                  label="Land steward story title"
                  description="In one sentence, summarize the story above of the land stewards."
                  onExampleClick={() => showExample('http://regen.network/landStewardStoryTitle')}
                  name="['http://regen.network/landStewardStoryTitle']"
                  rows={2}
                  multiline
                />
              </OnBoardingCard>
              <OnBoardingCard>
                <div className={styles.quoteTitle}>
                  <Title variant="body2" className={styles.title}>
                    QUOTE
                  </Title>
                  <Description className={styles.description}>&nbsp;&nbsp;(optional)</Description>
                </div>
                <Field
                  className={styles.field}
                  charLimit={160}
                  component={ControlledTextField}
                  label="Quote from land steward or other important stakeholder"
                  description="Choose an inspiring quote that helps others understand why this project is important."
                  onExampleClick={() => showExample('http://regen.network/projectQuote')}
                  name="['http://regen.network/projectQuote'].['http://regen.network/quote']"
                  rows={16}
                  multiline
                />
                <Field
                  className={styles.field}
                  component={ControlledTextField}
                  label="Name of person quoted"
                  name="['http://regen.network/projectQuote'].['http://schema.org/name']"
                />
                <Field
                  className={styles.field}
                  component={ControlledTextField}
                  label="Title of person quoted"
                  name="['http://regen.network/projectQuote'].['http://schema.org/jobTitle']"
                />
              </OnBoardingCard>

              <OnboardingFooter
                onSave={submitForm}
                saveText={'Save and Next'}
                onPrev={() => null} // TODO
                onNext={() => null} // TODO
                hideProgress={false} // TODO
                saveDisabled={(submitCount > 0 && !isValid) || isSubmitting} // TODO
                percentComplete={0} // TODO
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

function getProjectQuoteError(values: StoryValues, key: keyof Quote): string | undefined {
  return values?.['http://regen.network/projectQuote']?.[key]
    ? undefined
    : errorMsgs['http://regen.network/projectQuote'];
}

export { StoryForm };
