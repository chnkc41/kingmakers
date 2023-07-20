import { useEffect, useState } from 'react';
import { format } from 'date-fns';

import Loading from 'components/loading/Loading';
import Table from 'components/table/Table';
import Pagination from 'components/table/Pagination';

import { CAMPAIGN_TITLE_LIST, GLOBAL_VIEW_STATES, URLS } from 'constants/constant';

import { ICampaign } from 'interfaces/ICampaign';

const Campaigns = () => {
  const apiUrl = URLS.URL_CAMPAIGN;

  const [viewState, setViewState] = useState(GLOBAL_VIEW_STATES.LOADING);
  const [campaignList, setCampaignList] = useState<Array<ICampaign>>([]);
  const [filteredCampaignList, setFilteredCampaignList] = useState<Array<ICampaign>>([]);

  // search
  const [containsText, setContainsText] = useState('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // pagination
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [dataShow, setDataShow] = useState<Array<ICampaign>>([]);

  useEffect(() => {
    const initDataShow =
      limit && filteredCampaignList
        ? filteredCampaignList.slice(0, Number(limit))
        : filteredCampaignList;
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

  // Fetch Data for initial population
  useEffect(() => {
    const getData = () => {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data: Array<ICampaign>) => {
          // Removing all those campaigns where the end date is before the start date.
          const filteredData = data.filter((item) => {
            return new Date(item.endDate).getTime() > new Date(item.startDate).getTime();
          });

          setCampaignList(filteredData);

          setFilteredCampaignList(filteredData);
          setViewState(GLOBAL_VIEW_STATES.DONE);
        });
    };

    return () => {
      getData();
    };
  }, []);

  useEffect(() => {
    filterData();
  }, [containsText, startDate, endDate]);

  const filterData = () => {
    setPage(1);

    let filteredList: Array<ICampaign> = campaignList;

    // If the name filter is set
    if (containsText !== '' && containsText !== null) {
      filteredList = filteredList.filter((item) =>
        item.name.toLowerCase().includes(containsText.toLowerCase().trim())
      );
    }

    // If the startDate & endDate filter is set
    if (startDate || endDate) {
      filteredList = filterDate(filteredList);
    }

    setFilteredCampaignList(filteredList);
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
      // Should never be the case
      return undefined;
    });

    return filteredDate;
  };

  // @ts-ignore
  window.AddCampaigns = function (data: Array<ICampaign> = []) {
    // Filter out those campaigns whose end date is before the start date
    const filteredData = data.filter((item) => {
      return new Date(item.endDate).getTime() > new Date(item.startDate).getTime();
    });

    const newCampaignList: Array<ICampaign> = campaignList;
    // If the campaign already exısts - overwrite else add the new campaign
    filteredData.forEach((filteredCampaign: ICampaign) => {
      const indexControl = campaignList.findIndex(
        (campaign: ICampaign) => campaign.id === filteredCampaign.id
      );

      // If the campaign is new
      if (indexControl === -1) {
        newCampaignList.push(filteredCampaign);
      } else {
        // If the campaign already exists - overwrite the campaign details
        newCampaignList[indexControl] = filteredCampaign;
      }
    });

    setPage(1);

    setCampaignList(newCampaignList);
    setFilteredCampaignList(newCampaignList);
  };

  if (viewState === GLOBAL_VIEW_STATES.LOADING) {
    return <Loading />;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Table
        list={dataShow}
        titleList={CAMPAIGN_TITLE_LIST}
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
