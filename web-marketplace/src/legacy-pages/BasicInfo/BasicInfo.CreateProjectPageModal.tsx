import { BlockContent } from 'web-components/src/components/block-content';
import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import { TextButton } from 'web-components/src/components/buttons/TextButton';
import Modal, { RegenModalProps } from 'web-components/src/components/modal';
import { Body, Title } from 'web-components/src/components/typography';

import { AllCreateProjectPageQuery } from 'generated/sanity-graphql';

import { Step } from './BasicInfo.CreateProjectPageModal.Step';

type Props = {
  sanityCreateProjectPageData: AllCreateProjectPageQuery;
} & RegenModalProps;

export const CreateProjectPageModal = ({
  sanityCreateProjectPageData,
  open,
  onClose,
}: Props) => {
  const createProjectPagePopup =
    sanityCreateProjectPageData.allCreateProjectPage?.[0]
      ?.createProjectPagePopup;

  return (
    <>
      {createProjectPagePopup && (
        <Modal open={open} onClose={onClose}>
          <Title
            align="center"
            variant="h4"
            className="max-w-[260px] m-auto pb-30"
          >
            {createProjectPagePopup.title}
          </Title>
          <Body className="pb-5" size="lg">
            <BlockContent content={createProjectPagePopup.descriptionRaw} />
          </Body>
          <TextButton
            textSize="sm"
            className="pb-30 underline underline-offset-8"
          >
            <BlockContent content={createProjectPagePopup.guidesLinkRaw} />
          </TextButton>
          {createProjectPagePopup.steps?.map(step => (
            <Step key={step?.title} step={step} />
          ))}
          <ContainedButton className="mt-30 float-right" onClick={onClose}>
            {createProjectPagePopup.buttonLabel}
          </ContainedButton>
        </Modal>
      )}
    </>
  );
};
