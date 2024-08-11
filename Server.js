// ====================== Initialization ======================
const express = require('express');
const server = express();
const PORT = 4000;





// ====================== Start Server ======================
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
