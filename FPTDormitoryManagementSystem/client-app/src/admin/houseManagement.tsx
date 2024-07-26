import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import { Visibility, Email } from "@mui/icons-material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const HouseManagement: React.FC = () => {
  const [houses, setHouses] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get(`https://localhost:7777/api/House`);
        setHouses(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHouses();
  }, []);

  const handleViewDetailsClick = async (houseId: string, houseName: string) => {
    setSelectedHouse(houseName);
    try {
      const response = await axios.get(`https://localhost:7777/api/House/${houseId}/users`);
      if (response.data.length === 0) {
        toast.info("This house currently has no students.");
        return;
      }
      setUsers(response.data);
      setOpen(true);
    } catch (error) {
      if ((error as any).response && (error as any).response.status === 404) {
        toast.info("This house currently has no students.");
      } else {
        console.error(error);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setUsers([]);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "House Id",
      headerClassName: "bg-gray-400",
      flex: 1,
    },
    {
      field: "name",
      headerName: "House Name",
      headerClassName: "bg-gray-400",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "bg-gray-400",
      flex: 1,
    },
    {
      field: "dormName",
      headerName: "Dorm",
      headerClassName: "bg-gray-400",
      flex: 1,
    },
    {
      field: "floorName",
      headerName: "Floor Name",
      headerClassName: "bg-gray-400",
      flex: 1,
    },
    {
      field: "viewDetails",
      headerName: "Actions",
      headerClassName: "bg-gray-400",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton
          color="primary"
          onClick={() => handleViewDetailsClick(params.row.id, params.row.name)}
        >
          <Visibility />
        </IconButton>
      ),
    },
  ];

  return (
    <div>
      <div className="text-5xl my-10 ml-10 font-bold">House Management</div>
      <Box sx={{ height: "700px", width: "100%" }}>
        <DataGrid
          rows={houses}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
        />
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{selectedHouse}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {users.map((user: any) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <Box
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "16px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <Typography variant="h6" component="div">
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {user.email}
                  </Typography>
                  <Typography variant="body2">
                    Room Types: {user.roomTypes.join(", ")}
                  </Typography>
                  <IconButton
                    color="primary"
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${user.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Email to ${user.email}`}
                  >
                    <Email />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </div>
  );
};

export default HouseManagement;
