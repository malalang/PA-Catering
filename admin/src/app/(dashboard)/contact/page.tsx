import { DashboardShell } from "@/components/layout/DashboardShell";
import { ContactBoard } from "@/components/contact/ContactBoard";
import { fetchContactSubmissions } from "@/lib/data/contact";

export default async function ContactPage() {
    const contacts = await fetchContactSubmissions();

    return (
        <DashboardShell
            title="Contact Submissions"
            description="View all contact form submissions from customers."
        >
            <ContactBoard contacts={contacts} />
        </DashboardShell>
    );
}
