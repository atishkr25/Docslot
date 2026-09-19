import mongoose from "mongoose";

const uri = "mongodb+srv://atishkumar6115_db_user:ITVjJOqiGiaSXMBB@cluster02.sgyo25w.mongodb.net/?appName=Cluster02/docslot";
mongoose.connect(uri)
  .then(() => { console.log("Connected!"); process.exit(0); })
  .catch(err => { console.error("Error:", err.message); process.exit(1); });
