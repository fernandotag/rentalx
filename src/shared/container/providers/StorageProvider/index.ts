import { container } from "tsyringe";

import { LocalStorageProvider } from "./implementations/LocalStorageProvider";
import { S3StorageProvider } from "./implementations/S3StorageProvider";
import { type IStorageProvider } from "./IStorageProvider";

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

let provider = "local";

if (process.env.STORAGE_PROVIDER != null) {
  provider = process.env.STORAGE_PROVIDER;
}

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  diskStorage[provider]
);
