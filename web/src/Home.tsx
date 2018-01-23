import * as React from 'react';
import { View, Text } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const HOME_QUERY = gql`
{
    allTargets
    {
      nodes
      {
        id
        title
        description
        rewardAmount
      }
    }
  }
  `;

const Home = ({data:{allTargets}}:any) => 
  <View>
   <Text>{JSON.stringify(allTargets)}</Text>
  </View>;

export default graphql(HOME_QUERY)(Home);