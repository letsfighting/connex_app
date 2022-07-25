import axios from "axios";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#242F36", // charcoal grey complement
    },
  },
});

export default function CreditCardAuth() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const cardnumber = data.get("cardnumber");
    const csv = data.get("csv");
    const phonenumber = data.get("phonenumber");
    const expirydata = data.get("expirydata");
    const authKey = "A123JDKn12l123@11saazdeop102";
    axios
      .post(
        "https://us-west2-connexinterview.cloudfunctions.net/cardactivation",
        {
          cardnumber: cardnumber,
          csv: csv,
          expirydate: expirydata,
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
        console.log(res);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid p={10}>
            <img
              src="https://cdn.discordapp.com/attachments/856696248111595541/978644697213980722/logo.png"
              alt="Charcuterie"
            />
          </Grid>

          <Typography variant="h5">Let's activate your credit card!</Typography>
          <Typography variant="p">
            To get started, please enter your 16 digit credit card number, CSV,
            Expiry Date, and associated Phone Number
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
  );
}
