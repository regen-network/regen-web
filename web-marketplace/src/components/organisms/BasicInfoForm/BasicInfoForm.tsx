import React, { useCallback, useEffect, useMemo } from 'react';
import { useFormState, useWatch } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Box } from '@mui/material';
import { ERRORS, errorsMapping } from 'config/errors';
import { useSetAtom } from 'jotai';
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

import { errorBannerTextAtom, errorCodeAtom } from 'lib/atoms/error.atoms';
import { errorModalAtom, processingModalAtom } from 'lib/atoms/modals.atoms';
import { getHashUrl } from 'lib/block-explorer';
import {
  EMPTY_OPTION_TEXT,
  POSITIVE_NUMBER,
  REQUIRED_MESSAGE,
} from 'lib/constants/shared.constants';

import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';
import { MetadataSubmitProps } from 'hooks/projects/useProjectWithMetadata';
import { useDaoOrganization } from 'hooks/useDaoOrganization';

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
  const setProcessingModal = useSetAtom(processingModalAtom);
  const setErrorModal = useSetAtom(errorModalAtom);
  const setErrorCode = useSetAtom(errorCodeAtom);
  const { confirmSave, isEdit, isDirtyRef } = useProjectEditContext();
  const { submitCreateProject } = useSubmitCreateProject();
  const daoOrganization = useDaoOrganization();
  const { migrateProject } = useMigrateProject({
    feeGranter: daoOrganization?.address,
  });

  useEffect(() => {
    isDirtyRef.current = isDirty;
  }, [isDirtyRef, isDirty]);

  const submitUntilSuccess = useCallback(
    async (values: BasicInfoFormSchemaType, slugIndex: number) => {
      try {
        const slugEnd = slugIndex ? `-${slugIndex + 1}` : '';
        const slug = values['schema:name']
          ? `${slugify(values['schema:name'])}${slugEnd}`
          : undefined;
        if (!isEdit && projectId === DRAFT_ID) {
          const shouldNavigateNow =
            shouldNavigateRef?.current && !isOrganizationAccount;

          const newProjectId = await submitCreateProject({
            values,
            shouldNavigate: shouldNavigateNow,
            projectInput: {
              slug,
            },
          });

          if (isOrganizationAccount) {
            try {
              setProcessingModal(atom => void (atom.open = true));
              await migrateProject(newProjectId, values['schema:name']);
              setProcessingModal(atom => void (atom.open = false));
              if (shouldNavigateRef?.current) {
                navigate(`/project-pages/${newProjectId}/location`);
              }
              return;
            } catch (error) {
              setProcessingModal(atom => void (atom.open = false));
              // Extract tx hash if available from error message
              const errorStr = String(error);
              const hashMatch = errorStr.match(/txhash[:\s]+([A-F0-9]+)/i);
              const txHash = hashMatch ? hashMatch[1] : '';
              setErrorCode(ERRORS.DEFAULT);
              setErrorModal(atom => {
                atom.description = errorStr;
                atom.txHash = txHash;
                atom.txHashUrl = txHash ? getHashUrl(txHash) : '';
                atom.cardTitle = _(msg`Migration Failed`);
                atom.buttonTitle = _(msg`Retry`);
                atom.onButtonClick = () => {
                  setErrorModal(atom => void (atom.description = ''));
                };
              });
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
      setErrorModal,
      setErrorCode,
      navigate,
    ],
  );

  return (
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
  );
};

export { BasicInfoForm };
