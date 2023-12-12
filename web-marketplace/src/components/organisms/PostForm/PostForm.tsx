import { useZodForm } from 'components/molecules/Form/hook/useZodForm';
import CheckboxLabel from 'web-components/lib/components/inputs/new/CheckboxLabel/CheckboxLabel';
import { ImageDrop } from 'web-components/lib/components/inputs/new/ImageDrop/ImageDrop';
import { TextAreaField } from 'web-components/lib/components/inputs/new/TextAreaField/TextAreaField';
import TextField from 'web-components/lib/components/inputs/new/TextField/TextField';
import {
  Body,
  Subtitle,
  Title,
} from 'web-components/lib/components/typography';

import { cn } from 'web-components/lib/utils/styles/cn';
import { PostFormSchemaType, postFormSchema } from './PostForm.schema';
import Form from 'components/molecules/Form/Form';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import { useFieldArray, useWatch } from 'react-hook-form';
import { TextAreaFieldChartCounter } from 'web-components/lib/components/inputs/new/TextAreaField/TextAreaField.ChartCounter';
import { POST_MAX_TITLE_LENGTH } from './PostForm.constants';
import { Link } from 'components/atoms';
import { useEffect } from 'react';
import { DEFAULT_URL } from '../MediaForm/MediaForm.constants';

export interface Props {
  initialValues: PostFormSchemaType;
  className?: string;
}

export const PostForm = ({ initialValues, className }: Props): JSX.Element => {
  const form = useZodForm({
    schema: postFormSchema,
    defaultValues: {
      ...initialValues,
    },
    mode: 'onBlur',
  });
  const { errors } = form.formState;
  const { setValue } = form;

  const title = useWatch({ control: form.control, name: 'title' });
  const files = useWatch({ control: form.control, name: 'files' });

  const { fields, append, remove } = useFieldArray({
    name: 'files',
    control: form.control,
  });

  const setFiles = (value: string, fieldIndex: number): void => {
    if (files?.[fieldIndex]?.['schema:url'] === DEFAULT_URL) {
      append({
        'schema:url': DEFAULT_URL,
      });
    }
    setValue(`files.${fieldIndex}.schema:url`, encodeURI(value));
  };

  const getHandleDeleteWithIndex = async (fieldIndex: number) => {
    remove(fieldIndex);
  };

  /* Effect */

  useEffect(() => {
    if (
      fields?.length === 0 ||
      fields?.every(field => field['schema:url'] !== DEFAULT_URL)
    ) {
      append({
        'schema:url': DEFAULT_URL,
      });
    }
  }, [append, fields]);

  return (
    <Form className={cn('max-w-[560px]', className)} form={form}>
      <Title variant="h3" sx={{ textAlign: 'center' }} className="mb-50">
        New post
      </Title>
      <TextField
        type="text"
        label="Title"
        description="Summarize this update."
        className="mb-50"
        helperText={
          <TextAreaFieldChartCounter
            value={title}
            charLimit={POST_MAX_TITLE_LENGTH}
          />
        }
        {...form.register('title')}
      />
      <TextAreaField
        type="text"
        label="Comment"
        description="Write a short comment or longer project update. "
        rows={4}
        minRows={4}
        multiline
        className="mb-50"
        {...form.register('comment')}
      />
      {fields.map((field, index) => {
        const url = files?.[index]?.['schema:url'];

        return (
          <ImageDrop
            label={'Files'}
            description={
              <Body>
                {
                  '5MB max. Supported file types include text, spreadsheets, images, and video files. '
                }
                <Link href="#">{'View all supported file types»'}</Link>
              </Body>
            }
            onDelete={() => getHandleDeleteWithIndex(index)}
            value={url === DEFAULT_URL ? '' : url}
            setValue={setFiles}
            className="mb-50"
            key={field.id}
            fieldIndex={index}
            error={!!errors['files']}
            helperText={errors['files']?.message}
            optional
            {...form.register('files')}
          />
        );
      })}
      <div className="flex flex-col mb-50">
        <Subtitle
          size="lg"
          color="primary.contrastText"
          as="span"
          className="mb-10"
        >
          {'Privacy settings'}
        </Subtitle>
        <CheckboxLabel
          label={
            <Body size="lg" color="primary.contrastText" as="span">
              {'Make the entire post private '}
            </Body>
          }
          className="mb-10"
          {...form.register('privatePost')}
        />
        <CheckboxLabel
          label={
            <Body size="lg" color="primary.contrastText" as="span">
              {'Make the files private '}
            </Body>
          }
          className="mb-10"
          {...form.register('privateFiles')}
        />
        <CheckboxLabel
          label={
            <Body size="lg" color="primary.contrastText" as="span">
              {'Make the location data private '}
            </Body>
          }
          className="mb-10"
          {...form.register('privateLocation')}
        />
      </div>
      <div className="flex justify-end">
        <OutlinedButton className="mr-40">{'Cancel'}</OutlinedButton>
        <ContainedButton type="submit">{'Publish'}</ContainedButton>
      </div>
    </Form>
  );
};
