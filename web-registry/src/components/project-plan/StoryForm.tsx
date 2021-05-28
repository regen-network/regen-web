import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import OnboardingFooter from 'web-components/lib/components/fixed-footer/OnboardingFooter';
import { requiredMessage } from 'web-components/lib/components/inputs/validation';
import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';
import Description from 'web-components/lib/components/description';
import Title from 'web-components/lib/components/title';
import Modal from 'web-components/lib/components/modal';
import Card from 'web-components/lib/components/cards/Card';

interface StoryFormProps {
  submit: (values: StoryValues) => Promise<void>;
  exampleProjectUrl: string;
}

export interface StoryValues {
  landStory: string;
  landStewardStory: string;
  landStewardStoryTitle: string;
  quote: string;
  quoteSourceName: string;
  quoteSourceTitle: string;
}

interface Example {
  type: string;
  text: string;
}

interface FieldNameExamples {
  landStory: Example;
  landStewardStory: Example;
  landStewardStoryTitle: Example;
  quote: Example;
}

type exampleFieldName = 'landStory' | 'landStewardStory' | 'landStewardStoryTitle' | 'quote';

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

const StoryForm: React.FC<StoryFormProps> = ({ submit, exampleProjectUrl }) => {
  const styles = useStyles();
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

  const getModalContent = (fieldName: exampleFieldName): JSX.Element => {
    const examples: FieldNameExamples = {
      landStory: {
        type: 'Story of the Land',
        text:
          'Wilmot is an extraordinary property high in the New England Tablelands at Ebor, New South Wales, Australia. Set on 1,854ha and at approximately 1,200m above sea level, average annual rainfall of 1,200mm, highly fertile volcanic basalt soils, and complimented by a series of pristine spring fed, year-round natural waterways including five waterfalls, it is quite simply a unique environment for growing cattle.',
      },
      landStewardStory: {
        type: 'Story of the Land Stewards',
        text:
          'Stu & Trish are the management team behind Wilmot Cattle Co and are driven by the exciting ecological opportunities they can foresee for the business. They have a wholehearted belief in regenerative agriculture and the benefits it will bring to the industry globally, as we collectively work to heal what has largely become a degraded landscape. They have a burning desire to succeed in agriculture and are very ambitious in the growth and development plans they have for Wilmot Cattle Co.\n\n' +
          'While Stu has managed the day to day operations of Wilmot since 2016, and now presides over the portfolio of all three properties in a General Manager capacity, Trish works tirelessly behind the scenes ensuring a high level of rigor around the data collection, management, and analysis of every aspect of the business. They firmly believe that you cannot manage what you do not measure and as such, the integrity of the data is paramount.\n\n' +
          'In their spare time, they enjoy exploring the natural wonders of Wilmot, including its five waterfalls and large areas of virtually native bushland, with their two kids Harry and Poppy. They all gain great satisfaction from discovering new species of plants and learning about their role in the ecosystem.',
      },
      landStewardStoryTitle: {
        type: 'Land Steward Story Title',
        text: 'Stuart Austin & Trisha Cowley have managed Wilmot since 2016',
      },
      quote: {
        type: 'Quote',
        text:
          'We feel privileged to have the opportunity to manage cattle in a truly holistic and regenerative way on such a remarkable property.',
      },
    };

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

  const showExample = (fieldName: exampleFieldName): void => {
    const content = getModalContent(fieldName);
    setModalContent(content);
  };

  const handleModalClose = (): void => {
    setModalContent(null);
  };

  const getRequiredMessage = (fieldName: keyof StoryValues): string => {
    const errorMessages: Partial<StoryValues> = {
      landStory: 'Please fill in the story of the land',
      landStewardStory: 'Please fill in the story of the land stewards',
      landStewardStoryTitle: 'Please fill in a title for the land steward story',
      quote: 'You must fill in all the quote fields, or none',
      quoteSourceName: 'You must fill in all the quote fields, or none',
      quoteSourceTitle: 'You must fill in all the quote fields, or none',
    };

    return errorMessages[fieldName] || requiredMessage;
  };

  const validate = (values: StoryValues): Partial<StoryValues> => {
    const errors: Partial<StoryValues> = {};
    let requiredFields: Array<keyof StoryValues> = ['landStory', 'landStewardStory', 'landStewardStoryTitle'];
    const quoteFields: Array<keyof StoryValues> = ['quote', 'quoteSourceName', 'quoteSourceTitle'];

    if (quoteFields.some(quoteField => !!values[quoteField])) {
      requiredFields = requiredFields.concat(quoteFields);
    }

    requiredFields.forEach(requiredField => {
      if (!values[requiredField]) {
        errors[requiredField] = getRequiredMessage(requiredField);
      }
    });

    return errors;
  };

  return (
    <>
      <Formik
        initialValues={{
          landStory: '',
          landStewardStory: '',
          landStewardStoryTitle: '',
          quote: '',
          quoteSourceName: '',
          quoteSourceTitle: '',
        }}
        validate={validate}
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
        {({ submitForm, values }) => {
          return (
            <Form>
              <OnBoardingCard className={styles.storyCard}>
                <Field
                  className={styles.field}
                  charLimit={500}
                  component={ControlledTextField}
                  label="Story of the land"
                  description="Describe the story of this property."
                  onExampleClick={() => showExample('landStory')}
                  name="landStory"
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
                  onExampleClick={() => showExample('landStewardStory')}
                  name="landStewardStory"
                  rows={16}
                  multiline
                />
                <Field
                  className={styles.field}
                  charLimit={80}
                  component={ControlledTextField}
                  label="Land steward story title"
                  description="In one sentence, summarize the story above of the land stewards."
                  onExampleClick={() => showExample('landStewardStoryTitle')}
                  name="landStewardStoryTitle"
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
                  onExampleClick={() => showExample('quote')}
                  name="quote"
                  rows={16}
                  multiline
                />
                <Field
                  className={styles.field}
                  component={ControlledTextField}
                  label="Name of person quoted"
                  name="quoteSourceName"
                />
                <Field
                  className={styles.field}
                  component={ControlledTextField}
                  label="Title of person quoted"
                  name="quoteSourceTitle"
                />
              </OnBoardingCard>

              <OnboardingFooter
                onSave={submitForm}
                saveText={'Save and Next'}
                onPrev={() => null} // TODO
                onNext={() => null} // TODO
                hideProgress={false} // TODO
                saveDisabled={false} // TODO
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

export default StoryForm;
