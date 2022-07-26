import axios from "axios";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import * as React from "react";

import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#242F36", // charcoal grey complement
    },
  },
});

export default function CreditCardAuth() {
  const [success, setSuccess] = React.useState(false);
  const [datafail, setDatafail] = React.useState(false);
  const [authfail, setAuthfail] = React.useState(false);

  const [invalid, setInvalid] = React.useState(false);

  const successOpen = () => setSuccess(true);
  const successClose = () => {
    setSuccess(false);
    window.location.reload();
  };

  const datafailOpen = () => setDatafail(true);
  const datafailClose = () => setDatafail(false);
  const authfailOpen = () => setAuthfail(true);
  const authfailClose = () => setAuthfail(false);
  const invalidOpen = () => setInvalid(true);
  const invalidClose = () => setInvalid(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const cardnumber = data.get("cardnumber");
    const csv = data.get("csv");
    const phonenumber = data.get("phonenumber");
    const expirydata = data.get("expirydata");
    const authKey = "123JDKn12l123@11saazdeop102";

    axios
      .post(
        "/cardactivation",
        {
          cardnumber: cardnumber,
          csv: csv,
          expirydata: expirydata,
          phonenumber: phonenumber,
        },
        {
          headers: {
            Authkey: authKey,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("data: ", res.data);
        console.log("status: ", res.status);
        console.log("res: ", res);
        if (res.status === 200) {
          alert("Card Activated Successfully");
          successOpen();
        }
      })
      .catch((err) => {
        console.log("err: ", err.request.status);
        if (err.request.status === 400) {
          datafailOpen();
        } else if (err.request.status === 401) {
          authfailOpen();
        } else {
          alert(
            "Card Activation Failed - Error Code: ",
            err.request.status,
            ". Please contact an administrator."
          );
        }
      });
  };

  return (
    <div>
      <Modal
        open={success}
        onClose={successClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Card Activated!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You card has been activated successfully! Please close this window
            to refresh the page.
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={datafail}
        onClose={datafailClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Authentication Failed
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            We were unable to activate your card. Please check that the
            information was entered correctly.
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={authfail}
        onClose={authfailClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Error
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            We were unable to complete your request. Please confirm that an
            appropriate authentication key has been provided.
          </Typography>
        </Box>
      </Modal>

      <ThemeProvider theme={theme}>
        <Box
          component="img"
          sx={{
            width: "100%",
          }}
          alt="banner.jpg"
          src="https://cdn.discordapp.com/attachments/294982585027788812/1001274297672798228/unknown.png"
        />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">
              Let's activate your credit card!
            </Typography>
            <Typography variant="p">
              To get started, please enter your 16 digit credit card number,
              CSV, Expiry Date, and associated Phone Number
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="cardnumber"
                label="16 Digit Credit Card Number"
                name="cardnumber"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="csv"
                label="CSV"
                type="csv"
                id="csv"
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="expirydata"
                label="Expiry Date (MMYY)"
                type="expirydata"
                id="expirydata"
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="phonenumber"
                label="Phone Number"
                type="phonenumber"
                id="phonenumber"
              />

              <Button
                type="submit"
                color="primary"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
