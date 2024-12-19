import {
  setIsAdd,
  setIsArchive,
  setIsConfirm,
  setIsDelete,
  setIsRestore,
} from "@/components/store/storeAction";

import { Archive, ArchiveRestore, FilePenLine, Trash2 } from "lucide-react";
import React from "react";
import LoadMore from "../partials/LoadMore";
import ModalConfirm from "../partials/Modals/ModalConfirm";
import ModalDelete from "../partials/Modals/ModalDelete";
import Pills from "../partials/Pills";
import { StoreContext } from "@/components/store/storeContext";
import useQueryData from "@/components/custom-hook/useQueryData";
import IconNoData from "../partials/IconNoData";
import TableLoader from "../partials/TableLoader";
import IconServerError from "../partials/IconServerError";
import SpinnerTable from "../partials/spinners/SpinnerTable";
import ModalRestore from "@/components/partials/modal/ModalRestore";
import ModalArchive from "@/components/partials/modal/ModalArchive";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryDataInfinite } from "@/components/helpers/queryDataInfinite";
import { useInView } from "react-intersection-observer";
import SearchBarWithFilterStatus from "@/components/partials/SearchBarWithFilterStatus";
import { FaArchive, FaEdit, FaTrash, FaTrashRestoreAlt } from "react-icons/fa";
import Status from "@/components/partials/Status";

const CategoryTable = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isActive, setIsActive] = React.useState(0);
  const [id, setId] = React.useState(null);
    const [isFilter, setIsFilter] = React.useState(false);
    const [onSearch, setOnSearch] = React.useState(false);
    const [statusFilter, setStatusFilter] = React.useState("");
    const search = React.useRef({ value: "" });
    const [page, setPage] = React.useState(1);
    const { ref, inView } = useInView();

  // const {
  //   isLoading,
  //   isFetching,
  //   error,
  //   data: result,
  // } = useQueryData(
  //   `/v2/category`, // endpoint
  //   "get", // method
  //   "category"
  // );

  let counter = 1;

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleDelete = (item) => {
    dispatch(setIsDelete(true));
    setId(item.category_aid);
  };
  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setIsActive(1);
    setId(item.category_aid);
  };

  const handleArchive = (item) => {
    dispatch(setIsArchive(true));
    setIsActive(0);
    setId(item.category_aid);
  };
  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["category", onSearch, isFilter, statusFilter],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        "/v2/category/search", // search or filter endpoint
        `/v2/category/page/${pageParam}`, //page api/endpoint
        isFilter || store.isSearch, //search boolean
        {
          isFilter,
          statusFilter,
          searchValue: search?.current.value,
          id: "",
        } // payload
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
        ``;
      }
      return;
    },
    refetchOnWindowFocus: false,
  });

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);
  return (
    <>
      <div>
        <SearchBarWithFilterStatus
          search={search}
          dispatch={dispatch}
          store={store}
          result={result}
          isFetching={isFetching}
          setOnSearch={setOnSearch}
          onSearch={onSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          setIsFilter={setIsFilter}
        />
      </div>
      <div className="p-4 bg-secondary rounded-md mt-10 border border-line relative">
        {/* {!isLoading || (isFetching && <SpinnerTable />)} */}
        <div className="table-wrapper custom-scroll">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Status</th>
                <th>Title</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* loading or no data */}
              {(status === "pending" || result?.pages[0].data.length === 0) && (
                <tr>
                  <td colSpan={100} className="p-10">
                    {status === "pending" ? (
                      <TableLoader cols={3} count={20} />
                    ) : (
                      <IconNoData />
                    )}
                  </td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan={100}>
                    <IconServerError />
                  </td>
                </tr>
              )}

              {/* result */}
              {result?.pages.map((page, pageKey) => (
                <React.Fragment key={pageKey}>
                  {page.data.map((item, key) => {
                    return (
                      <tr key={key} className="group relative cursor-pointer">
                        <td className="text-center">{counter++}</td>
                        <td>
                          {item.category_is_active === 1 ? (
                            <Status text="Active" />
                          ) : (
                            <Status text="inActive" />
                          )}
                        </td>
                        <td>{item.category_title}</td>
                        <td
                          colSpan={100}
                          className="opacity-0 group-hover:opacity-100"
                        >
                          <div className="flex items-center justify-end gap-2 mr-5">
                            {item.category_is_active == 1 ? (
                              <>
                                <button
                                  type="button"
                                  className="tooltip"
                                  data-tooltip="Edit"
                                  disabled={isFetching}
                                  onClick={() => handleEdit(item)}
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  type="button"
                                  className="tooltip"
                                  data-tooltip="Archive"
                                  disabled={isFetching}
                                  onClick={() => handleArchive(item)}
                                >
                                  <FaArchive />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  className="tooltip"
                                  data-tooltip="Restore"
                                  disabled={isFetching}
                                  onClick={() => handleRestore(item)}
                                >
                                  <FaTrashRestoreAlt />
                                </button>
                                <button
                                  type="button"
                                  className="tooltip"
                                  data-tooltip="Delete"
                                  disabled={isFetching}
                                  onClick={() => handleDelete(item)}
                                >
                                  <FaTrash />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          <div className="pb-10 flex items-center justify-center text-white">
            <LoadMore
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
              result={result?.pages[0]}
              setPage={setPage}
              page={page}
              refView={ref}
            />
          </div>
        </div>
      </div>

      {store.isDelete && (
        <ModalDelete
          setIsDelete={setIsDelete}
          queryKey="category"
          mysqlApiDelete={`/v2/category/${id}`}
        />
      )}
      {store.isRestore && (
        <ModalRestore
          setIsRestore={setIsRestore}
          queryKey="category"
          mysqlEndpoint={`/v2/category/active/${id}`}
        />
      )}
      {store.isArchive && (
        <ModalArchive
          setIsArchive={setIsArchive}
          queryKey="category"
          mysqlEndpoint={`/v2/category/active/${id}`}
        />
      )}
    </>
  );
};

export default CategoryTable;
