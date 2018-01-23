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

const Home = ({data: {loading, allTargets}}:any) => {
  if(loading)
    return <Text>Loading</Text>;
  return (
    <View>
      {allTargets.nodes.map(({id, title, description}) =>
        <View><Text>{title}</Text></View>
        )}
    </View>
  );
};

export default graphql(HOME_QUERY)(Home);
