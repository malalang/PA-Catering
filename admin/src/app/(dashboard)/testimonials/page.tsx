import { DashboardShell } from "@/components/layout/DashboardShell";
import { TestimonialsBoard } from "@/components/testimonials/TestimonialsBoard";
import { fetchTestimonials } from "@/lib/data/testimonials";

export default async function TestimonialsPage() {
    const testimonials = await fetchTestimonials();

    return (
        <DashboardShell
            title="Testimonials"
            description="Manage customer testimonials and reviews for your business."
        >
            <TestimonialsBoard testimonials={testimonials} />
        </DashboardShell>
    );
}
