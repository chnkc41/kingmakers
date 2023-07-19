import React, { useEffect, useState } from 'react';
import Loading from 'components/loading/Loading';
import Table from 'components/table/Table';
import { campaignTitleList, globalViewStates, urls } from 'constants/constant';
import { ICampaign } from 'interfaces/ICampaıgn';
import { format } from 'date-fns';

// import axios from 'axios';

const Campaigns = () => {
  const [viewState, setViewState] = useState(globalViewStates.LOADING);
  const [apiUrl] = useState(urls.URL_CAMPAIGN);
  const [campaignList, setCampaignList] = useState<Array<ICampaign>>([]);
  const [filteredCampaignList, setFilteredCampaignList] = useState<Array<ICampaign>>([]);

  // search
  let [containsText, setContainsText] = useState('');
  let [startDate, setStartDate] = useState<string>('');
  let [endDate, setEndDate] = useState<string>('');

  // fetch Data
  useEffect(() => {
    const getData = () => {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data: Array<ICampaign>) => {
          setFilteredCampaignList(data);
          setCampaignList(data);
          setViewState(globalViewStates.DONE);
        });
    };

    return () => {
      getData();
    };
  }, []);

  useEffect(() => {
    filterData();
  }, [containsText, startDate, endDate]);

  // useEffect(() => {
  //   const dateControl = () => {
  //     const sDate = startDate && new Date(startDate).getTime();
  //     const eDate = endDate && new Date(endDate).getTime();
  //     // debugger;
  //     if (eDate < sDate) {
  //       alert('last date should be bigger than start date');
  //     } else {
  //       filterData();
  //     }
  //   };

  //   return () => {
  //     dateControl();
  //   };
  // }, [containsText, startDate, endDate]);

  const filterData = () => {
    if (containsText === '' || containsText === null) {
      if (startDate || endDate) {
        const filteredByDate = filterDate(campaignList);
        setFilteredCampaignList(filteredByDate);
      } else {
        setFilteredCampaignList(campaignList);
      }
    } else {
      const filtered = campaignList.filter((item) =>
        item.name.toLowerCase().includes(containsText.toLowerCase().trim())
      );

      if (startDate || endDate) {
        const filteredByDate = filterDate(filtered);
        setFilteredCampaignList(filteredByDate);
      } else {
        setFilteredCampaignList(filtered);
      }
    }
  };

  const filterDate = (data: Array<ICampaign>) => {
    const filteredDate = data.filter((item) => {
      const sDate = startDate ? format(new Date(startDate), 'MM/dd/yyyy') : '';
      const eDate = endDate ? format(new Date(endDate), 'MM/dd/yyyy') : '';

      if (sDate !== '' && eDate !== '') {
        return (
          new Date(item.startDate) >= new Date(sDate) && new Date(item.endDate) <= new Date(eDate)
        );
      } else if (sDate !== '') {
        return new Date(item.startDate) >= new Date(sDate);
      } else if (eDate !== '') {
        return new Date(item.endDate) <= new Date(eDate);
      }
    });
    return filteredDate;
  };

  if (viewState === globalViewStates.LOADING) {
    return <Loading />;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Table
        list={filteredCampaignList}
        titleList={campaignTitleList}
        containsText={containsText}
        setContainsText={setContainsText}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        filter={true}
      />
    </div>
  );
};

export default Campaigns;
