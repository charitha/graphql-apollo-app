import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
    ApolloClient,
    gql,
    graphql,
    ApolloProvider,
    createNetworkInterface
} from 'react-apollo';

const client = new ApolloClient({
    networkInterface : createNetworkInterface('https://api.graph.cool/simple/v1/cjgkpv4fb5xnl0165gz9qqabv')
});


const ChannelsList = ({ data: {loading, error, allChannels }}) => {
    if (loading) {
        return <p>Loading ...</p>;
    }
    if (error) {
        return <p>{error.message}</p>;
    }
    return <ul>
        { allChannels.map( ch => <li key={ch.id}>{ch.name}</li> ) }
    </ul>;
};

const channelsListQuery = gql`
   query ChannelsListQuery {
     allChannels {
       id
       name
     }
   }
 `;
const ChannelsListWithData = graphql(channelsListQuery)(ChannelsList);

class App extends Component {
  render() {
    return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Test GraphQL App</h1>
        </header>
        <ChannelsListWithData/>
      </div>
    </ApolloProvider>
    );
  }
}

export default App;
