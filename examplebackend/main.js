const express = require("express");

app = express();

app.use(express.json());

app.use("/product", (req, res) => {
  console.log(req.body);
  return res.send(req.body);
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
