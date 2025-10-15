import { useCallback, useMemo } from 'react';
import { useAtom } from 'jotai';
import { useSetAtom } from 'jotai';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';

import type { ExecuteInstruction } from '@cosmjs/cosmwasm-stargate';

import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { useWallet } from 'lib/wallet/wallet';
import { useLedger } from 'ledger';
import { useAuth } from 'lib/auth/auth';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { processingModalAtom } from 'lib/atoms/modals.atoms';

import { getAccountByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery';
import { getAccountByIdQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery.utils';
import { getAccountByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery';
import { getOrganizationByDaoAddressQuery } from 'lib/queries/react-query/registry-server/graphql/getOrganizationByDaoAddressQuery/getOrganizationByDaoAddressQuery';
import { getOrganizationByDaoAddressQueryKey } from 'lib/queries/react-query/registry-server/graphql/getOrganizationByDaoAddressQuery/getOrganizationByDaoAddressQuery.utils';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getFromCacheOrFetch } from 'lib/queries/react-query/utils/getFromCacheOrFetch';

import {
  useDeleteAssignmentMutation,
  useUpdateAssignmentMutation,
} from 'generated/graphql';

import { MemberData } from 'components/organisms/OrganizationMembers/OrganizationMembers.BaseTable';
import { BaseMemberRole } from 'components/organisms/BaseMembersTable/BaseMembersTable.types';
import {
  ROLE_ADMIN,
  ROLE_OWNER,
} from 'components/organisms/ActionDropdown/ActionDropdown.constants';

import { isValidAddress } from 'web-components/src/components/inputs/validation';

import {
  addMemberActions,
  findAssignment,
  getAuthorizationName,
  getNewRoleId,
  getProjectsCurrentUserCanManageMembers,
  getRoleAuthorizationIds,
  removeMemberActions,
  updateAuthorizationAction,
  updateMemberRoleActions,
} from './useUpdateMembers.utils';
import {
  MEMBER_NOT_FOUND,
  MISSING_REQUIRED_PARAMS,
  orgRoles,
  projectRoles,
} from './useUpdateMembers.constants';

import { postData } from 'utils/fetch/postData';
import { apiServerUrl } from 'lib/env';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';
import { timer } from 'utils/timer';
import { Member } from 'components/organisms/OrganizationMembers/OrganizationMembers.types';
import { RefetchMembersParams } from './useUpdateMembers.types';

type UseUpdateMembersParams = {
  currentUserRole?: BaseMemberRole;
  daoAddress?: string;
  daoRbamAddress?: string;
  cw4GroupAddress?: string;
  members: Member[];
};
export const useUpdateMembers = ({
  currentUserRole,
  daoAddress,
  daoRbamAddress,
  cw4GroupAddress,
  members,
}: UseUpdateMembersParams) => {
  const { _ } = useLingui();
  const { wallet } = useWallet();
  const { activeAccountId } = useAuth();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const reactQueryClient = useQueryClient();
  const { signingCosmWasmClient } = useLedger();
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const setProcessingModalAtom = useSetAtom(processingModalAtom);
  const setErrorBannerText = useSetAtom(errorBannerTextAtom);
  const retryCsrfRequest = useRetryCsrfRequest();
  const { data: token } = useQuery(getCsrfTokenQuery({}));

  const { refetch } = useQuery(
    getAccountByIdQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!activeAccountId,
      id: activeAccountId,
      languageCode: selectedLanguage,
    }),
  );

  const { data: orgData } = useQuery(
    getOrganizationByDaoAddressQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!daoAddress,
      daoAddress: daoAddress as string,
    }),
  );

  const [updateAssignment] = useUpdateAssignmentMutation();
  const [deleteAssignment] = useDeleteAssignmentMutation();

  // We also need to update members for the org projects where current user can manage members,
  // ie has owner or admin role
  const projectsCurrentUserCanManageMembers = useMemo(
    () =>
      getProjectsCurrentUserCanManageMembers({
        orgData,
        activeAccountId,
      }),
    [orgData, activeAccountId],
  );

  const authorizationName = getAuthorizationName(currentUserRole);
  const { roleId, authorizationId } = useMemo(
    () =>
      getRoleAuthorizationIds({
        type: 'organization',
        currentUserRole,
        authorizationName,
      }),
    [currentUserRole, authorizationName],
  );
  const { roleId: projectRoleId, authorizationId: projectAuthorizationId } =
    useMemo(
      () =>
        getRoleAuthorizationIds({
          type: 'project',
          currentUserRole,
          authorizationName,
        }),
      [currentUserRole, authorizationName],
    );

  const refetchMembers = useCallback(
    async ({
      address,
      role,
      visible,
      accountId,
      shouldFindAssignment = true,
    }: RefetchMembersParams) => {
      if (!daoAddress) {
        throw new Error(_(MISSING_REQUIRED_PARAMS));
      }
      let stop: boolean = false;
      let i = 0;
      // wait for the assignment change(s) to be indexed in the db
      while (!stop && i < 10) {
        if (!accountId) {
          // fetch new member account
          const accRes = await getFromCacheOrFetch({
            query: getAccountByAddrQuery({
              addr: address,
              client: graphqlClient,
              enabled: !!address && !!graphqlClient,
              languageCode: selectedLanguage,
            }),
            reactQueryClient: reactQueryClient,
          });
          accountId = accRes?.accountByAddr?.id;
        }

        if (accountId) {
          // refetch assignments
          const res = await refetch();
          const assignment = findAssignment({
            data: res.data,
            daoAddress,
            accountId,
            roleName: role,
          });
          stop = shouldFindAssignment ? !!assignment : !assignment;
          if (stop) {
            setProcessingModalAtom(atom => void (atom.open = false));
            // assignment.visible is true by default in our db,
            // but if the member shouldn't be visible,
            // then we need to update it manually
            if (shouldFindAssignment && !visible) {
              await updateAssignment({
                variables: {
                  input: {
                    daoAddress,
                    roleName: role,
                    accountId,
                    assignmentPatch: { visible },
                  },
                },
              });
              await reactQueryClient.invalidateQueries({
                queryKey: getAccountByIdQueryKey({
                  id: activeAccountId,
                }),
              });
            }
          }
        }
        i++;
        await timer(1000);
      }
      if (!stop) {
        setProcessingModalAtom(atom => void (atom.open = false));
        setErrorBannerText(
          _(
            msg`Could not refetch assignments, you might need to reload the page later`,
          ),
        );
      }
    },
    [
      daoAddress,
      _,
      graphqlClient,
      selectedLanguage,
      reactQueryClient,
      refetch,
      setProcessingModalAtom,
      updateAssignment,
      setErrorBannerText,
      activeAccountId,
    ],
  );

  const addMember = useCallback(
    async (data: MemberData) => {
      const { role, addressOrEmail, visible } = data;
      const isWalletAddress = isValidAddress(addressOrEmail);

      if (
        !wallet?.address ||
        !signingCosmWasmClient ||
        !daoAddress ||
        !daoRbamAddress ||
        !cw4GroupAddress ||
        !role ||
        !currentUserRole ||
        !authorizationId ||
        !roleId ||
        !projectAuthorizationId ||
        !projectRoleId
      ) {
        setErrorBannerText(_(MISSING_REQUIRED_PARAMS));
        return;
      }

      const roleIdToAdd = getNewRoleId({
        type: 'organization',
        role,
      });
      const projectRoleIdToAdd = getNewRoleId({
        type: 'project',
        role,
      });

      if (isWalletAddress) {
        // Add member with wallet address to the organization dao
        // and organization projects daos where current user is owner or admin
        const orgExecuteInstruction = {
          contractAddress: daoRbamAddress,
          msg: {
            execute_actions: {
              actions: addMemberActions({
                daoRbamAddress,
                cw4GroupAddress,
                authorizationId,
                roleId,
                memberAddress: addressOrEmail,
                roleIdToAdd,
              }),
            },
          },
        };

        const projectExecuteInstructions = (projectsCurrentUserCanManageMembers
          ?.map(project => {
            const projectDao =
              project?.projectByProjectId?.daoByAdminDaoAddress;
            if (!projectDao) return null;
            return {
              contractAddress: project?.projectByProjectId?.adminDaoAddress,
              msg: {
                execute_actions: {
                  actions: addMemberActions({
                    daoRbamAddress: projectDao.daoRbamAddress,
                    cw4GroupAddress: projectDao.cw4GroupAddress,
                    authorizationId: projectAuthorizationId,
                    roleId: projectRoleId,
                    memberAddress: addressOrEmail,
                    roleIdToAdd: projectRoleIdToAdd,
                  }),
                },
              },
            };
          })
          .filter(Boolean) || []) as ExecuteInstruction[];

        try {
          setProcessingModalAtom(atom => void (atom.open = true));
          await signingCosmWasmClient.executeMultiple(
            wallet?.address,
            [orgExecuteInstruction, ...projectExecuteInstructions],
            2,
          );

          await refetchMembers({ address: addressOrEmail, role, visible });
        } catch (error) {
          setProcessingModalAtom(atom => void (atom.open = false));
          setErrorBannerText(String(error));
        }
      } else {
        // We cannot add a member without wallet address to dao dao so we add it directly to our db
        if (token) {
          // adding to the org
          try {
            await postData({
              url: `${apiServerUrl}/marketplace/v1/add-by-email`,
              data: {
                email: addressOrEmail,
                roleName: role,
                daoAddress,
                visible,
                onChainRoleId: roleIdToAdd,
              },
              token,
              retryCsrfRequest,
              onSuccess: async res => {
                await reactQueryClient.invalidateQueries({
                  queryKey: getAccountByIdQueryKey({ id: activeAccountId }),
                });
              },
            });
          } catch (e) {
            setErrorBannerText(String(e));
          }

          // optionnally adding to projects
          if (projectsCurrentUserCanManageMembers)
            for (let project of projectsCurrentUserCanManageMembers) {
              if (project)
                try {
                  await postData({
                    url: `${apiServerUrl}/marketplace/v1/add-by-email`,
                    data: {
                      email: addressOrEmail,
                      roleName: role,
                      daoAddress: project?.projectByProjectId?.adminDaoAddress,
                      visible,
                      onChainRoleId: projectRoleIdToAdd,
                    },
                    token,
                    retryCsrfRequest,
                    onSuccess: async () => {
                      await reactQueryClient.invalidateQueries({
                        queryKey: getOrganizationByDaoAddressQueryKey({
                          daoAddress,
                        }),
                      });
                    },
                  });
                } catch (e) {
                  setErrorBannerText(String(e));
                }
            }
        }
      }
    },
    [
      wallet?.address,
      signingCosmWasmClient,
      daoAddress,
      daoRbamAddress,
      cw4GroupAddress,
      currentUserRole,
      orgData,
      activeAccountId,
      selectedLanguage,
      graphqlClient,
      refetch,
      reactQueryClient,
      setProcessingModalAtom,
      setErrorBannerText,
      updateAssignment,
      token,
      apiServerUrl,
      retryCsrfRequest,
      projectsCurrentUserCanManageMembers,
      roleId,
      authorizationId,
      projectRoleId,
      projectAuthorizationId,
      _,
    ],
  );

  const removeMember = useCallback(async (id: string) => {
    if (
      !wallet?.address ||
      !signingCosmWasmClient ||
      !daoAddress ||
      !daoRbamAddress ||
      !cw4GroupAddress ||
      !currentUserRole ||
      !authorizationId ||
      !roleId ||
      !projectAuthorizationId ||
      !projectRoleId
    ) {
      setErrorBannerText(_(MISSING_REQUIRED_PARAMS));
      return;
    }

    const member = members.find(member => member.id === id);
    if (!member) {
      setErrorBannerText(_(MEMBER_NOT_FOUND));
      return;
    }
    const {
      onChainRoleId: memberRoleId,
      address: memberAddress,
      role,
    } = member;

    if (memberAddress) {
      // TODO how to handle edge case where web2 member was added off-chain only
      // then adds a wallet address to his/her account
      // in this case, the following would fail
      // is it worth querying on chain assignments beforehand?
      // relevant for updateRole too

      const orgExecuteInstruction = {
        contractAddress: daoRbamAddress,
        msg: {
          execute_actions: {
            actions: removeMemberActions({
              daoRbamAddress,
              cw4GroupAddress,
              authorizationId,
              roleId,
              memberAddress,
              memberRoleId,
            }),
          },
        },
      };

      const projectExecuteInstructions = (projectsCurrentUserCanManageMembers
        ?.map(project => {
          const projectDao = project?.projectByProjectId?.daoByAdminDaoAddress;
          if (!projectDao) return null;
          const assignment = projectDao.assignmentsByDaoAddress.nodes.find(
            assignment => assignment?.accountId === id,
          );
          if (!assignment) return null;
          return {
            contractAddress: project?.projectByProjectId?.adminDaoAddress,
            msg: {
              execute_actions: {
                actions: removeMemberActions({
                  daoRbamAddress: projectDao.daoRbamAddress,
                  cw4GroupAddress: projectDao.cw4GroupAddress,
                  authorizationId: projectAuthorizationId,
                  roleId: projectRoleId,
                  memberAddress,
                  memberRoleId: parseInt(assignment.onChainRoleId),
                }),
              },
            },
          };
        })
        .filter(Boolean) || []) as ExecuteInstruction[];

      try {
        setProcessingModalAtom(atom => void (atom.open = true));
        await signingCosmWasmClient.executeMultiple(
          wallet?.address,
          [orgExecuteInstruction, ...projectExecuteInstructions],
          2,
        );

        await refetchMembers({
          address: memberAddress,
          role,
          accountId: id,
          shouldFindAssignment: false,
        });
      } catch (error) {
        console.log(error);
        setProcessingModalAtom(atom => void (atom.open = false));
        setErrorBannerText(String(error));
      }
    } else {
      try {
        await deleteAssignment({
          variables: {
            input: {
              daoAddress,
              roleName: role,
              accountId: id,
            },
          },
        });
        await reactQueryClient.invalidateQueries({
          queryKey: getAccountByIdQueryKey({
            id: activeAccountId,
          }),
        });
      } catch (e) {
        setErrorBannerText(String(e));
      }

      if (projectsCurrentUserCanManageMembers)
        for (let project of projectsCurrentUserCanManageMembers) {
          if (project)
            try {
              const projectDaoAddress =
                project?.projectByProjectId?.adminDaoAddress;
              const projectRoleName =
                project?.projectByProjectId?.daoByAdminDaoAddress?.assignmentsByDaoAddress.nodes?.find(
                  assignment => assignment?.accountId === id,
                )?.roleName;
              if (!projectDaoAddress || !projectRoleName) return;
              await deleteAssignment({
                variables: {
                  input: {
                    daoAddress: projectDaoAddress,
                    roleName: projectRoleName,
                    accountId: id,
                  },
                },
              });
              await reactQueryClient.invalidateQueries({
                queryKey: getAccountByIdQueryKey({
                  id: activeAccountId,
                }),
              });
            } catch (e) {
              setErrorBannerText(String(e));
            }
        }
    }
  }, []);

  const updateRole = useCallback(
    async (id: string, role: BaseMemberRole) => {
      if (
        !wallet?.address ||
        !signingCosmWasmClient ||
        !daoAddress ||
        !daoRbamAddress ||
        !cw4GroupAddress ||
        !role ||
        !currentUserRole ||
        !authorizationId ||
        !roleId ||
        !projectAuthorizationId ||
        !projectRoleId
      ) {
        setErrorBannerText(_(MISSING_REQUIRED_PARAMS));
        return;
      }

      const member = members.find(member => member.id === id);
      if (!member) {
        setErrorBannerText(_(MEMBER_NOT_FOUND));
        return;
      }
      const {
        role: oldRoleName,
        onChainRoleId: oldRoleId,
        address: memberAddress,
        visible,
      } = member;

      if (memberAddress) {
        const newRoleId = getNewRoleId({ type: 'organization', role });
        const projectNewRoleId = getNewRoleId({ type: 'project', role });

        // If we assign member the owner role,
        // it means we need to downgrade current user to admin
        // and update the 'can_manage_members_except_owner' authorization to use the new owner address
        const orgOwnerActions =
          role === ROLE_OWNER
            ? [
                ...updateMemberRoleActions({
                  daoRbamAddress,
                  authorizationId,
                  roleId,
                  memberAddress: wallet?.address,
                  newRoleId: getNewRoleId({
                    type: 'organization',
                    role: ROLE_ADMIN,
                  }),
                  oldRoleId: getNewRoleId({
                    type: 'organization',
                    role: ROLE_OWNER,
                  }),
                }),
                updateAuthorizationAction({
                  daoRbamAddress,
                  cw4GroupAddress,
                  roleId,
                  authorizationId,
                  newOwnerAddress: memberAddress,
                  authorizationIdToUpdate: orgRoles['admin'].authorizations[
                    'can_manage_members_except_owner'
                  ] as number,
                }),
              ]
            : [];

        console.log('orgOwnerActions', orgOwnerActions);
        const orgExecuteInstruction = {
          contractAddress: daoRbamAddress,
          msg: {
            execute_actions: {
              actions: [
                ...updateMemberRoleActions({
                  daoRbamAddress,
                  authorizationId,
                  roleId,
                  memberAddress,
                  newRoleId,
                  oldRoleId,
                }),
                ...orgOwnerActions,
              ],
            },
          },
        };

        const projectExecuteInstructions = (projectsCurrentUserCanManageMembers
          ?.map(project => {
            const projectDao =
              project?.projectByProjectId?.daoByAdminDaoAddress;
            if (!projectDao) return null;
            const oldAssignment = projectDao.assignmentsByDaoAddress.nodes.find(
              assignment => assignment?.accountId === id,
            );
            const currentUserOldAssignment =
              projectDao.assignmentsByDaoAddress.nodes.find(
                assignment => assignment?.accountId === activeAccountId,
              );

            // If current user is owner of the project,
            // we need to downgrade current user to admin
            // and update the 'can_manage_members_except_owner' authorization to use the new owner address
            const projectOwnerActions =
              currentUserOldAssignment?.roleName === ROLE_OWNER &&
              role === ROLE_OWNER
                ? [
                    ...updateMemberRoleActions({
                      daoRbamAddress: projectDao.daoRbamAddress,
                      authorizationId: projectAuthorizationId,
                      roleId: projectRoleId,
                      memberAddress: wallet?.address,
                      newRoleId: getNewRoleId({
                        type: 'project',
                        role: ROLE_ADMIN,
                      }),
                      oldRoleId: getNewRoleId({
                        type: 'project',
                        role: ROLE_OWNER,
                      }),
                    }),
                    updateAuthorizationAction({
                      daoRbamAddress: projectDao.daoRbamAddress,
                      cw4GroupAddress: projectDao.cw4GroupAddress,
                      roleId: projectRoleId,
                      authorizationId: projectAuthorizationId,
                      newOwnerAddress: memberAddress,
                      authorizationIdToUpdate: projectRoles['admin']
                        .authorizations[
                        'can_manage_members_except_owner'
                      ] as number,
                    }),
                  ]
                : [];

            // TODO this means the user is in the org but not in this project anymore
            // should we add him back to the project using the new role or not??
            // if we return null, it means we don't
            if (!oldAssignment) return null;
            return {
              contractAddress: project?.projectByProjectId?.adminDaoAddress,
              msg: {
                execute_actions: {
                  actions: [
                    ...updateMemberRoleActions({
                      daoRbamAddress: projectDao.daoRbamAddress,
                      authorizationId: projectAuthorizationId,
                      roleId: projectRoleId,
                      memberAddress,
                      newRoleId: projectNewRoleId,
                      oldRoleId: parseInt(oldAssignment.onChainRoleId),
                    }),
                    ...projectOwnerActions,
                  ],
                },
              },
            };
          })
          .filter(Boolean) || []) as ExecuteInstruction[];

        try {
          setProcessingModalAtom(atom => void (atom.open = true));
          await signingCosmWasmClient.executeMultiple(
            wallet?.address,
            [orgExecuteInstruction, ...projectExecuteInstructions],
            2,
          );
          await refetchMembers({
            address: memberAddress,
            role,
            visible,
            accountId: id,
          });
        } catch (error) {
          setProcessingModalAtom(atom => void (atom.open = false));
          setErrorBannerText(String(error));
        }
      } else {
        try {
          await updateAssignment({
            variables: {
              input: {
                daoAddress,
                roleName: oldRoleName,
                accountId: id,
                assignmentPatch: { roleName: role },
              },
            },
          });
          await reactQueryClient.invalidateQueries({
            queryKey: getAccountByIdQueryKey({
              id: activeAccountId,
            }),
          });
        } catch (e) {
          setErrorBannerText(String(e));
        }

        if (projectsCurrentUserCanManageMembers)
          for (let project of projectsCurrentUserCanManageMembers) {
            if (project)
              try {
                const projectDaoAddress =
                  project?.projectByProjectId?.adminDaoAddress;
                const projectOldRoleName =
                  project?.projectByProjectId?.daoByAdminDaoAddress?.assignmentsByDaoAddress.nodes?.find(
                    assignment => assignment?.accountId === id,
                  )?.roleName;
                if (!projectDaoAddress || !projectOldRoleName) return; // TODO should we add back the user?
                await updateAssignment({
                  variables: {
                    input: {
                      daoAddress: projectDaoAddress,
                      roleName: projectOldRoleName,
                      accountId: id,
                      assignmentPatch: { roleName: role },
                    },
                  },
                });
                await reactQueryClient.invalidateQueries({
                  queryKey: getAccountByIdQueryKey({
                    id: activeAccountId,
                  }),
                });
              } catch (e) {
                setErrorBannerText(String(e));
              }
          }
      }
    },
    [
      wallet?.address,
      signingCosmWasmClient,
      daoAddress,
      daoRbamAddress,
      cw4GroupAddress,
      roleId,
      authorizationId,
      projectRoleId,
      projectAuthorizationId,
      setErrorBannerText,
      _,
      members,
      projectsCurrentUserCanManageMembers,
      refetchMembers,
      updateAssignment,
      reactQueryClient,
      activeAccountId,
    ],
  );

  const updateVisibility = useCallback(
    async (id: string, visible: boolean) => {
      if (!daoAddress) {
        setErrorBannerText(_(MISSING_REQUIRED_PARAMS));
        return;
      }
      const member = members.find(member => member.id === id);
      if (!member) {
        setErrorBannerText(_(MEMBER_NOT_FOUND));
        return;
      }
      const { role: roleName } = member;
      try {
        await updateAssignment({
          variables: {
            input: {
              daoAddress,
              roleName,
              accountId: id,
              assignmentPatch: { visible },
            },
          },
        });
        await reactQueryClient.invalidateQueries({
          queryKey: getAccountByIdQueryKey({
            id: activeAccountId,
          }),
        });
      } catch (e) {
        setErrorBannerText(String(e));
      }
    },
    [
      daoAddress,
      setErrorBannerText,
      _,
      members,
      updateAssignment,
      reactQueryClient,
      activeAccountId,
    ],
  );

  return { addMember, removeMember, updateRole, updateVisibility };
};
