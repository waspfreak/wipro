import { generateArrayOfFakeInitials } from '../../utils/testingUtils';
export const listTopicsResponse = [
  {
    __typename: 'Topic',
    createdAt: '2019-12-12T15:45:21.512Z',
    description:
      'Organisation-wide announcement and stuff everyone needs to know',
    endedAt: null,
    id: '50e958d5-68a1-4f47-a9ed-dbe20246b123',
    startedAt: null,
    title: 'The HQ',
    type: 'HQ',
    updatedAt: '2019-12-12T15:45:21.512Z',
    members: generateArrayOfFakeInitials(632)
  },
  {
    __typename: 'Topic',
    createdAt: '2019-12-12T15:45:21.512Z',
    description: 'Topic A description',
    endedAt: null,
    id: '50e958d5-68a1-4f47-a9ed-dbe20246b164',
    startedAt: null,
    title: 'Topic A',
    type: 'PROJECT',
    updatedAt: '2019-12-12T15:45:21.512Z',
    members: generateArrayOfFakeInitials(6)
  },
  {
    __typename: 'Topic',
    createdAt: '2019-12-12T15:45:21.512Z',
    description: 'Topic B description',
    endedAt: null,
    id: '50e958d5-68a1-4f47-a9ed-dbe20211b164',
    startedAt: null,
    title: 'Topic B',
    type: 'PROJECT',
    updatedAt: '2019-12-12T15:45:21.512Z',
    members: generateArrayOfFakeInitials(62)
  },

  {
    __typename: 'Topic',
    createdAt: '2019-12-12T15:45:21.512Z',
    description: 'Team C description',
    endedAt: null,
    id: '50e958d5-68a1-4f47-a9ed-dbe20246b164',
    startedAt: null,
    title: 'Team C',
    type: 'TEAM',
    updatedAt: '2019-12-12T15:45:21.512Z',
    members: generateArrayOfFakeInitials(343)
  },

  {
    __typename: 'Topic',
    createdAt: '2019-12-12T15:45:21.512Z',
    description: 'Team D description',
    endedAt: null,
    id: '50e958d5-68a1-4f47-a9ed-dbe20246b164',
    startedAt: null,
    title: 'Team D',
    type: 'TEAM',
    updatedAt: '2019-12-12T15:45:21.512Z',
    members: generateArrayOfFakeInitials(11)
  },
  {
    __typename: 'Topic',
    createdAt: '2019-12-12T15:45:21.512Z',
    description:
      'Really long description Really long description  ',
    endedAt: null,
    id: '50e958d5-68a1-4f47-a9ed-dbe20246b164',
    startedAt: null,
    title:
      'A Very Really long title Really long title Really long title Really long title title',
    type: 'TEAM',
    updatedAt: '2019-12-12T15:45:21.512Z',
    members: generateArrayOfFakeInitials(6)
  },
  {
    __typename: 'Topic',
    createdAt: '2019-12-12T15:45:21.512Z',
    description:
      'Really long description Really description Really long description Really long description Really long description  ',
    endedAt: null,
    id: '50e958d5-68a1-4f47-a9ed-dbe20211b164',
    startedAt: null,
    title:
      'A Very Really long title Really long title Really long title Really long title title',
    type: 'TEAM',
    updatedAt: '2019-12-12T15:45:21.512Z',
    members: generateArrayOfFakeInitials(62)
  },

  {
    __typename: 'Topic',
    createdAt: '2019-12-12T15:45:21.512Z',
    description:
      'This is a description This is a description This is a description This is a description This is a description',
    endedAt: null,
    id: '50e958d5-68a1-4f47-a9ed-dbe20246b164',
    startedAt: null,
    title: 'A medium length title',
    type: 'TEAM',
    updatedAt: '2019-12-12T15:45:21.512Z',
    members: generateArrayOfFakeInitials(3)
  },

  {
    __typename: 'Topic',
    createdAt: '2019-12-12T15:45:21.512Z',
    description:
      'This is a description This is a description This is a description',
    endedAt: null,
    id: '50e958d5-68a1-4f47-a9ed-dbe20246b164',
    startedAt: null,
    title: 'Short title',
    type: 'TEAM',
    updatedAt: '2019-12-12T15:45:21.512Z',
    members: generateArrayOfFakeInitials(11)
  },
  {
    __typename: 'Topic',
    createdAt: '2019-12-12T15:45:21.512Z',
    description:
      'This is a description This is a description This is a description',
    endedAt: null,
    id: '50e958d5-68a1-4f47-a9ed-dbe20246b164',
    startedAt: null,
    title: 'Way too Short title',
    type: 'TEAM',
    updatedAt: '2019-12-12T15:45:21.512Z',
    members: generateArrayOfFakeInitials(120)
  },
  {
    __typename: 'Topic',
    createdAt: '2019-12-12T15:45:21.512Z',
    description:
      'This is a description This is a description This is a description',
    endedAt: null,
    id: '50e958d5-68a1-4f47-a9ed-dbe20246b164',
    startedAt: null,
    title: 'A Short title',
    type: 'TEAM',
    updatedAt: '2019-12-12T15:45:21.512Z',
    members: generateArrayOfFakeInitials(123)
  },
  {
    __typename: 'Topic',
    createdAt: '2019-12-12T15:45:21.512Z',
    description:
      'This is a description This is a description This is a description',
    endedAt: null,
    id: '50e958d5-68a1-4f47-a9ed-dbe20246b164',
    startedAt: null,
    title: 'A Short title',
    type: 'PROJECT',
    updatedAt: '2019-12-12T15:45:21.512Z',
    members: generateArrayOfFakeInitials(8)
  },

  {
    __typename: 'Topic',
    createdAt: '2019-12-16T17:07:52.688Z',
    description: 'Topic created during an end to end test.',
    endedAt: '2019-12-16T17:07:52.688Z',
    id: 'c8def437-4a05-4f84-b114-0b8b4d47c0dd',
    startedAt: '2019-12-16T17:07:52.688Z',
    title: '%^&*( Better End to end test',
    type: 'PROJECT',
    updatedAt: '2019-12-16T17:07:52.688Z',
    members: generateArrayOfFakeInitials(18)
  },
  {
    __typename: 'Topic',
    createdAt: '2019-12-16T17:07:52.688Z',
    description: 'Topic created during an end to end test.',
    endedAt: '2019-12-16T17:07:52.688Z',
    id: 'c8def437-4a05-4f84-b114-0b8b4d47c0dd',
    startedAt: '2019-12-16T17:07:52.688Z',
    title: ')(*&^%$£@!',
    type: 'PROJECT',
    updatedAt: '2019-12-16T17:07:52.688Z',
    members: generateArrayOfFakeInitials(23)
  },
  {
    __typename: 'Topic',
    createdAt: '2019-12-16T17:07:52.688Z',
    description: 'Topic created during an end to end test.',
    endedAt: '2019-12-16T17:07:52.688Z',
    id: 'c8def437-4a05-4f84-b114-0b8b4d47c0dd',
    startedAt: '2019-12-16T17:07:52.688Z',
    title: '1234',
    type: 'PROJECT',
    updatedAt: '2019-12-16T17:07:52.688Z',
    members: generateArrayOfFakeInitials(7)
  },

  {
    __typename: 'Topic',
    createdAt: '2019-12-12T15:45:21.512Z',
    description:
      'This is a description This is a description This is a description',
    endedAt: null,
    id: '50e958d5-68a1-4f47-a9ed-dbe20246b164',
    startedAt: null,
    title: 'A Short title',
    type: 'PROJECT',
    updatedAt: '2019-12-12T15:45:21.512Z',
    members: generateArrayOfFakeInitials(53)
  },

  {
    __typename: 'Topic',
    createdAt: '2019-12-16T17:07:52.688Z',
    description: 'Topic created during an end to end test.',
    endedAt: '2019-12-16T17:07:52.688Z',
    id: 'c8def437-4a05-4f84-b114-0b8b4d47c0dd',
    startedAt: '2019-12-16T17:07:52.688Z',
    title: '%^&*( Better End to end test',
    type: 'PROJECT',
    updatedAt: '2019-12-16T17:07:52.688Z'
  },
  {
    __typename: 'Topic',
    createdAt: '2019-12-16T17:07:52.688Z',
    description: 'Topic created during an end to end test.',
    endedAt: '2019-12-16T17:07:52.688Z',
    id: 'c8def437-4a05-4f84-b114-0b8b4d47c0dd',
    startedAt: '2019-12-16T17:07:52.688Z',
    title: ')(*&^%$£@!',
    type: 'PROJECT',
    updatedAt: '2019-12-16T17:07:52.688Z'
  },
  {
    __typename: 'Topic',
    createdAt: '2019-12-16T17:07:52.688Z',
    description: 'Topic asdfadfadfadfadfadfadfasdfafadsf',
    endedAt: '2019-12-16T17:07:52.688Z',
    id: 'c8def437-4a05-4f84-b114-0b8b4d47c0dd',
    startedAt: '2019-12-16T17:07:52.688Z',
    title: '123456664433434343434343434121212adfadfafdafadsf',
    type: 'PROJECT',
    updatedAt: '2019-12-16T17:07:52.688Z',
    members: generateArrayOfFakeInitials(13)
  }
];
