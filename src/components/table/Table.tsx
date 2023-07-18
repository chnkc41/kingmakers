import NoData from 'components/noData/NoData';
import React, { useState } from 'react';
// import { BiEditAlt, BiTrash } from 'react-icons/bi';

// , containsText, setContainsText
const Table = (props: { list: Array<string>; titleList: Array<string> }) => {
  const [colSpan] = useState(Object.keys(props.list?.length > 0 && props.list[0]).length + 1);

  const renderTableTitles = () => {
    return (
      <tr>
        {props.titleList.map((item) => {
          return <th> {item} </th>;
        })}
      </tr>
    );
  };

  const renderTableRows = () => {
    return props.list?.map((row, index) => {
      const filteredByKey = Object.fromEntries(
        Object.entries(row).filter(([key, value]) => key !== 'relatedId')
      );

      let columns = Object.values(filteredByKey);
      return (
        <tr key={index}>
          {columns.map((column, columnIndex) => {
            return (
              columnIndex !== 0 && (
                <td key={columnIndex}>
                  <b className="inline md:hidden">{props.titleList[columnIndex - 1]} </b>
                  {column}
                </td>
              )
            );
          })}
        </tr>
      );
    });
  };

  return (
    <table>
      <thead>{props.titleList ? renderTableTitles() : <NoData colSpan={colSpan} />}</thead>
      <tbody>{props.list ? renderTableRows() : <NoData colSpan={colSpan} />}</tbody>
    </table>
  );
};

export default Table;
