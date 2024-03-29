import { Request, Response } from 'express';
import {APILogger} from "../logger/api.logger";
import { v4 as uuidv4 } from 'uuid';
import path from "path";
import fs from "fs";

export abstract class MainController {

    public logger;
    public env;
    public path;
    public fs;

    constructor() {
        this.logger = new APILogger();
        this.env = process.env;
        this.path = path;
        this.fs = fs;
    }

    public abstract validate(data: any, res: Response, type: string): void;
    public abstract create(req: Request, res: Response): void;
    public abstract read(req: Request, res: Response): void;
    public abstract update(req: Request, res: Response): void;
    public abstract delete(req: Request, res: Response): void;

    public async upload(dir, file) {
        let sampleFile;
        let uploadPath;

        if (!file || Object.keys(file).length === 0) {
            return { error : 'No files were uploaded.' };
        }

        sampleFile = file;
        let fileName = uuidv4();
        let fileType = sampleFile.name.split('.')[1]
        uploadPath = `${dir}/${fileName +'.'+ fileType}`;

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true})
        }

        // Use the mv() method to place the file somewhere on your server
        return await sampleFile.mv(uploadPath);
    }
}
