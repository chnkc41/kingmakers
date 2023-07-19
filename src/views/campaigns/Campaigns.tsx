import React, { useEffect, useState } from 'react';
import Loading from 'components/loading/Loading';
import Table from 'components/table/Table';
import { campaignTitleList, globalViewStates, urls } from 'constants/constant';
import { ICampaign } from 'interfaces/ICampaıgn';
import { format } from 'date-fns';
import Pagination from 'components/table/Pagination';

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

  // paginate
  let [page, setPage] = useState<number>(1);
  let [limit, setLimit] = useState<number>(5);
  const [dataShow, setDataShow] = useState<Array<ICampaign>>([]);

  useEffect(() => {
    const initDataShow =
      limit && filteredCampaignList
        ? filteredCampaignList.slice(0, Number(limit))
        : filteredCampaignList;
    // debugger
    setDataShow(initDataShow);
  }, [filteredCampaignList]);

  useEffect(() => {
    const start = Number(limit) * (page - 1);
    const end = start + Number(limit);
    setDataShow(filteredCampaignList.slice(start, end));
  }, [page]);

  useEffect(() => {
    const start = 0;
    const end = Number(limit);
    setDataShow(filteredCampaignList.slice(start, end));
  }, [limit]);

  // fetch Data
  useEffect(() => {
    const getData = () => {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data: Array<ICampaign>) => {
          const filteredData = data.filter((item) => {
            return new Date(item.endDate).getTime() > new Date(item.startDate).getTime();
          });

          setFilteredCampaignList(filteredData);
          setCampaignList(filteredData);
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
    setPage(1);
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

  // @ts-ignore
  window.AddCampaigns = function (data: Array<ICampaign> = []) {
    const filteredData = data.filter((item) => {
      return new Date(item.endDate).getTime() > new Date(item.startDate).getTime();
    });

    const newElements = campaignList.concat(filteredData);
    const newElementsByFiltered = filteredCampaignList.concat(filteredData);

    setCampaignList(newElements);
    setDataShow(newElementsByFiltered);
    setFilteredCampaignList(newElementsByFiltered);
  };

  // window.AddCampaigns([{"id":11,"name":"Cihan","startDate":"9/19/2017","endDate":"3/9/2025","Budget":88377}])

  if (viewState === globalViewStates.LOADING) {
    return <Loading />;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Table
        // list={filteredCampaignList}
        list={dataShow}
        titleList={campaignTitleList}
        containsText={containsText}
        setContainsText={setContainsText}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        filter={true}
      />

      <Pagination
        limit={limit}
        setLimit={setLimit}
        totalPosts={filteredCampaignList.length}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default Campaigns;
