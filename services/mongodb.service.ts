import mongoose, { Model, Document } from "mongoose";

const MONGO_URI = process.env.NEXT_PRIVATE_MONGO_URI!;
const MONGO_DB = process.env.NEXT_PRIVATE_MONGO_DB!;

class MongoService {
  private static instance: MongoService;
  private connection: typeof mongoose | null = null;

  private constructor() {}

  // Singleton Instance
  public static getInstance(): MongoService {
    if (!MongoService.instance) {
      MongoService.instance = new MongoService();
    }
    return MongoService.instance;
  }

  // Connect to MongoDB
  public async connect(): Promise<void> {
    if (this.connection) return;

    try {
      this.connection = await mongoose.connect(MONGO_URI, {
        dbName: MONGO_DB,
      });
      console.log("✅ Connected to MongoDB");
    } catch (error) {
      console.error("❌ MongoDB Connection Error:", error);
      process.exit(1); // Exit on failure
    }
  }

  // Generic Create Document
  public async create<T extends Document>(
    model: Model<T>,
    data: Partial<T>,
  ): Promise<T | null> {
    try {
      const newDocument = new model(data);
      return await newDocument.save();
    } catch (error) {
      console.error("❌ Error creating document:", error);
      return null;
    }
  }

  // Generic Read Document(s)
  public async find<T extends Document>(
    model: Model<T>,
    query: object = {},
  ): Promise<T[]> {
    try {
      return await model.find(query);
    } catch (error) {
      console.error("❌ Error fetching documents:", error);
      return [];
    }
  }

  // Add this inside the MongoService class
  public async findOne<T extends Document>(
    model: Model<T>,
    query: object,
  ): Promise<T | null> {
    try {
      return await model.findOne(query);
    } catch (error) {
      console.error("❌ Error fetching single document:", error);
      return null;
    }
  }

  // Generic Update Document
  public async update<T extends Document>(
    model: Model<T>,
    query: object,
    updateData: object,
  ): Promise<T | null> {
    try {
      return await model.findOneAndUpdate(query, updateData, { new: true });
    } catch (error) {
      console.error("❌ Error updating document:", error);
      return null;
    }
  }

  // Generic Delete Document
  public async delete<T extends Document>(
    model: Model<T>,
    query: object,
  ): Promise<boolean> {
    try {
      const result = await model.deleteOne(query);
      return result.deletedCount === 1;
    } catch (error) {
      console.error("❌ Error deleting document:", error);
      return false;
    }
  }
}

export default MongoService.getInstance();
