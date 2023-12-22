const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
var cors = require('cors');
const AuthRouter = require("./routes/AuthRoute");
const SkillRoute = require("./routes/SkillRoute");
const EducationRoute = require("./routes/EducationRoute");
const BlogRoute = require("./routes/BlogRoute");
const ExperienceRoute = require("./routes/ExperienceRoute");
const ProjectRoute = require("./routes/ProjectRoute");
const SkillZoneRoute = require("./routes/SkillZoneRoute");

dotenv.config();

const PORT = process.env.PORT || 4200;
const app = express();
app.use(cors())
connectDB();

app.use(express.json()); //to accept json data;

app.get('/', (req, res) => {
    res.send("Yahoo! APP is running successfully!");
});

app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/skill', SkillRoute);
app.use('/api/v1/expertise', SkillZoneRoute)
app.use('/api/v1/education', EducationRoute);
app.use('/api/v1/blog', BlogRoute);
app.use('/api/v1/experience', ExperienceRoute);
app.use('/api/v1/project', ProjectRoute);

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, console.log(`Server start on PORT ${PORT}`.yellow.bold));