import React from 'react';

import { User } from 'src/components/user/UserInfo';

import { Body } from '../../typography';

export const user: User = {
  name: 'Odonata',
  type: 'ORGANIZATION',
  image:
    'https://cdn.sanity.io/images/jm12rn9t/staging/8b062589b6d8c6850a78bb13ead51d2f6f32b073-29x9.svg',
};

export const signer: User = {
  name: 'Odonata',
  nameRaw: <Body>Odonata</Body>,
  type: 'ORGANIZATION',
  image:
    'https://cdn.sanity.io/images/jm12rn9t/staging/8b062589b6d8c6850a78bb13ead51d2f6f32b073-29x9.svg',
};

export const commonArgs = {
  title: 'Fall 2023 Update',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  author: user,
  authorRole: 'admin',
  timestamp: '2022-01-31T12:34:56Z',
};
