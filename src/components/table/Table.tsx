import NoData from 'components/noData/NoData';
import { format } from 'date-fns';
import 'boxicons';
import { ICampaign } from 'interfaces/ICampaıgn';
import React, { useEffect, useState } from 'react';
import { BsXCircleFill, BsFillCheckCircleFill, BsXLg } from 'react-icons/bs';
import Flatpickr from 'react-flatpickr';

const Table = (props: {
  list: Array<ICampaign>;
  titleList: Array<string>;
  filter: boolean;
  containsText: string;
  setContainsText: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
}) => {
  const [colSpan, setColSpan] = useState<number>(0);

  // Colspan
  useEffect(() => {
    const colSpanControl = () => {
      let columnLength =
        props.list?.length > 0 ? Object.keys(props.list[0]).length : props.titleList.length;
      setColSpan(columnLength);
    };

    return () => {
      colSpanControl();
    };
  }, [props.list, props.titleList]);

  // Table Title
  const renderTableTitles = () => {
    return (
      <tr>
        {props.titleList.map((item, index) => {
          return <th key={index}> {item} </th>;
        })}
      </tr>
    );
  };

  // Table Body Rows
  const renderTableRows = () => {
    // dataShow
    // return props.list?.map((row, index) => {
    return props.list?.map((row, index) => {
      let columns = Object.values(row);
      return (
        <tr key={index}>
          {columns.map((column, columnIndex) => {
            return (
              columnIndex !== 0 && (
                <td key={columnIndex}>
                  <span className="flex">
                    <b className="inline-block md:hidden min-w-max mr-3">
                      {props.titleList[columnIndex - 1]}
                      {':'}
                    </b>

                    {columnIndex === 4 ? formatter.format(column) : column}
                  </span>
                </td>
              )
            );
          })}
          <td>
            <span className="flex">
              <b className="inline-block md:hidden min-w-max mr-3">
                {props.titleList[columns.length - 1]}{' '}
              </b>
              {dateStatus(columns[2], columns[3])}
            </span>
          </td>
        </tr>
      );
    });
  };

  // Table Search
  const searchSection = () => {
    return (
      <tr>
        <th colSpan={8}>
          <div className="flex items-center justify-center sm:justify-start">
            <div className="flex flex-wrap justify-center sm:items-end ">
              <span className="mr-3">
                <input
                  value={props.containsText}
                  onChange={(e) => {
                    props.setContainsText(e.target.value);
                  }}
                  placeholder={`Filter by name`}
                  className="input-borderless !w-40 text-center"
                />
              </span>
              <span>
                <Flatpickr
                  data-enable-time
                  value={props.startDate}
                  placeholder="Start date"
                  options={{
                    altFormat: 'm-d-Y',
                    altInput: true,
                    enableTime: false
                  }}
                  onChange={(e) => {
                    props.setStartDate(format(new Date(e.toString()), 'yyyy/MM/dd'));
                  }}
                  className="flat-picker"
                />
                {props.startDate && (
                  <BsXLg
                    onClick={() => props.setStartDate('')}
                    className="inline-block -ml-4 text-red-600 mr-1 -mt-1 cursor-pointer"
                  />
                )}

                <Flatpickr
                  data-enable-time
                  value={props.endDate}
                  placeholder="End date"
                  options={{
                    altFormat: 'm-d-Y',
                    altInput: true,
                    minDate: props.startDate,
                    enableTime: false
                  }}
                  onChange={(e) => {
                    props.setEndDate(format(new Date(e.toString()), 'yyyy/MM/dd'));
                  }}
                  className="flat-picker"
                />
                {props.endDate && (
                  <BsXLg
                    onClick={() => props.setEndDate('')}
                    className="inline-block -ml-4 text-red-600 mr-1 -mt-1 cursor-pointer"
                  />
                )}
              </span>
            </div>
          </div>
        </th>
      </tr>
    );
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  const dateStatus = (startD: string, endD: string) => {
    const startDate = new Date(startD).getTime();
    const endDate = new Date(endD).getTime();
    const currentDate = new Date().getTime();
    let status: any = (
      <span className="flex justify-end">
        <BsXCircleFill className="text-red-600 text-lg mr-2 mt-0.5" /> Inactive
      </span>
    );

    if (startDate < currentDate && endDate > currentDate) {
      status = (
        <span className="flex justify-end">
          <BsFillCheckCircleFill className="text-green-600 text-lg mr-2 mt-0.5" /> Active
        </span>
      );
    }
    return status;
  };

  return (
    <>
      <table>
        <thead>
          {props.filter && searchSection()}
          {props.titleList && renderTableTitles()}
        </thead>
        <tbody>
          {props.list && props.list.length > 0 ? renderTableRows() : <NoData colSpan={colSpan} />}
        </tbody>
      </table>
    </>
  );
};

export default Table;
