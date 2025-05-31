import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import { useDispatch, useSelector } from "react-redux";

import { Crypto } from "components/molecules/crypto";
const FormikDialog = lazy(() => import("components/molecules/formikDialog"));
import { CryptoValueGrid } from "components/molecules/cryptoValueGrid";
import { GridResponsive } from "components/molecules/gridResponsive";
import { GridResponsivePaginated } from "components/molecules/gridResponsivePaginated";
import { RootState } from "lib/store/store";
import { useBreakpoint } from "utils/breakPoints";
import { useWebSocket } from "utils/webSocketService";

import { UsersProvider, useUsers } from "../../context/UsersPaginatedContext";
import {
  dashboardActions,
  fetchUsers,
  fetchUsersPaginated
} from "../../lib/slice/dashboard/dashboard.slice";

import {
  GridWrapper,
  ResponsiveBox,
  StyledBox,
  StyledImage
} from "./dashboard.styled";
import {
  SelectedUserProps,
  UserPaginatedResponse,
  UsersPaginatedProps
} from "./dashboard.type";

const DashboardContent: React.FC = () => {
  const { isMobile, isDesktop } = useBreakpoint();
  // useWebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.dashboard.users);
  const websocketData = useSelector(
    (state: RootState) => state.dashboard.socketData
  );
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 6
  });
  const { setUsersPaginatedContext } = useUsers();

  const [usersPaginated, setUsersPaginated] = useState<UserPaginatedResponse>();
  const [formikDialog, setFormikDialog] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<SelectedUserProps>();

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: "id", headerName: "ID", width: 90 },
      {
        field: "value",
        headerName: "Price",
        width: 150,
        renderCell: params => <CryptoValueGrid value={params.value} />
      },
      {
        field: "email",
        headerName: "Email",
        width: 150,
        editable: true
      }
    ],
    []
  );

  const columnsPaginated = useMemo<GridColDef[]>(
    () => [
      { field: "id", headerName: "ID", width: 90 },
      { field: "first_name", headerName: "First name", width: 150 },
      { field: "last_name", headerName: "Last name", width: 150 },
      { field: "email", headerName: "Email", width: 150 },
      {
        field: "image",
        headerName: "Avatar",
        width: 100,
        renderCell: params => (
          <StyledImage
            loading="lazy"
            alt="User Avatar"
            src={params.row.avatar}
          />
        ),
        sortable: false,
        filterable: false
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 120,
        renderCell: params => (
          <Button
            variant="contained"
            size="small"
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </Button>
        )
      }
    ],
    []
  );

  const handleEdit = useCallback((rowData: SelectedUserProps) => {
    setSelectedUser(rowData);
    setFormikDialog(true);
  }, []);

  const getUsers = async () => {
    try {
      const response = await fetchUsers();
      dispatch(dashboardActions.setUsers(response));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getUsersPaginated = async ({ page, perPage }: UsersPaginatedProps) => {
    try {
      const body = {
        page,
        perPage,
        forceRefresh: false
      };
      const response = await fetchUsersPaginated(body);
      setUsersPaginatedContext(response);
      setUsersPaginated(response);
    } catch (error) {
      console.error("Error fetching users paginated:", error);
    }
  };

  const handleRowClick = rowData => {
    console.log("Clicked row data:", rowData);
  };

  useEffect(() => {
    getUsers();
    // connectWebSocket();
    // return () => {
    //   disconnectWebSocket();
    // };
  }, []);

  useEffect(() => {
    getUsersPaginated({
      page: paginationModel.page + 1,
      perPage: paginationModel.pageSize
    });
  }, [paginationModel]);

  return (
    <>
      <Box display={"flex"} flexDirection={"column"} gap={5}>
        {/* <ResponsiveBox> */}
        {isMobile ? (
          users.map((user, index) => <GridResponsive key={index} data={user} />)
        ) : (
          // {/* </ResponsiveBox> */}
          // {/* <GridWrapper> */}
          <DataGrid
            rows={websocketData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5
                }
              }
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        )}
        {/* </GridWrapper> */}
        <Button onClick={() => setFormikDialog(true)} variant="contained">
          click
        </Button>
        <StyledBox display={"flex"} gap={5}>
          <Box display={"flex"} flexDirection={"row"} gap={2}>
            <Typography>first name:</Typography>
            <Typography>ahmad ghamlouch</Typography>
          </Box>
          <Box display={"flex"} flexDirection={"row"} gap={2}>
            <Typography>first name:</Typography>
            <Typography>ahmad ghamlouch</Typography>
          </Box>
          <Box display={"flex"} flexDirection={"row"} gap={2}>
            <Typography>first name:</Typography>
            <Typography>ahmad ghamlouch</Typography>
          </Box>
        </StyledBox>
        <Box>
          {/* {websocketData?.map(item => <Crypto key={item.id} data={item} />)} */}
        </Box>
      </Box>
      <Suspense fallback={<div>Loading...</div>}>
        {formikDialog && (
          <FormikDialog
            onClose={() => setFormikDialog(false)}
            openFormikDialog={formikDialog}
            selectedUser={selectedUser}
          />
        )}
      </Suspense>
      {isDesktop ? (
        // <GridWrapper>
        <DataGrid
          rows={usersPaginated?.data || []}
          columns={columnsPaginated}
          paginationMode="server"
          paginationModel={paginationModel}
          rowCount={usersPaginated?.total}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowClick={params => handleRowClick(params.row)} // 👈 Add this line
        />
      ) : (
        // </GridWrapper>
        // <ResponsiveBox>
        <GridResponsivePaginated
          fetchUsersPaginated={fetchUsersPaginated}
          perPage={paginationModel.pageSize}
        />
        // </ResponsiveBox>
      )}
    </>
  );
};

const Dashboard: React.FC = () => (
  <UsersProvider>
    <DashboardContent />
  </UsersProvider>
);

export default Dashboard;
