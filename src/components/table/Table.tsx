import NoData from 'components/noData/NoData';
import { format } from 'date-fns';
import 'boxicons';
import { ICampaign } from 'interfaces/ICampaıgn';
import React, { useEffect, useState } from 'react';
import { BiSolidCheckCircle, BiXCircle } from 'react-icons/bi';
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

  // search: Function;
}) => {
  const [colSpan, setColSpan] = useState<number>(0);

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

  const renderTableTitles = () => {
    return (
      <tr>
        {props.titleList.map((item, index) => {
          return <th key={index}> {item} </th>;
        })}
      </tr>
    );
  };

  const searchSection = () => {
    return (
      <tr>
        <th colSpan={8}>
          <div className="flex items-center justify-start">
            <div className="flex items-end">
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
                    console.log(format(new Date(e.toString()), 'yyyy/MM/dd'));
                    props.setStartDate(format(new Date(e.toString()), 'yyyy/MM/dd'));
                  }}
                  className="flat-picker"
                />
              </span>

              <span>
                <Flatpickr
                  data-enable-time
                  value={props.endDate}
                  placeholder="End date"
                  options={{
                    altFormat: 'm-d-Y',
                    altInput: true,
                    enableTime: false
                  }}
                  onChange={(e) => {
                    console.log(format(new Date(e.toString()), 'yyyy/MM/dd'));
                    props.setEndDate(format(new Date(e.toString()), 'yyyy/MM/dd'));
                  }}
                  className="flat-picker"
                />
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
        <BiXCircle className="text-red-600 text-xl mr-1 mt-0.5" /> Inactive
      </span>
    );

    if (startDate < currentDate && endDate > currentDate) {
      status = (
        <span className="flex justify-end">
          <BiSolidCheckCircle className="text-green-600 text-xl mr-1 mt-0.5" /> Active
        </span>
      );
    }
    return status;
  };

  const renderTableRows = () => {
    return props.list?.map((row, index) => {
      let columns = Object.values(row);
      return (
        <tr key={index}>
          {columns.map((column, columnIndex) => {
            return (
              columnIndex !== 0 && (
                <td key={columnIndex}>
                  <b className="inline md:hidden">{props.titleList[columnIndex - 1]} </b>

                  {columnIndex === 4 ? formatter.format(column) : column}
                </td>
              )
            );
          })}
          <td>
            <b className="inline md:hidden">{props.titleList[columns.length - 1]} </b>
            {dateStatus(columns[2], columns[3])}
          </td>
        </tr>
      );
    });
  };

  return (
    <table>
      <thead>
        {props.filter && searchSection()}
        {props.titleList && renderTableTitles()}
      </thead>
      <tbody>
        {props.list && props.list.length > 0 ? renderTableRows() : <NoData colSpan={colSpan} />}
      </tbody>
    </table>
  );
};

export default Table;
