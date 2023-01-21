// Dotenv
require('dotenv').config();
const config = require("./config"),
    minifyHTML = require('express-minify-html-terser'),
    rateLimit = require('express-rate-limit'),
    cookieParser = require("cookie-parser"),
    csrf = require("csurf"),
    Sentry = require("@sentry/node"),
    Tracing = require("@sentry/tracing"),
    passport = require("passport"),
    flash = require('connect-flash'),
    favicon = require('serve-favicon'),
    { logger } = require('./utils'),
    BaseError = require('./helpers/baseError'),
    Strategy = require("passport-discord").Strategy,
    // bodyParser = require("body-parser"),
    { checkAuth, discordAPI: { getMe }, var: { sendWebhook } } = require("./helpers");

/* Init express app */
const http = require("http"),
    express = require("express"),
    socketio = require("socket.io"),
    session = require("express-session"),
    MemoryStore = require("memorystore")(session),
    path = require("path"),
    // create a new express app
    app = express(),
    // create http server and wrap the express app
    server = http.createServer(app),
    // bind socket.io to that server
    io = socketio(server);

/* Set up rate limiter: maximum of five requests per minute */
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100,
    message: "Too many requests, please wait 1 minute.",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// apply rate limiter to all requests
// app.use(limiter); LIMITAR A ROTAS ESPECIFICAS.

// connect to database
require('./database/mongoose').init();

/* Routers */
const homepage = require("./routes/index"),
    commands = require("./routes/commands"),
    contact = require("./routes/contact"),
    terms = require("./routes/terms-of-service"),
    cookies = require("./routes/cookie-policy"),
    privacy = require("./routes/privacy-policy"),
    dataremoval = require("./routes/data-removal"),
    apply = require("./routes/apply"),
    applymain = require("./routes/applymain"),
    vanityurl = require("./routes/vanityurl"),
    api = require("./routes/api"),
    helpercenter = require("./routes/helper-center"),
    blog = require("./routes/blog"),
    posts = require("./routes/_post"),
    premium = require("./routes/premium"),
    maintenance = require("./routes/maintenance"),
    shorturl = require("./routes/shorturl"),
    transcript = require("./routes/transcript"),
    publicservers = require("./routes/public-servers"),
    serverpage = require("./routes/_server-page"),
    adminlogin = require("./routes/admin/login"),
    adminhome = require("./routes/admin/home"),
    adminblogpost = require("./routes/admin/blog-post"),
    navbar = require("./routes/dashboard/_navbar"),
    /* ------------------------------------------------------------------------------------------------
    *                                       Login & Callback
    * ------------------------------------------------------------------------------------------------ */
    discordAPIRouter = require("./routes/discord"),
    // Page: Logout
    logout = require("./routes/logout"),
    /* ------------------------------------------------------------------------------------------------
    *                                       Server Listing
    * ------------------------------------------------------------------------------------------------ */
    dashboard = require("./routes/dashboard"),
    /* ------------------------------------------------------------------------------------------------
    *                                       Dashboard
    * ------------------------------------------------------------------------------------------------ */
    // Page: Homepage
    dbhome = require("./routes/dashboard/db-home"),
    /* ------------------------------------------------------------------------------------------------
    *                                       Settings
    * ------------------------------------------------------------------------------------------------ */
    dbbot = require("./routes/dashboard/Settings/db-bot"),
    // Page: Guild
    dbguild = require("./routes/dashboard/Settings/db-guild"),
    // Page: User
    dbuser = require("./routes/dashboard/Settings/db-user"),
    /* ------------------------------------------------------------------------------------------------
    *                                      Leaderboard
    * ------------------------------------------------------------------------------------------------ */
    dbleaderboard = require("./routes/dashboard/db-leaderboard"),
    /* ------------------------------------------------------------------------------------------------
    *                                    Engagement & Fun
    * ------------------------------------------------------------------------------------------------ */
    // Page: Auto-Animes
    dbautoanimes = require("./routes/dashboard/Engagement & Fun/db-autoanimes"),
    // Page: Auto-Birthdays
    dbautobirthdays = require("./routes/dashboard/Engagement & Fun/db-autobirthdays"),
    // Page: Auto-Covid
    dbautocovid = require("./routes/dashboard/Engagement & Fun/db-autocovid"),
    // Page: Auto-Twitch
    dbautotwitch = require("./routes/dashboard/Engagement & Fun/db-autotwitch"),
    // Page: Auto-Youtube
    dbautoyoutube = require("./routes/dashboard/Engagement & Fun/db-autoyoutube"),
    /* ------------------------------------------------------------------------------------------------
    *                                  Server management
    * ------------------------------------------------------------------------------------------------ */
    // Page: Welcome
    dbwelcome = require("./routes/dashboard/Server Management/db-welcome"),
    // Page: Reaction-Roles
    dbreactionroles = require('./routes/dashboard/Server Management/db-reactionroles'),
    // Page: Auto-Role
    dbautorole = require('./routes/dashboard/Server Management/db-autorole'),
    // Page: Tickets
    dbticket = require('./routes/dashboard/Server Management/db-ticket'),
    // Page: Giveaways
    dbgiveaway = require('./routes/dashboard/Server Management/db-giveaway'),
    // Page: Logging
    dblogging = require('./routes/dashboard/Server Management/db-logging'),
    /* ------------------------------------------------------------------------------------------------
    *                                     Moderation
    * ------------------------------------------------------------------------------------------------ */
    // Page: Auto-Mod
    dbautomod = require('./routes/dashboard/Moderation/db-automod'),
    // Page: Auto-Response
    dbautoresponse = require('./routes/dashboard/Moderation/db-autoresponse'),
    // Page: Auto-Nick
    dbautonick = require('./routes/dashboard/Moderation/db-autonick'),
    // Page: Verification
    dbverification = require('./routes/dashboard/Moderation/db-verification'),
    /* ------------------------------------------------------------------------------------------------
    *                                    Utilities
    * ------------------------------------------------------------------------------------------------ */
    dbautomessage = require("./routes/dashboard/Utilities/db-automessage"),
    // Page: Sticky-Message
    dbsticky = require("./routes/dashboard/Utilities/db-stickymsg"),
    // Page: Reputation
    dbreputation = require("./routes/dashboard/Utilities/db-reputation"),
    // Page: Apllications
    dbapplications = require("./routes/dashboard/Utilities/db-applications"),
    // Page: Embeds
    dbembeds = require("./routes/dashboard/Utilities/db-embeds");

/* Passport Set up */
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Auth
passport.use(new Strategy({
    clientID: config.client_id,
    clientSecret: config.secret,
    callbackURL: `${config.baseURL}/callback`,
    scope: ["identify", "guilds"]
},
    (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => done(null, profile));
    }));

/* Sentry Errors Analitycs */
Sentry.init({
    dsn: "https://9ad5ba2cda0a46cbb90923c582fb4a6e@o1129635.ingest.sentry.io/6173556",
    integrations: [new Sentry.Integrations.Http({ tracing: true }), new Tracing.Integrations.Express({ app })],
    tracesSampleRate: 1.0,
});

/* Socket.io */
const onlineClients = new Set();

function onNewWebsocketConnection(socket) {
    logger.log(`Socket ${socket.id} has connected.`);
    onlineClients.add(socket.id);

    socket.on("disconnect", () => {
        onlineClients.delete(socket.id);
        logger.log(`Socket ${socket.id} has disconnected.`);
    });

    // echoes on the terminal every "hello" message this socket sends
    // socket.on("hello", helloMsg => console.info(`Socket ${socket.id} says: "${helloMsg}"`));

    // will send a message only to this socket (different than using `io.emit()`, which would broadcast it)
    // socket.emit("welcome", `Welcome! You are visitor number ${nextVisitorNumber++}`);
}

/* App configuration */
app
    // Set the express session password and configuration
    .use(session({
        cookie: { maxAge: 7200000 },
        store: new MemoryStore({
            checkPeriod: 7200000 // prune expired entries every 24h
        }),
        resave: false,
        secret: `${process.env.AUTH_SECRET_1}${Date.now()}${process.env.AUTH_SECRET_2}${Date.now()}${process.env.AUTH_SECRET_3}`,
        saveUninitialized: false,
    }))
    .use(minifyHTML({
        override: true,
        exception_url: false,
        htmlMinifier: {
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true,
            minifyJS: true
        }
    }))
    // For post methods
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    // Set the engine to html (for ejs template)
    .engine("html", require("ejs").renderFile)
    .set("view engine", "ejs")
    // Set the css and js folder to ./static
    .use(express.static(path.join(__dirname, "/static")))
    // Set favicon.ico for reduction memory in calling http
    .use(favicon('./static/assets/images/favicon.ico'))
    // Set the ejs templates to ./views
    .set("views", path.join(__dirname, "/views"))
    // Set the dashboard port
    .set("port", config.port)
    // Set Passport Init
    .use(passport.initialize())
    // Passport Session
    .use(passport.session())
    // Sentry Handlers
    .use(Sentry.Handlers.requestHandler())
    .use(Sentry.Handlers.tracingHandler())
    // Init Sentry
    .use(Sentry.Handlers.errorHandler())
    // Security Cookie #1
    .use(cookieParser())
    /*.use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }))*/
    .use(flash())
    // Security Cookie #2
    // .use(csrf({ cookie: true }))
    // Multi languages support
    .use(async function (req, res, next) {
        req.user = req.session.user;
        req.client.knownGuilds = [];
        req.client_avatar = '0b216cbe24f1dde9e901d95c1f59c5ad';
        req.client_id = config.client_id;
        req.hostname = config.baseURL;
        req.locale = req.user ? (req.user.locale === "pt" ? "pt-BR" : "en-US") : "en-US";
        // res.setHeader("Content-Type", "text/html; charset=utf-8");
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Authorization,X-Lang');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
        if (req.originalUrl !== '/favicon.ico') logger.connection(req, res);
        next();
    })
    .use("/", logout)
    .use("/", dashboard)
    .use("/", discordAPIRouter)
    .use("/", dbhome)
    .use("/", dbbot)
    .use("/", dbguild)
    .use("/", dbuser)
    .use("/", dbleaderboard)
    .use("/", dbautoanimes)
    .use("/", dbautobirthdays)
    .use("/", dbautocovid)
    .use("/", dbautotwitch)
    .use("/", dbautoyoutube)
    .use("/", dbwelcome)
    .use("/", dbreactionroles)
    .use("/", dbautorole)
    .use("/", dbticket)
    .use("/", dbgiveaway)
    .use("/", dblogging)
    .use("/", dbautomod)
    .use("/", dbautoresponse)
    .use("/", dbautonick)
    .use("/", dbverification)
    .use("/", dbautomessage)
    .use("/", dbsticky)
    .use("/", dbreputation)
    .use("/", dbapplications)
    .use("/", dbembeds)
    .use("/commands", commands)
    .use("/contact", contact)
    .use("/terms-of-service", terms)
    .use("/", homepage)
    .use("/privacy-policy", privacy)
    .use("/cookie-policy", cookies)
    .use("/data-removal", dataremoval)
    .use("/helper-center", helpercenter)
    .use("/blog", blog)
    .use("/blog", posts)
    .use("/premium", premium)
    .use("/maintenance", maintenance)
    .use("/apply", apply)
    .use("/apply", applymain)
    .use("/", vanityurl)
    .use("/", api)
    .use("/", shorturl)
    .use("/", transcript)
    .use("/public-servers", publicservers)
    .use("/public-servers", serverpage)
    .use("/admin", adminlogin)
    .use("/admin", adminhome)
    .use("/admin", adminblogpost)
    .use("/", navbar)
    // Redirects endpoints
    .get("/status", (req, res) => {
        res.redirect(`https://stats.uptimerobot.com/WKRD0S6zWM`)
    })
    .get("/support", (req, res) => {
        res.redirect(`https://discord.com/invite/eXnZRSBRC8`)
    })
    .get("/vote", (req, res) => {
        res.redirect(`https://top.gg/bot/901243176814276680`)
    })
    .get("/server", (req, res) => {
        res.redirect(`https://discord.com/invite/eXnZRSBRC8`)
    })
    .get('/invite', function (req, res) {
        res.redirect(`https://discord.com/api/oauth2/authorize?client_id=901243176814276680&permissions=1644971949559&scope=applications.commands%20bot`)
    })
    .get('/blog/author/:userID', function (req, res) {
        let wl = ['622812963572809771'];
        if (!wl.includes(req.params.userID)) return res.status(404).render("404", {});
        res.redirect(`discord://-/users/${req.params.userID}`)
    })
    .get('/undefined', function (req, res) {
        res.redirect(`/dashboard`)
    })
    .get("/transcript", (req, res) => {
        res.send(`Working`)
    })
    .get("/403", (req, res, next) => {
        res.status(403).render("403", {
            alert: null,
        });
    })
    .use(function (req, res) {
        res.status(404).render("404", {
            user: req.userInfos,
            translate: req.translate,
            currentURL: `${req.protocol}://${req.get("host")}${req.originalUrl}`
        });
    })
    .use(async (err, req, res, next) => {
        console.error(err.stack)
        const embed = {
            color: 9442302,
            title: 'Uh-oh! An error was found',
            url: '',
            author: {
                name: '',
                icon_url: '',
                url: '',
            },
            description: `${err.name} [\`unhandledRejection\`] was found on my system!\n\`\`\`xl\n${err.stack.split('\n').splice(0, 5).join('\n').split(process.cwd()).join('MAIN_PROCESS')}\n.....\n\`\`\``,
            thumbnail: {
                url: '',
            },
            image: {
                url: '',
            },
            timestamp: '',
            footer: {
                text: '',
                icon_url: '',
            },
        };

        let datamsg = {
            "content": null,
            "tts": false,
            "embeds": [embed],
        };

        await sendWebhook('hookID', 'hookTOKEN', datamsg, process.env.TOKEN);

        res.status(500).render("error", {
            currentURL: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
        });
    })
    .use(checkAuth, function (err, req, res) {
        logger.log(err.stack);
        if (!req.user) return res.redirect("/");
        res.status(500).render("500", {
            user: req.userInfos,
            translate: req.translate,
            currentURL: `${req.protocol}://${req.get("host")}${req.originalUrl}`
        });
    });

// will fire for every new websocket connection
io.on("connection", onNewWebsocketConnection);

// will send one message per second to all its clients
let secondsSinceServerStarted = 0;
setInterval(() => {
    secondsSinceServerStarted++;
    io.emit("seconds", secondsSinceServerStarted);
    io.emit("online", onlineClients.size);
    // Basic Ping for connection test
    const start = Date.now();
    io.emit("ping", () => {
        const end = new Date();
        logger.log(`${end.toTimeString().split(' ')[0]} [EVENT]: ping	-	${end - start}ms`);
    })
    io.emit("memory", () => { process.memoryUsage().rss / 512 / 512 });
}, 1000);

io.on("hello", (arg, callback) => {
    console.log(arg); // "world"
    callback("got it");
});

// Listen (important! must listen from `server`, not `app`, otherwise socket.io won't function correctly)
server.listen(app.get("port"), () => {
    logger.log("Hope Web & Dashboard is listening on port " + app.get("port"));
    logger.log(process.memoryUsage().rss / 512 / 512)
}).on('error', (err) => {
    logger.error(`Error with starting: ${err.message}`);
});

/**
* Error Handler
*/
process.on('unhandledRejection', error => {
    logger.warn(`[UNHANDLED REJECTION] - [API ERRORS]`);
    return logger.error(`${error.name} [\`unhandledRejection\`] foi encontrado em meu sistema!\n\`\`\`xl\n
	${error.stack.split('\n').splice(0, 5).join('\n').split(process.cwd()).join('MAIN_PROCESS')}\n.....\n\`\`\``)
});
process.on('uncaughtException', error => {
    logger.warn(`[UNHANDLED EXCEPTION]`);
    return logger.error(`${error.name} [\`uncaughtException\`] foi encontrado em meu sistema!\n\`\`\`xl\n
	${error.stack.split('\n').splice(0, 5).join('\n').split(process.cwd()).join('MAIN_PROCESS')}\n.....\n\`\`\``)
});
process.on('uncaughtExceptionMonitor', error => {
    logger.warn(`[UNHANDLED EXCEPTION]`);
    return logger.error(`${error.name} [\`uncaughtExceptionMonitor\`] foi encontrado em meu sistema!\n\`\`\`xl\n
	${error.stack.split('\n').splice(0, 5).join('\n').split(process.cwd()).join('MAIN_PROCESS')}\n.....\n\`\`\``)
});
process.on('warning', (warning) => { return logger.warn(`[WARNING]: ${warning}`); });