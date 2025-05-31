import { Box, Button, CircularProgress } from "@mui/material";
import { UsersPagination } from "context/UsersPaginatedContext.type";
import { useEffect, useState } from "react";

type GridResponsivePaginatedProps = {
  fetchUsersPaginated: (params: {
    page: number;
    perPage: number;
    forceRefresh: boolean;
  }) => Promise<{
    total_pages: number;
    data: UsersPagination[];
  }>;
  perPage?: number;
};

const GridResponsivePaginated: React.FC<GridResponsivePaginatedProps> = ({
  fetchUsersPaginated,
  perPage = 6
}) => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [accumulatedData, setAccumulatedData] = useState<UsersPagination[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const loadMoreData = async () => {
    if (loading || currentPage > totalPages) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetchUsersPaginated({
        page: currentPage,
        perPage,
        forceRefresh: true
      });

      setTotalPages(response.total_pages);
      setAccumulatedData(prev => [...prev, ...response.data]);
      setCurrentPage(prev => prev + 1);
    } catch (error) {
      console.error("Error loading more data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    const initialLoad = async () => {
      setLoading(true);
      try {
        const response = await fetchUsersPaginated({
          page: 1,
          perPage,
          forceRefresh: true
        });

        setTotalPages(response.total_pages);
        setAccumulatedData(response.data);
        setCurrentPage(2);
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    initialLoad();
  }, [fetchUsersPaginated, perPage]);

  const hasMore = currentPage <= totalPages;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 2,
          width: "100%"
        }}
      >
        {accumulatedData.map(user => (
          <Box
            key={user.id}
            sx={{
              p: 2,
              border: "1px solid #e0e0e0",
              borderRadius: 1,
              display: "flex",
              flexDirection: "column",
              gap: 1
            }}
          >
            <img
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
              style={{ width: "100%", height: "auto", borderRadius: "4px" }}
            />
            <Box sx={{ fontWeight: "bold" }}>
              {user.first_name} {user.last_name}
            </Box>
            <Box sx={{ color: "text.secondary" }}>{user.email}</Box>
          </Box>
        ))}
      </Box>

      {loading && <CircularProgress />}

      {hasMore && !loading && (
        <Button variant="contained" onClick={loadMoreData} sx={{ mt: 2 }}>
          Load More
        </Button>
      )}
    </Box>
  );
};

export default GridResponsivePaginated;
