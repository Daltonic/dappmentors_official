import { connectToDatabase } from "@/lib/mongodb";
import { verifyAccessToken } from "@/lib/jwt";
import { Product, Service } from "@/utils/interfaces";
import { Collection, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// Define interfaces for MongoDB documents
interface ProductDocument extends Omit<Product, "id"> {
  _id: ObjectId;
  createdBy: string;
  slug: string;
}

interface ServiceDocument extends Omit<Service, "id"> {
  _id: ObjectId;
  createdBy: string;
  slug: string;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Verify authentication
    const accessToken = request.cookies.get("access-token")?.value;
    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyAccessToken(accessToken);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const db = await connectToDatabase();
    const usersCollection: Collection = db.collection("users");
    const user = await usersCollection.findOne({
      _id: new ObjectId(payload.userId),
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get purchased item IDs
    const purchasedProducts = user.purchasedProducts || [];
    const purchasedServices = user.purchasedServices || [];

    const productsCollection: Collection<ProductDocument> =
      db.collection("products");
    const servicesCollection: Collection<ServiceDocument> =
      db.collection("services");

    // Query purchased items
    const productsQuery = {
      _id: { $in: purchasedProducts.map((id: string) => new ObjectId(id)) },
    };
    const servicesQuery = {
      _id: { $in: purchasedServices.map((id: string) => new ObjectId(id)) },
    };

    const [productsData, servicesData] = await Promise.all([
      productsCollection.find(productsQuery).toArray(),
      servicesCollection.find(servicesQuery).toArray(),
    ]);

    // Transform data for frontend
    const transformedProducts = productsData.map(
      (product: ProductDocument): Product =>
        ({
          ...product,
          id: product._id.toString(),
          _id: undefined,
        }) as Product,
    );

    const transformedServices = servicesData.map(
      (service: ServiceDocument): Service =>
        ({
          ...service,
          id: service._id.toString(),
          _id: undefined,
        }) as Service,
    );

    return NextResponse.json({
      products: transformedProducts,
      services: transformedServices,
    });
  } catch (error) {
    console.error("GET /api/purchases error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
