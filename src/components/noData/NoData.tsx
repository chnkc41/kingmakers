import React from 'react';

const NoData = (props: { colSpan: any }) => {
  return (
    <tr>
      <th className="py-3 border-b border-gray-300 dark:border-gray-700" colSpan={props.colSpan}>
        <div className="flex flex-col flex-wrap justify-center items-center gap-2">
          <p className="text-center text-base">It looks like you don't have any campaign with that name</p>
        </div>
      </th>
    </tr>
  );
};

export default NoData;
