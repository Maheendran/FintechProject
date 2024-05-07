import React from "react";
interface finDetailsProps {
  finDetails?: {
    _id: string;
    cost: number;
    charity: number;
    revenue: number;
    profit: number;
    category: string;
    date: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }[];
  inCompleteData?: any[];
  headerDetail?: any;
  loading?: boolean;

}

const FinanceTable: React.FC<finDetailsProps> = ({
  finDetails,
  loading,
  inCompleteData,
  headerDetail,
}) => {
  console.log(headerDetail,inCompleteData)
  return (
    <>
      <div className="w-[80%] h-fit mx-auto mt-[2rem] border rounded-2xl overflow-hidden">
        {loading ? (
          <div className="w-full h-[50vh] bg-red-300">
            <p className="text-[2rem] text-center">Loading....</p>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        {finDetails &&
                          finDetails.length > 0 &&
                          Object.keys(finDetails[0]).map(
                            (e: any, index: number) => {
                              if (e === "_id") {
                                return;
                              }
                              return (
                                <th
                                  key={index}
                                  scope="col"
                                  className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                >
                                  {e}
                                </th>
                              );
                            }
                          )}
  {headerDetail && Object.keys(headerDetail).map(
                            (e: any, index: number) => {
                              if (e === "_id") {
                                return;
                              }
                              return (
                                <th
                                  key={index}
                                  scope="col"
                                  className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                >
                                  {e}
                                </th>
                              );
                            }
                          )}

                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {finDetails &&
                        finDetails.map((e, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                              {e.cost}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {e.charity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {e.revenue}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {e.profit}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {e.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {e.date}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FinanceTable;
