import { DashboardShell } from "@/components/layout/DashboardShell";
import { CommentsBoard } from "@/components/comments/CommentsBoard";
import { fetchComments } from "@/lib/data/comments";

export default async function CommentsPage() {
    const comments = await fetchComments();

    return (
        <DashboardShell
            title="Comments Management"
            description="View, edit, and delete product comments and reviews."
        >
            <CommentsBoard comments={comments} />
        </DashboardShell>
    );
}
