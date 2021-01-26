import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import TimelineItem from './TimelineItem';

export interface Event {
  date: Date | string;
  summary: string;
  description?: string;
  creditVintageByEventId?: any; // TODO get generated types from graphql schema
}

interface TimelineProps {
  events: Event[];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(7.5),
    },
  },
  item: {
    display: 'flex',
    justifyContent: 'flex-start',
    [theme.breakpoints.up('sm')]: {
      width: '50%',
      alignSelf: 'flex-end',
    },
    '&:nth-child(odd)': {
      [theme.breakpoints.up('sm')]: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-start',
      },
    },
  },
}));

export default function Timeline({ events }: TimelineProps): JSX.Element {
  const classes = useStyles({});
  const theme = useTheme();

  return (
    <div className={classes.root}>
      {events.map((event, index) => {
        const eventDate: Date = new Date(event.date);
        const past: boolean = eventDate <= new Date();

        let modalData = {};
        if (event.creditVintageByEventId) {
          const issuerWallet = event.creditVintageByEventId.walletByIssuerId;
          const issuerParty = issuerWallet.partiesByWalletId.nodes[0]; // have party-wallet 1-1 relation?
          const issuerOrg = issuerParty.organizationByPartyId;
          const issuerUser =
            issuerOrg.organizationMembersByOrganizationId &&
            issuerOrg.organizationMembersByOrganizationId.nodes &&
            issuerOrg.organizationMembersByOrganizationId.nodes.length &&
            issuerOrg.organizationMembersByOrganizationId.nodes[0] &&
            issuerOrg.organizationMembersByOrganizationId.nodes[0].userByMemberId;
          modalData = {
            issuer: {
              name: issuerParty.name,
              address: issuerWallet.addr,
              role:
                issuerUser.partyByPartyId.roles &&
                issuerUser.partyByPartyId.roles.length &&
                issuerUser.partyByPartyId.roles[0],
              individual: issuerUser.partyByPartyId.name,
              location: issuerParty.addressByAddressId && issuerParty.addressByAddressId.feature,
              description: issuerOrg && issuerOrg.description,
            },
          };
        }
        return (
          <div className={classes.item} key={`${index}-${event.summary}`}>
            <TimelineItem
              date={eventDate}
              summary={event.summary}
              description={event.description}
              circleColor={past ? theme.palette.secondary.main : theme.palette.info.main}
              barColor={past ? theme.palette.secondary.main : theme.palette.info.main}
              odd={index % 2 !== 0}
              last={index === events.length - 1}
            />
          </div>
        );
      })}
    </div>
  );
}
