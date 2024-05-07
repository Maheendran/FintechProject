import React from "react";
import LoaderSpin from "../loaderSpin/LoaderSpin";
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
  return (
    <>
      <div className="w-[80%] h-fit mx-auto mt-[2rem]  rounded-lg overflow-hidden">
        {loading ? (
          <div className="w-full h-[60vh] relative">
 <LoaderSpin/>
          </div>
       
        ) : (
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y ">
                    <thead>
                      <tr className="bg-black text-white ">
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
                                  className="px-6 py-4 text-start text-xs font-medium text-white uppercase"
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
                                  className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
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
