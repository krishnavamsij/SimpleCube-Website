import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Transform Education with Hyniva's Innovative Digital Solutions",
    description:
        "Revolutionize your educational institute with Hyniva's LMS, automated administration, virtual classrooms, and cloud transformation for enhanced learning experiences.",
};

export default function EducationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
