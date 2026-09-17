import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api/serverApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Metadata } from "next";

type NotesPageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const currentTag = slug[0];
  const tag = currentTag === "all" ? "all notes" : currentTag;
  const title = `Notes filtered by ${tag} | NoteHub`;
  const description = `Browse notes filtered by ${tag} in NoteHub.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.com/notes/filter/${slug.join("/")}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `NoteHub notes filtered by ${tag}`,
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: NotesPageProps) {
  const queryClient = new QueryClient();
  const { slug } = await params;
  const currentTag = slug[0];
  const tag = currentTag === "all" ? "" : currentTag;

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, tag],
    queryFn: () => fetchNotes(1, 10, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
