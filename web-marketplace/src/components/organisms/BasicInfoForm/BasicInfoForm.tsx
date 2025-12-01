import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormState, useWatch } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Box } from '@mui/material';
import { ERRORS, errorsMapping } from 'config/errors';
import { useAtom, useSetAtom } from 'jotai';
import { useProjectEditContext } from 'legacy-pages';
import { useMigrateProject } from 'legacy-pages/Dashboard/MyProjects/hooks/useMigrateProject';
import { DRAFT_ID } from 'legacy-pages/Dashboard/MyProjects/MyProjects.constants';
import { useCreateProjectContext } from 'legacy-pages/ProjectCreate';
import { useProjectSaveAndExit } from 'legacy-pages/ProjectCreate/hooks/useProjectSaveAndExit';
import slugify from 'slug';

import OnBoardingCard from 'web-components/src/components/cards/OnBoardingCard';
import InputLabel from 'web-components/src/components/inputs/InputLabel';
import SelectTextField from 'web-components/src/components/inputs/new/SelectTextField/SelectTextField';
import TextField from 'web-components/src/components/inputs/new/TextField/TextField';
import { ProcessingModal } from 'web-components/src/components/modal/ProcessingModal';
import { TxErrorModal } from 'web-components/src/components/modal/TxErrorModal';

import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { processingModalAtom } from 'lib/atoms/modals.atoms';
import { getHashUrl } from 'lib/block-explorer';
import {
  BLOCKCHAIN_RECORD,
  EMPTY_OPTION_TEXT,
  POSITIVE_NUMBER,
  REQUIRED_MESSAGE,
  SEE_LESS,
  SEE_MORE,
  TX_ERROR_MODAL_TITLE,
} from 'lib/constants/shared.constants';

import { Link } from 'components/atoms';
import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';
import { MetadataSubmitProps } from 'hooks/projects/useProjectWithMetadata';

import { ProjectPageFooter } from '../../molecules';
import {
  BASIC_INFO_NAME_DESCRIPTION,
  BASIC_INFO_NAME_LABEL,
  BASIC_INFO_NAME_PLACEHOLDER,
  BASIC_INFO_SIZE_LABEL,
} from './BasicInfoForm.constants';
import {
  basicInfoFormDraftSchema,
  BasicInfoFormSchemaType,
  getBasicInfoFormSchema,
} from './BasicInfoForm.schema';
import { useBasicInfoStyles } from './BasicInfoForm.styles';
import { useSubmitCreateProject } from './hooks/useSubmitCreateProject';

const getPendingProjectStorageKey = (draftId?: string) =>
  `create-project-pending-id-${draftId ?? 'draft'}`;

interface BasicInfoFormProps {
  onSubmit: (props: MetadataSubmitProps) => Promise<void>;
  onPrev?: () => void;
  initialValues?: BasicInfoFormSchemaType;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
  initialValues,
  onSubmit,
  onPrev,
}) => {
  const { _ } = useLingui();
  const { classes, cx } = useBasicInfoStyles();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const saveAndExit = useProjectSaveAndExit();
  const { formRef, shouldNavigateRef, isDraftRef, isOrganizationAccount } =
    useCreateProjectContext();
  const basicInfoFormSchema = useMemo(
    () =>
      getBasicInfoFormSchema({
        requiredMessage: _(REQUIRED_MESSAGE),
        positiveNumber: _(POSITIVE_NUMBER),
      }),
    [_],
  );
  const form = useZodForm({
    schema: basicInfoFormSchema,
    draftSchema: basicInfoFormDraftSchema,
    defaultValues: {
      ...initialValues,
    },
    isDraftRef,
    mode: 'onBlur',
  });
  const { isValid, isSubmitting, isDirty, errors } = useFormState({
    control: form.control,
  });
  const unit = useWatch({
    control: form.control,
    name: 'regen:projectSize.qudt:unit',
  });
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);
  const [processingModal, setProcessingModal] = useAtom(processingModalAtom);
  const [txError, setTxError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [pendingProjectId, setPendingProjectId] = useState<string | null>(null);
  const { confirmSave, isEdit, isDirtyRef } = useProjectEditContext();
  const { submitCreateProject } = useSubmitCreateProject();
  const { migrateProject } = useMigrateProject();
  const pendingProjectStorageKey = useMemo(
    () => getPendingProjectStorageKey(projectId),
    [projectId],
  );

  const updatePendingProjectId = useCallback(
    (id: string | null) => {
      setPendingProjectId(id);
      if (typeof window === 'undefined') return;
      if (id) {
        localStorage.setItem(pendingProjectStorageKey, id);
      } else {
        localStorage.removeItem(pendingProjectStorageKey);
      }
    },
    [pendingProjectStorageKey],
  );

  useEffect(() => {
    isDirtyRef.current = isDirty;
  }, [isDirtyRef, isDirty]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!isOrganizationAccount) {
      updatePendingProjectId(null);
      return;
    }
    const storedId = localStorage.getItem(pendingProjectStorageKey);
    if (storedId) {
      setPendingProjectId(storedId);
    }
  }, [isOrganizationAccount, pendingProjectStorageKey, updatePendingProjectId]);

  const submitUntilSuccess = useCallback(
    async (values: BasicInfoFormSchemaType, slugIndex: number) => {
      try {
        const slugEnd = slugIndex ? `-${slugIndex + 1}` : '';
        const slug = `${slugify(values['schema:name'])}${slugEnd}`;
        if (!isEdit && projectId === DRAFT_ID) {
          const shouldNavigateNow =
            shouldNavigateRef?.current && !isOrganizationAccount;
          let currentProjectId = pendingProjectId;

          if (!currentProjectId) {
            currentProjectId = await submitCreateProject({
              values,
              shouldNavigate: shouldNavigateNow,
              projectInput: {
                slug,
              },
            });
            if (isOrganizationAccount && currentProjectId) {
              updatePendingProjectId(currentProjectId);
            } else {
              updatePendingProjectId(null);
            }
          } else {
            // Update the off-chain project with any form changes before retrying migration
            await onSubmit({
              values,
              shouldNavigate: false,
              projectPatch:
                !!values['schema:name'] &&
                initialValues?.['schema:name'] !== values['schema:name']
                  ? {
                      slug,
                    }
                  : undefined,
            });
          }

          if (currentProjectId && isOrganizationAccount) {
            try {
              setProcessingModal(atom => void (atom.open = true));
              await migrateProject(currentProjectId);
              setProcessingModal(atom => void (atom.open = false));
              updatePendingProjectId(null);
              setTxError(null);
              setTxHash(null);
              if (shouldNavigateRef?.current) {
                navigate(`/project-pages/${currentProjectId}/location`);
              }
              return;
            } catch (error) {
              setProcessingModal(atom => void (atom.open = false));
              setTxError(String(error));
              // Extract tx hash if available from error message
              const errorStr = String(error);
              const hashMatch = errorStr.match(/txhash[:\s]+([A-F0-9]+)/i);
              if (hashMatch) {
                setTxHash(hashMatch[1]);
              }
              return;
            }
          }
        } else {
          await onSubmit({
            values,
            shouldNavigate: shouldNavigateRef?.current,
            projectPatch:
              !isEdit &&
              !!values['schema:name'] &&
              initialValues?.['schema:name'] !== values['schema:name']
                ? {
                    slug,
                  }
                : undefined,
          });
          if (isEdit && confirmSave) {
            confirmSave();
            form.reset({}, { keepValues: true });
          }
        }
      } catch (e) {
        if (
          (e as Error)?.message.includes(
            // eslint-disable-next-line lingui/no-unlocalized-strings
            'duplicate key value violates unique constraint "project_slug_key"',
          )
        ) {
          submitUntilSuccess(values, slugIndex + 1);
        } else setErrorBannerTextAtom(_(errorsMapping[ERRORS.DEFAULT].title));
      }
    },
    [
      _,
      confirmSave,
      form,
      initialValues,
      isEdit,
      onSubmit,
      projectId,
      setErrorBannerTextAtom,
      shouldNavigateRef,
      submitCreateProject,
      isOrganizationAccount,
      migrateProject,
      setProcessingModal,
      navigate,
      pendingProjectId,
      updatePendingProjectId,
    ],
  );

  return (
    <>
      <Form
        form={form}
        formRef={formRef}
        isDraftRef={isDraftRef}
        onSubmit={values => submitUntilSuccess(values, 0)}
      >
        <OnBoardingCard>
          <TextField
            label={_(BASIC_INFO_NAME_LABEL)}
            description={_(BASIC_INFO_NAME_DESCRIPTION)}
            placeholder={_(BASIC_INFO_NAME_PLACEHOLDER)}
            error={!!errors['schema:name']}
            helperText={errors['schema:name']?.message}
            {...form.register('schema:name')}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', pt: [3, 12] }}>
            <InputLabel>{_(BASIC_INFO_SIZE_LABEL)}</InputLabel>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}
            >
              <TextField
                className={cx(classes.parcelField, classes.parcelSize)}
                type="number"
                customInputProps={{ step: 'any' }}
                sx={{ mt: { xs: 0, sm: 0 } }}
                error={!!errors['regen:projectSize']}
                helperText={
                  errors['regen:projectSize']?.['qudt:numericValue']?.message
                }
                {...form.register('regen:projectSize.qudt:numericValue', {
                  valueAsNumber: true,
                })}
              />
              <SelectTextField
                className={cx(classes.parcelField, classes.parcelUnit)}
                options={[
                  {
                    value: 'unit:HA',
                    label: _(msg`Hectares`),
                  },
                  {
                    value: 'unit:AC',
                    label: _(msg`Acres`),
                  },
                ]}
                defaultStyle={false}
                native={false}
                value={unit}
                emptyOptionText={_(EMPTY_OPTION_TEXT)}
                {...form.register('regen:projectSize.qudt:unit')}
              />
            </Box>
          </Box>
        </OnBoardingCard>
        <ProjectPageFooter
          onPrev={onPrev}
          isValid={isValid}
          isSubmitting={isSubmitting}
          dirty={isDirty}
          saveAndExit={saveAndExit}
        />
      </Form>
      <ProcessingModal
        open={!!processingModal?.open}
        title={_(msg`Processing transaction`)}
        bodyText={_(msg`Please wait while the transaction is being processed.`)}
      />
      <TxErrorModal
        error={txError ?? ''}
        open={!!txError}
        onClose={() => {
          setTxError(null);
          setTxHash(null);
        }}
        txHash={txHash ?? ''}
        txHashUrl={txHash ? getHashUrl(txHash) : ''}
        cardTitle={_(msg`Migration Failed`)}
        buttonTitle={_(msg`Retry`)}
        onButtonClick={() => {
          setTxError(null);
          setTxHash(null);
        }}
        title={_(TX_ERROR_MODAL_TITLE)}
        linkComponent={Link}
        blockchainRecordText={_(BLOCKCHAIN_RECORD)}
        seeMoreText={_(SEE_MORE)}
        seeLessText={_(SEE_LESS)}
      />
    </>
  );
};

export { BasicInfoForm };
