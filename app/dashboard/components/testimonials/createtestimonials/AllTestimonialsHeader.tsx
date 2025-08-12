import Link from "next/link";

export default function AllTestimonialsHeader() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold mb-4">Testimonials</h2>
        <Link href="/dashboard/updateTestimonials">
          <button>Update</button>
        </Link>
      </div>
    </div>
  );
}
