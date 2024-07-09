declare module 'gridfs-stream' {
    import { Db } from 'mongodb';
    import { GridFSBucketReadStream, GridFSBucketWriteStream, GridFSBucket, GridFSBucketOptions } from 'mongodb';
  
    function createGrid(db: Db, mongo: any): Grid;
  
    interface Grid {
      files: any;
      createReadStream(options: any): GridFSBucketReadStream;
      createWriteStream(options: any): GridFSBucketWriteStream;
      remove(options: any, callback: (err: any) => void): void;
      collection(name: string): any;
    }
  
    export = createGrid;
  }
  