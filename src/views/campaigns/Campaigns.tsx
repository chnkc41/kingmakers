import React, { useEffect, useState } from 'react';
import Loading from 'components/loading/Loading';
import Table from 'components/table/Table';
import { campaignTitleList, globalViewStates, urls } from 'constants/constant';

// import axios from 'axios';

const Campaigns = () => {
  const [viewState, setViewState] = useState(globalViewStates.LOADING);
  const [apiUrl] = useState(urls.URL_CAMPAIGNS);
  const [campaignList, setCampaignList] = useState([]);

  // search
  let [containsText, setContainsText] = useState('');

  // fetch Data 
  useEffect(() => {
    const getData = () => {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((data) => {
          setCampaignList(data);
          setViewState(globalViewStates.DONE);
        });
    };

    return () => {
      getData();
    };
  }, []);
 

  if (viewState === globalViewStates.LOADING) {
    return <Loading />;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Table
        list={campaignList}
        titleList={campaignTitleList}
        // containsText={containsText}
        // setContainsText={setContainsText}
      />
    </div>
  );
};

export default Campaigns;
