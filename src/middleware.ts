import type{Request, Response, NextFunction} from "express"

export default function middleware(req:Request, res:Response, next:NextFunction){
    const startTime = Date.now()
    next()
    const routePath = req.path;
    const method = req.method;
    
    const endTime = Date.now();
    console.log(`Response took ${endTime - startTime}ms, method=${method}, path=${routePath}`);
    
}
    