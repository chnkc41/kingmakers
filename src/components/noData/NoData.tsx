import React from 'react';

const NoData = (props: { colSpan: any }) => {
  return (
    <tr>
      <th className="py-3" colSpan={props.colSpan}>
        <div className="flex flex-col flex-wrap justify-center items-center gap-2">
          <p className="text-center text-base">It looks like you don't have any data yet.</p>
        </div>
      </th>
    </tr>
  );
};

export default NoData;
