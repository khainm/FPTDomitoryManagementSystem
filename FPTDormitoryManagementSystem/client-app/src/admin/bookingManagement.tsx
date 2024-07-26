import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button as MUIButton,
  TextField
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const BookingManagement: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [expiredBookings, setExpiredBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewExpired, setViewExpired] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, id: "", action: "", reason: "" });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://localhost:7777/api/Booking");
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
    setLoading(false);
  }, [loading]);

  const fetchExpiredBookings = async () => {
    try {
      const response = await axios.get("https://localhost:7777/api/Booking/expired-bookings");
      setExpiredBookings(response.data);
      setViewExpired(true);
    } catch (error) {
      console.error(error);
    }
  };

  const notifyExpiringBookings = async () => {
    try {
      await axios.post("https://localhost:7777/api/Booking/notify-expiring-bookings");
      toast.success('Notifications sent to expiring bookings');
    } catch (error) {
      console.error(error);
      toast.error('Failed to send notifications');
    }
  };

  const handleApprove = async (id: string) => {
    await axios.put(`https://localhost:7777/api/Booking/${id}/approve`);
    toast.success('Booking approved');
    setLoading(true);
  };

  const handleCancel = async (id: string, reason: string) => {
    await axios.put(`https://localhost:7777/api/Booking/${id}/cancel`, { reason });
    toast.success('Booking canceled');
    setLoading(true);
  };

  const handleAction = (id: string, action: string) => {
    setConfirmDialog({ open: true, id, action, reason: "" });
  };

  const handleConfirm = () => {
    if (confirmDialog.action === "approve") {
      handleApprove(confirmDialog.id);
    } else {
      handleCancel(confirmDialog.id, confirmDialog.reason);
    }
    setConfirmDialog({ open: false, id: "", action: "", reason: "" });
  };

  const handleClose = () => {
    setConfirmDialog({ open: false, id: "", action: "", reason: "" });
  };

  const handleBack = () => {
    setViewExpired(false);
  };

  const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmDialog({ ...confirmDialog, reason: event.target.value });
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Booking Id",
      headerClassName: "bg-gray-400",
      width: 200,
    },
    {
      field: "houseName",
      headerName: "House Name",
      headerClassName: "bg-gray-400",
    },
    {
      field: "userName",
      headerName: "User Name",
      headerClassName: "bg-gray-400",
      width: 200,
    },
    {
      field: "roomType",
      headerName: "Room Type",
      headerClassName: "bg-gray-400",
      width: 100,
    },
    {
      field: "dormName",
      headerName: "Dorm Name",
      headerClassName: "bg-gray-400",
      width: 150,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      headerClassName: "bg-gray-400",
      width: 150,
    },
    {
      field: "endDate",
      headerName: "End Date",
      headerClassName: "bg-gray-400",
      width: 150,
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      headerClassName: "bg-gray-400",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "bg-gray-400",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "bg-gray-400",
      flex: 1,
      renderCell: (params) => (
        <>
          {params.row.status === "pending" && (
            <>
              <Button
                variant="primary"
                className="mr-4"
                onClick={() => handleAction(params.row.id, "approve")}
              >
                Approve
              </Button>
              <Button
                variant="danger"
                onClick={() => handleAction(params.row.id, "cancel")}
              >
                Cancel
              </Button>
            </>
          )}
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="text-5xl my-10 ml-10 font-bold">Booking Management</div>
      {viewExpired ? (
        <>
          <Button variant="secondary" onClick={handleBack}>
            Back
          </Button>
          <Button variant="warning" onClick={notifyExpiringBookings} className="ml-2">
            Notify Expired Bookings
          </Button>
        </>
      ) : (
        <Button variant="secondary" onClick={fetchExpiredBookings}>
          Load Expired Bookings
        </Button>
      )}
      <Box sx={{ height: "700px", width: "100%" }}>
        <DataGrid
          rows={viewExpired ? expiredBookings : users}
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

      <Dialog
        open={confirmDialog.open}
        onClose={handleClose}
      >
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirmDialog.action === "cancel" ? (
              <>
                <p>Are you sure you want to {confirmDialog.action} this booking?</p>
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
              <p>Are you sure you want to {confirmDialog.action} this booking?</p>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MUIButton onClick={handleClose} color="primary">
            Cancel
          </MUIButton>
          <MUIButton onClick={handleConfirm} color="primary" autoFocus>
            Confirm
          </MUIButton>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </div>
  );
};

export default BookingManagement;
