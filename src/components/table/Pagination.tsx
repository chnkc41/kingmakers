const Pagination = (props: {
  limit: number;
  setLimit: (value: number) => void;
  totalPosts: number;
  page: number;
  setPage: (value: number) => void;
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.totalPosts / props.limit); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex flex-wrap mt-3 justify-center md:justify-between items-center">
        <div className="flex items-center mb-5">
          Page
          <strong>
            {props.page} of {pageNumbers.length}
          </strong>
          <select
            className="input-main !w-28 ml-3 border-gray-300 !mt-0 !py-1 !text-center"
            value={props.limit}
            onChange={(e) => {
              props.setLimit(Number(e.target.value));
              props.setPage(1);
            }}
          >
            {[1, 2, 5, 10, 50, 100, 1000].map((pageSize) => (
              <option
                key={pageSize}
                value={pageSize}
                className="text-gray-700 dark:bg-gray-700 dark:text-gray-200"
              >
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-auto pb-2">
        <div className="flex w-full">
          <button
            className="btn-basic !rounded-r-none !h-10"
            onClick={() => props.setPage(1)}
            disabled={props.page === 1}
          >
            {'<<'}
          </button>

          <button
            className="btn-basic !rounded-none !border-x-0 !h-10"
            onClick={() => props.setPage(props.page - 1)}
            disabled={props.page === 1}
          >
            {'<'}
          </button>

          {pageNumbers.map((number) => {
            return (
              <button
                key={number}
                className={`btn-basic !rounded-none !border-r-0 !h-10
                  ${props.page === number ? '!bg-red-600 dark:!bg-red-500 text-white' : ''}
                `}
                onClick={() => props.setPage(number)}
              >
                {number}
              </button>
            );
          })}

          <button
            className="btn-basic !rounded-none !border-r-0 !h-10"
            onClick={() => props.setPage(props.page + 1)}
            disabled={pageNumbers.length === props.page}
          >
            {'>'}
          </button>

          <button
            className="btn-basic !rounded-l-none !h-10"
            onClick={() => props.setPage(pageNumbers.length)}
            disabled={pageNumbers.length === props.page}
          >
            {'>>'}
          </button>
        </div>
        </div>
      </ul>
    </nav>
  );
};

export default Pagination;
