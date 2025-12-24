import fs from "fs/promises";
import path from "path";
import { config } from "./config";

// Storage Driver Interface
export interface StorageDriver {
  exists(filePath: string): Promise<boolean>;
  get(filePath: string): Promise<Buffer | null>;
  getString(filePath: string): Promise<string | null>;
  put(filePath: string, contents: Buffer | string): Promise<boolean>;
  delete(filePath: string): Promise<boolean>;
  copy(from: string, to: string): Promise<boolean>;
  move(from: string, to: string): Promise<boolean>;
  size(filePath: string): Promise<number | null>;
  lastModified(filePath: string): Promise<Date | null>;
  files(directory?: string): Promise<string[]>;
  allFiles(directory?: string): Promise<string[]>;
  directories(directory?: string): Promise<string[]>;
  allDirectories(directory?: string): Promise<string[]>;
  makeDirectory(directory: string): Promise<boolean>;
  deleteDirectory(directory: string): Promise<boolean>;
  url(filePath: string): string;
  path(filePath: string): string;
  prepend(filePath: string, data: string): Promise<boolean>;
  append(filePath: string, data: string): Promise<boolean>;
}

// Local Storage Driver
class LocalDriver implements StorageDriver {
  private root: string;
  private baseUrl?: string;
  private throwOnError: boolean;

  constructor(diskConfig: {
    root: string;
    url?: string;
    throw?: boolean;
  }) {
    this.root = diskConfig.root;
    this.baseUrl = diskConfig.url;
    this.throwOnError = diskConfig.throw ?? false;
  }

  private resolvePath(filePath: string): string {
    return path.join(this.root, filePath);
  }

  async exists(filePath: string): Promise<boolean> {
    try {
      await fs.access(this.resolvePath(filePath));
      return true;
    } catch {
      return false;
    }
  }

  async get(filePath: string): Promise<Buffer | null> {
    try {
      return await fs.readFile(this.resolvePath(filePath));
    } catch (error) {
      if (this.throwOnError) throw error;
      return null;
    }
  }

  async getString(filePath: string): Promise<string | null> {
    try {
      return await fs.readFile(this.resolvePath(filePath), "utf-8");
    } catch (error) {
      if (this.throwOnError) throw error;
      return null;
    }
  }

  async put(filePath: string, contents: Buffer | string): Promise<boolean> {
    try {
      const fullPath = this.resolvePath(filePath);
      await fs.mkdir(path.dirname(fullPath), { recursive: true });
      await fs.writeFile(fullPath, contents);
      return true;
    } catch (error) {
      if (this.throwOnError) throw error;
      return false;
    }
  }

  async delete(filePath: string): Promise<boolean> {
    try {
      await fs.unlink(this.resolvePath(filePath));
      return true;
    } catch (error) {
      if (this.throwOnError) throw error;
      return false;
    }
  }

  async copy(from: string, to: string): Promise<boolean> {
    try {
      const toPath = this.resolvePath(to);
      await fs.mkdir(path.dirname(toPath), { recursive: true });
      await fs.copyFile(this.resolvePath(from), toPath);
      return true;
    } catch (error) {
      if (this.throwOnError) throw error;
      return false;
    }
  }

  async move(from: string, to: string): Promise<boolean> {
    try {
      const toPath = this.resolvePath(to);
      await fs.mkdir(path.dirname(toPath), { recursive: true });
      await fs.rename(this.resolvePath(from), toPath);
      return true;
    } catch (error) {
      if (this.throwOnError) throw error;
      return false;
    }
  }

  async size(filePath: string): Promise<number | null> {
    try {
      const stats = await fs.stat(this.resolvePath(filePath));
      return stats.size;
    } catch (error) {
      if (this.throwOnError) throw error;
      return null;
    }
  }

  async lastModified(filePath: string): Promise<Date | null> {
    try {
      const stats = await fs.stat(this.resolvePath(filePath));
      return stats.mtime;
    } catch (error) {
      if (this.throwOnError) throw error;
      return null;
    }
  }

  async files(directory: string = ""): Promise<string[]> {
    try {
      const dirPath = this.resolvePath(directory);
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      return entries
        .filter((entry) => entry.isFile())
        .map((entry) => path.join(directory, entry.name));
    } catch (error) {
      if (this.throwOnError) throw error;
      return [];
    }
  }

  async allFiles(directory: string = ""): Promise<string[]> {
    try {
      const results: string[] = [];
      const dirPath = this.resolvePath(directory);
      const entries = await fs.readdir(dirPath, { withFileTypes: true });

      for (const entry of entries) {
        const relativePath = path.join(directory, entry.name);
        if (entry.isFile()) {
          results.push(relativePath);
        } else if (entry.isDirectory()) {
          const subFiles = await this.allFiles(relativePath);
          results.push(...subFiles);
        }
      }

      return results;
    } catch (error) {
      if (this.throwOnError) throw error;
      return [];
    }
  }

  async directories(directory: string = ""): Promise<string[]> {
    try {
      const dirPath = this.resolvePath(directory);
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      return entries
        .filter((entry) => entry.isDirectory())
        .map((entry) => path.join(directory, entry.name));
    } catch (error) {
      if (this.throwOnError) throw error;
      return [];
    }
  }

  async allDirectories(directory: string = ""): Promise<string[]> {
    try {
      const results: string[] = [];
      const dirPath = this.resolvePath(directory);
      const entries = await fs.readdir(dirPath, { withFileTypes: true });

      for (const entry of entries) {
        if (entry.isDirectory()) {
          const relativePath = path.join(directory, entry.name);
          results.push(relativePath);
          const subDirs = await this.allDirectories(relativePath);
          results.push(...subDirs);
        }
      }

      return results;
    } catch (error) {
      if (this.throwOnError) throw error;
      return [];
    }
  }

  async makeDirectory(directory: string): Promise<boolean> {
    try {
      await fs.mkdir(this.resolvePath(directory), { recursive: true });
      return true;
    } catch (error) {
      if (this.throwOnError) throw error;
      return false;
    }
  }

  async deleteDirectory(directory: string): Promise<boolean> {
    try {
      await fs.rm(this.resolvePath(directory), { recursive: true, force: true });
      return true;
    } catch (error) {
      if (this.throwOnError) throw error;
      return false;
    }
  }

  url(filePath: string): string {
    if (this.baseUrl) {
      return `${this.baseUrl}/${filePath}`;
    }
    return this.resolvePath(filePath);
  }

  path(filePath: string): string {
    return this.resolvePath(filePath);
  }

  async prepend(filePath: string, data: string): Promise<boolean> {
    try {
      const existing = await this.getString(filePath);
      return this.put(filePath, data + (existing ?? ""));
    } catch (error) {
      if (this.throwOnError) throw error;
      return false;
    }
  }

  async append(filePath: string, data: string): Promise<boolean> {
    try {
      await fs.appendFile(this.resolvePath(filePath), data);
      return true;
    } catch (error) {
      if (this.throwOnError) throw error;
      return false;
    }
  }
}

// S3 Storage Driver
class S3Driver implements StorageDriver {
  private client: any;
  private bucket: string;
  private region: string;
  private endpoint?: string;
  private baseUrl?: string;
  private usePathStyleEndpoint: boolean;
  private throwOnError: boolean;
  private initialized: boolean = false;

  constructor(diskConfig: {
    key: string;
    secret: string;
    region: string;
    bucket: string;
    url?: string;
    endpoint?: string;
    use_path_style_endpoint?: boolean;
    throw?: boolean;
  }) {
    this.bucket = diskConfig.bucket;
    this.region = diskConfig.region;
    this.endpoint = diskConfig.endpoint;
    this.baseUrl = diskConfig.url;
    this.usePathStyleEndpoint = diskConfig.use_path_style_endpoint ?? false;
    this.throwOnError = diskConfig.throw ?? false;
  }

  private async ensureClient() {
    if (this.initialized) return;

    try {
      const { S3Client } = await import("@aws-sdk/client-s3");
      const s3Config = config.filesystems.disks.s3;

      this.client = new S3Client({
        region: this.region,
        endpoint: this.endpoint,
        forcePathStyle: this.usePathStyleEndpoint,
        credentials: {
          accessKeyId: s3Config.key,
          secretAccessKey: s3Config.secret,
        },
      });
      this.initialized = true;
    } catch (error) {
      console.error("Failed to initialize S3 client:", error);
      throw new Error(
        "S3 client not available. Please install @aws-sdk/client-s3",
      );
    }
  }

  async exists(filePath: string): Promise<boolean> {
    await this.ensureClient();
    try {
      const { HeadObjectCommand } = await import("@aws-sdk/client-s3");
      await this.client.send(
        new HeadObjectCommand({
          Bucket: this.bucket,
          Key: filePath,
        }),
      );
      return true;
    } catch (error: any) {
      if (error.name === "NotFound") return false;
      if (this.throwOnError) throw error;
      return false;
    }
  }

  async get(filePath: string): Promise<Buffer | null> {
    await this.ensureClient();
    try {
      const { GetObjectCommand } = await import("@aws-sdk/client-s3");
      const response = await this.client.send(
        new GetObjectCommand({
          Bucket: this.bucket,
          Key: filePath,
        }),
      );
      const chunks: Uint8Array[] = [];
      for await (const chunk of response.Body) {
        chunks.push(chunk);
      }
      return Buffer.concat(chunks);
    } catch (error) {
      if (this.throwOnError) throw error;
      return null;
    }
  }

  async getString(filePath: string): Promise<string | null> {
    const buffer = await this.get(filePath);
    return buffer ? buffer.toString("utf-8") : null;
  }

  async put(filePath: string, contents: Buffer | string): Promise<boolean> {
    await this.ensureClient();
    try {
      const { PutObjectCommand } = await import("@aws-sdk/client-s3");
      await this.client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: filePath,
          Body: contents,
        }),
      );
      return true;
    } catch (error) {
      if (this.throwOnError) throw error;
      return false;
    }
  }

  async delete(filePath: string): Promise<boolean> {
    await this.ensureClient();
    try {
      const { DeleteObjectCommand } = await import("@aws-sdk/client-s3");
      await this.client.send(
        new DeleteObjectCommand({
          Bucket: this.bucket,
          Key: filePath,
        }),
      );
      return true;
    } catch (error) {
      if (this.throwOnError) throw error;
      return false;
    }
  }

  async copy(from: string, to: string): Promise<boolean> {
    await this.ensureClient();
    try {
      const { CopyObjectCommand } = await import("@aws-sdk/client-s3");
      await this.client.send(
        new CopyObjectCommand({
          Bucket: this.bucket,
          CopySource: `${this.bucket}/${from}`,
          Key: to,
        }),
      );
      return true;
    } catch (error) {
      if (this.throwOnError) throw error;
      return false;
    }
  }

  async move(from: string, to: string): Promise<boolean> {
    const copied = await this.copy(from, to);
    if (!copied) return false;
    return this.delete(from);
  }

  async size(filePath: string): Promise<number | null> {
    await this.ensureClient();
    try {
      const { HeadObjectCommand } = await import("@aws-sdk/client-s3");
      const response = await this.client.send(
        new HeadObjectCommand({
          Bucket: this.bucket,
          Key: filePath,
        }),
      );
      return response.ContentLength ?? null;
    } catch (error) {
      if (this.throwOnError) throw error;
      return null;
    }
  }

  async lastModified(filePath: string): Promise<Date | null> {
    await this.ensureClient();
    try {
      const { HeadObjectCommand } = await import("@aws-sdk/client-s3");
      const response = await this.client.send(
        new HeadObjectCommand({
          Bucket: this.bucket,
          Key: filePath,
        }),
      );
      return response.LastModified ?? null;
    } catch (error) {
      if (this.throwOnError) throw error;
      return null;
    }
  }

  async files(directory: string = ""): Promise<string[]> {
    await this.ensureClient();
    try {
      const { ListObjectsV2Command } = await import("@aws-sdk/client-s3");
      const prefix = directory ? `${directory}/` : "";
      const response = await this.client.send(
        new ListObjectsV2Command({
          Bucket: this.bucket,
          Prefix: prefix,
          Delimiter: "/",
        }),
      );

      return (response.Contents ?? [])
        .map((obj: any) => obj.Key)
        .filter((key: string) => key !== prefix);
    } catch (error) {
      if (this.throwOnError) throw error;
      return [];
    }
  }

  async allFiles(directory: string = ""): Promise<string[]> {
    await this.ensureClient();
    try {
      const { ListObjectsV2Command } = await import("@aws-sdk/client-s3");
      const prefix = directory ? `${directory}/` : "";
      const results: string[] = [];
      let continuationToken: string | undefined;

      do {
        const response: any = await this.client.send(
          new ListObjectsV2Command({
            Bucket: this.bucket,
            Prefix: prefix,
            ContinuationToken: continuationToken,
          }),
        );

        const files = (response.Contents ?? [])
          .map((obj: any) => obj.Key)
          .filter((key: string) => !key.endsWith("/"));
        results.push(...files);

        continuationToken = response.NextContinuationToken;
      } while (continuationToken);

      return results;
    } catch (error) {
      if (this.throwOnError) throw error;
      return [];
    }
  }

  async directories(directory: string = ""): Promise<string[]> {
    await this.ensureClient();
    try {
      const { ListObjectsV2Command } = await import("@aws-sdk/client-s3");
      const prefix = directory ? `${directory}/` : "";
      const response = await this.client.send(
        new ListObjectsV2Command({
          Bucket: this.bucket,
          Prefix: prefix,
          Delimiter: "/",
        }),
      );

      return (response.CommonPrefixes ?? []).map((p: any) =>
        p.Prefix.replace(/\/$/, ""),
      );
    } catch (error) {
      if (this.throwOnError) throw error;
      return [];
    }
  }

  async allDirectories(directory: string = ""): Promise<string[]> {
    const files = await this.allFiles(directory);
    const dirs = new Set<string>();

    for (const file of files) {
      const parts = file.split("/");
      let current = "";
      for (let i = 0; i < parts.length - 1; i++) {
        current = current ? `${current}/${parts[i]}` : parts[i];
        if (!directory || current.startsWith(directory)) {
          dirs.add(current);
        }
      }
    }

    return Array.from(dirs);
  }

  async makeDirectory(_directory: string): Promise<boolean> {
    // S3 doesn't have real directories, they're virtual based on key prefixes
    return true;
  }

  async deleteDirectory(directory: string): Promise<boolean> {
    await this.ensureClient();
    try {
      const files = await this.allFiles(directory);
      for (const file of files) {
        await this.delete(file);
      }
      return true;
    } catch (error) {
      if (this.throwOnError) throw error;
      return false;
    }
  }

  url(filePath: string): string {
    if (this.baseUrl) {
      return `${this.baseUrl}/${filePath}`;
    }
    if (this.endpoint) {
      return `${this.endpoint}/${this.bucket}/${filePath}`;
    }
    return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${filePath}`;
  }

  path(filePath: string): string {
    return filePath;
  }

  async prepend(filePath: string, data: string): Promise<boolean> {
    const existing = await this.getString(filePath);
    return this.put(filePath, data + (existing ?? ""));
  }

  async append(filePath: string, data: string): Promise<boolean> {
    const existing = await this.getString(filePath);
    return this.put(filePath, (existing ?? "") + data);
  }
}

// Storage Manager
class StorageManager {
  private drivers: Map<string, StorageDriver> = new Map();
  private defaultDisk: string;

  constructor() {
    this.defaultDisk = config.filesystems.default;
  }

  private createDriver(name: string): StorageDriver {
    const disks = config.filesystems.disks as Record<string, any>;
    const diskConfig = disks[name];

    if (!diskConfig) {
      throw new Error(`Disk [${name}] is not configured.`);
    }

    switch (diskConfig.driver) {
      case "local":
        return new LocalDriver(diskConfig);
      case "s3":
        return new S3Driver(diskConfig);
      default:
        throw new Error(`Driver [${diskConfig.driver}] is not supported.`);
    }
  }

  disk(name?: string): StorageDriver {
    const diskName = name ?? this.defaultDisk;

    if (!this.drivers.has(diskName)) {
      this.drivers.set(diskName, this.createDriver(diskName));
    }

    return this.drivers.get(diskName)!;
  }

  // Proxy methods to default disk
  async exists(filePath: string): Promise<boolean> {
    return this.disk().exists(filePath);
  }

  async get(filePath: string): Promise<Buffer | null> {
    return this.disk().get(filePath);
  }

  async getString(filePath: string): Promise<string | null> {
    return this.disk().getString(filePath);
  }

  async put(filePath: string, contents: Buffer | string): Promise<boolean> {
    return this.disk().put(filePath, contents);
  }

  async delete(filePath: string): Promise<boolean> {
    return this.disk().delete(filePath);
  }

  async copy(from: string, to: string): Promise<boolean> {
    return this.disk().copy(from, to);
  }

  async move(from: string, to: string): Promise<boolean> {
    return this.disk().move(from, to);
  }

  async size(filePath: string): Promise<number | null> {
    return this.disk().size(filePath);
  }

  async lastModified(filePath: string): Promise<Date | null> {
    return this.disk().lastModified(filePath);
  }

  async files(directory?: string): Promise<string[]> {
    return this.disk().files(directory);
  }

  async allFiles(directory?: string): Promise<string[]> {
    return this.disk().allFiles(directory);
  }

  async directories(directory?: string): Promise<string[]> {
    return this.disk().directories(directory);
  }

  async allDirectories(directory?: string): Promise<string[]> {
    return this.disk().allDirectories(directory);
  }

  async makeDirectory(directory: string): Promise<boolean> {
    return this.disk().makeDirectory(directory);
  }

  async deleteDirectory(directory: string): Promise<boolean> {
    return this.disk().deleteDirectory(directory);
  }

  url(filePath: string): string {
    return this.disk().url(filePath);
  }

  path(filePath: string): string {
    return this.disk().path(filePath);
  }

  async prepend(filePath: string, data: string): Promise<boolean> {
    return this.disk().prepend(filePath, data);
  }

  async append(filePath: string, data: string): Promise<boolean> {
    return this.disk().append(filePath, data);
  }

  // Utility methods
  async json<T = any>(filePath: string): Promise<T | null> {
    const content = await this.getString(filePath);
    if (!content) return null;
    try {
      return JSON.parse(content) as T;
    } catch {
      return null;
    }
  }

  async putJson(filePath: string, data: any): Promise<boolean> {
    return this.put(filePath, JSON.stringify(data, null, 2));
  }

  async missing(filePath: string): Promise<boolean> {
    return !(await this.exists(filePath));
  }
}

// Singleton instance
const storageManager = new StorageManager();

// Export facade-style object
export const Storage = {
  disk: (name?: string) => storageManager.disk(name),

  // File operations
  exists: (filePath: string) => storageManager.exists(filePath),
  missing: (filePath: string) => storageManager.missing(filePath),
  get: (filePath: string) => storageManager.get(filePath),
  getString: (filePath: string) => storageManager.getString(filePath),
  json: <T = any>(filePath: string) => storageManager.json<T>(filePath),
  put: (filePath: string, contents: Buffer | string) =>
    storageManager.put(filePath, contents),
  putJson: (filePath: string, data: any) => storageManager.putJson(filePath, data),
  delete: (filePath: string) => storageManager.delete(filePath),
  copy: (from: string, to: string) => storageManager.copy(from, to),
  move: (from: string, to: string) => storageManager.move(from, to),
  prepend: (filePath: string, data: string) => storageManager.prepend(filePath, data),
  append: (filePath: string, data: string) => storageManager.append(filePath, data),

  // File info
  size: (filePath: string) => storageManager.size(filePath),
  lastModified: (filePath: string) => storageManager.lastModified(filePath),
  url: (filePath: string) => storageManager.url(filePath),
  path: (filePath: string) => storageManager.path(filePath),

  // Directory operations
  files: (directory?: string) => storageManager.files(directory),
  allFiles: (directory?: string) => storageManager.allFiles(directory),
  directories: (directory?: string) => storageManager.directories(directory),
  allDirectories: (directory?: string) => storageManager.allDirectories(directory),
  makeDirectory: (directory: string) => storageManager.makeDirectory(directory),
  deleteDirectory: (directory: string) => storageManager.deleteDirectory(directory),
};

export default Storage;
