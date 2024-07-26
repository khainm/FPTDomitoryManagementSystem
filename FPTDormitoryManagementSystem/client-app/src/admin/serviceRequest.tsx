import {
  Box,
  Button as MUIButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ServiceRequest: React.FC = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{ open: boolean, action: string, id: string | null, reason: string }>({ open: false, action: '', id: null, reason: '' });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`https://localhost:7777/api/Service/all-service-requests`);
        const dataWithIds = response.data.map((item: { id: any; }, index: number) => ({
          ...item,
          id: item.id || index + 1, // Ensure each row has a unique id
        }));
        setServices(dataWithIds);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [loading]);

  const handleApprove = async (id: string) => {
    try {
      await axios.post(`https://localhost:7777/api/BookingService/service-request/${id}/approve`);
      setLoading(true); // Trigger re-fetch after approval
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = async (id: string, reason: string) => {
    try {
      await axios.post(`https://localhost:7777/api/BookingService/service-request/${id}/cancel`, { reason });
      setLoading(true); // Trigger re-fetch after cancellation
    } catch (error) {
      console.error(error);
    }
  };

  const openConfirmDialog = (action: string, id: string) => {
    setConfirmDialog({ open: true, action, id, reason: '' });
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({ open: false, action: '', id: null, reason: '' });
  };

  const handleConfirmAction = () => {
    if (confirmDialog.action === 'approve' && confirmDialog.id) {
      handleApprove(confirmDialog.id);
    } else if (confirmDialog.action === 'cancel' && confirmDialog.id) {
      handleCancel(confirmDialog.id, confirmDialog.reason);
    }
    closeConfirmDialog();
  };

  const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmDialog({ ...confirmDialog, reason: event.target.value });
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", headerClassName: "bg-gray-400", width: 200 },
    { field: "serviceName", headerName: "Name", headerClassName: "bg-gray-400", width: 200 },
    { field: "servicePrice", headerName: "Price", headerClassName: "bg-gray-400" },
    { field: "dateRequest", headerName: "Date Request", headerClassName: "bg-gray-400", width: 200 },
    { field: "usageCount", headerName: "Usage Count", headerClassName: "bg-gray-400", width: 100 },
    { field: "roomName", headerName: "Room Name", headerClassName: "bg-gray-400", width: 150 },
    { field: "houseName", headerName: "House Name", headerClassName: "bg-gray-400", width: 150 },
    { field: "userName", headerName: "User Name", headerClassName: "bg-gray-400", width: 150 },
    { field: "status", headerName: "Status", headerClassName: "bg-gray-400", width: 150 },
    {
      field: "action", headerName: "Action", headerClassName: "bg-gray-400", flex: 1,
      renderCell: (params) => (
        <>
          {params.row.status === "pending" && (
            <>
              <MUIButton variant="contained" color="primary" onClick={() => openConfirmDialog('approve', params.row.id)}>Approve</MUIButton>
              <MUIButton variant="contained" color="error" onClick={() => openConfirmDialog('cancel', params.row.id)} style={{ marginLeft: 8 }}>Cancel</MUIButton>
            </>
          )}
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="text-5xl my-10 ml-10 font-bold">Service Request</div>
      <Box sx={{ height: "700px", width: "100%" }}>
        <DataGrid
          rows={services}
          columns={columns}
          getRowId={(row) => row.id}
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
      <Dialog open={confirmDialog.open} onClose={closeConfirmDialog}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirmDialog.action === 'cancel' ? (
              <>
                <p>Are you sure you want to {confirmDialog.action} this service request?</p>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Reason for cancellation"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={confirmDialog.reason}
                  onChange={handleReasonChange}
                />
              </>
            ) : (
              <p>Are you sure you want to {confirmDialog.action} this service request?</p>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MUIButton onClick={closeConfirmDialog} color="primary">
            Cancel
          </MUIButton>
          <MUIButton onClick={handleConfirmAction} color="primary">
            Confirm
          </MUIButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ServiceRequest;
