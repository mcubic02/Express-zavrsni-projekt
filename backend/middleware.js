export const logMiddleware = (req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`${req.method} ${req.originalUrl}`);
        console.log(`Request body: ${JSON.stringify(req.body)}`);
        console.log(`Request query parameters: ${JSON.stringify(req.query)}`);
        console.log(`Request parameters: ${JSON.stringify(req.params)}`);
    }
    next();
};

export const neispravnaPrijava = (error, req, res, next) => {
    const statusCode = res.statusCode === 401 ? "Neispravna prijava" : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '' : error.stack,
    });
    next(error)
}; 
export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

export const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? "production" : error.stack,
    });
};



