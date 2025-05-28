import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Crypto } from "components/molecules/crypto";
import { GridResponsive } from "components/molecules/gridResponsive";
import { GridResponsivePaginated } from "components/molecules/gridResponsivePaginated";
import { RootState } from "lib/store/store";
import { connectWebSocket, disconnectWebSocket } from "utils/webSocketService";

import { UsersProvider, useUsers } from "../../context/UsersPaginatedContext";
import {
  dashboardActions,
  fetchUsers,
  fetchUsersPaginated
} from "../../lib/slice/dashboard/dashboard.slice";

import { GridWrapper, ResponsiveBox, StyledBox } from "./dashboard.styled";
import { UserPaginatedResponse, UsersPaginatedProps } from "./dashboard.type";

const DashboardContent: React.FC = () => {
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

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "User name",
      width: 150,
      editable: true
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      editable: true
    }
  ];

  const columnsPaginated: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "first_name",
      headerName: "First name",
      width: 150,
      editable: true
    },
    {
      field: "last_name",
      headerName: "Last name",
      width: 150,
      editable: true
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      editable: true
    }
  ];

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
        forceRefresh: true
      };
      const response = await fetchUsersPaginated(body);
      setUsersPaginatedContext(response);
      setUsersPaginated(response);
    } catch (error) {
      console.error("Error fetching users paginated:", error);
    }
  };

  useEffect(() => {
    getUsers();
    connectWebSocket();
    return () => {
      disconnectWebSocket();
    };
  }, []);

  useEffect(() => {
    getUsersPaginated({
      page: paginationModel.page + 1,
      perPage: paginationModel.pageSize
    });
  }, [paginationModel]);

  return (
    <Box display={"flex"} flexDirection={"column"} gap={5}>
      <ResponsiveBox>
        {users.map((user, index) => (
          <GridResponsive key={index} data={user} />
        ))}
      </ResponsiveBox>
      <GridWrapper>
        <DataGrid
          rows={users}
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
      </GridWrapper>
      <ResponsiveBox>
        <GridResponsivePaginated />
      </ResponsiveBox>
      <GridWrapper>
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
        />
      </GridWrapper>
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
        {websocketData.map(item => (
          <Crypto key={item.id} data={item} />
        ))}
      </Box>
    </Box>
  );
};

const Dashboard: React.FC = () => (
  <UsersProvider>
    <DashboardContent />
  </UsersProvider>
);

export default Dashboard;
