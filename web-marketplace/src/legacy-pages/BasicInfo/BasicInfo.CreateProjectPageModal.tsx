import { BlockContent } from 'web-components/src/components/block-content';
import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import { TextButton } from 'web-components/src/components/buttons/TextButton';
import Modal, { RegenModalProps } from 'web-components/src/components/modal';
import { Body, Title } from 'web-components/src/components/typography';

import { AllCreateProjectPageQuery } from 'generated/sanity-graphql';

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
            <div
              className="mb-10 flex items-start gap-10 bg-grey-0 p-15 border border-solid border-grey-300 rounded-[5px]"
              key={step?.title}
            >
              <img
                width="100px"
                src={
                  step?.image?.imageHref ?? step?.image?.image?.asset?.url ?? ''
                }
                alt={step?.image?.imageAlt || ''}
              />
              <div>
                <Title className="pb-10 text-base">{step?.title}</Title>
                <Body size="sm">
                  <BlockContent content={step?.bodyRaw} />
                </Body>
              </div>
            </div>
          ))}
          <ContainedButton className="mt-30 float-right" onClick={onClose}>
            {createProjectPagePopup.buttonLabel}
          </ContainedButton>
        </Modal>
      )}
    </>
  );
};
